import React from 'react';
import { MenuSearch } from '@sheinx/base';
import { useMenuSearchStyle, useInputStyle, usePopoverStyle } from '@sheinx/shineout-style';
import { MenuSearchProps } from './search.type';

const jssStyle = {
  menuSearch: useMenuSearchStyle,
  input: useInputStyle,
  popover: usePopoverStyle,
};
export default (props: MenuSearchProps) => {
  return <MenuSearch jssStyle={jssStyle} {...props} />;
};
