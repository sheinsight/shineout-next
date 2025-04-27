import { useEffect, useRef, useState } from 'react';
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
  }>({ timer: null, delayChange: null });

  const latest = useLatestObj({ valuePo, stateValue });

  const syncValue = usePersistFn(() => {
    if (control && latest.stateValue !== latest.valuePo) {
      changeStateValue(latest.valuePo);
    }
  });

  const render = useRender(syncValue);
  const shouldUseState = delay || !control;

  const value = shouldUseState ? stateValue : valuePo;

  useEffect(() => {
    if (context.timer) {
      clearTimeout(context.timer);
      context.timer = null;
    }
    if (delay && control && props.value !== stateValue) {
      changeStateValue(props.value);
    }
  }, [props.value, delay, control]);

  const forceDelayChange = usePersistFn(() => {
    if (context.timer && context.delayChange) {
      clearTimeout(context.timer);
      context.delayChange();
      context.timer = null;
      context.delayChange = null;
    }
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
      context.delayChange = null;
      onChange(isFunc(vv) ? vv() : vv, ...other);
      render();
    };
    if (!delay) {
      onChange(isFunc(vv) ? vv() : vv, ...other);
    } else {
      if (context.timer) clearTimeout(context.timer);
      context.timer = setTimeout(context.delayChange, delay);
    }
  }) as V;

  return { value, onChange: handleChange, forceDelayChange } as const;
}
