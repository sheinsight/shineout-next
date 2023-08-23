import React, { useMemo } from 'react';
import { useInputAble, usePersistFn } from '@sheinx/hooks';
import useClear from '../common/use-clear';
import useInnerTitle from '../common/use-inner-title';
import classNames from 'classnames';

import { InputCommonProps } from './input.type';
import useWithFormConfig from '../common/use-with-form-config';
import Popover from '../popover';

const defaultInfo = (num: number, msg: any) => {
  if (!msg || msg.length === 0) return null;
  const text = `${msg.length} / ${num}`;
  if (msg.length <= num) return text;
  return new Error(text);
};

const useInputCommon = <Value, Props extends InputCommonProps<Value>>(props: Props) => {
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
    delay,
    onBlur,
    tip,
    error,
    popover,
    popoverProps,
    ...rest
  } = props;

  const { size, disabled } = useWithFormConfig(props);
  const rootRef = React.useRef<HTMLElement>(null);

  const [focused, setFocused] = React.useState(false);

  const inputAbleParams = {
    value: value,
    onChange: onChange,
    defaultValue: defaultValue,
    beforeChange: beforeChange,
    delay: delay,
  };
  const inputAbleProps = useInputAble({
    control: 'value' in props,
    ...inputAbleParams,
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
        className={classNames(
          props.jssStyle?.input?.info,
          !!isError && props.jssStyle?.input?.infoError,
        )}
      >
        {text}
      </div>
    );
  };

  const getTip = () => {
    if (!tip) return null;
    const styles =
      popoverProps?.style && popoverProps?.style?.width
        ? popoverProps?.style
        : Object.assign({ minWidth: 200, maxWidth: 400 }, popoverProps?.style || {});
    let errorMessage = typeof error === 'string' ? error : (error as any)?.message;
    if ((tip && focused) || (popover && errorMessage)) {
      return (
        <Popover
          jssStyle={props.jssStyle}
          getPopupContainer={() => rootRef.current}
          {...popoverProps}
          style={styles}
          visible
          position={popoverProps?.position || 'bottom-left'}
          type={errorMessage ? 'error' : undefined}
        >
          {errorMessage || tip}
        </Popover>
      );
    }
    return null;
  };

  const mergeSuffix = (
    <React.Fragment>
      {suffix}
      {getInfo()}
      {getTip()}
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
    onChange: inputAbleProps.onChange,
    onBlur: handleBlur,
    ...clearProps,
    inputRef: forwardRef,
    name: htmlName,
    style: mergeStyle,
    suffix: mergeSuffix,
    renderInput: renderInput,
    getStatus: onStatusChange,
    disabled,
    size,
    rootRef,
  };
};

export default useInputCommon;
