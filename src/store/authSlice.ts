import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ token: string }>) {
      state.token = action.payload.token;
      state.status = 'succeeded';
      state.error = null;
    },
    logout(state) {
      state.token = null;
      state.status = 'idle';
      state.error = null;
    },
    authLoading(state) {
      state.status = 'loading';
      state.error = null;
    },
    authFailed(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { setCredentials, logout, authLoading, authFailed } = authSlice.actions;
export default authSlice.reducer;