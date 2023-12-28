import { MenuProps as UnStyledMenuProps } from '@sheinx/base';
import { KeygenResult } from '@sheinx/hooks';

export type MenuProps<DataItem, key extends KeygenResult> = Omit<
  UnStyledMenuProps<DataItem, key>,
  'jssStyle'
>;
