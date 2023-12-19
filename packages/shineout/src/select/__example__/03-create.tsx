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
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  return (
    <div>
      <Select
        multiple
        hideCreateOption
        width={300}
        data={data}
        onCreate
        onChange={(v) => console.log(v)}
        height={250}
        keygen
        placeholder='Select Color'
        renderItem={(d) => d}
      />
    </div>
  );
};
