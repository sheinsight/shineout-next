/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Spin } from '@sheinx/base';
import { useSpinStyle } from '@sheinx/shineout-style';

export default () => {
  const spinStyle = useSpinStyle();

  const jssStyle = {
    spin: spinStyle,
  };

  return (
    <div>
      <Spin jssStyle={jssStyle} name='fading-circle' size={40} />
    </div>
  );
};
