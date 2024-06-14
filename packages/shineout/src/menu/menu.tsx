import React from 'react';
import { Menu } from '@sheinx/base';
import { useMenuStyle, usePopoverStyle } from '@sheinx/shineout-style';
import { MenuProps } from './menu.type';

import type { KeygenResult } from '@sheinx/hooks';

const jssStyle = {
  menu: useMenuStyle,
  popover: usePopoverStyle,
};
export default <DataItem, Key extends KeygenResult = KeygenResult>(
  props: MenuProps<DataItem, Key>,
) => {
  return <Menu jssStyle={jssStyle} {...props} />;
};
