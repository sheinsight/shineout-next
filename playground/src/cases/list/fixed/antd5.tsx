import { List } from 'antd-v5';
import { makePeople, type Person } from '../_shared/data';

const NAMES = makePeople(10000);

// antd 的 List 没有虚拟滚动：10000 条会全部渲染到 DOM 里，放进高 300 的滚动容器，grid.column=2 对应 colNum=2。
// 这是"不做虚拟滚动时的真实开销"，不是等价实现
export default function Demo() {
  return (
    <div style={{ height: 300, overflow: 'auto' }}>
      <List
        bordered
        rowKey='id'
        grid={{ column: 2 }}
        dataSource={NAMES}
        renderItem={({ id, firstName }: Person) => (
          <List.Item style={{ height: 54, padding: 0 }}>
            <div style={{ height: 30, display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#e8ebf0', marginRight: 8, flex: 'none' }} />
              <span style={{ flex: 1 }}>{firstName}</span>
              <span>-{id}</span>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}
