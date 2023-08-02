import { useCallback, useRef, useState } from 'react';
import { isFunc } from '../../utils';
import useRender from '../use-render';

import { ChangeType, InputAbleProps } from './use-Input-able.type';

export default function useInputAble<T, V extends ChangeType<T>>(props: InputAbleProps<T, V>) {
  const { value: valuePo, onChange, control, beforeChange, delay } = props;

  const [stateValue, changeStateValue] = useState<T | undefined>(props.value || props.defaultValue);
  const render = useRender(() => {
    if (control && stateValue !== valuePo) changeStateValue(valuePo);
  });
  const { current: context } = useRef<{ timer: NodeJS.Timeout | null }>({ timer: null });
  const value = control && !context.timer ? valuePo : stateValue;
  const handleChange = useCallback(
    (v: T, ...other: any[]) => {
      let vv = v;
      if (isFunc(beforeChange)) {
        const temp = beforeChange(v);
        vv = temp === undefined ? vv : temp;
      }

      const fatherChange = () => {
        if (isFunc(onChange)) onChange(vv, ...other);
        context.timer = null;
        render();
      };
      changeStateValue(vv);
      if (!delay) {
        fatherChange();
      } else {
        if (context.timer) clearTimeout(context.timer);
        context.timer = setTimeout(fatherChange, delay);
      }
    },
    [onChange],
  ) as V;

  return { value, onChange: handleChange } as const;
}
