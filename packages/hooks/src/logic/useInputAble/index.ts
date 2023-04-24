import { useState, useCallback } from 'react';

export interface InputAbleProps<T> {
  value: T | undefined;
  defaultValue: T | undefined;
  onChange: ((value: T, ...other: any[]) => void) | undefined;
}

export default function useInputAble<T>(props: InputAbleProps<T>) {
  const { value: valuePo, onChange } = props;
  const [stateValue, changeStateValue] = useState<T | undefined>(props.value || props.defaultValue);
  const value = valuePo !== undefined ? valuePo : stateValue;

  const handleChange = useCallback(
    (v: T, ...other: any[]) => {
      changeStateValue(v);
      if (onChange) onChange(v, ...other);
    },
    [onChange],
  );

  return [value, handleChange] as const;
}
