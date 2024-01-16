/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { TreeSelect } from '@sheinx/base';
import { useTreeSelectStyle } from '@sheinx/shineout-style';

const jssStyle = {
  treeSelect: useTreeSelectStyle,
};

export default () => {
  return (
    <div>
      <TreeSelect width={300} jssStyle={jssStyle} />
    </div>
  );
};
