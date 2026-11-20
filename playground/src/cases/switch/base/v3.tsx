import { useState } from 'react';
import { Switch } from 'shineout-v3';
import { useBenchState } from '../../../core/define';

export default function Demo() {
  const [value, setValue] = useState(false);
  useBenchState({ value });
  return <Switch value={value} onChange={(v: boolean) => setValue(v)} />;
}
