import { ObjectType } from '../common/type';
import { DisabledOption } from '../components/use-tree/use-tree.type';
import { UnMatchedData } from '../common/use-list-select/use-list.type';
import React from 'react';

export function isBrowser() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

const nameIs = (name: unknown) => (val: unknown) => {
  if (typeof val === 'object') {
    return val && val.constructor && val.constructor.name === name;
  }
  return false;
};

export const isArray = Array.isArray;
export const isObject = (val: unknown): val is ObjectType =>
  !!val && typeof val === 'object' && !isArray(val);
export const isDate = (val: unknown): val is Date => val instanceof Date;
export const isBoolean = (val: unknown): val is boolean => val instanceof Boolean;
export const isError = (val: unknown): boolean => val instanceof Error;
export const isNumber = (n: unknown): n is number => typeof n === 'number';
export const isRegexp = (val: unknown): boolean => val instanceof RegExp;
export const isString = (s: unknown): s is string => typeof s === 'string';
export const isUndefined = (obj: any): obj is undefined => obj === undefined;
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
export const isUnMatchedData = (val: unknown): val is UnMatchedData => {
  return isObject(val) && val.IS_NOT_MATCHED_VALUE === true;
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

export const isPromise = (p: unknown) =>
  p && (nameIs('Promise')(p) || isFunc((p as Promise<unknown>).then));

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

export const isLink = (el: unknown): el is React.ReactElement => {
  if (typeof el === 'object') {
    if (!React.isValidElement(el)) return false;
    if (!el.type) return false;
    if (el.type === 'a') return true;
    // 只有当是已知的路由组件时才判断 to 属性
    if (el.props && (el as React.ReactElement).props.to) {
      const typeName = typeof el.type === 'function' ? el.type.name : '';
      const displayName = typeof el.type === 'object' && el.type !== null ? (el.type as any).displayName : '';
      // 检查是否为常见的路由链接组件
      const isRouterComponent = typeName === 'Link' ||
                                typeName === 'NavLink' ||
                                displayName === 'Link' ||
                                displayName === 'NavLink';
      return isRouterComponent;
    }
  }

  return false;
};

export function isNamedComponent(type: any): type is React.ForwardRefExoticComponent<unknown> {
  return (isObject(type) || isFunc(type)) && type.hasOwnProperty('displayName');
}

export const isMacOS = (): boolean =>
  isBrowser() && /macintosh|mac os x/i.test(navigator.userAgent);

export const isFirefox = (): boolean => {
  if (!isBrowser()) return false;
  return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
};

export function isDomElement(element: any): element is HTMLElement {
  return typeof HTMLElement === 'object'
    ? element instanceof HTMLElement // DOM2
    : element &&
        typeof element === 'object' &&
        element !== null &&
        element.nodeType === 1 &&
        typeof element.nodeName === 'string';
}

export const isOptionalDisabled = <DataItem>(
  disabled: unknown,
): disabled is DisabledOption<DataItem> => {
  return isObject(disabled) && disabled.hasOwnProperty('isRealtime');
};
