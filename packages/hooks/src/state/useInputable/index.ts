import { useState, useCallback } from 'react';

interface Props<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T, ...other: any[]) => void;
}

export default function useInputable<T>(props: Props<T>) {
  const { value, onChange } = props;
  const [stateValue, changeStateValue] = useState<T | undefined>(props.value || props.defaultValue);

  const handleChange = useCallback(
    (v: T, ...other: any[]) => {
      changeStateValue(v);
      if (onChange) onChange(v, ...other);
    },
    [onChange],
  );

  return [value !== undefined ? value : stateValue, handleChange] as const;
}
