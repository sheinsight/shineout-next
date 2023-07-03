import { type MutableRefObject, useEffect, useRef } from 'react';

export function useUnmountedRef(): MutableRefObject<boolean> {
  const unmountedRef = useRef(false);
  useEffect(() => {
    unmountedRef.current = false;
    return () => {
      unmountedRef.current = true;
    };
  }, []);
  return unmountedRef;
}

export default useUnmountedRef;
