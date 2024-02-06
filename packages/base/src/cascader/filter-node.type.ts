import { KeygenResult, UnMatchedData } from '@sheinx/hooks';
import { DatumType } from '../tree/tree.type';
import { JssStyleType } from './cascader.type';

export interface FilterNodeProps<DataItem, Value extends KeygenResult[]> {
  jssStyle?: JssStyleType;
  data: DataItem[];
  datum: DatumType<DataItem, KeygenResult>['datum'];
  shouldFinal: boolean;
  renderItem: (data: DataItem, active?: boolean, id?: Value[0] | undefined) => React.ReactNode;
  onChange: (item: (UnMatchedData | DataItem)[]) => void;
  onPathChange: (
    id: KeygenResult,
    item: DataItem | null,
    nextPath: Value,
    fromClick?: boolean,
  ) => void;
}
