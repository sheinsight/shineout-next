/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Tree } from '@sheinx/base';
import { useTreeStyle } from '@sheinx/shineout-style';

export default () => {
  const tooltipStyle = useTreeStyle();
  return (
    <div>
      <Tree jssStyle={{ tree: tooltipStyle }}></Tree>
    </div>
  );
};
