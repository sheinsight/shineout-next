import { useInput, useKeyEvent, usePersistFn } from '@shined/hooks';
import classNames from 'classnames';
import React, { KeyboardEvent, useEffect } from 'react';
import { InputProps } from './input.type';
import Icons from '../icons';

const Input = (props: InputProps) => {
  const {
    jssStyle,
    className,
    style,
    status,
    clearIcon,
    size,
    prefix,
    suffix,
    underline,
    getStatus,
    ...rest
  } = props;
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
      [jssStyle.wrapperUnderline]: underline,
    },
  ]);

  const keyHandler = useKeyEvent({
    onEnterPress: (e: KeyboardEvent) => {
      props.onEnterPress?.((e.target as HTMLInputElement).value || '', e);
    },
  });

  const onKeyUp = usePersistFn((e: KeyboardEvent<HTMLInputElement>) => {
    props.onKeyUp?.(e);
    keyHandler(e);
  });

  const inputProps = getInputProps({ className: jssStyle.input, onKeyUp });

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
          <span className={jssStyle.clear}>{clearIcon || Icons.CloseCircle}</span>
        </div>
      )}
      {suffix}
    </div>
  );
};

export default Input;
