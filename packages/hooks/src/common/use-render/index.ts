import { usePersistFn } from '../use-persist-fn';
import { useSafeState } from '../use-safe-state';
import { useEffect } from 'react';

export function useRender(callback?: () => void) {
  const [count, setCount] = useSafeState(undefined as number | undefined);
  useEffect(() => {
    if (callback && count !== undefined) callback();
  }, [count]);
  return usePersistFn(() => setCount((count) => ((count || 0) + 1) % 1_000_000));
}

export default useRender;
