/**
 * cn - 创建选项
 *    --
 * en - Create option
 *    --
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
        style={{ marginInlineStart: 16 }}
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
