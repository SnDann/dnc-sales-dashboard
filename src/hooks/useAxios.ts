import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import type { AxiosRequestConfig, AxiosError, AxiosResponse, CancelTokenSource } from 'axios';

export interface UseAxiosState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  status: number | null;
}

export interface UseAxiosReturn<T> extends UseAxiosState<T> {
  refetch: () => Promise<void>;
  execute: (config?: AxiosRequestConfig) => Promise<T | null>;
  cancel: () => void;
  reset: () => void;
}

export interface UseAxiosOptions {
  immediate?: boolean;
  onSuccess?: (data: any, response: AxiosResponse<any>) => void;
  onError?: (error: AxiosError) => void;
  retries?: number;
  retryDelay?: number;
  timeout?: number;
}

/**
 * Custom hook for making HTTP requests with axios
 * @param config - Axios request configuration
 * @param options - Additional options for the hook
 * @returns Object containing data, loading state, error, and utility functions
 */
export function useAxios<T = any>(
  config?: AxiosRequestConfig,
  options: UseAxiosOptions = {}
): UseAxiosReturn<T> {
  const { 
    immediate = true, 
    onSuccess, 
    onError, 
    retries = 0, 
    retryDelay = 1000,
    timeout = 10000 
  } = options;

  const [state, setState] = useState<UseAxiosState<T>>({
    data: null,
    loading: false,
    error: null,
    status: null,
  });

  const cancelTokenRef = useRef<CancelTokenSource | null>(null);
  const mountedRef = useRef(true);
  const retryCountRef = useRef(0);

  // Sleep function for retry delay
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Cancel any ongoing request
  const cancel = useCallback(() => {
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel('Request cancelled by user');
      cancelTokenRef.current = null;
    }
  }, []);

  // Reset state to initial values
  const reset = useCallback(() => {
    cancel();
    setState({
      data: null,
      loading: false,
      error: null,
      status: null,
    });
    retryCountRef.current = 0;
  }, [cancel]);

  const execute = useCallback(
    async (executeConfig?: AxiosRequestConfig, currentRetry = 0): Promise<T | null> => {
      try {
        // Cancel any existing request
        cancel();

        // Create new cancel token
        cancelTokenRef.current = axios.CancelToken.source();

        setState(prev => ({ ...prev, loading: true, error: null }));

        const finalConfig = executeConfig || config;
        if (!finalConfig) {
          throw new Error('No axios configuration provided');
        }

        // Merge timeout and cancel token with config
        const requestConfig: AxiosRequestConfig = {
          timeout,
          ...finalConfig,
          cancelToken: cancelTokenRef.current.token,
        };

        const response: AxiosResponse<T> = await axios(requestConfig);
        
        // Only update state if component is still mounted
        if (mountedRef.current) {
          setState({
            data: response.data,
            loading: false,
            error: null,
            status: response.status,
          });

          if (onSuccess) {
            onSuccess(response.data, response);
          }
        }

        retryCountRef.current = 0;
        return response.data;
      } catch (err) {
        const error = err as AxiosError;

        // Don't handle cancelled requests
        if (axios.isCancel(error)) {
          return null;
        }

        // Retry logic for network errors or 5xx status codes
        const hasCode = typeof error === 'object' && error !== null && 'code' in error;
        const shouldRetry = currentRetry < retries && 
          (hasCode && (error.code === 'NETWORK_ERROR' || 
           error.code === 'ECONNABORTED') ||
           (error.response?.status && error.response.status >= 500));

        if (shouldRetry) {
          await sleep(retryDelay * Math.pow(2, currentRetry)); // Exponential backoff
          return execute(executeConfig, currentRetry + 1);
        }

        const errorMessage = error.response?.data?.message || 
                           error.response?.data?.error ||
                           error.message || 
                           'An unexpected error occurred';

        // Only update state if component is still mounted
        if (mountedRef.current) {
          setState({
            data: null,
            loading: false,
            error: errorMessage,
            status: error.response?.status || null,
          });

          if (onError) {
            onError(error);
          }
        }

        return null;
      }
    },
    [config, onSuccess, onError, retries, retryDelay, timeout, cancel]
  );

  const refetch = useCallback(() => execute(), [execute]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      cancel();
    };
  }, [cancel]);

  useEffect(() => {
    if (immediate && config) {
      execute();
    }
  }, [immediate, execute, config]);

  return {
    ...state,
    refetch,
    execute,
    cancel,
    reset,
  };
}

/**
 * Hook for making GET requests
 */
export function useAxiosGet<T = any>(
  url: string,
  config?: Omit<AxiosRequestConfig, 'url' | 'method'>,
  options?: UseAxiosOptions
): UseAxiosReturn<T> {
  return useAxios<T>(
    {
      url,
      method: 'GET',
      ...config,
    },
    options
  );
}

/**
 * Hook for making POST requests
 */
export function useAxiosPost<T = any>(
  url: string,
  data?: any,
  config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>,
  options?: UseAxiosOptions
): UseAxiosReturn<T> {
  return useAxios<T>(
    {
      url,
      method: 'POST',
      data,
      ...config,
    },
    { immediate: false, ...options }
  );
}

/**
 * Hook for making PUT requests
 */
export function useAxiosPut<T = any>(
  url: string,
  data?: any,
  config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>,
  options?: UseAxiosOptions
): UseAxiosReturn<T> {
  return useAxios<T>(
    {
      url,
      method: 'PUT',
      data,
      ...config,
    },
    { immediate: false, ...options }
  );
}

/**
 * Hook for making DELETE requests
 */
export function useAxiosDelete<T = any>(
  url: string,
  config?: Omit<AxiosRequestConfig, 'url' | 'method'>,
  options?: UseAxiosOptions
): UseAxiosReturn<T> {
  return useAxios<T>(
    {
      url,
      method: 'DELETE',
      ...config,
    },
    { immediate: false, ...options }
  );
}

export default useAxios;