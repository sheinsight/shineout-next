import type { KeygenResult } from '../../common/type';

export interface UseMenuProps {
  data: any[];
  active?: (dataItem: any) => boolean;
  defaultOpenKeys?: KeygenResult[];
  openKeys?: KeygenResult[];
  onOpenChange?: (openKeys: KeygenResult[]) => void;
}

export interface UseMenuItemProps {
  keyResult: KeygenResult;
  openKeys?: KeygenResult[];
  onOpenChange: (cb: (before: KeygenResult[]) => KeygenResult[]) => void;
  bindUpdate: (id: string, update: UpdateFunc) => void;
  unbindUpdate: (id: string) => void;
  dataItem: any;
  parentId?: string;
  changeActiveId: (id: string) => void;
  looseChildren?: boolean;
  parentSelectable?: boolean;
  mode?: 'inline' | 'vertical' | 'horizontal' | 'vertical-auto';
  disabled?: boolean | ((dataItem: any) => boolean);
  onClick?: (dataItem: any) => void;
  toggleDuration?: number;
}

export type UpdateFunc = (
  getStatus: (
    id: string,
    d: any,
  ) => {
    isChecked: boolean;
    isInPath: boolean;
  },
) => void;
