import { useCheck } from '@sheinx/hooks';
import classNames from 'classnames';
import React from 'react';
import { SimpleRadioProps } from './radio.type';
import icons from '../icons';

const Radio = (props: SimpleRadioProps) => {
  const { jssStyle, className, style, children, renderRadio, size, ...rest } = props;
  const radioClasses = jssStyle?.radio?.();
  const { getRootProps, getIndicatorProps, getInputProps, disabled, checked } = useCheck({
    ...rest,
  });
  const rootClass = classNames([
    radioClasses?.wrapper,
    className,
    !!disabled && radioClasses?.wrapperDisabled,
    !!checked && radioClasses?.wrapperChecked,
    size === 'small' && radioClasses?.wrapperSmall,
    size === 'large' && radioClasses?.wrapperLarge,
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
      <span className={radioClasses?.indicatorWrapper}>
        <span {...indicatorProps} className={radioClasses?.indicator}>
          {checked ? icons.RadioChecked : icons.RadioUnChecked}
        </span>
      </span>
      <span className={radioClasses?.desc}>{children}</span>
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
