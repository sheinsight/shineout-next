/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Popover } from '@sheinx/base';
import { usePopoverStyle } from '@sheinx/shineout-style';

export default () => {
  const popoverStyle = usePopoverStyle();
  return (
    <div>
      <Popover jssStyle={{ popover: popoverStyle }} />
    </div>
  );
};
