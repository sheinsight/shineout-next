import { ObjectType } from '../common/type';

const nameIs = (name: unknown) => (val: unknown) => {
  if (typeof val === 'object') {
    return val && val.constructor && val.constructor.name === name;
  }
  return false;
};

export const isArray = Array.isArray;
export const isObject = (val: unknown): val is ObjectType =>
  !!val && typeof val === 'object' && !isArray(val);
export const isDate = (val: unknown): boolean => val instanceof Date;
export const isError = (val: unknown): boolean => val instanceof Error;
export const isRegexp = (val: unknown): boolean => val instanceof RegExp;
export const isMap = nameIs('Map');
export const isSet = nameIs('Set');
export const isBuffer = (val: unknown): boolean => {
  if (
    val &&
    typeof val === 'object' &&
    val.constructor &&
    typeof (val.constructor as any).isBuffer === 'function'
  ) {
    return (val.constructor as any).isBuffer(val);
  }
  return false;
};

export const isMergeable = (val: unknown): boolean => {
  if (!isObject(val)) return false;
  const fns = [isDate, isError, isRegexp, isMap, isSet, isBuffer];

  for (let i = 0; i < fns.length; i++) {
    if (fns[i](val)) return false;
  }

  return true;
};
// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunc = (f: unknown): f is Function => typeof f === 'function';

// eslint-disable-next-line no-self-compare
export const isNan = (a: unknown): boolean => a !== a;

export const isEmpty = (val: unknown): boolean => {
  // eslint-disable-next-line eqeqeq
  if (val == null) return true;

  if (isNan(val)) return true;

  if ((val as ArrayLike<unknown>).length !== undefined)
    return (val as ArrayLike<unknown>).length === 0;

  if (val instanceof Date) return false;

  if (typeof val === 'object') return Object.keys(val).length === 0;

  return false;
};
