import { KeygenResult } from '@sheinx/hooks';
import { CommonType } from '../common/type';
import { JsstyleType } from './tree.type';

export interface TreeCheckboxProps<DataItem> extends Pick<CommonType, 'className'> {
  jssStyle: JsstyleType;
  id: KeygenResult;
  disabled?: boolean | ((item: DataItem) => boolean);
  onChange?: (value: KeygenResult[], id: KeygenResult) => void;
}
