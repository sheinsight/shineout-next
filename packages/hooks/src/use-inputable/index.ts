import { useState, useCallback } from 'react';

interface Props<T> {
  name?: string;
  value?: T;
  onChange?: (value: T, ...other: any[]) => void;
  [key: string]: any;
}

export default function useInputable<T>(props: Props<T>) {
  const { value, onChange } = props;
  const [stateValue, changeStateValue] = useState<T>(props.value || props.defaultValue);

  const handleChange = useCallback(
    (v: T, ...other: any[]) => {
      changeStateValue(v);
      if (onChange) onChange(v, ...other);
    },
    [onChange],
  );

  return [value !== undefined ? value : stateValue, handleChange] as const;
}
