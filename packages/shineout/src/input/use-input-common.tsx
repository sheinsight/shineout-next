import React, { useMemo } from 'react';
import { useInputAble, usePersistFn } from '@shined/hooks';
import useClear from '../hooks/use-clear';
import { useInputStyle } from '@shined/shineout-style';
import useInnerTitle from '../hooks/use-inner-title';
import classNames from 'classnames';

import { InputCommonProps } from './input.type';

const defaultInfo = (num: number, msg: any) => {
  if (!msg || msg.length === 0) return null;
  const text = `${msg.length} / ${num}`;
  if (msg.length <= num) return text;
  return new Error(text);
};

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
    suffix,
    info,
    getStatus,
    ...rest
  } = props;

  const jssStyle = useInputStyle();

  const [focused, setFocused] = React.useState(false);

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
  const hasValue = (value: any) => value === 0 || (value && value.length);
  const renderInput = useInnerTitle({
    innerTitle: props.innerTitle,
    placeTitle: props.placeTitle,
    open: focused || hasValue(inputAbleProps.value),
    size: props.size,
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
        className={classNames({
          [jssStyle.info]: true,
          [jssStyle.infoError]: isError,
        })}
      >
        {text}
      </div>
    );
  };

  const mergeSuffix = (
    <React.Fragment>
      {suffix}
      {getInfo()}
    </React.Fragment>
  );

  const onStatusChange = usePersistFn((status: { focused?: boolean }) => {
    setFocused(!!status.focused);
    if (getStatus) {
      getStatus(status);
    }
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
    suffix: mergeSuffix,
    renderInput: renderInput,
    getStatus: onStatusChange,
  };
};

export default useInputCommon;
