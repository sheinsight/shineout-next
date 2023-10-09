import { Tooltip } from '@sheinx/base';
import { useTooltipStyle } from '@sheinx/shineout-style';
import { TooltipProps } from './tooltip.type';

const jssStyle = {
  tooltip: useTooltipStyle,
};
export default (props: TooltipProps) => {
  return <Tooltip {...props} jssStyle={jssStyle} />;
};
