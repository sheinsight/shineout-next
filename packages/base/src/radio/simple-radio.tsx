import { useCheck, util } from '@sheinx/hooks';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { SimpleRadioProps, RadioSemanticKey } from './radio.type';
import { FormFieldContext } from '../form/form-field-context';
import { useSemantic } from '../common/use-semantic';
import { useConfig } from '../config';

const Radio = (props: SimpleRadioProps) => {
  const { jssStyle, className, style, children, renderWrapper, size, theme, verticalAlign, classNames: classNamesProp, styles: stylesProp, ...rest } = props;
  const mouseEvents = util.extractProps(rest, 'mouse');
  const { fieldId } = useContext(FormFieldContext);
  const config = useConfig();
  const radioClasses = jssStyle?.radio?.();

  const [semClass, semStyle] = useSemantic<RadioSemanticKey>(
    classNamesProp,
    stylesProp,
    config.radio,
  );

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
    verticalAlign === 'top' && radioClasses?.wrapperTop,
    semClass('root', []),
  ]);

  const indicatorClass = classNames(
    radioClasses?.indicatorWrapper,
    theme === 'dark' && radioClasses?.darkIndicatorWrapper,
    semClass('indicator', []),
  );

  const inputProps = getInputProps();
  const rootProps = {
    ...mouseEvents,
    ...getRootProps({
      className: rootClass,
      style: style ? { ...style, ...semStyle('root') } : semStyle('root'),
      needStopPropagation: true,
    }),
  };
  const indicatorProps = getIndicatorProps();

  const indicator = (
    <>
      <input {...inputProps} type='radio' />
      <span className={indicatorClass} style={semStyle('indicator')}>
        <span {...indicatorProps} className={radioClasses?.indicator} />
      </span>
    </>
  );

  const simpleRadio = (
    <div id={fieldId} {...rootProps}>
      {indicator}
      <span className={classNames(radioClasses?.desc, semClass('label', []))} style={semStyle('label')}>{children}</span>
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
