import { JssStyleType } from './cascader.type';

export interface FilterNodeProps<DataItem> {
  jssStyle?: JssStyleType;
  data: DataItem;
}
