import { useCheck, useInputAble } from '@sheinx/hooks';
import classNames from 'classnames';
import React from 'react';
import { SwitchProps } from './switch.type';

const Switch = (props: SwitchProps) => {
  const { jssStyle, content, size, loading, className, style } = props;
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
      <div className={switchClasses?.indicator}>
        {loading ? <div className={switchClasses?.loading} /> : null}
      </div>
      <div className={switchClasses?.content}>{checked ? checkedContent : unCheckedContent}</div>
    </button>
  );
};

export default Switch;
