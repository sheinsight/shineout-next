import { useState } from 'react';
import { Input } from 'antd';
import { useBenchState } from '../../../core/define';

export default function Demo() {
  const [value, setValue] = useState('');
  useBenchState({ value });
  return <Input.TextArea placeholder='input something' value={value} onChange={(e) => setValue(e.target.value)} />;
}
