/**
 * cn - 合并选项
 *    -- 多选下设置`compressed`属性，结果不换行，超出折叠显示
 * en - Compressed
 *    -- Set `compressed` to prevent wrapping and will be displayed beyond the fold when multiple
 */
import React from 'react';
import { Select } from 'shineout';

export default () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  return (
    <div>
      <Select
        width={300}
        defaultValue={data}
        multiple
        onChange={(v) => console.log(v)}
        data={data}
        keygen
        placeholder='Select Color'
        compressed
        clearable
      />
    </div>
  );
};
