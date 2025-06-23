/**
 * cn - 不定高虚拟列表
 *    -- 使用 dynamicHeight 属性开启不定高虚拟列表功能，需要同时设置 fixed={true}
 * en - Dynamic Height Virtual List
 *    -- Use dynamicHeight prop to enable dynamic height virtual list, requires fixed={true}
 */
import React from 'react';
import { List } from 'shineout';

interface ItemData {
  id: number;
  name: string;
  content: string;
}

const data: ItemData[] = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  name: `Item ${i}`,
  content: `This is the content for item ${i}. `.repeat(Math.floor(Math.random() * 10) + 1),
}));

export default () => {
  return (
    <List
      data={data}
      keygen="id"
      fixed
      dynamicHeight
      height={400}
      rowsInView={20}
      renderItem={(item: ItemData) => (
        <div style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{item.name}</div>
          <div style={{ color: '#666', fontSize: '14px' }}>{item.content}</div>
        </div>
      )}
    />
  );
};