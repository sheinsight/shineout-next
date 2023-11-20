/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
// import React, { useState } from 'react';
import { Select } from '@sheinx/base';
import {
  useSelectStyle,
  useInnerTitleStyle,
  useVirtualScrollStyle,
  useTagStyle,
} from '@sheinx/shineout-style';

const jssStyle = {
  tag: useTagStyle,
  select: useSelectStyle,
  innerTitle: useInnerTitleStyle,
  virtualScroll: useVirtualScrollStyle,
};
const data: { id: string; name: string }[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    id: `id-${i}`,
    name: `name-${i}`,
  });
}

export default () => {
  // const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

  // const [value, setValue] = useState([]);

  // const handleChange = (v) => {
  //   setValue(v);
  // };

  return (
    <div>
      <Select
        data={data}
        multiple
        // innerTitle='innerTitle'
        // value={value}
        // onChange={handleChange}
        keygen='id'
        // format='id'
        prediction={(v, d) => v === d}
        // disabled={(d) => d.id.indexOf('1') > -1}
        jssStyle={jssStyle}
        placeholder='请选择'
        renderItem={(d) => d.name}
      />
    </div>
  );
};
