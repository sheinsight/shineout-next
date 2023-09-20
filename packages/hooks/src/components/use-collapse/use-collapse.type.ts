export interface BaseCollapseProps {
  defaultActive?: string | string[];
  active?: string | string[];
  accordion?: boolean;
  onChange?: (active: string, actives: string[], e: React.ChangeEvent<Element>) => void;
}
