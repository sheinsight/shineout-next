/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Tooltip } from '@sheinx/base';
import { useTooltipStyle } from '@sheinx/shineout-style';

export default () => {
  return (
    <div>
      <Tooltip jssStyle={{ tooltip: useTooltipStyle }} tip={'hello world'}>
        <span>hover me</span>
      </Tooltip>
    </div>
  );
};
