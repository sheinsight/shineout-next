import React, { useMemo } from 'react';
import { useInputAble } from '@shined/hooks';
import useClear from '../hooks/use-clear';
import { InputCommonProps } from './input.type';

const useInputCommon = <V, T extends InputCommonProps<V>>(props: T) => {
  const {
    forwardRef,
    htmlName,
    value,
    onChange,
    defaultValue,
    beforeChange,
    clearable,
    clearToUndefined,
    style,
    ...rest
  } = props;

  const inputAbleParams = {
    value: value,
    onChange: onChange,
    defaultValue: defaultValue,
    beforeChange: beforeChange,
  };
  const inputAbleProps = useInputAble({
    control: 'value' in props,
    ...inputAbleParams,
  });

  const clearProps = useClear({
    clearable,
    clearToUndefined,
    value: inputAbleProps.value,
    onChange: inputAbleProps.onChange,
  });

  const mergeStyle = useMemo(() => {
    return { width: props.width, ...(style || {}) };
  }, [props.width, style]) as React.CSSProperties;
  return {
    ...rest,
    ...inputAbleProps,
    ...clearProps,
    inputRef: forwardRef,
    name: htmlName,
    style: mergeStyle,
  };
};

export default useInputCommon;
