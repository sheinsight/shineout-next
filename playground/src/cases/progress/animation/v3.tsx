import { useState } from 'react';
import { Progress } from 'shineout-v3';
import { useBenchState } from '../../../core/define';

export default function Demo() {
  const [value, setValue] = useState(20);
  useBenchState({ value });
  return (
    <div>
      <button data-bench='toggle' onClick={() => setValue((v) => (v === 20 ? 80 : 20))}>
        toggle
      </button>
      <div>
        <Progress style={{ width: 400 }} value={value}>
          <div style={{ width: 50 }}>{`${value}%`}</div>
        </Progress>
      </div>
      <div style={{ marginTop: 24 }}>
        <Progress shape='circle' type='success' value={value}>
          {`${value}%`}
        </Progress>
      </div>
    </div>
  );
}
