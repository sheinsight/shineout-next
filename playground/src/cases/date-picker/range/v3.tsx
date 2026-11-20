import { DatePicker, Radio } from 'shineout-v3';

import { useState } from 'react';

type DateType = 'date' | 'week' | 'month' | 'quarter' | 'year' | 'time' | 'datetime';
const types: DateType[] = ['date', 'week', 'month', 'quarter', 'year', 'time', 'datetime'];

export default function Demo() {
  const [type, setType] = useState<DateType>('date');
  return (
    <div>
      <Radio.Group button='outline' data={types} value={type} onChange={setType} keygen style={{ marginBottom: 24 }} />
      <br />
      <DatePicker type={type} range defaultTime={['00:00:00', '23:59:59']} />
    </div>
  );
}
