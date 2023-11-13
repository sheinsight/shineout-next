/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Select } from '@sheinx/base';
import { useSelectStyle } from '@sheinx/shineout-style';

const jssStyle = {
  select: useSelectStyle,
};

export default () => {
  return (
    <div>
      <Select jssStyle={jssStyle} />
    </div>
  );
};
