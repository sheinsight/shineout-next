import React, { useMemo } from 'react';
import { useInputAble, usePersistFn, util } from '@sheinx/hooks';
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

const useInputCommon = <Value, Props extends InputCommonProps<Value>>(props0: Props) => {
  const config = useConfig();
  const props = useWithFormConfig(props0);
  const {
    forwardRef,
    forwardedRef,
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
    disabled,
    size,
    ...rest
  } = props;

  const delay = delayProps ?? config.delay ?? 0;

  const inputClasses = props.jssStyle?.input?.();

  const rootRef = React.useRef<HTMLElement>(null);

  const [focused, setFocused] = React.useState(false);

  const tipNode = useTip({
    popover,
    popoverProps: {
      popupGap: 4,
      offset: [1, 0],
      ...popoverProps,
    },
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
  const hasValue = (value: any) =>
    (util.isNumber(value) && !util.isNan(value)) || (value && value.length);

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

  const getInfoState = () => {
    const notNumber = typeof info !== 'number';
    if (typeof info !== 'function' && typeof info !== 'object' && notNumber) return null;
    let infoContent: number | ((value: string) => React.ReactNode | Error);
    if (typeof info === 'object') {
      infoContent = info.content;
    } else {
      infoContent = info;
    }
    const notContentNumber = typeof infoContent !== 'number';
    const textInfo = notContentNumber
      ? (infoContent as (value: string) => React.ReactNode | Error)
      : defaultInfo.bind(null, infoContent as number);
    const error = textInfo(inputAbleProps.value as string);
    if (!error) return null;
    const isError = error instanceof Error;
    const text = isError ? error.message : error;
    if (!isError && !focused) return null;
    return { text, error };
  };

  const infoState = useMemo(getInfoState, [info, inputAbleProps.value, focused]);
  const infoPopoverProps = {
    popover: props.popover || (typeof info === 'object' ? info.position : 'bottom-right'),
    popoverProps: Object.assign(
      {
        style: { width: 'auto', fontSize: 12 },
        adjust: true,
      },
      props.popoverProps,
    ),
    error:
      infoState?.error && infoState?.error instanceof Error ? infoState?.error?.message : undefined,
    tip: <div className={inputClasses?.info}>{infoState?.text}</div>,
  };

  const infoPopoverNode = useTip({
    ...infoPopoverProps,
    focused,
    rootRef,
    jssStyle: props.jssStyle,
  });

  const mergeSuffix = (
    <React.Fragment>
      {suffix}
      {infoState?.text && infoPopoverNode}
      {tipNode}
    </React.Fragment>
  );

  const onFocusedChange = usePersistFn((focused?: boolean) => {
    setFocused(!!focused);
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
    className: classNames(props.className, innerTitle && inputClasses?.wrapperInnerTitle),
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
    inputRef: forwardRef || forwardedRef,
    renderInput: renderInput,
    onFocusedChange: onFocusedChange,
  };
};

export default useInputCommon;
