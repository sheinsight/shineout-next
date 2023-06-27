import { useEffect, useRef } from 'react';
import { useLatestObj } from '../use-latest-obj';

export type OnClickAwayFn<T> = (event: T) => void;

/**
 * 指定 dom 区域外触发点击事件 {@link http://lego-master-dev-5828.dev.paas-dev.sheincorp.cn/lego-use/scenes/use-click-away | 查看示例}
 * @param onClickAway 当点击其他区域时的回调 {@link OnClickAwayFn | OnClickAwayFn}
 * @returns 返回 Ref 可以用于绑定指定的 dom {@link React.MutableRefObject | React.MutableRefObject}
 */
export function useClickAway<T extends Event = Event>(onClickAway: OnClickAwayFn<T>) {
  const context = useLatestObj({ onClickAway });
  const domRef = useRef<any>();

  useEffect(() => {
    const handleClickAway = (event: T) => {
      // @ts-ignore
      if (domRef.current?.contains(event.target)) {
        return;
      }
      context.onClickAway(event);
    };

    // @ts-ignore
    document.addEventListener('click', handleClickAway);

    return () => {
      // @ts-ignore
      document.removeEventListener('click', handleClickAway);
    };
  }, []);
  return domRef;
}

export default useClickAway;
