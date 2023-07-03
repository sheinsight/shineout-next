import { type Dispatch, type SetStateAction, useState } from 'react';
import { usePersistFn } from '../use-persist-fn';
import { useUnmountedRef } from '../use-unmounted-ref';

export function useSafeState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];

export function useSafeState<S = undefined>(
  initialState?: S | (() => S),
): [S | undefined, Dispatch<SetStateAction<S | undefined>>];

export function useSafeState<S>(initialState: S) {
  const unmountedRef = useUnmountedRef();
  const [state, setState] = useState(initialState);
  const setCurrentState = usePersistFn((currentState) => {
    if (!unmountedRef.current) {
      setState(currentState);
    }
  });
  return [state, setCurrentState];
}

export default useSafeState;
