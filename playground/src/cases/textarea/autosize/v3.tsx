import { useState } from 'react';
import { Textarea } from 'shineout-v3';
import { useBenchState } from '../../../core/define';

export default function Demo() {
  const [value, setValue] = useState('');
  useBenchState({ value });
  return (
    <Textarea
      autosize
      rows={2}
      placeholder='Please enter content, the height can be automatically adjusted'
      maxHeight={150}
      resize
      delay={0}
      value={value}
      onChange={(v: string) => setValue(v)}
    />
  );
}
