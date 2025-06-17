/**
 * Convert Pixels to Rem
 * @param pixels - Pixels value to be converted
 * @return Rem value
 */
export function pxToRem(px: number, base: number = 16): string {
  return `${px / base}rem`;
}
