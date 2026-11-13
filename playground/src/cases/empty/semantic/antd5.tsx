import { Empty } from 'antd-v5';

// 节点对应：icon ↔ image
export default function Demo() {
  return (
    <Empty
      styles={{
        root: { padding: '40px 0' },
        image: { marginBottom: 16 },
        description: { color: '#999', fontSize: 14 },
      }}
    />
  );
}
