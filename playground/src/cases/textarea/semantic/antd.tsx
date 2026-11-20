import { Input } from 'antd';

export default function Demo() {
  return (
    <Input.TextArea
      placeholder='Please input'
      rows={3}
      styles={{
        root: { borderRadius: 8, border: '2px solid #1890ff' },
        textarea: { fontFamily: 'monospace', fontSize: 14 },
      }}
    />
  );
}
