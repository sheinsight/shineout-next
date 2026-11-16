import { Progress } from 'antd-v5';

export default function Demo() {
  return (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Progress percent={100} status='success' />
      <Progress percent={90} />
      <Progress percent={80} strokeColor='#faad14' />
      <Progress percent={70} status='exception' />
    </div>
  );
}
