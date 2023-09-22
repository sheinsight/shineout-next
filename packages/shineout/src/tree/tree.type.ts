import { TreeProps as UnStyledTreeProps } from '@sheinx/base';
export type TreeProps<DataItem> = Omit<UnStyledTreeProps<DataItem>, 'jssStyle'>;
