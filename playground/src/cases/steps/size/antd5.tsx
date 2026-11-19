import { Steps } from 'antd-v5';

const items = [ { title: 'Succeeded' }, { title: 'Processing' }, { title: 'Pending' } ];

export default function Demo() {
  return (
    <div style={{ width: 500 }}>
      <Steps size='small' current={1} items={items} style={{ marginBottom: 32 }} />
      <Steps current={1} items={items} />
    </div>
  );
}
