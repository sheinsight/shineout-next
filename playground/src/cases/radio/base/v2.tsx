import { useState } from 'react';
import { Radio } from 'shineout-v2';

export default function Demo() {
  const [value, setValue] = useState('');
  return (
    <Radio checked={value === 'option'} htmlValue='option' onChange={(v: string) => setValue(v)}>
      Option
    </Radio>
  );
}
