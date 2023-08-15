import React from 'react';
import SimpleCheckbox from './simple-checkbox';
import { useInputAble, usePersistFn } from '@sheinx/hooks';
import { CheckboxProps } from './checkbox.type';
import GroupContext from './group-context';
import useCheckboxInputable from './use-checkbox-inputable';
import Input from '../input';

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

  const { onChange, value } = useInputAble({
    value: valuePo,
    defaultValue: defaultValuePo,
    onChange: onChangePo,
    control: 'value' in props,
    beforeChange: undefined,
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
      checked={getChecked()}
      onChange={handleChange}
      renderFooter={(c) => {
        if (inputable && c) {
          // 兼容历史版本的inputable
          return (
            <Input
              jssStyle={jssStyle}
              className={jssStyle?.checkbox?.input}
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
    <GroupContext.Consumer>{(value) => <Checkbox {...props} {...value} />}</GroupContext.Consumer>
  );
};

export default CheckboxWithContext;
