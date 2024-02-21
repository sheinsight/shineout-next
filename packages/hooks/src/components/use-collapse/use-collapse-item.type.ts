export interface BaseCollapseItemContext {
  /**
   * @en The currently expanded panel, controlled
   * @cn 当前展开的面板,受控
   */
  active: string | string[];
  /**
   * @en The region that triggers the collapse
   * @cn 触发展开折叠的区域
   */
  triggerRegion?: 'icon' | 'header' | 'disabled';
  onChange: (newActive: string, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export interface BaseCollapseItemProps {
  /**
   * @en The key of the panel
   * @cn 面板的key，唯一标识
   */
  keygen: string;
  /**
   * @en Whether to disable
   * @cn 是否禁用
   * @default false
   */
  disabled?: boolean;
}

export type BaseCollapseType = BaseCollapseItemContext & BaseCollapseItemProps;
