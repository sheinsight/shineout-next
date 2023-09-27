export type TabsShapeType = 'button' | 'line' | 'bordered' | 'card' | 'dash' | 'fill';

export interface BaseTabsProps {
  active?: number | string;
  defaultActive?: number | string;
  onChange?: (key: number | string) => void;
}
