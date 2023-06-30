import React, { useState, cloneElement, useRef } from 'react';
import classNames from 'classnames';

const useAutoSize = (props: {
  autosize?: boolean;
  maxHeight?: number | string;
  value?: string;
  jssStyle: {
    shadow: string;
  };
}) => {
  const { autosize, maxHeight, value, jssStyle } = props || {};
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
            className: classNames(el.props.className, jssStyle.shadow),
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
