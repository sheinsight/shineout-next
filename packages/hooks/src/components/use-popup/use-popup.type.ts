export type PositionType =
  | 'left-top'
  | 'left-bottom'
  | 'right-top'
  | 'right-bottom'
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'left'
  | 'right'
  | 'top'
  | 'bottom';

export interface BasePopupProps {
  trigger?: 'click' | 'hover';
  open?: boolean;
  onCollapse?: (open: boolean) => void;
  disabled?: boolean;
  position?: PositionType | 'auto';
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  autoMode?: 'menu' | 'popover';
  priorityDirection?: 'vertical' | 'horizontal' | 'auto';
}
