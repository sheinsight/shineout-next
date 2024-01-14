import React, { useMemo } from 'react';
import { useInputAble, usePersistFn } from '@sheinx/hooks';
import useClear from '../common/use-clear';
import useInnerTitle from '../common/use-inner-title';
import useTip from '../common/use-tip';
import classNames from 'classnames';

import { InputCommonProps } from './input.type';
import useWithFormConfig from '../common/use-with-form-config';
import { useConfig } from '../config';

const defaultInfo = (num: number, msg: any) => {
  if (!msg || msg.length === 0) return null;
  const text = `${msg.length} / ${num}`;
  if (msg.length <= num) return text;
  return new Error(text);
};

const useInputCommon = <Value, Props extends InputCommonProps<Value>>(props: Props) => {
  const config = useConfig();
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
    suffix,
    info,
    getStatus,
    innerTitle,
    placeTitle,
    width,
    delay: delayProps,
    onBlur,
    tip,
    error,
    popover,
    popoverProps,
    status,
    trim: trimProps,
    ...rest
  } = props;

  const trim = trimProps ?? config.trim ?? false;
  const delay = delayProps ?? config.delay ?? 0;

  const inputStyle = props.jssStyle?.input?.();

  const { size, disabled } = useWithFormConfig(props);
  const rootRef = React.useRef<HTMLElement>(null);

  const [focused, setFocused] = React.useState(false);

  const tipNode = useTip({
    popover,
    popoverProps,
    error,
    tip,
    focused,
    rootRef,
    jssStyle: props.jssStyle,
  });

  const inputAbleProps = useInputAble({
    control: 'value' in props,
    value,
    onChange,
    defaultValue,
    beforeChange,
    delay,
  });
  const hasValue = (value: any) => value === 0 || (value && value.length);

  const renderInput = useInnerTitle({
    innerTitle,
    placeTitle,
    size,
    open: focused || hasValue(inputAbleProps.value),
    jssStyle: props.jssStyle,
  });

  const clearProps = useClear({
    clearable,
    clearToUndefined,
    value: inputAbleProps.value,
    onChange: inputAbleProps.onChange,
  });

  const getInfo = () => {
    const notNumber = typeof info !== 'number';
    if (typeof info !== 'function' && notNumber) return null;
    const textInfo = notNumber ? info : defaultInfo.bind(null, info);
    const res = textInfo(inputAbleProps.value);
    // empty
    if (!res) return null;
    const isError = res instanceof Error;
    const text = isError ? res.message : res;
    return (
      <div
        key='info'
        style={{ minWidth: 'auto' }}
        className={classNames(inputStyle?.info, !!isError && inputStyle?.infoError)}
      >
        {text}
      </div>
    );
  };

  const mergeSuffix = (
    <React.Fragment>
      {suffix}
      {getInfo()}
      {tipNode}
    </React.Fragment>
  );

  const onStatusChange = usePersistFn((status: { focused?: boolean }) => {
    setFocused(!!status.focused);
    if (getStatus) {
      getStatus(status);
    }
  });

  const mergeStyle = useMemo(() => {
    return { width: width, ...(style || {}) };
  }, [width, style]) as React.CSSProperties;

  const handleBlur = usePersistFn((e: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(e);
    inputAbleProps.forceDelayChange();
  });
  return {
    ...rest,
    value: inputAbleProps.value,
    className: classNames(props.className, innerTitle && inputStyle?.wrapperInnerTitle),
    onChange: inputAbleProps.onChange,
    onBlur: handleBlur,
    ...clearProps,
    name: htmlName,
    style: mergeStyle,
    suffix: mergeSuffix,
    status: error ? 'error' : status,
    disabled,
    size,
    rootRef,
    inputRef: forwardRef,
    trim,
    renderInput: renderInput,
    getStatus: onStatusChange,
  };
};

export default useInputCommon;
