import { BaseRadioGroupProps, RadioGroupProps } from './group.type';
import { RadioGroup as UnStyledRadioGroup } from '@sheinx/base';
import { useButtonStyle, useRadioStyle } from '@sheinx/shineout-style';
import useFieldCommon from '../hooks/use-field-common';

const jssStyle = {
  radio: useRadioStyle,
  button: useButtonStyle,
};
const RadioGroup = <DataItem, Value>(props: BaseRadioGroupProps<DataItem, Value>) => {
  return <UnStyledRadioGroup {...props} jssStyle={jssStyle} />;
};

const RadioGroupWithField = <DataItem, Value>(props: RadioGroupProps<DataItem, Value>) => {
  return useFieldCommon(props, RadioGroup<DataItem, Value>, 'array');
};

export default RadioGroupWithField;
