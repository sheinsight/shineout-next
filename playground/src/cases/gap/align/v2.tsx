import { useState } from 'react';
import { Button, Gap, Radio } from 'shineout-v2';

const aligns = ['flex-start', 'center', 'flex-end', 'baseline'];

export default function Demo() {
  const [align, setAlign] = useState('flex-start');
  return (
    <>
      <Radio.Group value={align} onChange={setAlign} data={aligns} keygen />
      <Gap style={{ width: 160, marginTop: 16, border: '1px solid #e8ebf0', borderRadius: 4, alignItems: align, padding: 12 }} row={20}>
        <span>start</span>
        <Button type='primary'>Button</Button>
        <div style={{ fontSize: 14, background: '#f4f5f8', height: 120, lineHeight: '24px', borderRadius: 4, padding: 12 }}>end</div>
      </Gap>
    </>
  );
}
