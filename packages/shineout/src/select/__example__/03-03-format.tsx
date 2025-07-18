/**
 * cn -
 *    -- 设置`separator`属性支持多选时以分隔符分合并或解析值
 * en -
 *    -- Set the `separator` property to merge or parse values with a separator when multiple selection is supported
 */
import React, { useState } from 'react';
import { Select } from 'shineout';
import { primitiveData } from './static/mock';
import Code from './static/code';

export default () => {
  const [value, setValue] = useState('orange~blue');
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: 100 }}>
        <Select
          width={300}
          multiple
          value={value}
          separator='~'
          onChange={setValue}
          data={primitiveData}
          keygen
          placeholder='Select Color'
          renderItem={(d) => d}
          clearable
        />
      </div>
      <Code value={value}></Code>
    </div>
  );
};
