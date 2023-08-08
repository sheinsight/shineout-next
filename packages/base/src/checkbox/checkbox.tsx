import React from 'react';
import SimpleCheckbox from './simple-checkbox';
import { useInputAble, usePersistFn } from '@sheinx/hooks';
import { CheckboxProps } from './checkbox.type';
import GroupContext from './group-context';
import Input from '../input';

const Checkbox = <T,>(props: CheckboxProps<T>) => {
  const {
    children,
    htmlValue = true as T,
    onChange: onChangePo,
    checked,
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
  const handleChange = usePersistFn((checked: boolean) => {
    onChange?.(checked ? htmlValue : (undefined as T), checked, htmlValue);
  });

  const getChecked = () => {
    if (typeof checked === 'function') {
      return checked(htmlValue);
    }
    if (typeof checked === 'boolean') return checked;
    return value === htmlValue;
  };

  const handleInputChange = usePersistFn((val: string | undefined = '') => {
    onChange?.(val as T, val?.length > 0, htmlValue);
  });

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
          return (
            <Input
              jssStyle={jssStyle}
              className={jssStyle?.checkbox?.input}
              value={inputValue}
              onChange={handleInputChange}
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
