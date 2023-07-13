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
    jssStyle.wrapper,
    className,
    {
      [jssStyle.wrapperDisabled]: disabled,
      [jssStyle.wrapperError]: status === 'error',
      [jssStyle.wrapperChecked]: checked,
    },
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
      <i {...getIndicatorProps()} className={jssStyle.indicator} />
      <span className={jssStyle.desc}>{children}</span>
    </div>
  );
};

export default Radio;
