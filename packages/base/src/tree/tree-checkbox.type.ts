import { KeygenResult } from '@sheinx/hooks';
import { CommonType } from '../common/type';
import { JsstyleType } from './tree.type';

export interface TreeCheckboxProps<Value extends KeygenResult[]> extends Pick<CommonType, 'className'> {
  jssStyle?: JsstyleType;
  id: KeygenResult;
  disabled?: boolean;
  onChange?: (value: Value, id: KeygenResult) => void;
}
