import { MenuProps as UnStyledMenuProps } from '@sheinx/base';
import { KeygenResult } from '@sheinx/hooks';

/**
 * @title Menu
 */
export type MenuProps<DataItem, key extends KeygenResult> = Omit<
  UnStyledMenuProps<DataItem, key>,
  'jssStyle'
>;
