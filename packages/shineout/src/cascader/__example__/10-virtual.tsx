/**
 * cn - 大数据性能
 *    -- 设置 virtual 属性，开启虚拟滚动
 * en - Big data performance
 *   -- Set the virtual property to enable virtual scrolling
 */

import React from 'react';
import { Cascader } from 'shineout';

function generateBigTreeData(level: number, count: number) {
  const data = [];
  for (let i = 0; i < count; i++) {
    const children: any[] = level > 0 ? generateBigTreeData(level - 1, count) : [];
    data.push({ value: `${level}-${i}`, children });
  }
  return data;
}

const bigData = generateBigTreeData(2, 50);

const App: React.FC = () => (
  <Cascader
    keygen='value'
    data={bigData}
    virtual
    renderItem={(n) => `${n.value}`}
    onFilter={(text) => (d) => d.value.indexOf(text) >= 0}
  />
);

export default App;
