import { KeygenType } from '../common/type';
function $getKey<T>(d: T, gen: KeygenType<T> | undefined, index?: number) {
  if (gen === true) return d;
  if (typeof gen === 'string') return d[gen];
  if (typeof gen === 'function') return gen(d, index);

  return index;
}
export function getKey<T>(...args: [T, KeygenType<T> | undefined, number?]) {
  const key = $getKey(...args) as string | number;
  if (typeof key !== 'string' && typeof key !== 'number') {
    console.error(new Error(`keygen result expect a string or a number, get '${typeof key}'`));
  }

  return key;
}
