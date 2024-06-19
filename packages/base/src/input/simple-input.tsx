import { useInput, useKeyEvent, usePersistFn, useAutoFocusByVisible, util } from '@sheinx/hooks';
import classNames from 'classnames';
import React, { KeyboardEvent, useEffect } from 'react';
import { SimpleInputProps } from './input.type';
import Icons from '../icons';
import { useConfig } from '../config';

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
    autoFocus,
    onEnterPress,
    onFocusedChange,
    renderInput,
    addEnd,
    hasSuffix,
    ...rest
  } = props;

  const inputStyle = jssStyle?.input?.();
  const config = useConfig();
  const { getRootProps, getClearProps, getInputProps, showClear, focused, disabled } = useInput({
    ...rest,
    onFocusedChange,
  });

  const rootClass = classNames(
    className,
    inputStyle?.wrapper,
    !!focused && inputStyle?.wrapperFocus,
    !!disabled && inputStyle?.wrapperDisabled,
    status === 'error' && inputStyle?.wrapperError,
    size === 'small' && inputStyle?.wrapperSmall,
    size === 'large' && inputStyle?.wrapperLarge,
    !!underline && inputStyle?.wrapperUnderline,
    !border && inputStyle?.wrapperNoBorder,
    hasSuffix && inputStyle?.password,
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
    className: classNames(inputStyle?.input),
    onKeyUp,
  });

  const { focusRef } = useAutoFocusByVisible({
    autoFocus
  })

  let inputEl = <input type='text' {...inputProps} ref={focusRef as React.MutableRefObject<HTMLInputElement>} />;

  if (typeof renderInput === 'function') {
    inputEl = renderInput(inputEl);
  }

  return (
    <div
      {...util.getDataAttribute({ ['input-border']: 'true' })}
      {...getRootProps({
        className: rootClass,
        style,
      })}
    >
      <div
        className={classNames(
          inputStyle?.wrapperInnerTitleTop,
          inputStyle?.wrapperInnerTitleBottom,
          inputStyle?.wrapperPaddingBox,
          inputStyle?.content,
        )}
      >
        {prefix}
        {inputEl}
        {showClear && (
          <div className={inputStyle?.clearWrapper} {...getClearProps()}>
            <span className={inputStyle?.clear} dir={config.direction}>
              {clearIcon || Icons.input.Close}
            </span>
          </div>
        )}
        {suffix}
      </div>
      {addEnd}
    </div>
  );
};

export default Input;
