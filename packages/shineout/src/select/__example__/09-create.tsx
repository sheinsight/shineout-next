/**
 * cn - 创建选项
 *    -- 设置 `onCreate` 属性，即可创建选项中不存在的条目；
 *    -- 当 `onCreate` 为 true 时，使用默认函数 text => text；
 *    -- 当 `onCreate` 为函数时，将此函数返回值作为新的选项插入最上方。
 * en - Create option
 *    -- If the `onCreate` property is set, you can create entries that do not exist in the options;
 *   -- When `onCreate` is true, use the default function text => text;
 *  -- When `onCreate` is a function, the return value of this function is inserted as a new option at the top.
 */
import React from 'react';
import { Select } from 'shineout';

type DataItem = {
  id: string;
  name: string;
};

const data: DataItem[] = [];
for (let i = 0; i < 15; i++) {
  data.push({
    id: `id-${i}`,
    name: `标签 ${i}`,
  });
}

export default () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  return (
    <div>
      <Select
        width={300}
        data={data}
        onCreate
        height={250}
        keygen
        placeholder='Select Color'
        clearable
      />

      <Select
        multiple
        style={{ marginLeft: 24 }}
        width={300}
        data={data}
        onCreate
        height={250}
        keygen
        placeholder='Select Color'
        clearable
      />
    </div>
  );
};
