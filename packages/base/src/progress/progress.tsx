import React from 'react';
import { ProgressProps } from './progress.type';
import Line from './line';
import Circle from './circle';

const Progress = (props: ProgressProps) => {
  const { shape = 'line' } = props;

  if (shape.indexOf('circle') > -1) {
    return <Circle {...props} />;
  }

  return <Line {...props} />;
};

export default Progress;
