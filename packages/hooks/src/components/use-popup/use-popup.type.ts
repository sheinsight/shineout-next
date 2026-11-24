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
   * @en Whether to close the popup when pressing ESC key (only effective when trigger is 'click')
   * @cn 是否支持 ESC 键关闭弹出层（仅在 trigger 为 'click' 时生效）
   */
  esc?: boolean;
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
   * @en Popup location priority, default is top and bottom priority, only valid when position is not set
   * @cn 弹出位置优先级, 默认为上下优先, 只在未设置 position 时生效
   * @default 'vertical'
   */
  priorityDirection?: 'vertical' | 'horizontal' | 'auto';
  /**
   * @en The container where the popup is rendered. When set, the auto position is calculated within the container's visible area instead of the viewport
   * @cn 弹出层渲染的容器。设置后，自动位置按容器可见区域计算，而不是按视口计算
   */
  container?: HTMLElement | null | (() => HTMLElement | null);
  targetEvents?: {
    onClick?: (e: { target: EventTarget | null }) => void;
    onMouseEnter?: (e: { target: EventTarget | null }) => void;
    onMouseLeave?: (e: { target: EventTarget | null }) => void;
  };
}
