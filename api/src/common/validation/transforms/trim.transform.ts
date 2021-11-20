import { isString } from '../lib/isString';

export function trim(value: any) {
  return isString(value) ? value.trim() : value;
}
