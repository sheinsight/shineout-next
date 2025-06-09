import React, { CSSProperties } from 'react';

export interface CommonType {
  /**
   * @en The status of the component
   * @cn 组件状态
   */
  status?: 'error';
  /**
   * @en The name of the form control, used to control the value of the form control by Form
   * @cn 表单控件的字段名称，用于Form控制表单控件的值
   */
  name?: string;
  /**
   * @en Custom class name
   * @cn 自定义类名
   */
  className?: string;
  /**
   * @en Custom style
   * @cn 自定义样式
   */
  style?: CSSProperties;
  /**
   * @en There are three built-in size: small、default、large.
   * @cn 不同尺寸
   * @override union
   * @default 'default'
   */
  size?: 'small' | 'large' | 'default';
  /**
   * @en inner title
   * @cn 内嵌标题
   */
  innerTitle?: React.ReactNode;
  /**
   * @en Placeholder title, which needs to be used together with innerTitle
   * @cn 占位标题，需要配合 innerTitle 一起使用
   * @private
   */
  placeTitle?: React.ReactNode;
  /**
   * @cn 样式类型
   * @en style type
   */
  iconType: 'success' | 'info' | 'warning' | 'danger' | 'confirmwarning' | 'error' | 'confirm';
  /**
   * @en onChange is not triggered when two selected values are the same
   * @cn 当两次选择的值相同时不触发 onChange
   * @default false
   */
  filterSameChange?: boolean;
}

export interface CommonChangeType<T> {
  /**
   * @en The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component
   * @cn 值改变前的回调，当返回值不为空时将作为组件的新值
   */
  beforeChange?: (value: T) => T | void | undefined;
}

export interface CommonClasses {
  highlight: string;
}
