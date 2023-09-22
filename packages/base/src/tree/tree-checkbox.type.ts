import { KeygenResult } from '@sheinx/hooks';
import { CommonType } from '../common/type';
import { SpinClasses } from '../spin/spin.type';
import { CheckboxClasses } from '../checkbox/checkbox.type';
import { TreeClasses } from './tree.type';

export interface TreeCheckboxProps<DataItem> extends Pick<CommonType, 'className'> {
  jssStyle?: {
    tree?: TreeClasses;
    spin?: SpinClasses;
    checkbox?: CheckboxClasses;
  };
  id: KeygenResult;
  disabled?: boolean | ((item: DataItem) => boolean);
  onChange?: (value: KeygenResult[], id: KeygenResult) => void;
}
