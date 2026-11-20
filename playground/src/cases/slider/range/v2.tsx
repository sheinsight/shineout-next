import { useState } from 'react';
import { Slider } from 'shineout-v2';
import { useBenchState } from '../../../core/define';

export default function Demo() {
  const [value, setValue] = useState<number[]>([25, 75]);
  useBenchState({ value });
  return <Slider range value={value} onChange={(v: number[]) => setValue(v)} />;
}
