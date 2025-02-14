import React from 'react';
import { util } from '@sheinx/hooks';
import SimpleCheckbox from './simple-checkbox';
import { useInputAble, usePersistFn } from '@sheinx/hooks';
import { CheckboxProps } from './checkbox.type';
import GroupContext from './group-context';
import useCheckboxInputable from './use-checkbox-inputable';
import Input from '../input';

const { devUseWarning } = util;

const Checkbox = <T,>(props: CheckboxProps<T>) => {
  const {
    children,
    htmlValue = true as T,
    onChange: onChangePo,
    jssStyle,
    value: valuePo,
    defaultValue: defaultValuePo,
    inputable,
    ...rest
  } = props;
  if (props.inputable) {
    devUseWarning.deprecated('inputable', 'Checkbox + Input', 'Checkbox');
  }

  const checkboxStyle = jssStyle?.checkbox?.();

  let disabled = props.disabled;
  if (htmlValue !== undefined && typeof disabled === 'function') {
    disabled = (disabled as any)(htmlValue);
  }

  const { onChange, value } = useInputAble({
    value: valuePo,
    defaultValue: defaultValuePo,
    onChange: onChangePo,
    control: 'value' in props,
    beforeChange: props.beforeChange,
  });

  // 兼容历史版本的inputable
  const { checked, onInputableCheckboxChange, onInputChange } = useCheckboxInputable({
    value: value,
    onChange: onChange,
    checked: props.checked,
    inputable: props.inputable,
  });

  const handleChange = usePersistFn((checked: boolean) => {
    if (inputable) {
      // 兼容历史版本的inputable
      onInputableCheckboxChange(checked);
      return;
    }

    // 兼容Checkbox在createPortal中使用时，无法改变勾选状态的问题
    if ('value' in props && props.checked === undefined) {
      onInputableCheckboxChange(checked, true);
    }

    if (props.onRawChange) {
      props.onRawChange(checked ? htmlValue : undefined, checked, htmlValue);
    }
    onChange?.(checked ? htmlValue : undefined, checked, htmlValue);
  });

  const getChecked = () => {
    if (typeof checked === 'function') {
      return checked(htmlValue);
    }
    if (typeof checked !== 'undefined') return checked;
    return value === htmlValue;
  };

  const handleInputClick = usePersistFn((e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    props?.onClick?.(e);
  });

  const inputValue = typeof value === 'string' ? value : '';

  return (
    <SimpleCheckbox
      jssStyle={jssStyle}
      {...rest}
      disabled={disabled}
      checked={getChecked()}
      onChange={handleChange}
      renderFooter={(c) => {
        if (inputable && c) {
          // 兼容历史版本的inputable
          return (
            <Input
              jssStyle={jssStyle}
              className={checkboxStyle?.input}
              value={inputValue}
              onChange={onInputChange}
              onClick={handleInputClick}
            />
          );
        }
        return null;
      }}
    >
      {children}
    </SimpleCheckbox>
  );
};

const CheckboxWithContext = <T,>(props: CheckboxProps<T>) => {
  return (
    <GroupContext.Consumer>
      {(value) => (
        <Checkbox
          {...props}
          {...value}
          onRawChange={value.onChange && props.onChange ? props.onChange : undefined}
          checked={'checked' in props ? props.checked : value.checked}
        />
      )}
    </GroupContext.Consumer>
  );
};

export default CheckboxWithContext;
