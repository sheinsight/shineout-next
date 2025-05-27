import { KeygenResult, ObjectKey } from '@sheinx/hooks';
import { DatumType } from '../tree/tree.type';
import { JssStyleType, CascaderProps } from './cascader.type';

export interface CascaderListProps<DataItem, Value extends KeygenResult[]>
  extends Pick<
    CascaderProps<DataItem, Value>,
    | 'loader'
    | 'multiple'
    | 'expandTrigger'
    | 'renderItem'
    | 'keygen'
    | 'mode'
    | 'size'
    | 'height'
    | 'virtual'
  > {
  jssStyle?: JssStyleType;
  id: KeygenResult;
  parentId: KeygenResult;
  data: DataItem[];
  datum: DatumType<DataItem>['datum'];
  shouldFinal: boolean;
  path: Value;
  childrenKey: ObjectKey<DataItem>;
  onPathChange: (
    id: KeygenResult,
    item: DataItem | null,
    nextPath: Value,
    fromClick?: boolean,
  ) => void;
  onChange: (item: Value) => void;
}
