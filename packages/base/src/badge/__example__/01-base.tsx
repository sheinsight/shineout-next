/**
* cn - 基本用法
*    --
* en - Basic
*    --
 */
import React from 'react';
import { Badge } from '@sheinx/base';
import { useBadgeStyle } from '@sheinx/shineout-style';

const jssStyle = {
  badge: useBadgeStyle
}

export default () => {
  return (
    <div>
      <Badge jssStyle={jssStyle} />
    </div>
  );
};
