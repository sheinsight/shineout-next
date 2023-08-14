import { Switch } from '@sheinx/base';
import { useSwitchStyle } from '@sheinx/shineout-style';
import { SwitchProps } from './switch.type';

export default (props: SwitchProps) => {
  const {} = props;
  const switchStyle = useSwitchStyle();
  const jssStyle = useMemo(() => ({ switch: switchStyle }), [switchStyle]);

  return (
    <Switch
      jssStyle={jssStyle}
      // ...
    />
  );
};
