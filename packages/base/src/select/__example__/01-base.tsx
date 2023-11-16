/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
// import React, { useState } from 'react';
import { Select } from '@sheinx/base';
import { useSelectStyle, useInnerTitleStyle, useVirtualScrollStyle } from '@sheinx/shineout-style';

const jssStyle = {
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
        // value={value}
        // onChange={handleChange}
        keygen='id'
        // format='id'
        // disabled={(d) => d.id.indexOf('1') > -1}
        jssStyle={jssStyle}
        renderItem={(d) => <div>{d.name}</div>}
      />
    </div>
  );
};
