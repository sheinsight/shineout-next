import React from 'react';
import type { CommonType } from '../common/type';
import type { BaseDescriptionsProps, DescriptionsItemProps } from '@sheinx/hooks';

export interface DescriptionsClasses {
  rootClass: string;
  /**
   * 最外层class
   */
  wrapper: string;
  header: string;
  title: string;
  extra: string;
  body: string;
  table: string;
  row: string;
  label: string;
  value: string;
  border: string;
  tableLayoutFixed: string;
  item: string;
  labelInline: string;
  valueInline: string;
  inlineHorizontal: string;
  horizontal: string;
  vertical: string;
  cell: string;
  small: string;
  large: string;
}

export interface DescriptionsProps
  extends Pick<CommonType, 'className' | 'style' | 'size'>,
    BaseDescriptionsProps {
  jssStyle?: {
    descriptions: () => DescriptionsClasses;
  };
  /**
   * @en Whether to show the border
   * @cn 是否显示边框
   * @default false
   */
  border?: boolean;
  /**
   * @en Extended content
   * @cn 扩展内容
   */
  extra?: React.ReactNode;
  /**
   * @en The title of the description
   * @cn 描述标题
   */
  title?: React.ReactNode;
  /**
   * @en The layout of the description
   * @cn 排列方式
   * @default 'inlineHorizontal'
   */
  layout?: 'horizontal' | 'vertical' | 'inlineHorizontal' | 'inlineVertical';
  /**
   * @en The colon after the label
   * @cn 标签后面的内容
   */
  colon?: React.ReactNode;
  /**
   * @en The content inside the description
   * @cn 表格样式的layout-fixed,当设置为fixed时,宽度会被均分
   * @default 'auto'
   */
  tableLayout?: 'auto' | 'fixed';
}

export type ItemType = DescriptionsItemProps
