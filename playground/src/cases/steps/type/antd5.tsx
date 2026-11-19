import { Steps } from 'antd-v5';

export default function Demo() {
  return (
    <div style={{ width: 500 }}>
      <Steps current={1} progressDot items={[ { title: 'Succeeded' }, { title: 'Complete information' }, { title: 'Pending' } ]} style={{ marginBottom: 32 }} />
      <Steps current={1} progressDot items={[ { title: 'Succeeded', description: 'This is a description' }, { title: 'Complete information', description: 'Please fill in your home address and phone number' }, { title: 'Pending', description: 'This is a description' } ]} style={{ marginBottom: 32 }} />
    </div>
  );
}
