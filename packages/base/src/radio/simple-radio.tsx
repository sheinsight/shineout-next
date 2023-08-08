import { useCheck } from '@sheinx/hooks';
import classNames from 'classnames';
import React from 'react';
import { SimpleRadioProps } from './radio.type';

const Radio = (props: SimpleRadioProps) => {
  const { jssStyle, className, style, children, renderRadio, ...rest } = props;
  const { getRootProps, getIndicatorProps, getInputProps, disabled, checked } = useCheck({
    ...rest,
  });
  const rootClass = classNames([
    jssStyle?.radio?.wrapper,
    className,
    !!disabled && jssStyle?.radio?.wrapperDisabled,
    !!checked && jssStyle?.radio?.wrapperChecked,
  ]);

  const inputProps = getInputProps();
  const rootProps = getRootProps({
    className: rootClass,
    style,
  });
  const indicatorProps = getIndicatorProps();

  const simpleRadio = (
    <div {...rootProps}>
      <input {...inputProps} type='radio' />
      <div className={jssStyle?.radio?.indicatorWrapper}>
        <i {...indicatorProps} className={jssStyle?.radio?.indicator} />
      </div>
      <span className={jssStyle?.radio?.desc}>{children}</span>
    </div>
  );

  if (typeof renderRadio === 'function') {
    return renderRadio({
      content: simpleRadio,
      rootProps,
      indicatorProps,
      inputProps,
      disabled,
      checked,
      children,
    });
  }

  return simpleRadio;
};

export default Radio;
