import { useState } from 'react';
import { Steps } from 'shineout-v3';
import { useBenchState } from '../../../core/define';

const renderTitle = (_index: number, status: 'wait' | 'process' | 'finish' | 'error') => {
  if (status === 'finish') return 'Succeeded';
  if (status === 'process') return 'Processing';
  if (status === 'wait') return 'Pending';
  return 'Error';
};

export default function Demo() {
  const [current, setCurrent] = useState(1);
  useBenchState({ current });
  return (
    <div style={{ width: '100%', overflow: 'auto' }}>
      <Steps current={current} onChange={setCurrent}>
        <Steps.Step title={renderTitle} />
        <Steps.Step title={renderTitle} />
        <Steps.Step title={renderTitle} />
        <Steps.Step title={renderTitle} />
        <Steps.Step title={renderTitle} />
      </Steps>
    </div>
  );
}
