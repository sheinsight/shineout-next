import { useState } from 'react';
import { Input } from 'antd';
import { useBenchState } from '../../../core/define';

const INIT = 'Joy in living comes from having fine emotions, trusting them, giving them the freedom of a bird in the open.';

export default function Demo() {
  const [value, setValue] = useState(INIT);
  useBenchState({ value });
  return (
    <div>
      <button data-bench='refill' style={{ marginBottom: 8 }} onClick={() => setValue(INIT)}>
        refill
      </button>
      <Input.TextArea placeholder='input something' allowClear value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}
