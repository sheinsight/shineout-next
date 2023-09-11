import { useMemo } from 'react';
import { Tooltip } from '@sheinx/base';
import { useTooltipStyle } from '@sheinx/shineout-style';
import { TooltipProps } from './tooltip.type';

export default (props: TooltipProps) => {
  const {} = props;
  const tooltipStyle = useTooltipStyle();
  const jssStyle = useMemo(() => ({ tooltip: tooltipStyle }), [tooltipStyle]);

  return <Tooltip {...props} jssStyle={jssStyle} />;
};
