/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Cascader } from '@sheinx/base';
import { useCascaderStyle } from '@sheinx/shineout-style';

const jssStyle = {
  cascader: useCascaderStyle,
};

export default () => {
  return (
    <div>
      <Cascader jssStyle={jssStyle} />
    </div>
  );
};
