import { isString } from 'class-validator';

export function trim(value: any) {
  return isString(value) ? value.trim() : value;
}
