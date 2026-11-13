import { useState } from 'react';
import { Button, Radio, Space } from 'antd-v5';

const aligns = ['flex-start', 'center', 'flex-end', 'baseline'];
// antd 的 align 取值是 start / center / end / baseline
const toAntd = (a: string) => (a === 'flex-start' ? 'start' : a === 'flex-end' ? 'end' : a) as 'start' | 'center' | 'end' | 'baseline';

export default function Demo() {
  const [align, setAlign] = useState('flex-start');
  return (
    <>
      <Radio.Group value={align} onChange={(e) => setAlign(e.target.value)} options={aligns} />
      <Space wrap align={toAntd(align)} size={[20, 20]} style={{ width: 160, marginTop: 16, border: '1px solid #e8ebf0', borderRadius: 4, padding: 12 }}>
        <span>start</span>
        <Button type='primary'>Button</Button>
        <div style={{ fontSize: 14, background: '#f4f5f8', height: 120, lineHeight: '24px', borderRadius: 4, padding: 12 }}>end</div>
      </Space>
    </>
  );
}
