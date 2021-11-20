import { isUndefined } from './isUndefined';

export function isEmpty(value: any): boolean {
  return isUndefined(value) || value === null || value === '';
}
