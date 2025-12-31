import { useCheck, util } from '@sheinx/hooks';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { SimpleRadioProps } from './radio.type';
import { FormFieldContext } from '../form/form-field-context';

const Radio = (props: SimpleRadioProps) => {
  const { jssStyle, className, style, children, renderWrapper, size, theme, ...rest } = props;
  const mouseEvents = util.extractProps(rest, 'mouse');
  const { fieldId } = useContext(FormFieldContext);
  const radioClasses = jssStyle?.radio?.();
  const { getRootProps, getIndicatorProps, getInputProps, disabled, checked } = useCheck({
    ...rest,
  });
  const rootClass = clsx([
    radioClasses?.rootClass,
    radioClasses?.wrapper,
    className,
    !!disabled && radioClasses?.wrapperDisabled,
    !!checked && radioClasses?.wrapperChecked,
    size === 'small' && radioClasses?.wrapperSmall,
    size === 'large' && radioClasses?.wrapperLarge,
  ]);

  const indicatorClass = clsx(
    radioClasses?.indicatorWrapper,
    theme === 'dark' && radioClasses?.darkIndicatorWrapper,
  );

  const inputProps = getInputProps();
  const rootProps = {
    ...mouseEvents,
    ...getRootProps({
      className: rootClass,
      style,
      needStopPropagation: true,
    }),
  };
  const indicatorProps = getIndicatorProps();

  const indicator = (
    <>
      <input {...inputProps} type='radio' />
      <span className={indicatorClass}>
        <span {...indicatorProps} className={radioClasses?.indicator} />
      </span>
    </>
  );

  const simpleRadio = (
    <div id={fieldId} {...rootProps}>
      {indicator}
      <span className={radioClasses?.desc}>{children}</span>
    </div>
  );

  if (typeof renderWrapper === 'function') {
    return renderWrapper({
      content: simpleRadio,
      wrapperProps: rootProps,
      indicator,
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
