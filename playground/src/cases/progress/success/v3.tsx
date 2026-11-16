import { Progress } from 'shineout-v3';

export default function Demo() {
  return (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Progress value={60} success={{ value: 30 }} />
      <Progress value={60} success={{ value: 30, color: 'var(--soui-success-6,#00A85F)' }} shape='circle' />
    </div>
  );
}
