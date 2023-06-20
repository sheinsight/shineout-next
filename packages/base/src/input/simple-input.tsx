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
    inGroup = false,
    onEnterPress,
    getStatus,
    renderInput,
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
      [jssStyle.wrapperNoBorder]: !border,
      [jssStyle.wrapperInGroup]: inGroup,
    },
  ]);

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
    className: classNames(jssStyle.input, jssStyle.paddingBox),
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
      {...getRootProps({
        className: rootClass,
        style,
      })}
    >
      {prefix}
      {inputEl}
      {(showClear || props.showClear) && (
        <div className={jssStyle.clearWrapper} {...getClearProps()}>
          <span className={jssStyle.clear}>{clearIcon || Icons.CloseCircle}</span>
        </div>
      )}
      {suffix}
    </div>
  );
};

export default Input;
