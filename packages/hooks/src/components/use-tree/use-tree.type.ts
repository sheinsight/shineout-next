import { ObjectType, KeygenType } from '../../common/type';

export interface BaseTreeProps<DataItem = ObjectType> {
  data: DataItem[];
  keygen: KeygenType<DataItem>;
  childrenKey?: string;
}
