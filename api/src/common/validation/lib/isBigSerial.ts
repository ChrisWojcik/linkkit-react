import { isString } from './isString';

export const MAX_BIG_INT = '9223372036854775807';

export function isBigSerial(value: any): boolean {
  const isIntegerString = isString(value) && /^[1-9]{1}[0-9]*$/.test(value);

  if (!isIntegerString || value.length > MAX_BIG_INT.length) {
    return false;
  }

  // string comparison works correctly if value is padded
  const paddedValue = value.padStart(MAX_BIG_INT.length, '0');

  if (paddedValue > MAX_BIG_INT) {
    return false;
  }

  return true;
}
