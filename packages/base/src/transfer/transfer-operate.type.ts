import { CommonType } from '../common/type';
import { KeygenResult, TransferListType } from '@sheinx/hooks';
import { JssStyleType, ListDatum } from './transfer.type';

export interface TransferOperateProps<DataItem, Value extends KeygenResult[]>
  extends Pick<CommonType, 'size'> {
  jssStyle: JssStyleType;
  listType: TransferListType;
  datum: ListDatum<DataItem, Value>;
  listDatum: ListDatum<DataItem, Value>;
  children?: React.ReactNode;
  className?: string;
  value: KeygenResult[];
  operation?: React.ReactNode;
}
