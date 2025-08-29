/**
 * cn - 阻止回车选中
 *    -- 开启 onCreate 时，设置 preventEnterSelect 可以阻止回车选中已有选项，只允许创建新选项
 * en - Prevent Enter Select
 *    -- When onCreate is enabled, setting preventEnterSelect prevents selecting existing options with Enter key, only allowing creation of new options
 */
import React, { useState } from 'react';
import { Select } from 'shineout';

const data = [
  { id: 1, name: '苹果' },
  { id: 2, name: '香蕉' },
  { id: 3, name: '橙子' },
  { id: 4, name: '葡萄' },
];

export default () => {
  const [value1, setValue1] = useState<number[]>([]);
  const [value2, setValue2] = useState<number[]>([]);

  const handleCreate = (input: string) => {
    return { id: Date.now(), name: input };
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h4>普通模式（允许回车选中已有选项）</h4>
        <Select
          width={300}
          data={data}
          value={value1}
          onChange={setValue1}
          keygen="id"
          renderItem="name"
          placeholder="输入文字可创建新选项，回车可选中已有选项"
          onCreate={handleCreate}
          multiple
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
          选中值：{JSON.stringify(value1)}
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h4>开启 preventEnterSelect（回车只创建，不选中已有选项）</h4>
        <Select
          width={300}
          data={data}
          value={value2}
          onChange={setValue2}
          keygen="id"
          renderItem="name"
          placeholder="输入文字可创建新选项，回车只创建不选中"
          onCreate={handleCreate}
          preventEnterSelect
          multiple
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
          选中值：{JSON.stringify(value2)}
        </div>
      </div>
    </div>
  );
};