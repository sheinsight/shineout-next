import { useState } from 'react';
import { Slider } from 'shineout-v2';
import { useBenchState } from '../../../core/define';

export default function Demo() {
  const [value, setValue] = useState(50);
  useBenchState({ value });
  return <Slider value={value} onChange={(v: number) => setValue(v)} />;
}
