import { KeygenResult } from '@sheinx/hooks';
import { DatumType } from '../tree/tree.type';
import { JssStyleType, CascaderProps } from './cascader.type';

export interface FilterListProps<DataItem, Value extends KeygenResult[]>
  extends Pick<
    CascaderProps<DataItem, Value>,
    | 'renderOptionList'
    | 'loading'
    | 'wideMatch'
    | 'childrenKey'
    | 'virtual'
    | 'keygen'
    | 'size'
    | 'mode'
    | 'highlight'
  > {
  jssStyle?: JssStyleType;
  data: DataItem[];
  datum: DatumType<DataItem>['datum'];
  height: number;
  filterFunc?: (data: DataItem) => boolean;
  shouldFinal: boolean;
  renderItem: (data: DataItem, active?: boolean, id?: Value[0] | undefined) => React.ReactNode;
  onChange: (item: Value) => void;
  onPathChange: (
    id: KeygenResult,
    item: DataItem | null,
    nextPath: Value,
    fromClick?: boolean,
  ) => void;
  isRealtime?: boolean;
  setInputText: (text: string) => void;
  setFilterText: (text: string) => void;
}
