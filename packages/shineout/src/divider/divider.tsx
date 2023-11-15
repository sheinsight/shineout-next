import { Divider } from '@sheinx/base';
import { useDividerStyle } from '@sheinx/shineout-style';
import { DividerProps } from './divider.type';

const jssStyle = {
  divider: useDividerStyle,
};
export default (props: DividerProps) => {
  return <Divider jssStyle={jssStyle} {...props} />;
};
