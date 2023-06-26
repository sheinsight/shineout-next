import { RadioGroupProps } from './group.type';
import { RadioGroup as UnStyledRadioGroup } from '@sheinx/base';
import { useRadioStyle } from '@sheinx/shineout-style';

const BaseRadioGroup = <DataItem, Value>(props: RadioGroupProps<DataItem, Value>) => {
  const jssStyle = useRadioStyle();
  return <UnStyledRadioGroup {...props} jssStyle={jssStyle} />;
};

export default BaseRadioGroup;
