import { KeygenResult } from '@sheinx/hooks';
import { DatumType } from '../tree/tree.type';
import { JssStyleType } from './cascader.type';

export interface FilterNodeProps<DataItem, Value extends KeygenResult[]> {
  jssStyle?: JssStyleType;
  data: DataItem[];
  datum: DatumType<DataItem>['datum'];
  shouldFinal: boolean;
  renderItem: (data: DataItem, active?: boolean, id?: Value[0] | undefined) => React.ReactNode;
  setInputText: (text: string) => void;
  setFilterText: (text: string) => void;
  onChange: (item: Value) => void;
  onPathChange: (
    id: KeygenResult,
    item: DataItem | null,
    nextPath: Value,
    fromClick?: boolean,
  ) => void;
}
