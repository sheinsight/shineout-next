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
  return (
    <div>
      <Spin jssStyle={{ spin: spinStyle }} />
    </div>
  );
};
