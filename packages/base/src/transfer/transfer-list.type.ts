import { TransferClasses } from './transfer.type';

export interface TransferListProps<DataItem> {
  jssStyle: {
    transfer: () => TransferClasses;
  };
  data: DataItem[];
}
