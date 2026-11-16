import { Input } from 'antd';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Input style={{ width: 300 }} placeholder='limit 20 characters' count={{ show: true, max: 20 }} />
      <Input
        style={{ width: 300 }}
        placeholder='custom info text'
        count={{ show: ({ count }) => `已输入${count || 0}个字符` }}
      />
    </div>
  );
}
