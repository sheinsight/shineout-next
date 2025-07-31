import { useKeyEvent, usePersistFn, useTextarea, util } from '@sheinx/hooks';
import classNames from 'classnames';
import React, { KeyboardEvent, useContext, useEffect } from 'react';
import { SimpleTextareaProps } from './textarea.type';
import { FormFieldContext } from '../form/form-field-context';
import Icons from '../icons';

const Textarea = (props: SimpleTextareaProps) => {
  const {
    jssStyle,
    className,
    style,
    status,
    size,
    prefix,
    suffix,
    underline,
    autosize,
    border = true,
    resize = false,
    onEnterPress,
    onStatusChange,
    renderTextarea,
    limit,
    clearable,
    ...rest
  } = props;
  const textareaClasses = jssStyle?.textarea?.();
  const { getRootProps, getTextAreaProps, focused, disabled } = useTextarea({
    ...rest,
  });
  const { fieldId } = useContext(FormFieldContext);

  const rootClass = classNames(
    className,
    textareaClasses?.rootClass,
    textareaClasses?.wrapper,
    !!focused && textareaClasses?.wrapperFocus,
    !!disabled && textareaClasses?.wrapperDisabled,
    status === 'error' && textareaClasses?.wrapperError,
    size === 'small' && textareaClasses?.wrapperSmall,
    size === 'large' && textareaClasses?.wrapperLarge,
    !!underline && textareaClasses?.wrapperUnderline,
    !border && textareaClasses?.wrapperNoBorder,
  );

  const keyHandler = useKeyEvent({
    onEnterPress: (e: KeyboardEvent) => {
      onEnterPress?.((e.target as HTMLTextAreaElement).value || '', e);
    },
  });

  const onKeyUp = usePersistFn((e: KeyboardEvent<HTMLTextAreaElement>) => {
    props.onKeyUp?.(e);
    keyHandler(e);
  });

  const textareaProps = getTextAreaProps({
    className: classNames(
      textareaClasses?.wrapperPaddingBox,
      textareaClasses?.wrapperInnerTitleBottom,
      textareaClasses?.textarea,
      (!!resize || autosize) && textareaClasses?.resize,
    ),
    onKeyUp,
  });

  useEffect(() => {
    if (onStatusChange) {
      onStatusChange({ focused });
    }
  }, [focused]);

  const textareaElProps = util.removeProps(textareaProps, { formName: undefined })
  let textareaEl = <textarea {...textareaElProps} />;

  if (typeof renderTextarea === 'function') {
    textareaEl = renderTextarea(textareaEl);
  }

  let limitEl = null;
  if (limit) {
    limitEl = (
      <div className={textareaClasses?.limit}>
        {typeof limit === 'number' ? `${props.value?.length || 0}/${limit}` : limit(props.value)}
      </div>
    );
  }

  let clearEl = null;
  if (clearable && props.value) {
    clearEl = (
      <div
        className={textareaClasses?.clear}
        onClick={() => {
          props.onChange?.('');
        }}
      >
        {Icons.textarea.Close}
      </div>
    );
  }

  return (
    <div
      id={fieldId}
      {...util.getDataAttribute({ ['input-border']: 'true' })}
      {...getRootProps({
        className: rootClass,
        style,
      })}
    >
      {prefix}
      {textareaEl}
      {suffix}
      {limitEl}
      {clearEl}
    </div>
  );
};

export default Textarea;
