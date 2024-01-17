export interface BaseCollapseItemContext {
  active: string | string[];
  triggerRegion?: 'icon' | 'header' | 'disabled';
  onChange: (newActive: string, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export interface BaseCollapseItemProps {
  keygen: string;
  disabled?: boolean;
}

export type BaseCollapseType = BaseCollapseItemContext & BaseCollapseItemProps;
