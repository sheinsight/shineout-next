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
  const tooltipStyle = useTooltipStyle();
  return (
    <div>
      <Tooltip jssStyle={{ tooltip: tooltipStyle }} tip={'hello world'}>
        <span>hover me</span>
      </Tooltip>
    </div>
  );
};
