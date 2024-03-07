import { Gap } from '@sheinx/base';
import { useGapStyle } from '@sheinx/shineout-style';
import { GapProps } from './gap.type';

export default (props: GapProps) => {
  const jssStyle = {
    gap: useGapStyle,
  };
  return <Gap jssStyle={jssStyle} {...props} />;
};
