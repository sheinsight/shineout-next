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
    addEnd,
    ...rest
  } = props;
  const inputStyle = jssStyle?.input?.();
  const { getRootProps, getClearProps, getInputProps, showClear, focused, disabled } = useInput({
    ...rest,
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
      data-soui-type='input'
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
        {(showClear || props.showClear) && (
          <div className={inputStyle?.clearWrapper} {...getClearProps()}>
            <span className={inputStyle?.clear}>{clearIcon || Icons.CloseOpaqueMultic1}</span>
          </div>
        )}
        {suffix}
      </div>
      {addEnd}
    </div>
  );
};

export default Input;
