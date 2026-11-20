import { DatePicker } from 'antd';

import { useState } from 'react';

export default function Demo() {
  const [value, setValue] = useState<any>(null);
  return <DatePicker.RangePicker needConfirm value={value} onChange={setValue} allowClear />;
}
