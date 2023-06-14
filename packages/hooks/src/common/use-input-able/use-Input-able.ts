import { useState, useCallback } from 'react';
import { isFunc } from '../../utils';

import { InputAbleProps } from './use-Input-able.type';

export default function useInputAble<T>(props: InputAbleProps<T>) {
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
  );

  return { value, onChange: handleChange } as const;
}
