import { useCheck, util } from '@sheinx/hooks';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { SimpleRadioProps } from './radio.type';
import { FormFieldContext } from '../form/form-field-context';

const Radio = (props: SimpleRadioProps) => {
  const { jssStyle, className, style, children, renderWrapper, size, theme, ...rest } = props;
  const nativeProps = util.extractNativeProps(rest);
  const { fieldId } = useContext(FormFieldContext);
  const radioClasses = jssStyle?.radio?.();
  const { getRootProps, getIndicatorProps, getInputProps, disabled, checked } = useCheck({
    ...rest,
  });
  const rootClass = classNames([
    radioClasses?.rootClass,
    radioClasses?.wrapper,
    className,
    !!disabled && radioClasses?.wrapperDisabled,
    !!checked && radioClasses?.wrapperChecked,
    size === 'small' && radioClasses?.wrapperSmall,
    size === 'large' && radioClasses?.wrapperLarge,
  ]);

  const indicatorClass = classNames(
    radioClasses?.indicatorWrapper,
    theme === 'dark' && radioClasses?.darkIndicatorWrapper,
  );

  const inputProps = getInputProps();
  const rootProps = {
    ...nativeProps,
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
