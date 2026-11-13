import { useState } from 'react';
import { Descriptions, Radio } from 'shineout-v3';
import { longAddress } from '../_shared/data';

type Size = 'small' | 'default' | 'large';
const sizes: Size[] = ['small', 'default', 'large'];
const colon = <span style={{ paddingLeft: 4 }}>:</span>;

export default function Demo() {
  const [size, setSize] = useState<Size>('default');
  return (
    <div>
      <Radio.Group data={sizes} value={size} onChange={setSize} keygen style={{ marginBottom: 24 }} />
      <Descriptions items={longAddress} title='User Info' colon={colon} style={{ marginBottom: 12 }} size={size} />
      <Descriptions items={longAddress} title='User Info' layout='horizontal' labelStyle={{ textAlign: 'end' }} size={size} border />
    </div>
  );
}
