import { useCheck, useInputAble } from '@sheinx/hooks';
import classNames from 'classnames';
import React from 'react';
import { SwitchProps } from './switch.type';

const Switch = (props: SwitchProps) => {
  const { jssStyle, content, size, loading } = props;

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
    return value;
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
    jssStyle?.switch?.wrapper,
    !!checked && jssStyle?.switch?.wrapperChecked,
    disabled && jssStyle?.switch?.wrapperDisabled,
    size === 'small' && jssStyle?.switch?.wrapperSmall,
    size === 'large' && jssStyle?.switch?.wrapperLarge,
  );

  const rootProps = getRootProps({ className: rootClassName });
  const inputProps = getInputProps();

  return (
    <button type={'button'} role={'switch'} {...rootProps}>
      <input {...inputProps} type={'checkbox'} />
      <div className={jssStyle?.switch?.indicator}>
        {loading ? <div className={jssStyle?.switch?.loading} /> : null}
      </div>
      <div className={jssStyle?.switch?.content}>{checked ? checkedContent : unCheckedContent}</div>
    </button>
  );
};

export default Switch;
