/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React, { useState } from 'react';
import { Select } from '@sheinx/base';
import {
  useSelectStyle,
  useInnerTitleStyle,
  useVirtualScrollStyle,
  useTagStyle,
  usePopoverStyle,
} from '@sheinx/shineout-style';

const jssStyle = {
  tag: useTagStyle,
  select: useSelectStyle,
  innerTitle: useInnerTitleStyle,
  virtualScroll: useVirtualScrollStyle,
  popover: usePopoverStyle,
};
const data: { id: string; name: string }[] = [];
const v = [];
for (let i = 0; i < 100; i++) {
  data.push({
    id: `id-${i}`,
    name: `name-${i}`,
  });
  if (i < 20) {
    v.push(`id-${i}`);
  }
}

export default () => {
  // const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

  const [value, setValue] = useState(v);

  const handleChange = (v) => {
    setValue(v);
  };

  return (
    <div>
      <Select
        data={data}
        multiple
        compressed
        compressedBound={2}
        // innerTitle='innerTitle'
        value={value}
        onChange={handleChange}
        keygen='id'
        format='id'
        prediction={(v, d) => v === d.id}
        // disabled={(d) => d.id.indexOf('1') > -1}
        jssStyle={jssStyle}
        placeholder='请选择'
        renderItem={(d) => d.name}
      />
    </div>
  );
};
