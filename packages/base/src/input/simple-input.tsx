import { useInput, useKeyEvent, usePersistFn, util } from '@sheinx/hooks';
import classNames from 'classnames';
import React, { KeyboardEvent, useContext, useRef } from 'react';
import { SimpleInputProps } from './input.type';
import Icons from '../icons';
import { useConfig } from '../config';
import { FormFieldContext } from '../form/form-field-context';
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
    onFocusedChange,
    renderInput,
    addEnd,
    hasSuffix,
    ...rest
  } = props;

  const { current: context } = useRef({
    needTriggerEnter: false,
  });

  const inputStyle = jssStyle?.input?.();
  const config = useConfig();
  const { fieldId } = useContext(FormFieldContext);
  const showClearFromProp = props.showClear && !props.disabled;
  const { getRootProps, getClearProps, getInputProps, showClear: showClearFromClearable, focused, disabled } = useInput({
    ...rest,
    onFocusedChange,
    // 由于form的原生submit事件是在keydown中触发的，submit校验后触发scrollToError会导致当前焦点的input立即失焦，导致input的回车事件无法触发
    // 所以这里在onKeyDown时机记录下needTriggerEnter标志，在onBlur时机判断是否需要触发onEnterPress
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        context.needTriggerEnter = true;
      }
      props.onKeyDown?.(e);
    },
    onBlur: (e: any) => {
      if (context.needTriggerEnter) {
        context.needTriggerEnter = false;
        onEnterPress?.(e.target.value || '', e);
      }
      props.onBlur?.(e);
    },
  });


  const keyHandler = useKeyEvent({
    onEnterPress: (e: KeyboardEvent) => {
      onEnterPress?.((e.target as HTMLInputElement).value || '', e);
    },
  });

  const onKeyUp = usePersistFn((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      context.needTriggerEnter = false;
    };
    props.onKeyUp?.(e);
    keyHandler(e);
  });

  const inputProps = getInputProps({
    className: classNames(inputStyle?.input),
    onKeyUp,
  });

  const inputElProps = util.removeProps(inputProps, { formName: undefined })
  let inputEl = <input type='text' {...inputElProps} />;

  if (typeof renderInput === 'function') {
    inputEl = renderInput(inputEl);
  }

  const rootClass = classNames(
    className,
    inputStyle?.rootClass,
    inputStyle?.wrapper,
    !!focused && inputStyle?.wrapperFocus,
    !!disabled && inputStyle?.wrapperDisabled,
    status === 'error' && inputStyle?.wrapperError,
    size === 'small' && inputStyle?.wrapperSmall,
    size === 'large' && inputStyle?.wrapperLarge,
    !!underline && inputStyle?.wrapperUnderline,
    !border && inputStyle?.wrapperNoBorder,
    hasSuffix && inputStyle?.password,
    showClearFromProp && inputStyle?.wrapperShowClear,
    showClearFromProp && (inputElProps.value !== undefined && inputElProps.value !== null && inputElProps.value !== '') && inputStyle?.wrapperHasValue,
  );

  return (
    <div
      id={fieldId}
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
        {(showClearFromProp || showClearFromClearable) && (
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

Input.displayName = 'SimpleInput';
export default Input;
