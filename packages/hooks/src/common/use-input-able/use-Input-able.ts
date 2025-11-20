import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { isFunc } from '../../utils/is';
import { shallowEqual } from '../../utils/shallow-equal';
import usePersistFn from '../use-persist-fn';
import { useLatestObj } from '../use-latest-obj';
import { useRender } from '../use-render';

import { ChangeType, InputAbleProps } from './use-Input-able.type';

export default function useInputAble<T, V extends ChangeType<T>>(props: InputAbleProps<T, V>) {
  const { value: valuePo, onChange, onSameChange, control, beforeChange, delay } = props;

  const [stateValue, changeStateValue] = useState<T | undefined>(props.value ?? props.defaultValue);

  const { current: context } = useRef<{
    timer: NodeJS.Timeout | null;
    delayChange: null | (() => void);
    // pendingCount: number;
    // executedCount: number;
    // checkTimer: NodeJS.Timeout | null;
  }>({
    timer: null,
    delayChange: null,
    // pendingCount: 0,
    // executedCount: 0,
    // checkTimer: null,
  });

  const latest = useLatestObj({ valuePo, stateValue });

  const syncValue = usePersistFn(() => {
    if (control && latest.stateValue !== latest.valuePo) {
      changeStateValue(latest.valuePo);
    }
  });

  const render = useRender(syncValue);
  const shouldUseState = delay || !control;

  const value = shouldUseState ? stateValue : valuePo;

  // const finnalEffect = xx ? useLayoutEffect : useEffect;

  useLayoutEffect(() => {
    console.log('执行useEffect')
    if (context.timer) {
      clearTimeout(context.timer);
      context.timer = null;
    }
    if (delay && control && props.value !== stateValue) {
      changeStateValue(props.value);
    }
  }, [props.value, delay, control]);

  const forceDelayChange = usePersistFn(() => {
    // if (context.checkTimer) {
    //   clearTimeout(context.checkTimer);
    //   context.checkTimer = null;
    // }

    context.delayChange && context.delayChange();
    if (context.timer) {
      clearTimeout(context.timer);
      context.timer = null;
      context.delayChange = null;
    }
    // context.pendingCount = 0;
    // context.executedCount = 0;
  });

  const handleChange = usePersistFn((v: T, ...other: any[]) => {
    let vv = v;
    if (other.length === 0 || props.filterSameChange) {
      if (shallowEqual(v, value)) {
        if (onSameChange) onSameChange(v);
        return;
      }
    }
    if (isFunc(beforeChange)) {
      const temp = beforeChange(v);
      vv = temp === undefined ? vv : temp;
    }
    if (shouldUseState) {
      changeStateValue(vv);
    }

    if (!isFunc(onChange)) return;

    context.delayChange = () => {
      context.timer = null;
      console.log('执行onChange')
      context.delayChange = null;
      // context.executedCount++;
      onChange(vv, ...other);
      render();
    };
    if (!delay) {
      onChange(vv, ...other);
    } else {
      // const currentPendingCount = ++context.pendingCount;
      if (context.timer) clearTimeout(context.timer);
      context.timer = setTimeout(context.delayChange, delay);

      console.log('触发onChange')


      // 设置检查定时器，在 delay 之后检查是否有丢失的 delayChange
      // if (context.checkTimer) clearTimeout(context.checkTimer);
      // context.checkTimer = setTimeout(() => {
      //   const missedCount = currentPendingCount - context.executedCount;
      //   if (missedCount > 0 && context.delayChange && valuePo !== vv) {
      //     context.delayChange();
      //   }
      //   context.checkTimer = null;
      // }, delay + 50);
    }
  }) as V;

  return { value, onChange: handleChange, forceDelayChange } as const;
}
