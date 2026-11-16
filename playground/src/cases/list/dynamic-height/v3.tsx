import { List } from 'shineout-v3';
import { DYNAMIC, type DynamicItem } from '../_shared/data';

export default function Demo() {
  return (
    <List
      data={DYNAMIC}
      keygen='id'
      fixed
      dynamicHeight
      height={400}
      rowsInView={20}
      renderItem={(item: DynamicItem) => (
        <div style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{item.name}</div>
          <div style={{ color: '#666', fontSize: 14 }}>{item.content}</div>
        </div>
      )}
    />
  );
}
