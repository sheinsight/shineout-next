import { useEffect, useRef, useState } from 'react';
import { isFunc } from '../../utils';
import useRender from '../use-render';
import usePersistFn from '../use-persist-fn';

import { ChangeType, InputAbleProps } from './use-Input-able.type';

export default function useInputAble<T, V extends ChangeType<T>>(props: InputAbleProps<T, V>) {
  const { value: valuePo, onChange, control, beforeChange, delay } = props;

  const [stateValue, changeStateValue] = useState<T | undefined>(props.value || props.defaultValue);

  const render = useRender(() => {
    if (control && stateValue !== valuePo) changeStateValue(valuePo);
  });

  const { current: context } = useRef<{
    timer: NodeJS.Timeout | null;
    delayChange: null | (() => void);
  }>({ timer: null, delayChange: null });
  const value = control && !context.timer ? valuePo : stateValue;

  useEffect(() => {
    if (context.timer) {
      clearTimeout(context.timer);
      context.timer = null;
      render();
    }
  }, [props.value]);

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
    changeStateValue(vv);

    if (!isFunc(onChange)) return;

    context.delayChange = () => {
      onChange(vv, ...other);
      context.timer = null;
      context.delayChange = null;
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
