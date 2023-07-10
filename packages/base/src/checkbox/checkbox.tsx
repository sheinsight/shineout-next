import React from 'react';
import SimpleCheckbox from './simple-checkbox';
import { useInputAble, usePersistFn } from '@sheinx/hooks';
import { CheckboxProps } from './checkbox.type';
import GroupContext from './group-context';

const Checkbox = <T,>(props: CheckboxProps<T>) => {
  const {
    children,
    htmlValue = true as T,
    onChange: onChangePo,
    checked,
    jssStyle,
    value: valuePo,
    defaultValue: defaultValuePo,
    ...rest
  } = props;

  const { onChange } = useInputAble({
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
    return checked;
  };
  return (
    <SimpleCheckbox jssStyle={jssStyle} {...rest} checked={getChecked()} onChange={handleChange}>
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
