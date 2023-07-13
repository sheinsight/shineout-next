import React, { useMemo } from 'react';
import { useInputAble, usePersistFn } from '@sheinx/hooks';
import useClear from '../common/use-clear';
import useInnerTitle from '../common/use-inner-title';
import classNames from 'classnames';

import { InputCommonProps } from './input.type';
import useWithFormConfig from '../common/use-with-form-config';

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
    innerTitleJssStyle,
    ...rest
  } = props;

  const { size, disabled } = useWithFormConfig(props);

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
    innerTitle,
    placeTitle,
    size,
    open: focused || hasValue(inputAbleProps.value),
    jssStyle: innerTitleJssStyle,
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
          [props.jssStyle.info]: true,
          [props.jssStyle.infoError]: isError,
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
    return { width: width, ...(style || {}) };
  }, [width, style]) as React.CSSProperties;
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
    disabled,
    size,
  };
};

export default useInputCommon;
