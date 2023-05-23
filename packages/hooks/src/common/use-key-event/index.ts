import React, { useCallback } from 'react';
import useLatestObj from '../use-latest-obj';
interface UseKeyEventParams {
  onEnterPress?: () => void;
  onEscPress?: () => void;
  onSpacePress?: () => void;
}
// 返回一个函数，封装keyDown事件
const useKeyEvent = (params: UseKeyEventParams) => {
  const latestParams = useLatestObj(params);
  const onKeydown = useCallback((e: React.KeyboardEvent) => {
    const { keyCode } = e;
    switch (keyCode) {
      case 13:
        latestParams.onEnterPress?.();
        break;
      case 27:
        latestParams.onEscPress?.();
        break;
      case 32:
        latestParams.onSpacePress?.();
        break;
      default:
        break;
    }
  }, []);
  return {
    onKeydown,
  };
};

export default useKeyEvent;
