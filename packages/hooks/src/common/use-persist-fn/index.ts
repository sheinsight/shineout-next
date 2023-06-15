import { useRef } from 'react';

/**
 * 持久化缓存函数
 * @param fn 函数 {@link T | T}
 * @return 被持久化引用地址的函数 {@link T | T}
 */
function usePersistFn<T extends (...args: any[]) => any>(fn: T): T {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  const persistFn = useRef<T>();
  if (!persistFn.current) {
    // @ts-expect-error  //TODO 这里可能要单独的去处理一下类型
    persistFn.current = (...args: any[]) => fnRef.current(...args);
  }

  return persistFn.current!;
}
export { usePersistFn };
export default usePersistFn;
