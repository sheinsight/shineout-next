import { Steps } from 'antd-v5';

export default function Demo() {
  return (
    <div style={{ width: 500 }}>
      <Steps current={1} items={[ { title: 'Succeeded' }, { title: 'Processing' }, { title: 'Pending' } ]} />
    </div>
  );
}
