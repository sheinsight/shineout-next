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
}
