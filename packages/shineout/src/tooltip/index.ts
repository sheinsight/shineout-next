import Tooltip from './tooltip';

type RefTooltip = typeof Tooltip;

export interface TooltipComponent extends RefTooltip {
  displayName: string;
}

const TooltipComp: TooltipComponent = Tooltip as TooltipComponent;

TooltipComp.displayName = 'ShineoutTooltip';

export default TooltipComp;
