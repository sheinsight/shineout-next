import React from 'react';
import usePersistFn from '../use-persist-fn';
interface UseKeyEventParams {
  onEnterPress?: (e: React.KeyboardEvent) => void;
  onEscPress?: (e: React.KeyboardEvent) => void;
  onSpacePress?: (e: React.KeyboardEvent) => void;
}

const useKeyEvent = (params: UseKeyEventParams) => {
  const keyEvent = usePersistFn((e: React.KeyboardEvent) => {
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

export default useKeyEvent;
