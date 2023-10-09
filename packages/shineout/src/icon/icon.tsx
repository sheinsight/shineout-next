import { makeIcon } from '@sheinx/base';
import { useIconStyle } from '@sheinx/shineout-style';
import { IconCompProps } from './icon.type';

const jssStyle = {
  icon: useIconStyle,
};
type args = Parameters<typeof makeIcon>;
export default function icon(...args: args) {
  const Comp = makeIcon(...args);
  const ShineoutIcon = (props: IconCompProps) => {
    return <Comp {...props} jssStyle={jssStyle} />;
  };
  ShineoutIcon.displayName = 'ShineoutIcon';
  return ShineoutIcon;
}
