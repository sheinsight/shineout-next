import { BaseTransferProps, ObjectKey, KeygenResult } from '@sheinx/hooks';
import { ButtonClasses } from '../button/button.type';
import { CheckboxClasses } from '../checkbox/checkbox.type';
import { InputClasses } from '../input/input.type';
import { VirtualScrollClasses } from '../virtual-scroll/virtual-scroll.type';

export interface TransferClasses {
  transfer: string;
  simple: string;
  view: string;
  source: string;
  target: string;
  close: string;
  removeAll: string;
  simpleTarget: string;
  operations: string;
  input: string;
  left: string;
  right: string;
  header: string;
  title: string;
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
  simple?: boolean;
  empty?: React.ReactNode;
  titles?: [React.ReactNode, React.ReactNode];
  footers?: [React.ReactNode, React.ReactNode];
  onFilter?: (text: string, data: DataItem, isSource: boolean) => boolean;
}
