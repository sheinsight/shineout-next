import { useState } from 'react';
import { Input, Slider } from 'shineout-v2';
import { useBenchState } from '../../../core/define';

export default function Demo() {
  const [value, setValue] = useState<number | undefined>(50);
  useBenchState({ value });
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Slider value={value} onChange={(n: number) => setValue(n)} style={{ flex: 1, marginInlineEnd: 16 }} />
      <Input.Number
        digits={0}
        width={100}
        max={100}
        min={0}
        value={value}
        onChange={(n: any) => {
          if (n === '' || n === undefined) {
            setValue(undefined);
          } else {
            setValue(Number(n || 0));
          }
        }}
      />
    </div>
  );
}
