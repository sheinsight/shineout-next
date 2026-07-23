import React from 'react';
import { util } from '@sheinx/hooks';
import { ProgressProps, ProgressClassNamesInfo, ProgressSemanticKey } from './progress.type';
import { useSemantic } from '../common';
import { useConfig } from '../config';
import Line from './line';
import Circle from './circle';

const { devUseWarning } = util;

const Progress = (props: ProgressProps) => {
  const { shape = 'line', value = 0, type = 'info' } = props;
  const config = useConfig();

  if (props.popup) {
    devUseWarning.deprecated('popup', 'shape="line-pop"', 'Progress');
  }

  // Semantic DOM
  const globalSemanticConfig = config.progress
    ? { classNames: config.progress.classNames, styles: config.progress.styles }
    : undefined;

  const semInfo: ProgressClassNamesInfo = { value, type, shape };

  const [semClass, semStyle] = useSemantic<ProgressSemanticKey, ProgressClassNamesInfo>(
    props.classNames,
    props.styles,
    globalSemanticConfig,
    semInfo,
  );

  if (shape.indexOf('circle') > -1) {
    return <Circle {...props} semClass={semClass} semStyle={semStyle} />;
  }

  return <Line {...props} semClass={semClass} semStyle={semStyle} />;
};

export default Progress;
