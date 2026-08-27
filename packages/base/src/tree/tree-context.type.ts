import { useTree } from '@sheinx/hooks';
import { TreeProps, TreeSemanticKey } from './tree.type';
import type { SemanticClassFn, SemanticStyleFn } from '../common/use-semantic';

export type CheckedStatusType = 0 | 1 | 2;

export type TreeContextProps<DataItem> = ReturnType<typeof useTree<DataItem>>['datum'] & Pick<TreeProps<DataItem, any>, 'size' | 'leafIcon'> & {
  semClass?: SemanticClassFn<TreeSemanticKey>;
  semStyle?: SemanticStyleFn<TreeSemanticKey>;
};

export interface TreeProviderProps<DataItem> {
  children: React.ReactNode;
  value: TreeContextProps<DataItem>;
}
