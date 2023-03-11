export function isIntegerString(value: any): boolean {
  return typeof value === 'string' && /^-?\d+$/.test(value);
}
