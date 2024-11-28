import React from 'react';
import { InputProps, InputStyle } from '../input/input.type';

export interface MenuSearchClasses {
  rootClass?: string;
  wrapper?: string;
  wrapperDark?: string;
  wrapperLight?: string;
  wrapperCollapsed?: string;
  wrapperDisabled?: string;
  input?: string;
  search?: string;
}

export interface MenuSearchStyle extends InputStyle {
  menuSearch?: () => MenuSearchClasses;
}
export interface MenuSearchProps
  extends Omit<InputProps, 'tip' | 'status' | 'innerTitle' | 'placeTitle' | 'error'> {
  /**
   * @cn 是否折叠
   * @en Whether to collapse
   */
  collapse?: boolean;
  /**
   * @cn 主题
   * @en Theme
   */
  theme?: 'dark' | 'light';
  jssStyle?: MenuSearchStyle;
  /**
   *  @cn 点击事件
   *  @en Click event
   */
  onSearchClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
