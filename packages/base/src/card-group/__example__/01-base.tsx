/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { CardGroup } from '@sheinx/base';
import { useCardGroupStyle } from '@sheinx/shineout-style';

const jssStyle = {
  cardGroup: useCardGroupStyle,
};

export default () => {
  return (
    <div>
      <CardGroup jssStyle={jssStyle} />
    </div>
  );
};
