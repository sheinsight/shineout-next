/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Sticky } from '@sheinx/base';
import { useStickyStyle } from '@sheinx/shineout-style';

const jssStyle = {
  sticky: useStickyStyle,
};

export default () => {
  return (
    <div>
      <Sticky jssStyle={jssStyle} />
    </div>
  );
};
