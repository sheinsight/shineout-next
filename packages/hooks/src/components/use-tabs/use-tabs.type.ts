export type TabsShapeType = 'button' | 'line' | 'bordered' | 'card' | 'dash';

export interface BaseTabsProps {
  active?: number | string;
  onChange?: (key: number | string) => void;
}
