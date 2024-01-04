import { useEffect, useRef, useState } from 'react';
import { isFunc } from '../../utils';
import usePersistFn from '../use-persist-fn';
import { useLatestObj } from '../use-latest-obj';
import { useRender } from '../use-render';

import { ChangeType, InputAbleProps } from './use-Input-able.type';

export default function useInputAble<T, V extends ChangeType<T>>(props: InputAbleProps<T, V>) {
  const { value: valuePo, onChange, control, beforeChange, delay } = props;

  const [stateValue, changeStateValue] = useState<T | undefined>(props.value || props.defaultValue);

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

  const value = delay ? stateValue : valuePo;

  useEffect(() => {
    if (context.timer) {
      clearTimeout(context.timer);
      context.timer = null;
    }
    if (delay && props.value !== stateValue) {
      changeStateValue(props.value);
    }
  }, [props.value, delay]);

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
    if (isFunc(beforeChange)) {
      const temp = beforeChange(v);
      vv = temp === undefined ? vv : temp;
    }
    if (delay) {
      changeStateValue(vv);
    }

    if (!isFunc(onChange)) return;

    context.delayChange = () => {
      context.timer = null;
      context.delayChange = null;
      onChange(vv, ...other);
      render();
    };
    if (!delay) {
      onChange(vv, ...other);
    } else {
      if (context.timer) clearTimeout(context.timer);
      context.timer = setTimeout(context.delayChange, delay);
    }
  }) as V;

  return { value, onChange: handleChange, forceDelayChange } as const;
}
