import { List } from 'antd-v5';
import { DYNAMIC, type DynamicItem } from '../_shared/data';

// antd 的 List 没有虚拟滚动和动态高度：1000 条全部渲染到 DOM，放进高 400 的滚动容器
export default function Demo() {
  return (
    <div style={{ height: 400, overflow: 'auto' }}>
      <List
        rowKey='id'
        dataSource={DYNAMIC}
        renderItem={(item: DynamicItem) => (
          <List.Item style={{ padding: '8px 12px', display: 'block' }}>
            <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{item.name}</div>
            <div style={{ color: '#666', fontSize: 14 }}>{item.content}</div>
          </List.Item>
        )}
      />
    </div>
  );
}
