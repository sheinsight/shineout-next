import React from 'react';
import { util } from '@sheinx/hooks';
import { ProgressProps } from './progress.type';
import Line from './line';
import Circle from './circle';

const { devUseWarning } = util;

const Progress = (props: ProgressProps) => {
  const { shape = 'line' } = props;

  if (props.popup) {
    devUseWarning.deprecated('popup', 'shape="line-pop"', 'Progress');
  }

  if (shape.indexOf('circle') > -1) {
    return <Circle {...props} />;
  }

  return <Line {...props} />;
};

export default Progress;
