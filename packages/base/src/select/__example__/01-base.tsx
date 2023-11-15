/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Select } from '@sheinx/base';
import { useSelectStyle, useInnerTitleStyle, useVirtualScrollStyle } from '@sheinx/shineout-style';

const jssStyle = {
  select: useSelectStyle,
  innerTitle: useInnerTitleStyle,
  virtualScroll: useVirtualScrollStyle,
};

export default () => {
  // const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      id: `id-${i}`,
      name: `name-${i}`,
    });
  }
  return (
    <div>
      <Select data={data} multiple keygen='id' jssStyle={jssStyle} renderItem={(d) => d.name} />
    </div>
  );
};
