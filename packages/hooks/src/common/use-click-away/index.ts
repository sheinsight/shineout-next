import { RefObject, useEffect } from 'react';
import { useLatestObj } from '../use-latest-obj';

export type OnClickAwayFn<T> = (event: T) => void;

export type Target = RefObject<HTMLElement | null>;
export function useClickAway<T extends Event = Event>(params: {
  // 点击外部触发的回调
  onClickAway: OnClickAwayFn<T>;
  // 开启监听
  listen?: boolean;
  // 目标元素内点击不触发 onClickAway
  target: Target | Array<Target>;
}) {
  const { onClickAway, listen = true, target: t } = params;
  const context = useLatestObj({ onClickAway });
  const target = Array.isArray(t) ? t : [t];

  useEffect(() => {
    const handleClickAway = (event: T) => {
      // @ts-ignore
      if (target.findIndex((t) => t.current?.contains(event.target)) > -1) {
        return;
      }
      context.onClickAway(event);
    };
    if (listen) {
      // @ts-ignore
      document.addEventListener('click', handleClickAway);
    }
    return () => {
      // @ts-ignore
      document.removeEventListener('click', handleClickAway);
    };
  }, [listen]);
}

export default useClickAway;
