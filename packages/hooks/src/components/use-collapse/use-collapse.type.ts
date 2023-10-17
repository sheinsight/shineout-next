import type { BaseCollapseItemContext } from './use-collapse-item.type';
export interface BaseCollapseProps extends Partial<Pick<BaseCollapseItemContext, 'active'>> {
  defaultActive?: string | string[];
  accordion?: boolean;
  onChange?: (
    active: string,
    actives: string[],
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
}
