import { Progress } from 'antd';

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 32 }}>
      <Progress type='circle' percent={0} size={64} strokeWidth={6.25} />
      <Progress type='circle' percent={60} size={64} strokeWidth={6.25} />
      <Progress type='circle' percent={70} size={64} strokeWidth={6.25} strokeColor='#faad14' />
      <Progress type='circle' percent={100} size={64} strokeWidth={6.25} status='success' />
      <Progress type='circle' percent={90} size={64} strokeWidth={6.25} status='exception' />
    </div>
  );
}
