export interface BaseCollapseProps {
  defaultActive?: string | string[];
  active?: string | string[];
  accordion?: boolean;
  onChange?: (
    active: string,
    actives: string[],
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
}
