import { Button, Space } from 'antd-v5';

export default function Demo() {
  return (
    <Space direction='vertical' size={10} style={{ width: 400 }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <Button type='primary' key={i}>Button</Button>
      ))}
    </Space>
  );
}
