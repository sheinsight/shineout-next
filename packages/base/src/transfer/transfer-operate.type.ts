import { KeygenResult, TransferListType } from '@sheinx/hooks';
import { JssStyleType } from './transfer.type';

export interface TransferOperateProps<DataItem> {
  jssStyle: JssStyleType;
  listType: TransferListType;
  datum?: any;
  children?: React.ReactNode;
  className?: string;
  value: KeygenResult[];
  operation?: React.ReactNode;
  onChange: (value: KeygenResult[], currentData: DataItem | DataItem[], isTarget: boolean) => void;
}
