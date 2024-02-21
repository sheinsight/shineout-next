import type { BaseCollapseItemContext } from './use-collapse-item.type';
export interface BaseCollapseProps extends Partial<Pick<BaseCollapseItemContext, 'active'>> {
  /**
   * @en The default expanded panel
   * @cn 默认展开的面板
   */
  defaultActive?: string | string[];
  /**
   * @en Whether to enable accordion mode
   * @cn 是否开启手风琴模式
   * @default false
   */
  accordion?: boolean;
  /**
   * @en Callback triggered when the expanded panel changes
   * @cn 展开面板改变时触发回调
   */
  onChange?: (
    active: string,
    actives: string[],
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
}
