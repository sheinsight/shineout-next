import { useState } from 'react';
import { Input } from 'antd-v5';
import { useBenchState } from '../../../core/define';

export default function Demo() {
  const [value, setValue] = useState('');
  useBenchState({ value });
  return (
    <Input.TextArea
      autoSize={{ minRows: 2, maxRows: 6 }}
      placeholder='Please enter content, the height can be automatically adjusted'
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
