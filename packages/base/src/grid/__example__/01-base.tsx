/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Grid } from '@sheinx/base';
import { useGridStyle } from '@sheinx/shineout-style';

const jssStyle = {
  grid: useGridStyle,
};

export default () => {
  return (
    <div>
      <Grid jssStyle={jssStyle} />
    </div>
  );
};
