import { DatePicker, Radio } from 'shineout-v3';

import { useState } from 'react';

type Size = 'small' | 'default' | 'large';
const sizes: Size[] = ['small', 'default', 'large'];

export default function Demo() {
  const [size, setSize] = useState<Size>('default');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Radio.Group button='outline' data={sizes} value={size} onChange={setSize} keygen />
      <DatePicker size={size} type='date' showSelNow />
      <DatePicker size={size} type='datetime' showSelNow />
      <DatePicker size={size} type='date' range showSelNow />
      <DatePicker size={size} type='datetime' range showSelNow />
    </div>
  );
}
