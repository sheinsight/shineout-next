import { KeygenResult, TransferListType } from '@sheinx/hooks';
import { JssStyleType } from './transfer.type';

export interface TransferOperateProps {
  jssStyle: JssStyleType;
  listType: TransferListType;
  selectedKeys: KeygenResult[];
  children?: React.ReactNode;
  className?: string;
  onChange: (listType: TransferListType, keys: KeygenResult[]) => void;
}
