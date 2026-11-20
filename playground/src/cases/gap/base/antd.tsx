import { Button, Space } from 'antd';

export default function Demo() {
  return (
    <Space wrap size={8} style={{ width: 400 }}>
      {Array.from({ length: 10 }).map((_, i) => (
        <Button type='primary' key={i}>Button</Button>
      ))}
    </Space>
  );
}
