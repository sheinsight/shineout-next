import { KeygenResult } from '@sheinx/hooks';
import { DatumType } from '../tree/tree.type';
import { JssStyleType, CascaderProps, CascaderSemanticKey } from './cascader.type';
import type { SemanticClassFn, SemanticStyleFn } from '../common/use-semantic';

export interface FilterNodeProps<DataItem, Value extends KeygenResult[]>
  extends Pick<CascaderProps<DataItem, Value>, 'mode'> {
  jssStyle?: JssStyleType;
  data: DataItem[];
  datum: DatumType<DataItem>['datum'];
  shouldFinal: boolean;
  isRealtime?: boolean;
  renderItem: (data: DataItem, active?: boolean, id?: Value[0] | undefined) => React.ReactNode;
  setInputText: (text: string) => void;
  setFilterText: (text: string) => void;
  onChange: (item: Value, selected?: DataItem) => void;
  onPathChange: (
    id: KeygenResult,
    item: DataItem | null,
    nextPath: Value,
    fromClick?: boolean,
  ) => void;
  semClass?: SemanticClassFn<CascaderSemanticKey>;
  semStyle?: SemanticStyleFn<CascaderSemanticKey>;
}
