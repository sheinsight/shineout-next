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
    },
  ]);

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
    className: classNames(jssStyle.paddingBox, jssStyle.textarea, {
      [jssStyle.resize]: resize,
    }),
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
