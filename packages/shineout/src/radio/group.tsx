import { BaseRadioGroupProps, RadioGroupProps } from './group.type';
import { RadioGroup as UnStyledRadioGroup } from '@sheinx/base';
import { useButtonStyle, useRadioStyle } from '@sheinx/shineout-style';
import useFieldCommon from '../hooks/use-field-common';
import { useMemo } from 'react';

const BaseRadioGroup = <DataItem, Value>(props: BaseRadioGroupProps<DataItem, Value>) => {
  const radioStyle = useRadioStyle();
  const buttonStyle = useButtonStyle();

  const jssStyle = useMemo(
    () => ({
      radio: radioStyle,
      button: buttonStyle,
    }),
    [radioStyle, buttonStyle],
  );
  return <UnStyledRadioGroup {...props} jssStyle={jssStyle} />;
};

const RadioGroupWithField = <DataItem, Value>(props: RadioGroupProps<DataItem, Value>) => {
  return useFieldCommon<
    BaseRadioGroupProps<DataItem, Value>,
    BaseRadioGroupProps<DataItem, Value>['value']
  >(props, BaseRadioGroup);
};

export default RadioGroupWithField;
