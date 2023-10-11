import { ButtonClasses } from '../button/button.type';

export type TransferListType = 'source' | 'target';

export interface TransferClasses {
  transfer: string;
  view: string;
  source: string;
  target: string;
  operations: string;
  left: string;
  right: string;
}

export interface TransferProps<DataItem> {
  jssStyle: {
    transfer: () => TransferClasses;
    button: () => ButtonClasses;
  };
  data: DataItem[];
  children?: React.ReactNode;
}
