import { useCallback, useState } from 'react';
import { isFunc } from '../../utils';

import { ChangeType, InputAbleProps } from './use-Input-able.type';

export default function useInputAble<T, V extends ChangeType<T>>(props: InputAbleProps<T, V>) {
  const { value: valuePo, onChange, control, beforeChange } = props;
  const [stateValue, changeStateValue] = useState<T | undefined>(props.value || props.defaultValue);
  const value = control ? valuePo : stateValue;
  const handleChange = useCallback(
    (v: T, ...other: any[]) => {
      let vv = v;
      if (isFunc(beforeChange)) {
        const temp = beforeChange(v);
        vv = temp === undefined ? vv : temp;
      }
      changeStateValue(vv);
      if (onChange) onChange(vv, ...other);
    },
    [onChange],
  ) as V;

  return { value, onChange: handleChange } as const;
}
