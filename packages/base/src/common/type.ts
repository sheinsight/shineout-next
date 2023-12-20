import React, { CSSProperties } from 'react';

export interface CommonType {
  status?: 'error';
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
   */
  placeTitle?: React.ReactNode;
  /**
   * @cn 样式类型
   * @en style type
   */
  iconType: 'success' | 'info' | 'warning' | 'danger' | 'confirmwarning' | 'error' | 'confirm';
}

export interface CommonChangeType<T> {
  /**
   * @en The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component
   * @cn 值改变前的回调，当返回值不为空时将作为组件的新值
   */
  beforeChange?: (value: T) => T | void | undefined;
}
