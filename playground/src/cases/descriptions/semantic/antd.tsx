import { Descriptions } from 'antd';
import { semantic, toAntd } from '../_shared/data';

const items = toAntd(semantic);

// 节点对应：value ↔ content；table 在 antd 里没有对应节点，省略
export default function Demo() {
  return (
    <Descriptions
      title='User Info'
      extra='Detail'
      items={items}
      bordered
      column={3}
      styles={{
        root: { borderRadius: 8 },
        header: { marginBottom: 12 },
        title: { fontSize: 16, fontWeight: 600 },
        extra: { color: '#1890ff', cursor: 'pointer' },
        label: { fontWeight: 500, color: '#666' },
        content: { color: '#333' },
      }}
    />
  );
}
