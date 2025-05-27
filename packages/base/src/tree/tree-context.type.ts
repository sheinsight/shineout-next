import { useTree } from '@sheinx/hooks';
import { TreeProps } from './tree.type';

export type CheckedStatusType = 0 | 1 | 2;

export type TreeContextProps<DataItem> = ReturnType<typeof useTree<DataItem>>['datum'] & Pick<TreeProps<DataItem, any>, 'size' | 'leafIcon' | 'highlightFilter'>;

export interface TreeProviderProps<DataItem> {
  children: React.ReactNode;
  value: TreeContextProps<DataItem>;
}
