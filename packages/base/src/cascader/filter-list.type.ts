import { KeygenResult } from '@sheinx/hooks';
import { DatumType } from '../tree/tree.type';
import { JssStyleType, CascaderProps } from './cascader.type';

export interface FilterListProps<DataItem, Value extends KeygenResult[]>
  extends Pick<CascaderProps<DataItem, Value>, 'renderOptionList' | 'loading'> {
  jssStyle?: JssStyleType;
  data: DataItem[];
  datum: DatumType<DataItem, KeygenResult>['datum'];
  filterDataChange: (data: DataItem) => boolean
}
