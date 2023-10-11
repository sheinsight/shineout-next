import { useKeyEvent, usePersistFn, useTextarea } from '@sheinx/hooks';
import classNames from 'classnames';
import React, { KeyboardEvent, useEffect } from 'react';
import { SimpleTextareaProps } from './textarea.type';

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
    border = true,
    resize = false,
    onEnterPress,
    getStatus,
    renderTextarea,
    ...rest
  } = props;
  const textareaClasses = jssStyle?.textarea?.();
  const { getRootProps, getTextAreaProps, focused, disabled } = useTextarea({
    ...rest,
  });

  const rootClass = classNames(
    className,
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
      !!resize && textareaClasses?.resize,
    ),
    onKeyUp,
  });

  useEffect(() => {
    if (getStatus) {
      getStatus({ focused });
    }
  }, [focused]);

  let textareaEl = <textarea {...textareaProps} />;

  if (typeof renderTextarea === 'function') {
    textareaEl = renderTextarea(textareaEl);
  }

  return (
    <div
      data-soui-type='input'
      {...getRootProps({
        className: rootClass,
        style,
      })}
    >
      {prefix}
      {textareaEl}
      {suffix}
    </div>
  );
};

export default Textarea;
