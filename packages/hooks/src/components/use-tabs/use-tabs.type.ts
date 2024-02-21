export type TabsShapeType = 'button' | 'line' | 'bordered' | 'card' | 'dash' | 'fill';

export interface BaseTabsProps {
  /**
   * @en Current active tab id or index
   * @cn 当前选中标签页（受控）
   */
  active?: number | string;
  /**
   * @en Default active tab id or index
   * @cn 默认选中标签页（非受控）
   */
  defaultActive?: number | string;
  onChange?: (key: number | string) => void;
}
