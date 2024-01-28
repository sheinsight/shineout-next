import { KeygenResult, UnMatchedData } from '@sheinx/hooks';
import { DatumType } from '../tree/tree.type';
import { JssStyleType, CascaderProps } from './cascader.type';

export interface CascaderListProps<DataItem, Value extends KeygenResult[]>
  extends Pick<
    CascaderProps<DataItem, Value>,
    'loader' | 'childrenKey' | 'multiple' | 'expandTrigger' | 'renderItem' | 'keygen'
  > {
  id: KeygenResult;
  parentId: KeygenResult;
  jssStyle?: JssStyleType;
  data: DataItem[];
  datum: DatumType<DataItem, KeygenResult>['datum'];
  shouldFinal: boolean;
  path: Value;
  onPathChange: (
    id: KeygenResult,
    item: DataItem | null,
    nextPath: Value,
    fromClick?: boolean,
  ) => void;
  onChange: (item: (DataItem | UnMatchedData)[]) => void;
}
