/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Select } from '@sheinx/base';
import { useSelectStyle, useInnerTitleStyle } from '@sheinx/shineout-style';

const jssStyle = {
  select: useSelectStyle,
  innerTitle: useInnerTitleStyle,
};

export default () => {
  return (
    <div>
      <Select jssStyle={jssStyle} />
    </div>
  );
};
