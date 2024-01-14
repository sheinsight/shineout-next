import React from 'react';
import { Grid } from '@sheinx/base';
import { useGridStyle } from '@sheinx/shineout-style';
import { GridProps } from './grid.type';

const jssStyle = {
  grid: useGridStyle,
};
export default (props: GridProps) => {
  return <Grid jssStyle={jssStyle} {...props} />;
};
