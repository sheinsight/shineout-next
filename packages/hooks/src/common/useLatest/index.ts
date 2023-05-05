import { useRef } from 'react';
import type { ObjectType } from '../../common/type';
//保持对象引用不变并且每次都是最新的
function useLatest<T extends ObjectType>(value: T): T {
  const ref = useRef(value);
  Object.keys(value).forEach((key) => {
    ref.current[key as keyof T] = value[key];
  });
  return ref.current;
}
export default useLatest;
