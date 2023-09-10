import { useInput, useKeyEvent, usePersistFn } from '@sheinx/hooks';
import classNames from 'classnames';
import React, { KeyboardEvent, useEffect } from 'react';
import { SimpleInputProps } from './input.type';
import Icons from '../icons';

const Input = (props: SimpleInputProps) => {
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
    border = true,
    onEnterPress,
    getStatus,
    renderInput,
    ...rest
  } = props;
  const { getRootProps, getClearProps, getInputProps, showClear, focused, disabled } = useInput({
    ...rest,
  });
  const rootClass = classNames(
    className,
    jssStyle?.input?.wrapper,
    !!focused && jssStyle?.input?.wrapperFocus,
    !!disabled && jssStyle?.input?.wrapperDisabled,
    status === 'error' && jssStyle?.input?.wrapperError,
    size === 'small' && jssStyle?.input?.wrapperSmall,
    size === 'large' && jssStyle?.input?.wrapperLarge,
    !!underline && jssStyle?.input?.wrapperUnderline,
    !border && jssStyle?.input?.wrapperNoBorder,
  );

  const keyHandler = useKeyEvent({
    onEnterPress: (e: KeyboardEvent) => {
      onEnterPress?.((e.target as HTMLInputElement).value || '', e);
    },
  });

  const onKeyUp = usePersistFn((e: KeyboardEvent<HTMLInputElement>) => {
    props.onKeyUp?.(e);
    keyHandler(e);
  });

  const inputProps = getInputProps({
    className: classNames(jssStyle?.input?.input, jssStyle?.input?.paddingBox),
    onKeyUp,
  });

  useEffect(() => {
    if (getStatus) {
      getStatus({ focused });
    }
  }, [focused]);

  let inputEl = <input type='text' {...inputProps} />;

  if (typeof renderInput === 'function') {
    inputEl = renderInput(inputEl);
  }

  return (
    <div
      data-type='so-input'
      {...getRootProps({
        className: rootClass,
        style,
      })}
    >
      {prefix}
      {inputEl}
      {(showClear || props.showClear) && (
        <div className={jssStyle?.input?.clearWrapper} {...getClearProps()}>
          <span className={jssStyle?.input?.clear}>{clearIcon || Icons.CloseCircle}</span>
        </div>
      )}
      {suffix}
    </div>
  );
};

export default Input;
