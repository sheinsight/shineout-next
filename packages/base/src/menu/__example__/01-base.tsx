/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Menu } from '@sheinx/base';
import { useMenuStyle } from '@sheinx/shineout-style';

const jssStyle = {
  menu: useMenuStyle,
};

export default () => {
  return (
    <div>
      <Menu jssStyle={jssStyle} />
    </div>
  );
};
