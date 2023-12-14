/**
 * cn - 创建选项
 *    --
 * en - Create option
 *    --
 */
import React from 'react';
import { Select } from 'shineout';

const data: { id: string; name: string }[] = [];
for (let i = 0; i < 15; i++) {
  data.push({
    id: `id-${i}`,
    name: `标签 ${i}`,
  });
}

export default () => {
  // const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  return (
    <div>
      <Select
        width={300}
        data={data}
        onCreate
        height={250}
        keygen='id'
        placeholder='Select Color'
        renderItem={(d) => d.name}
        // onFilter={(text) => (d) => d.indexOf(text) > -1}
      />
    </div>
  );
};
