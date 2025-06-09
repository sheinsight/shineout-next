import { KeygenResult } from '@sheinx/hooks';
import { CommonType } from '../common/type';
import { JsstyleType } from './tree.type';

export interface TreeCheckboxProps extends Pick<CommonType, 'className'> {
  jssStyle?: JsstyleType;
  id: KeygenResult;
  disabled?: boolean;
  checked: boolean | "indeterminate";
  onChange?: (_: any, checked: boolean) => void;
  size?: 'small' | 'default' | 'large';
}
