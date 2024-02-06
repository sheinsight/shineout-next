import { CommonType } from '../common/type';
import { BaseTransferProps, ObjectKey, KeygenResult, useListSelectMultiple } from '@sheinx/hooks';
import { ButtonClasses } from '../button/button.type';
import { CheckboxClasses } from '../checkbox/checkbox.type';
import { InputClasses } from '../input/input.type';
import { SpinClasses } from '../spin/spin.type';
import { EmptyClasses } from '../empty/empty.type';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ListDatum<DataItem, Value extends KeygenResult[]> = ReturnType<
  typeof useListSelectMultiple<DataItem, Value>
>;

export interface TransferClasses {
  transfer: string;
  small: string;
  large: string;
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
  count: string;
  list: string;
  footer: string;
  item: string;
  disabled: string;
  itemWrapper: string;
  checkbox: string;
  empty: string;
  emptyDescription: string;
}

export type JssStyleType = {
  transfer: () => TransferClasses;
  button: () => ButtonClasses;
  checkbox: () => CheckboxClasses;
  input: () => InputClasses;
  spin: () => SpinClasses;
  empty: () => EmptyClasses;
};

export interface FilterProps {
  text?: string;
  disabled: boolean;
  onFilter?: (text: string) => void;
  placeholder?: string;
  isSrouce?: boolean;
}

export interface CustomRenderProps<Value extends KeygenResult[]> {
  onSelected: (data: KeygenResult[]) => void;
  /**
   * @deprecated 请使用 listType 属性判断是否为源或目标列表
   */
  direction: 'left' | 'right';
  listType: 'source' | 'target';
  selectedKeys: KeygenResult[];
  value: Value;
  filterText?: string;
}

export interface TransferProps<DataItem, Value extends KeygenResult[]>
  extends Omit<BaseTransferProps<DataItem, Value>, 'valueControl' | 'selectControl'>,
    Pick<CommonType, 'size' | 'style' | 'className'> {
  jssStyle: JssStyleType;
  selectedKeys?: KeygenResult[];
  listHeight?: number;
  lineHeight?: number;
  renderItem?: ObjectKey<DataItem> | ((data: DataItem) => React.ReactNode);
  simple?: boolean;
  itemClass?: string;
  empty?: React.ReactNode;
  rowsInView?: number;
  listClassName?: string;
  listStyle?: React.CSSProperties;
  titles?: [React.ReactNode, React.ReactNode];
  footers?: [React.ReactNode, React.ReactNode];
  operations?: [React.ReactNode, React.ReactNode];
  operationIcon?: boolean;
  loading?: boolean | [boolean, boolean];
  searchPlaceholder?: string | [string, string];
  renderFilter?: (filterProps: FilterProps) => React.ReactNode;
  onFilter?: (text: string, data: DataItem, isSource: boolean) => boolean;
  children?: (props: CustomRenderProps<Value>) => React.ReactNode;
}
