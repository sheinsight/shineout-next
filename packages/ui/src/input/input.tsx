import { useInput, useInputFormat, useInputAble } from '@shined/hooks';
import classNames from 'classnames';
import * as React from 'react';
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
    beforeChange,
    coin,
    type,
    autoFix,
    autoSelect,
    digits,
    integerLimit,
    numType,
    trim,
    ...rest
  } = props;
  const inputAbleProps = useInputAble({
    value: props.value,
    defaultValue: props.defaultValue,
    control: 'value' in props,
    onChange: props.onChange,
    beforeChange: beforeChange,
  });
  const formatProps = useInputFormat({
    autoFix,
    coin,
    type,
    value: inputAbleProps.value,
    onChange: inputAbleProps.onChange,
    onBlur: props.onBlur,
    onFocus: props.onFocus,
    digits,
    integerLimit,
    numType,
    trim,
  });
  const { getRootProps, getClearProps, getInputProps, showClear, focused, disabled } = useInput({
    ...rest,
    autoSelect,
    ...formatProps,
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

  return (
    <div
      {...getRootProps({
        className: rootClass,
        style,
      })}
    >
      <input type='text' {...inputProps} />
      {showClear && (
        <div className={jssStyle.clearWrapper} {...getClearProps()}>
          <Clear className={jssStyle.clear} icon={clearIcon} />
        </div>
      )}
    </div>
  );
};

export default Input;
