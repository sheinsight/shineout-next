/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Collapse } from '@sheinx/base';
import { useCollapseStyle } from '@sheinx/shineout-style';

export default () => {
  const collapseStyle = useCollapseStyle();
  return (
    <div>
      <Collapse jssStyle={{ collapse: collapseStyle }} />
    </div>
  );
};
