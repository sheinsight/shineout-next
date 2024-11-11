import { useCheck, useInputAble } from '@sheinx/hooks';
import classNames from 'classnames';
import React from 'react';
import { SwitchProps } from './switch.type';
import { useConfig } from '../config';
import useWithFormConfig from '../common/use-with-form-config';

const Switch = (props0: SwitchProps) => {
  const props = useWithFormConfig(props0);
  const { jssStyle, content, size, loading, className, style } = props;
  const config = useConfig();
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

  const rootClassName = classNames(
    className,
    switchClasses?.rootClass,
    switchClasses?.wrapper,
    !!checked && switchClasses?.wrapperChecked,
    disabled && switchClasses?.wrapperDisabled,
    size === 'small' && switchClasses?.wrapperSmall,
    size === 'large' && switchClasses?.wrapperLarge,
  );

  const rootProps = getRootProps({ className: rootClassName, style });
  const inputProps = getInputProps();

  return (
    <button type={'button'} role={'switch'} {...rootProps}>
      <input {...inputProps} type={'checkbox'} />
      <div className={switchClasses?.indicator} dir={config.direction}>
        {loading ? <div className={switchClasses?.loading} /> : null}
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
