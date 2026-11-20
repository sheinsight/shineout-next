import { DatePicker, Radio } from 'antd-v5';

import { useState } from 'react';

type Size = 'small' | 'default' | 'large';
const sizes: Size[] = ['small', 'default', 'large'];
// antd 的 size 叫 small / middle / large
const toAntd = (s: Size) => (s === 'default' ? 'middle' : s);

export default function Demo() {
  const [size, setSize] = useState<Size>('default');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Radio.Group optionType='button' options={sizes} value={size} onChange={(e) => setSize(e.target.value)} />
      <DatePicker size={toAntd(size)} showNow />
      <DatePicker size={toAntd(size)} showTime showNow />
      <DatePicker.RangePicker size={toAntd(size)} />
      <DatePicker.RangePicker size={toAntd(size)} showTime />
    </div>
  );
}
