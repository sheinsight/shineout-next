import { useMemo } from 'react';
import { Switch as UnStyleSwitch } from '@sheinx/base';
import { useSwitchStyle } from '@sheinx/shineout-style';
import { BaseSwitchProps, SwitchProps } from './switch.type';
import useFieldCommon from '../hooks/use-field-common';

const BaseSwitch = (props: BaseSwitchProps) => {
  const {} = props;
  const switchStyle = useSwitchStyle();
  const jssStyle = useMemo(() => ({ switch: switchStyle }), [switchStyle]);

  return <UnStyleSwitch jssStyle={jssStyle} {...props} />;
};

export default (props: SwitchProps) => {
  return useFieldCommon<BaseSwitchProps, BaseSwitchProps['value']>(props, BaseSwitch);
};
