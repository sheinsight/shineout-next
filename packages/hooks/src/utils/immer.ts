// import { produce as produce2, getSnapshot } from '@shined/reactive/vanilla';

// export const produce = ((...args: any) => {
//   return produce2.apply(null, args);
// }) as typeof produce2;

// export const current = getSnapshot;

import { produce as produce2 } from 'immer';

export { current } from 'immer';
export const produce = <T>(value: T, cb: (value: T) => void) => {
  return produce2(value, cb);
};
