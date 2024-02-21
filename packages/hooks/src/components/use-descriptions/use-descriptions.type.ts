import React from 'react';

export interface DescriptionsItemProps {
  /**
   * @private 内部属性
   */
  key?: React.Key;
  /**
   * @en Data label
   * @cn 数据标签
   */
  label?: React.ReactNode;
  /**
   * @en Data value
   * @cn 数据值
   */
  value?: React.ReactNode;
  /**
   * @en The number of columns occupied
   * @cn 占据的列数
   */
  span?: number;
  /**
   * @en The style of the current data label
   * @cn 当前数据标签样式
   */
  itemLabelStyle?: React.CSSProperties;
  /**
   * @en The style of the current data value
   * @cn 当前数据值样式
   */
  itemValueStyle?: React.CSSProperties;
}
export interface BaseDescriptionsProps {
  /**
   * @en Descriptions array
   * @cn 描述项数组,描述项对象结构见下
   * @override ItemType[]
   */
  items?: DescriptionsItemProps[];
  /**
   * @en Label style
   * @cn 标签样式
   */
  labelStyle?: React.CSSProperties;
  /**
   * @en Value style
   * @cn 值样式
   */
  valueStyle?: React.CSSProperties;
  /**
   * @en The number of columns placed in each row, one data is one column, it can be configured as a number or an object, when configured as an object format, responsive arrangement is supported
   * @cn 每行放置的列的数量，一个数据为一列，可配置为数字或对象，当配置为对象格式时，支持响应式排列
   * @default 3
   */
  column?:
    | number
    | {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        xxl?: number;
        xxxl?: number;
      };
}
