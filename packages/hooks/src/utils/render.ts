import React from 'react';
import { KeygenType } from '../common/type';

export type renderFunc<T extends any[]> = (...args: T) => React.ReactNode;

export const render = <T extends any[]>(r: string | renderFunc<T> | undefined, ...args: T) => {
  if (typeof r === 'function') return r(...args);
  if (typeof r === 'string' && args[0]) return args[0][r];
  return args[0];
};

function $getKey<T>(gen: KeygenType<T> | undefined, d: T, index?: number) {
  if (gen === true) return d;
  if (typeof gen === 'string') return d[gen];
  if (typeof gen === 'function') return gen(d, index);
  return index;
}
export function getKey<T>(gen: KeygenType<T> | undefined, d: T, index?: number, ignoreError?: boolean) {
  const key = $getKey(gen, d, index) as string | number;
  if (typeof key !== 'string' && typeof key !== 'number' && !ignoreError) {
    console.error(new Error(`keygen result expect a string or a number, get '${typeof key}'`));
  }
  return key;
}
