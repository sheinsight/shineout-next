import { useCheck } from '@sheinx/hooks';
import classNames from 'classnames';
import React from 'react';
import { SimpleRadioProps } from './radio.type';

const Radio = (props: SimpleRadioProps) => {
  const { jssStyle, className, style, status, children, ...rest } = props;
  const { getRootProps, getIndicatorProps, getInputProps, disabled, checked } = useCheck({
    ...rest,
  });
  const rootClass = classNames([
    jssStyle?.radio?.wrapper,
    className,
    !!disabled && jssStyle?.radio?.wrapperDisabled,
    status === 'error' && jssStyle?.radio?.wrapperError,
    !!checked && jssStyle?.radio?.wrapperChecked,
  ]);

  const inputProps = getInputProps();

  return (
    <div
      {...getRootProps({
        className: rootClass,
        style,
      })}
    >
      <input {...inputProps} type='radio' />
      <div className={jssStyle?.radio?.indicatorWrapper}>
        <i {...getIndicatorProps()} className={jssStyle?.radio?.indicator} />
      </div>
      <span className={jssStyle?.radio?.desc}>{children}</span>
    </div>
  );
};

export default Radio;
