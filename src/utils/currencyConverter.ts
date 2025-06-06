/**
 * Convert to BRL currency format.
 * @param value- The numeric value to convert.
 * @returns Converter BRL currency string.
 */

export function currencyConverter(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
