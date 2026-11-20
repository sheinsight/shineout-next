import { Steps } from 'antd-v5';

export default function Demo() {
  return (
    <div style={{ width: 500 }}>
      <Steps current={1} items={[ { title: 'Succeeded', description: 'This is a description' }, { title: 'Processing', description: 'This is a description' }, { title: 'Pending', description: 'This is a description' } ]} />
    </div>
  );
}
