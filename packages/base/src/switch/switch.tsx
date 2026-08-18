import { useCheck, useInputAble, util } from '@sheinx/hooks';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { SwitchProps, SwitchSemanticKey } from './switch.type';
import { useConfig } from '../config';
import Icons from '../icons';
import useWithFormConfig from '../common/use-with-form-config';
import { FormFieldContext } from '../form/form-field-context';
import { useSemantic } from '../common/use-semantic';

const Switch = (props0: SwitchProps) => {
  const props = useWithFormConfig(props0);
  const { jssStyle, content, size, loading, className, style, classNames: classNamesProp, styles: stylesProp, ...rest } = props;
  const mouseEvents = util.extractProps(rest, 'mouse');
  const config = useConfig();
  const { fieldId } = useContext(FormFieldContext);
  const switchClasses = jssStyle?.switch?.();
  const disabled = props.disabled || props.loading;

  const [semClass, semStyle] = useSemantic<SwitchSemanticKey>(
    classNamesProp,
    stylesProp,
    config.switch,
  );

  const { value, onChange } = useInputAble({
    value: props.value,
    onChange: props.onChange,
    defaultValue: props.defaultValue,
    control: 'value' in props,
    beforeChange: props.beforeChange,
  });

  const getChecked = () => {
    if (props.checked !== undefined) {
      return props.checked;
    }
    return !!value;
  };

  const { getInputProps, getRootProps, checked } = useCheck({
    checked: getChecked(),
    onChange: onChange,
    onClick: props.onClick,
    disabled: disabled,
    inputRef: props.inputRef,
  });

  const [checkedContent, unCheckedContent] = content || [];

  const rootClassName = classNames(
    className,
    switchClasses?.rootClass,
    switchClasses?.wrapper,
    !!checked && switchClasses?.wrapperChecked,
    disabled && switchClasses?.wrapperDisabled,
    size === 'small' && switchClasses?.wrapperSmall,
    size === 'large' && switchClasses?.wrapperLarge,
    semClass('root'),
  );

  const rootProps = {
    ...mouseEvents,
    ...getRootProps({ className: rootClassName, style: style ? { ...style, ...semStyle('root') } : semStyle('root') }),
  };
  const inputProps = getInputProps();

  return (
    <button type={'button'} role={'switch'} id={fieldId} {...rootProps}>
      <input {...inputProps} type={'checkbox'} />
      <div className={classNames(switchClasses?.indicator, semClass('indicator'))} style={semStyle('indicator')} dir={config.direction}>
        {loading ? <div className={switchClasses?.loading}>{Icons.switch.Loading}</div> : null}
      </div>
      <div className={classNames(switchClasses?.content, semClass('content'))} style={semStyle('content')}>
        <div className={switchClasses?.textPadding}>
          {checked ? checkedContent : unCheckedContent}
        </div>
      </div>
    </button>
  );
};

export default Switch;
