import { useCheck, useInputAble, util } from '@sheinx/hooks';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { SwitchProps } from './switch.type';
import { useConfig } from '../config';
import Icons from '../icons';
import useWithFormConfig from '../common/use-with-form-config';
import { FormFieldContext } from '../form/form-field-context';

const Switch = (props0: SwitchProps) => {
  const props = useWithFormConfig(props0);
  const { jssStyle, content, size, loading, className, style, ...rest } = props;
  const mouseEvents = util.extractProps(rest, 'mouse');
  const config = useConfig();
  const { fieldId } = useContext(FormFieldContext);
  const switchClasses = jssStyle?.switch?.();
  const disabled = props.disabled || props.loading;

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

  const rootClassName = clsx(
    className,
    switchClasses?.rootClass,
    switchClasses?.wrapper,
    !!checked && switchClasses?.wrapperChecked,
    disabled && switchClasses?.wrapperDisabled,
    size === 'small' && switchClasses?.wrapperSmall,
    size === 'large' && switchClasses?.wrapperLarge,
  );

  const rootProps = {
    ...mouseEvents,
    ...getRootProps({ className: rootClassName, style }),
  };
  const inputProps = getInputProps();

  return (
    <button type={'button'} role={'switch'} id={fieldId} {...rootProps}>
      <input {...inputProps} type={'checkbox'} />
      <div className={switchClasses?.indicator} dir={config.direction}>
        {loading ? <div className={switchClasses?.loading}>{Icons.switch.Loading}</div> : null}
      </div>
      <div className={switchClasses?.content}>
        <div className={switchClasses?.textPadding}>
          {checked ? checkedContent : unCheckedContent}
        </div>
      </div>
    </button>
  );
};

export default Switch;
