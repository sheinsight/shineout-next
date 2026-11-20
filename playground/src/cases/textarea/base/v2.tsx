import { useState } from 'react';
import { Textarea } from 'shineout-v2';
import { useBenchState } from '../../../core/define';

export default function Demo() {
  const [value, setValue] = useState('');
  useBenchState({ value });
  return <Textarea placeholder='input something' delay={0} value={value} onChange={(v: string) => setValue(v)} />;
}
