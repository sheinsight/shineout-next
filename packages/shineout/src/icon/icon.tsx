import { makeIcon } from '@sheinx/base';
import { useIconStyle } from '@sheinx/shineout-style';
import { IconCompProps } from './icon.type';

type args = Parameters<typeof makeIcon>;
export default function icon(...args: args) {
  const Comp = makeIcon(...args);
  const ShineoutIcon = (props: IconCompProps) => {
    const style = useIconStyle();
    return <Comp {...props} jssStyle={style} />;
  };
  ShineoutIcon.displayName = 'ShineoutIcon';
  return ShineoutIcon;
}
