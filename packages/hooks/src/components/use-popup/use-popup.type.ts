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
  trigger?: 'click' | 'hover' | 'none' | 'focus';
  open?: boolean;
  defaultOpen?: boolean;
  onCollapse?: (open: boolean) => void;
  disabled?: boolean;
  position?: PositionType | 'auto';
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  autoMode?: 'menu' | 'popover';
  priorityDirection?: 'vertical' | 'horizontal' | 'auto';
  targetEvents?: {
    onClick?: (e: { target: EventTarget | null }) => void;
    onMouseEnter?: (e: { target: EventTarget | null }) => void;
    onMouseLeave?: (e: { target: EventTarget | null }) => void;
  };
}
