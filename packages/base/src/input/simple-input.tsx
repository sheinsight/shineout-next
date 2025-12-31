import { getDataset, useInput, useKeyEvent, usePersistFn, util } from '@sheinx/hooks';
import clsx from 'clsx';
import React, { KeyboardEvent, useContext } from 'react';
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

  const inputStyle = jssStyle?.input?.();
  const config = useConfig();
  const { fieldId } = useContext(FormFieldContext);
  const showClearFromProp = props.showClear && !props.disabled;
  const { getRootProps, getClearProps, getInputProps, showClear: showClearFromClearable, focused, disabled } = useInput({
    ...rest,
    onFocusedChange,
  });

  const keyHandler = useKeyEvent<HTMLInputElement>({
    onEnterPress: (e) => {
      onEnterPress?.(e.target.value || '', e);
    },
  });

  const onKeyUp = usePersistFn((e: KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement }) => {
    props.onKeyUp?.(e);
    keyHandler(e);
  });

  const inputProps = getInputProps({
    className: clsx(inputStyle?.input),
    onKeyUp,
  });

  const datasetProps = getDataset(props);
  const inputElProps = util.removeProps(inputProps, { formName: undefined, ...datasetProps })
  let inputEl = <input type='text' {...inputElProps} />;

  if (typeof renderInput === 'function') {
    inputEl = renderInput(inputEl);
  }

  const rootClass = clsx(
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
    showClearFromProp && !util.isEmpty(inputElProps.value) && inputStyle?.wrapperHasValue,
  );

  return (
    <div
      id={fieldId}
      {...util.getDataAttribute({ ['input-border']: 'true' })}
      {...datasetProps}
      {...getRootProps({
        className: rootClass,
        style,
      })}
    >
      <div
        className={clsx(
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
