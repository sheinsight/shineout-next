import { DatePicker } from 'shineout-v2';

import { useState } from 'react';

export default function Demo() {
  const [value, setValue] = useState<any>();
  return (
    <DatePicker
      type='date'
      defaultTime={['00:00:00', '23:59:59']}
      range
           value={value}
      onChange={setValue}
      clearable
           inputable
    />
  );
}
