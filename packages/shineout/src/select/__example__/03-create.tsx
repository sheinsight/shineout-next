/**
 * cn - 创建选项
 *    --
 * en - Create option
 *    --
 */
import React from 'react';
import { Select } from 'shineout';

export default () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  return (
    <div>
      <Select
        width={300}
        data={data}
        onCreate
        keygen
        placeholder='Select Color'
        renderItem={(d) => d}
        // onFilter={(text) => (d) => d.indexOf(text) > -1}
      />
    </div>
  );
};
