/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Carousel } from '@sheinx/base';
import { useCarouselStyle } from '@sheinx/shineout-style';

export default () => {
  return (
    <div>
      <Carousel jssStyle={{ carousel: useCarouselStyle }} />
    </div>
  );
};
