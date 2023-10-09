import { Switch as UnStyleSwitch } from '@sheinx/base';
import { useSwitchStyle } from '@sheinx/shineout-style';
import { BaseSwitchProps, SwitchProps } from './switch.type';
import useFieldCommon from '../hooks/use-field-common';

const jssStyle = {
  switch: useSwitchStyle,
};

const BaseSwitch = (props: BaseSwitchProps) => {
  return <UnStyleSwitch jssStyle={jssStyle} {...props} />;
};

export default (props: SwitchProps) => {
  return useFieldCommon<BaseSwitchProps, BaseSwitchProps['value']>(props, BaseSwitch);
};
