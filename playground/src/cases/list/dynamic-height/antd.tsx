import { Listy } from 'antd';
import { DYNAMIC, type DynamicItem } from '../_shared/data';

// antd 6 的 Listy 带虚拟滚动，内部用 @rc-component/virtual-list，会测量真实高度，所以不定高的内容也能工作
export default function Demo() {
  return (
    <Listy
      virtual
      height={400}
      items={DYNAMIC}
      rowKey='id'
      styles={{ item: { padding: 0 } }}
      itemRender={(item: DynamicItem) => (
        <div style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{item.name}</div>
          <div style={{ color: '#666', fontSize: 14 }}>{item.content}</div>
        </div>
      )}
    />
  );
}
