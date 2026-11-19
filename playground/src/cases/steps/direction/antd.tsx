import { Steps } from 'antd';

const plain = [ { title: 'Succeeded' }, { title: 'Processing' }, { title: 'Pending' } ];
const withDesc = [ { title: 'Succeeded', content: 'This is a description' }, { title: 'Processing', content: 'This is a description' }, { title: 'Pending', content: 'This is a description' } ];

export default function Demo() {
  return (
    <div style={{ width: 500 }}>
      <div style={{ display: 'flex', gap: 32, marginBottom: 24, alignItems: 'flex-start' }}>
        <Steps current={1} orientation='vertical' items={plain} />
        <Steps current={1} orientation='vertical' items={withDesc} />
      </div>
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <Steps current={1} type='dot' orientation='vertical' items={plain} />
        <Steps current={1} type='dot' orientation='vertical' items={withDesc} />
      </div>
    </div>
  );
}
