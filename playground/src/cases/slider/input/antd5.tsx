import { useState } from 'react';
import { InputNumber, Slider } from 'antd-v5';
import { useBenchState } from '../../../core/define';

export default function Demo() {
  const [value, setValue] = useState<number | undefined>(50);
  useBenchState({ value });
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Slider value={value} onChange={(n: number) => setValue(n)} style={{ flex: 1, marginInlineEnd: 16 }} />
      <InputNumber
        style={{ width: 100 }}
        max={100}
        min={0}
        value={value}
        onChange={(n) => setValue(n === null ? undefined : n)}
      />
    </div>
  );
}
