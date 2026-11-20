import { useState } from 'react';
import { Switch } from 'antd-v5';
import { useBenchState } from '../../../core/define';

export default function Demo() {
  const [value, setValue] = useState(false);
  useBenchState({ value });
  return <Switch checked={value} onChange={(v) => setValue(v)} />;
}
