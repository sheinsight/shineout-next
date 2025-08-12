import { Switch as UnStyleSwitch } from '@sheinx/base';
import { useSwitchStyle } from '@sheinx/shineout-style';
import { BaseSwitchProps, SwitchProps } from './switch.type';
import useFieldCommon from '../hooks/use-field-common';

const jssStyle = {
  switch: useSwitchStyle,
};

const Switch = (props: BaseSwitchProps) => {
  return <UnStyleSwitch jssStyle={jssStyle} {...props} />;
};

export default (props: SwitchProps) => {
  return useFieldCommon(props, Switch);
};
