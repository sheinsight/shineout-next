import { useState } from 'react';
import { Radio } from 'antd';
import { useBenchState } from '../../../core/define';
import { colors } from '../_shared/data';

export default function Demo() {
  const [current, setCurrent] = useState('red');
  useBenchState({ value: current });
  return (
    <Radio.Group value={current}>
      {colors.map((d) => (
        <Radio key={d} value={d} onClick={() => setCurrent(current === d ? '' : d)}>
          {d}
        </Radio>
      ))}
    </Radio.Group>
  );
}
