import React from 'react';
import { CommonType } from '../common/type';

export interface DividerClasses {
  rootClass: string;
  /**
   * 最外层class
   */
  wrapper: string;
  wrapperDashed: string;
  vertical: string;
  horizontal: string;
  withText: string;
  withTextCenter: string;
  withTextLeft: string;
  withTextRight: string;
  innerText: string;
}

export interface DividerProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: {
    divider: () => DividerClasses;
  };
  /**
   * @en Content, text or react component
   * @cn 分割线中文字内容
   */
  children?: React.ReactNode;

  /**
   * @en mode of divider
   * @cn 分割线排布模式
   * @default "horizontal"
   */
  mode?: 'horizontal' | 'vertical';

  /**
   * @en The position of title inside divider
   * @cn 水平分割线的文字排布位置
   * @default "center"
   */
  orientation?: 'center' | 'left' | 'right';

  /**
   * @en border type
   * @cn 线段类型
   * @default "solid"
   */
  type?: 'solid' | 'dashed';
}
