import { useInputable } from '@soui/hooks';
import type { ChangeEvent, KeyboardEventHandler } from 'react';
import { useCallback } from 'react';
import type { InputProps } from './type';

const useInput = (props: InputProps) => {
  const [value, onChange] = useInputable(props);
  const { onPressEnter, onKeyDown, onClear, ...otherProps } = props;

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange(e.target.value, e);
    },
    [onChange],
  );

  const handleKeydown: KeyboardEventHandler = (e) => {
    if (onKeyDown) onKeyDown(e);
    if (e.key === 'Enter' && onPressEnter) {
      onPressEnter(e);
    }
  };

  const handleClear = () => {
    onChange('');
    onClear?.();
  };

  return {
    props: {
      ...otherProps,
      value,
      onKeydown: handleKeydown,
      onChange: handleChange,
      onClear: handleClear,
    },
  };
};

export { InputProps };

export default useInput;
