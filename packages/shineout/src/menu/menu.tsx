import React from 'react';
import { Menu } from '@sheinx/base';
import { useMenuStyle } from '@sheinx/shineout-style';
import { MenuProps } from './menu.type';

const jssStyle = {
  menu: useMenuStyle,
};
export default (props: MenuProps) => {
  return <Menu jssStyle={jssStyle} {...props} />;
};
