import { usePersistFn } from '../use-persist-fn';
import { useSafeState } from '../use-safe-state';

export function useRender() {
  const [, setCount] = useSafeState(0);
  return usePersistFn(() => setCount((count) => (count + 1) % 1_000_000));
}

export default useRender;
