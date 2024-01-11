/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Card } from '@sheinx/base';
import { useCardStyle } from '@sheinx/shineout-style';

const jssStyle = {
  card: useCardStyle,
};

export default () => {
  return (
    <div>
      <Card jssStyle={jssStyle} />
    </div>
  );
};
