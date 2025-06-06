//**
Convert Pixels to Rem
@param pixels - Pixels value to be converted
@return Rem value
*//

export function pxToRem(pixels: number): string {
  const baseFontSize = 16; // Assuming the base font size is 16px
  const remValue = pixels / baseFontSize;
  return `${remValue}rem`;
}