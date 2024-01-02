/**
 * cn - 限制过滤字符长度
 *    -- 设置`maxLength`属性可以限制输入过滤字符的长度
 * en - maxLength
 *    -- Set `maxLength` property can limit the length of the input filter characters
 */
import React from 'react';
import { Select } from 'shineout';

export default () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  const handleFilter = (v: string) => (d: string) => d.indexOf(v) >= 0;

  return (
    <div>
      <Select
        maxLength={2}
        width={300}
        data={data}
        keygen
        placeholder='Select Color'
        renderItem={(d) => d}
        onFilter={handleFilter}
      />
    </div>
  );
};
