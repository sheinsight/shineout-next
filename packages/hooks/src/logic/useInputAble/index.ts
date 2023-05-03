import { useState, useCallback } from 'react';
import { isFunc } from '../../utils/is';

export interface InputAbleProps<T> {
  value: T | undefined;
  defaultValue: T | undefined;
  beforeChange: ((value: T) => T | void) | undefined;
  onChange: ((value: T, ...other: any[]) => void) | undefined;
  control: boolean;
}

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

  return [value, handleChange] as const;
}
