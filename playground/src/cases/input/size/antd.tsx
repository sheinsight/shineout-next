import { Input } from 'antd';

export default function Demo() {
  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
      <Input size='small' style={{ width: 240 }} placeholder='small size' allowClear />
      <Input style={{ width: 240 }} placeholder='default size' allowClear />
      <Input size='large' style={{ width: 240 }} placeholder='large size' allowClear />
    </div>
  );
}
