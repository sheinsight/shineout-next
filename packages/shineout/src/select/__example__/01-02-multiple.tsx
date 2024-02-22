/**
 * cn - 多选
 *    -- 设置`multiple`属性允许开启多选功能
 * en - Multiple
 *    -- Set `multiple` to enable multiple selection
 */
import React from 'react';
import { Select } from 'shineout';
import { primitiveData } from './static/mock';

export default () => {
  return (
    <div>
      <Select
        width={300}
        multiple
        onChange={(v) => console.log(v)}
        data={data}
        keygen
        placeholder='Select Color'
      />
    </div>
  );
};
