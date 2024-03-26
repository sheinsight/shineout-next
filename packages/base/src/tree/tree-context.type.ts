import { useTree } from '@sheinx/hooks';

export type CheckedStatusType = 0 | 1 | 2;

export type TreeContextProps<DataItem> = ReturnType<typeof useTree<DataItem>>['datum'];

export interface TreeProviderProps<DataItem> {
  children: React.ReactNode;
  value: TreeContextProps<DataItem>;
}
