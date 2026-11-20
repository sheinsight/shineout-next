import { useState } from 'react';
import { Progress } from 'antd';
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
        <Progress style={{ width: 400 }} percent={value} format={(p) => <div style={{ width: 50 }}>{`${p}%`}</div>} />
      </div>
      <div style={{ marginTop: 24 }}>
        <Progress type='circle' status='success' percent={value} format={(p) => `${p}%`} />
      </div>
    </div>
  );
}
