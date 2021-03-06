import { isObject } from './isObject';

export function isPlainObject(fn: any): boolean {
  if (!isObject(fn)) {
    return false;
  }

  const proto = Object.getPrototypeOf(fn);
  if (proto === null) {
    return true;
  }

  const ctor =
    Object.prototype.hasOwnProperty.call(proto, 'constructor') &&
    proto.constructor;

  return (
    typeof ctor === 'function' &&
    ctor instanceof ctor &&
    Function.prototype.toString.call(ctor) ===
      Function.prototype.toString.call(Object)
  );
}
