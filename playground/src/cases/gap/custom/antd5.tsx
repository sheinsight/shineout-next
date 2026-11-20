import { Button, Space } from 'antd-v5';

// antd 的 size 数组是 [水平间距, 垂直间距]，对应 Shineout 的 [column, row]
export default function Demo() {
  return (
    <div style={{ width: 500, border: '1px solid #e8ebf0', borderRadius: 4, padding: 10 }}>
      <Space wrap size={[30, 20]}>
        {Array.from({ length: 10 }).map((_, i) => (
          <Button type='primary' key={i}>Button</Button>
        ))}
      </Space>
    </div>
  );
}
