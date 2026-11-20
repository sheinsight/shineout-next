import { Descriptions, Radio } from 'antd-v5';
import { useState } from 'react';
import { longAddress, toAntd } from '../_shared/data';

type Size = 'small' | 'default' | 'large';
const sizes: Size[] = ['small', 'default', 'large'];
// antd 的 size 叫 small / middle / large
const toAntdSize = (s: Size) => (s === 'default' ? 'middle' : s);
const items = toAntd(longAddress);

export default function Demo() {
  const [size, setSize] = useState<Size>('default');
  return (
    <div>
      <Radio.Group options={sizes} value={size} onChange={(e) => setSize(e.target.value)} style={{ marginBottom: 24 }} />
      <Descriptions items={items} title='User Info' style={{ marginBottom: 12 }} size={toAntdSize(size) as any} />
      <Descriptions items={items} title='User Info' layout='horizontal' styles={{ label: { textAlign: 'end' } }} size={toAntdSize(size) as any} bordered />
    </div>
  );
}
