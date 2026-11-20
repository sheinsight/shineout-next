import { Steps } from 'antd-v5';

const plain = [ { title: 'Succeeded' }, { title: 'Processing' }, { title: 'Pending' } ];
const withDesc = [ { title: 'Succeeded', description: 'This is a description' }, { title: 'Processing', description: 'This is a description' }, { title: 'Pending', description: 'This is a description' } ];

export default function Demo() {
  return (
    <div style={{ width: 500 }}>
      <div style={{ display: 'flex', gap: 32, marginBottom: 24, alignItems: 'flex-start' }}>
        <Steps current={1} direction='vertical' items={plain} />
        <Steps current={1} direction='vertical' items={withDesc} />
      </div>
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <Steps current={1} progressDot direction='vertical' items={plain} />
        <Steps current={1} progressDot direction='vertical' items={withDesc} />
      </div>
    </div>
  );
}
