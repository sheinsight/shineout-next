import { Steps } from 'antd';

export default function Demo() {
  return (
    <div style={{ width: 500 }}>
      <Steps current={1} items={[ { title: 'Succeeded', content: 'This is a description' }, { title: 'Processing', content: 'This is a description' }, { title: 'Pending', content: 'This is a description' } ]} />
    </div>
  );
}
