import { usePersistFn } from '../use-persist-fn';
import { useSafeState } from '../use-safe-state';
import { useEffect } from 'react';

export function useRender(callback?: () => void) {
  const [count, setCount] = useSafeState(0);
  useEffect(() => {
    if (callback && count) callback();
  }, [count]);
  return usePersistFn(() => setCount((count) => (count + 1) % 1_000_000));
}

export default useRender;
