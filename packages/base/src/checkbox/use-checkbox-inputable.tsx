import { useState } from 'react';
import { CheckboxProps } from './checkbox.type';

const useCheckboxInputable = <T,>(
  props: Pick<CheckboxProps<T>, 'value' | 'checked' | 'inputable' | 'onChange'>,
) => {
  const { inputable } = props;
  const [checkedState, setCheckedState] = useState(false);

  const checked = inputable ? checkedState : props.checked;
  const onInputableCheckboxChange = (c: boolean) => {
    setCheckedState(c);
    props?.onChange?.(undefined, c, undefined as any);
  };
  const onInputChange = (value?: string) => {
    props?.onChange?.(value as T, true, undefined as any);
  };
  return {
    checked,
    onInputableCheckboxChange,
    onInputChange,
  };
};

export default useCheckboxInputable;
