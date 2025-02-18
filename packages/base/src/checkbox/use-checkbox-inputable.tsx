import { useEffect, useState } from 'react';
import { CheckboxProps } from './checkbox.type';

const useCheckboxInputable = <T,>(
  props: Pick<CheckboxProps<T>, 'value' | 'checked' | 'inputable' | 'onChange'>,
) => {
  const [checkedState, setCheckedState] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setCheckedState(!!props.value);
  }, [props.value]);

  const onInputableCheckboxChange = (c: boolean, ignoreOnChange?: boolean) => {
    setCheckedState(c);
    if(ignoreOnChange) return;
    props?.onChange?.(undefined, c, undefined as any);
  };
  const onInputChange = (_value?: string) => {
    props?.onChange?.(_value as T, true, undefined as any);
  };
  return {
    checked: props.checked ?? checkedState,
    onInputableCheckboxChange,
    onInputChange,
  };
};

export default useCheckboxInputable;
