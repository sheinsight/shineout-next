import { BaseTransferProps, ObjectKey, KeygenResult } from '@sheinx/hooks';
import { ButtonClasses } from '../button/button.type';
import { CheckboxClasses } from '../checkbox/checkbox.type';
import { InputClasses } from '../input/input.type';
import { VirtualScrollClasses } from '../virtual-scroll/virtual-scroll.type';

export interface TransferClasses {
  transfer: string;
  view: string;
  source: string;
  target: string;
  operations: string;
  input: string;
  left: string;
  right: string;
  header: string;
  list: string;
  footer: string;
  item: string;
  empty: string;
}

export type JssStyleType = {
  transfer: () => TransferClasses;
  button: () => ButtonClasses;
  checkbox: () => CheckboxClasses;
  virtualScroll: () => VirtualScrollClasses;
  input: () => InputClasses;
};

export interface TransferProps<DataItem, Value> extends BaseTransferProps<DataItem, Value> {
  jssStyle: JssStyleType;
  selectedKeys?: KeygenResult[];
  listHeight?: number;
  renderItem?: ObjectKey<DataItem> | ((data: DataItem) => React.ReactNode);
  empty?: React.ReactNode;
  onFilter?: (text: string, data: DataItem, isSource: boolean) => boolean;
}
