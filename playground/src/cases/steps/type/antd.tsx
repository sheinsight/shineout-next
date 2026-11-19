import { Steps } from 'antd';

export default function Demo() {
  return (
    <div style={{ width: 500 }}>
      <Steps current={1} type='dot' items={[ { title: 'Succeeded' }, { title: 'Complete information' }, { title: 'Pending' } ]} style={{ marginBottom: 32 }} />
      <Steps current={1} type='dot' items={[ { title: 'Succeeded', content: 'This is a description' }, { title: 'Complete information', content: 'Please fill in your home address and phone number' }, { title: 'Pending', content: 'This is a description' } ]} style={{ marginBottom: 32 }} />
    </div>
  );
}
