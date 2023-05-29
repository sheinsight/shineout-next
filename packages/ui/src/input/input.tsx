import { useInput } from '@shined/hooks';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { InputProps } from './input.type';
import Clear from '../icon/clear';

const Input = (props: InputProps) => {
  // rest 中包含了所有的 input 的属性
  const {
    jssStyle,
    className,
    style,
    status,
    clearIcon,
    size,
    prefix,
    suffix,
    // beforeChange,
    // coin,
    // type,
    // autoFix,
    // digits,
    // integerLimit,
    // numType,
    // trim,
    getStatus,
    ...rest
  } = props;
  // const inputAbleProps = useInputAble({
  //   value: props.value,
  //   defaultValue: props.defaultValue,
  //   control: 'value' in props,
  //   onChange: props.onChange,
  //   beforeChange: beforeChange,
  // });
  //
  // const formatProps = useInputFormat({
  //   autoFix,
  //   coin,
  //   type,
  //   value: inputAbleProps.value,
  //   onChange: inputAbleProps.onChange,
  //   onBlur: props.onBlur,
  //   onFocus: props.onFocus,
  //   digits,
  //   integerLimit,
  //   numType,
  //   trim,
  // });
  const { getRootProps, getClearProps, getInputProps, showClear, focused, disabled } = useInput({
    ...rest,
  });
  const rootClass = classNames([
    jssStyle.wrapper,
    className,
    {
      [jssStyle.wrapperFocus]: focused,
      [jssStyle.wrapperDisabled]: disabled,
      [jssStyle.wrapperError]: status === 'error',
      [jssStyle.wrapperSmall]: size === 'small',
      [jssStyle.wrapperLarge]: size === 'large',
    },
  ]);
  const inputProps = getInputProps({ className: jssStyle.input });

  useEffect(() => {
    if (getStatus) {
      getStatus({ focused });
    }
  }, [focused]);

  return (
    <div
      {...getRootProps({
        className: rootClass,
        style,
      })}
    >
      {prefix}
      <input type='text' {...inputProps} />
      {showClear && (
        <div className={jssStyle.clearWrapper} {...getClearProps()}>
          <Clear className={jssStyle.clear} icon={clearIcon} />
        </div>
      )}
      {suffix}
    </div>
  );
};

export default Input;
