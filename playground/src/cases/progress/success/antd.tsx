import { Progress } from 'antd';

export default function Demo() {
  return (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Progress percent={60} success={{ percent: 30 }} showInfo={false} />
      <Progress type='circle' percent={60} success={{ percent: 30, strokeColor: '#00A85F' }} showInfo={false} />
    </div>
  );
}
