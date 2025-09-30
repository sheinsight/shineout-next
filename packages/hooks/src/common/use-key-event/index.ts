import React from 'react';
import usePersistFn from '../use-persist-fn';
interface UseKeyEventParams<T extends HTMLElement> {
  onEnterPress?: (e: React.KeyboardEvent<T> & { target: T }) => void;
  onEscPress?: (e: React.KeyboardEvent<T> & { target: T }) => void;
  onSpacePress?: (e: React.KeyboardEvent<T> & { target: T }) => void;
}

const useKeyEvent = <T extends HTMLElement>(params: UseKeyEventParams<T>) => {
  const keyEvent = usePersistFn((e: React.KeyboardEvent<T> & { target: T }) => {
    const { keyCode } = e;
    switch (keyCode) {
      case 13:
        params.onEnterPress?.(e);
        break;
      case 27:
        params.onEscPress?.(e);
        break;
      case 32:
        params.onSpacePress?.(e);
        break;
      default:
        break;
    }
  });
  return keyEvent;
};
export { useKeyEvent };
export default useKeyEvent;
