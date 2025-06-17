import { pxToRem } from '@/utils';
/**
 * Convert JWT exp in days
 * @param exp - Number to be converted
 * @returns Converted exp in days
 */

export function jwtExpirationDateConverter(exp: number): number {
   const currentTime = Math.floor(Date.now() / 1000);
   const secondsUntilExpiration = exp - currentTime 
   const secondsInDay = 24 * 60 * 60;
   const daysUtilExpiration = secondsUntilExpiration / secondsInDay
   return daysUtilExpiration;
}