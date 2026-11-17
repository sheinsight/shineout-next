import { useState } from 'react';
import { Radio } from 'antd';

export default function Demo() {
  const [value, setValue] = useState('');
  return (
    <Radio checked={value === 'option'} value='option' onChange={(e) => setValue(e.target.value)}>
      Option
    </Radio>
  );
}
