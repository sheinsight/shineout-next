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
