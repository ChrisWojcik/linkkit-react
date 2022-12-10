export const MAX_INT = 2147483647;

export function isSerial(value: any): boolean {
  return typeof value === 'number' && value > 0 && value <= MAX_INT;
}
