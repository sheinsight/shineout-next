import { DatePicker, Radio, TimePicker } from 'antd-v5';

import { useState } from 'react';
import { TYPES, antdPicker, type SoType } from '../_shared/antd-map';

export default function Demo() {
  const [type, setType] = useState<SoType>('date');
  return (
    <div>
      <Radio.Group optionType='button' options={TYPES} value={type} onChange={(e) => setType(e.target.value)} style={{ marginBottom: 24 }} />
      <br />
      {type === 'time' ? (
        <TimePicker.RangePicker />
      ) : (
        <DatePicker.RangePicker {...antdPicker(type)} />
      )}
    </div>
  );
}
