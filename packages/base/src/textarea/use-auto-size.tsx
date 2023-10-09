import React, { cloneElement, useRef, useState } from 'react';
import classNames from 'classnames';
import { TextareaClasses } from './textarea.type';

const useAutoSize = (props: {
  autosize?: boolean;
  maxHeight?: number | string;
  value?: string;
  jssStyle?: {
    textarea?: () => TextareaClasses;
  };
}) => {
  const { autosize, maxHeight, value, jssStyle } = props || {};
  const textareaClasses = jssStyle?.textarea?.() || ({} as TextareaClasses);
  const [height, setHeight] = useState<number>();
  const shadowRef = useRef<HTMLTextAreaElement>();

  const resetHeight = (value?: string) => {
    if (!shadowRef.current) return;
    const v = value || '';
    if (shadowRef.current.value !== v) shadowRef.current.value = v;
    setHeight(shadowRef.current.scrollHeight);
  };

  React.useEffect(() => {
    resetHeight(value);
  }, [value, shadowRef.current]);

  const renderInput = (el: React.ReactElement) => {
    if (autosize)
      return (
        <>
          {cloneElement(el, {
            style: {
              height,
              overflow: 'auto',
              maxHeight,
            },
            onChange: (...args: any) => {
              el.props.onChange(...args);
              resetHeight(args[0].target.value);
            },
          })}
          {cloneElement(el, {
            className: classNames(el.props.className, textareaClasses?.shadow),
            ref: shadowRef,
            key: 'shadow',
          })}
        </>
      );
    return el;
  };
  return renderInput;
};

export default useAutoSize;
