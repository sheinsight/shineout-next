import { RefObject, useEffect } from 'react';
import { useLatestObj } from '../use-latest-obj';
import usePersistFn from '../use-persist-fn';

export type OnClickAwayFn<T> = (event: T) => void;

export type Target = RefObject<HTMLElement | null>;
export function useClickAway<T extends Event = Event>(params: {
  // 点击外部触发的回调
  onClickAway: OnClickAwayFn<T>;
  // 开启监听
  effect?: boolean;
  // 目标元素内点击不触发 onClickAway
  target: Target | Array<Target>;
  event?: 'click' | 'mousedown';
}) {
  const { onClickAway, effect = true, target: t, event = 'click' } = params;
  const context = useLatestObj({ onClickAway });
  const target = Array.isArray(t) ? t : [t];
  const handleClickAway = usePersistFn((event: T) => {
    // @ts-ignore
    if (target.findIndex((t) => t.current?.contains(event.target)) > -1) {
      return;
    }
    context.onClickAway(event);
  });

  useEffect(() => {
    if (effect) {
      // fix 点击绑定事件后会立马触发事件的问题
      setTimeout(
        () =>
          document.addEventListener(
            event,
            // @ts-ignore
            handleClickAway,
            {
              // 解决 点击后立刻删除dom导致获取不到元素; contains(target) 为 false 的问题
              capture: true,
            },
          ),
        0,
      );
    }
    return () => {
      // @ts-ignore
      document.removeEventListener(event, handleClickAway);
    };
  }, [effect]);
}

export default useClickAway;
