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
  useTagStyle,
  useCheckboxStyle,
  useRadioStyle,
  usePopoverStyle,
  useTreeStyle,
} from '@sheinx/shineout-style';

const jssStyle = {
  tag: useTagStyle,
  select: useSelectStyle,
  innerTitle: useInnerTitleStyle,
  popover: usePopoverStyle,
  checkbox: useCheckboxStyle,
  radio: useRadioStyle,
  tree: useTreeStyle,
};
const data: { id: string; name: string }[] = [];
const v = [];
for (let i = 0; i < 50; i++) {
  data.push({
    id: `id-${i}`,
    name: `标签 ${i}`,
  });
  if (i < 20) {
    v.push(`id-${i}`);
  }
}

export default () => {
  // const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

  const [value, setValue] = useState();

  const handleChange = (v) => {
    setValue(v);
  };

  const handleFilter = (text) => (d) => {
    return d.name.indexOf(text) > -1;
  };

  const handleGroup = (d) => {
    if (d.id.indexOf('1') > -1) return '带 1 的分组';
    if (d.id.indexOf('2') > -1) return '带 2 的分组';
    return '其他分组';
  };

  // const handleFilter = (text) => {
  //   console.log(text);
  // };

  return (
    <div>
      <Select
        data={data}
        multiple
        // compressed
        // compressedBound={2}
        // innerTitle='innerTitle'
        size='small'
        value={value}
        columns={3}
        onChange={handleChange}
        keygen='id'
        format='id'
        itemsInView={15}
        groupBy={handleGroup}
        prediction={(v, d) => v === d.id}
        // disabled={(d) => d.id.indexOf('1') > -1}
        jssStyle={jssStyle}
        placeholder='请选择'
        onFilter={handleFilter}
        renderItem={(d) => d.name}
      />
    </div>
  );
};
