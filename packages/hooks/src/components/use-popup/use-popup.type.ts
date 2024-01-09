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

//  | 'trigger'
// | 'disabled'
// | 'position'
// | 'priorityDirection'
// | 'mouseEnterDelay'
// | 'mouseLeaveDelay'
export interface BasePopupProps {
  trigger?: 'click' | 'hover' | 'focus';
  open?: boolean;
  defaultOpen?: boolean;
  onCollapse?: (open: boolean) => void;
  disabled?: boolean;
  /**
   * @en The position of the pop-up layer
   * @cn 弹出层位置
   * @default 'auto'
   */
  position?: PositionType | 'auto';
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  autoMode?: 'menu' | 'popover';
  /**
   * @en Popup location priority, default is left and right priority, only valid when position is not set
   * @cn 弹出位置优先级, 默认为上下优先, 只在未设置 position 时生效
   * @default 'vertical'
   */
  priorityDirection?: 'vertical' | 'horizontal' | 'auto';
  targetEvents?: {
    onClick?: (e: { target: EventTarget | null }) => void;
    onMouseEnter?: (e: { target: EventTarget | null }) => void;
    onMouseLeave?: (e: { target: EventTarget | null }) => void;
  };
}
