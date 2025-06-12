import { KeygenResult, UnMatchedData, ObjectKey } from '@sheinx/hooks';
import { DatumType } from '../tree/tree.type';
import { JssStyleType, CascaderProps } from './cascader.type';

export interface CascaderNodeProps<DataItem, Value extends KeygenResult[]>
  extends Pick<
    CascaderProps<DataItem, Value>,
    'loader' | 'multiple' | 'expandTrigger' | 'renderItem' | 'keygen' | 'mode'
  > {
  data: DataItem;
  active: boolean;
  childrenKey: ObjectKey<DataItem>;
  id: KeygenResult;
  parentId: KeygenResult;
  jssStyle?: JssStyleType;
  datum: DatumType<DataItem>['datum'];
  shouldFinal: boolean;
  path: Value;
  onPathChange: (
    id: KeygenResult,
    item: DataItem | null,
    nextPath: Value,
    fromClick?: boolean,
  ) => void;
  onChange: (value: Value, data?: DataItem | UnMatchedData | null) => void;
  activeLeaf?: KeygenResult;
  setActiveLeaf?: (id: KeygenResult) => void;
}
