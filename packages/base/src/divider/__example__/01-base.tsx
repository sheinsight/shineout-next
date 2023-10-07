/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Divider } from '@sheinx/base';
import { useDividerStyle } from '@sheinx/shineout-style';

export default () => {
  const dividerStyle = useDividerStyle();
  return (
    <div>
      <Divider jssStyle={{ divider: dividerStyle }} />
    </div>
  );
};
