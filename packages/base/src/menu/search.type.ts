import React from 'react';
import { InputProps, InputStyle } from '../input/input.type';

export interface MenuSearchClasses {
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
  collpase?: boolean;
  theme?: 'dark' | 'light';
  jssStyle?: MenuSearchStyle;
  onSearchClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
