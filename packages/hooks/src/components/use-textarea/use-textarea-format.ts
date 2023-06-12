import React from 'react';
import usePersistFn from '../../common/use-persist-fn';
import { InputFormatProps } from './use-textarea-format.type';

const useInputFormat = (props: InputFormatProps) => {
  const { trim, onChange, onBlur } = props;

  const handleBlur = usePersistFn((e: React.FocusEvent) => {
    const target = e.target as HTMLInputElement;
    let value = target.value;
    let before = value;

    // 没有输入任何值
    if (props.value === undefined && value === '') {
      return;
    }

    // 去除前后空格
    if (trim) {
      value = value.trim();
    }
    if (value !== before) {
      target.value = value;
      onChange?.(value);
    }
    onBlur?.(e);
  });

  return {
    value: props.value,
    onChange,
    onBlur: handleBlur,
  };
};

export default useInputFormat;
