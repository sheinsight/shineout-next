import { BaseCheckboxGroupProps, CheckboxGroupProps } from './group.type';
import { CheckboxGroup as UnStyledCheckboxGroup } from '@sheinx/base';
import { useCheckboxStyle, useInputStyle } from '@sheinx/shineout-style';
import useFieldCommon from '../hooks/use-field-common';

const jssStyle = {
  checkbox: useCheckboxStyle,
  input: useInputStyle,
};
const CheckboxGroup = <DataItem, Value extends any[]>(
  props: BaseCheckboxGroupProps<DataItem, Value>,
) => {
  return <UnStyledCheckboxGroup {...props} jssStyle={jssStyle} />;
};

const CheckboxGroupWithField = <DataItem, Value extends any[]>(
  props: CheckboxGroupProps<DataItem, Value>,
) => {
  return useFieldCommon(props, CheckboxGroup<DataItem, Value>, 'array');
};

export default CheckboxGroupWithField;
