/**
 * cn - prediction + 远程搜索缓存
 *    -- 复现 prediction + 远程搜索时已选项显示丢失的问题
 * en - prediction + remote search cache
 *    --
 */
import React, { useState, useEffect } from 'react';
import { Select } from 'shineout';

interface DataItem {
  id: number;
  name: string;
}

// 模拟远程数据源
const allData: DataItem[] = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Cherry' },
  { id: 4, name: 'Durian' },
  { id: 5, name: 'Elderberry' },
  { id: 6, name: 'Fig' },
  { id: 7, name: 'Grape' },
  { id: 8, name: 'Honeydew' },
];

// 模拟远程搜索接口
const fetchData = (keyword: string): Promise<DataItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = keyword
        ? allData.filter((item) => item.name.toLowerCase().includes(keyword.toLowerCase()))
        : allData.slice(0, 5); // 初始只返回前5项
      resolve(result);
    }, 300);
  });
};

export default () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [value, setValue] = useState<{ id: number }[]>([]);

  useEffect(() => {
    fetchData('').then(setData);
  }, []);

  return (
    <div>
      <p style={{ marginBottom: 8 }}>
        步骤：1. 选中 Apple 和 Banana → 2. 搜索 &quot;Fig&quot; → 观察已选项是否丢失
      </p>
      <Select
        multiple
        width={400}
        keygen='id'
        renderItem='name'
        format={(item) => ({ id: item.id })}
        prediction={(val, item) => val?.id === item.id}
        data={data}
        value={value}
        onChange={setValue}
        placeholder='Select Fruits'
        onFilter={(text) => {
          fetchData(text).then(setData);
        }}
      />
      <p style={{ marginTop: 8, color: '#666' }}>
        当前 value: {JSON.stringify(value)}
      </p>
    </div>
  );
};
