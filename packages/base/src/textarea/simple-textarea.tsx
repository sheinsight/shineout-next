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
  const { getRootProps, getTextAreaProps, focused, disabled } = useTextarea({
    ...rest,
  });

  const rootClass = classNames(
    className,
    jssStyle?.textarea?.wrapper,
    !!focused && jssStyle?.textarea?.wrapperFocus,
    !!disabled && jssStyle?.textarea?.wrapperDisabled,
    status === 'error' && jssStyle?.textarea?.wrapperError,
    size === 'small' && jssStyle?.textarea?.wrapperSmall,
    size === 'large' && jssStyle?.textarea?.wrapperLarge,
    !!underline && jssStyle?.textarea?.wrapperUnderline,
    !border && jssStyle?.textarea?.wrapperNoBorder,
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
      jssStyle?.textarea?.wrapperPaddingBox,
      jssStyle?.textarea?.wrapperInnerTitleBottom,
      jssStyle?.textarea?.textarea,
      !!resize && jssStyle?.textarea?.resize,
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
      data-type='so-input'
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
