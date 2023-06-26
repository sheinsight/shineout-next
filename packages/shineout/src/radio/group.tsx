import { BaseRadioGroupProps, RadioGroupProps } from './group.type';
import { RadioGroup as UnStyledRadioGroup } from '@sheinx/base';
import { useRadioStyle } from '@sheinx/shineout-style';
import useFieldCommon from '../hooks/use-field-common';

const BaseRadioGroup = <DataItem, Value>(props: BaseRadioGroupProps<DataItem, Value>) => {
  const jssStyle = useRadioStyle();
  return <UnStyledRadioGroup {...props} jssStyle={jssStyle} />;
};

const RadioGroupWithField = <DataItem, Value>(props: RadioGroupProps<DataItem, Value>) => {
  return useFieldCommon<
    BaseRadioGroupProps<DataItem, Value>,
    BaseRadioGroupProps<DataItem, Value>['value']
  >(props, BaseRadioGroup);
};

export default RadioGroupWithField;
