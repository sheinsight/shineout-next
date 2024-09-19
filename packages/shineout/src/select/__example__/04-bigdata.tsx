/**
 * cn - 虚拟列表
 *    -- 内置虚拟列表，支持大数据渲染，本例展示10万条数据
 *    -- 出于默认的性能考虑，每条选项的高度默认为统一高度值，可以通过调整 `lineHeight` 属性来调整每一条选项的固定高度
 *    -- 如果需要根据内容自适应高度，通过设置 `lineHeight='auto'` 开启动态虚拟列表功能，组件将对渲染的条目预先测绘并动态计算高度
 *    -- 开启`lineHeight='auto'`将不再限制选项换行行为
 *    -- 注意，开启动态虚拟列表功能会带来额外的性能开销，请根据实际情况选择使用。此外，如果选项内容为动态的，例如选项中包含异步内容，出于性能考虑组件不自动处理尺寸的变化。
 * en - Virtual List
 *    -- Select has built-in virtual list to support big data rendering, this example shows 100,000 pieces of data
 */
import React from 'react';
import { Select, TYPE } from 'shineout';

type SelectProps = TYPE.Select.Props<DataItem, string>;

interface DataItem {
  id: string;
  name: string;
  height: number;
}

const data: DataItem[] = [];

for (let i = 0; i < 100000; i++) {
  data.push({
    id: `id-${i}`,
    name: `标签 ${i}`,
    height: Math.floor(Math.random() * 100) + 34,
  });
}

export default () => {
  const renderItem: SelectProps['renderItem'] = (d) => d.name;
  const renderDynamicHeightItem: SelectProps['renderItem'] = (d) => (
    <div style={{ height: d.height }}>{d.name}</div>
  );
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <Select
        width={300}
        data={data}
        keygen='id'
        placeholder='Static lineHeight'
        renderItem={renderItem}
        clearable
      />
      <Select
        width={300}
        data={data}
        keygen='id'
        lineHeight='auto'
        renderResult={(d) => d.name}
        placeholder='Auto lineHeight'
        renderItem={renderDynamicHeightItem}
        clearable
      />
    </div>
  );
};
