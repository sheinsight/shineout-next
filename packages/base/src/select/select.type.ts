// import React from 'react';
// import { BaseSelectProps } from '@sheinx/hooks';
import { CommonType } from '../common/type';
import { AbsoluteListProps } from '../absolute-list/absolute-list.type';
import { SelectClasses } from '@sheinx/shineout-style';
import { InnerTitleClasses } from '../common/use-inner-title';

export type JssStyleType = {
  select: () => SelectClasses;
  innerTitle?: () => InnerTitleClasses;
};

export interface BaseListProps<DataItem, Value>
  extends Pick<
    SelectProps<DataItem, Value>,
    'jssStyle' | 'data' | 'height' | 'width' | 'optionWidth' | 'header' | 'loading'
  > {
  customHeader?: React.ReactNode;
}

export interface SelectProps<DataItem, Value>
  extends Pick<CommonType, 'className' | 'style' | 'size' | 'status' | 'innerTitle'>,
    Pick<AbsoluteListProps, 'absolute' | 'zIndex'> {
  jssStyle?: JssStyleType;
  data: DataItem[];
  treeData?: DataItem[];
  value?: Value;
  /**
   * @en Allow enter something into DatePicker
   * @cn 可输入
   * @default false
   */
  inputable?: boolean;

  /**
   * @en If clearable is true, show clear value icon
   * @cn  是否显示清除数据图标
   * @default true
   */
  clearable?: boolean;

  /**
   * @en placeholder text
   * @cn 占位文字
   */
  placeholder?: string;

  /**
   * @en When it is true, a default [Spin](/components/Spin) component will be displayed, a custom loading icon can be passed in to replace.
   * @cn 数据加载中，为true时会展示一个默认的 [Spin](/components/Spin) 组件，可以传入一个自定义的Spin代替
   * @override boolean | ReactNode
   * @default false
   */
  loading?: boolean | React.ReactNode;

  /**
   * @en Custom render option list header
   * @cn 自定义渲染列表头部内容
   */
  header?: React.ReactNode;

  /**
   * @deprecated
   */
  border?: boolean;

  /**
   * @en only display border bottom
   * @cn 是否只展示下边框
   * @default false
   */
  underline?: boolean;

  /**
   * @en Set visible of datepicker popup
   * @cn 控制浮层显隐
   */
  open?: boolean;

  /**
   * @cn 选择框的宽度
   * @en custom width
   */
  width?: number | string;

  /**
   * @cn 下拉列表的高度
   * @en custom width
   */
  height?: number | string;

  /**
   * @cn 下拉列表的宽度
   * @en custom width
   * @default 100%
   */
  optionWidth?: number | string;

  /**
   * @en Set Position can control the different position of DatePicker
   * @cn 弹出框位置
   */
  // position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  position?: 'auto' | 'bottom-left' | 'top-left';

  /**
   * @en Option columns.
   * @cn columns 大于 1 时，选项展示为多列布局模式
   * @default 1
   */
  columns?: number;

  /**
   * @en blur event callback
   * @cn blur 事件回调
   */
  onBlur?: (e: any) => void;

  /**
   * @en focus event callback
   * @cn focus 事件回调
   */
  onFocus?: (e: any) => void;
}
