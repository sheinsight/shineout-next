import { Input } from 'antd';

export default function Demo() {
  return (
    <Input
      placeholder='Enter text'
      allowClear
      styles={{
        root: { border: '2px solid #1890ff', borderRadius: 8 },
        input: { fontSize: 16, color: '#333' },
      }}
    />
  );
}
