import { Progress } from 'shineout-v3';

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 32 }}>
      <Progress value={0} shape='circle' type='info' size={64} strokeWidth={4}>0%</Progress>
      <Progress value={60} shape='circle' type='info' size={64} strokeWidth={4}>60%</Progress>
      <Progress value={70} shape='circle' type='warning' size={64} strokeWidth={4} icon />
      <Progress value={100} shape='circle' type='success' size={64} strokeWidth={4} icon />
      <Progress value={90} shape='circle' type='danger' size={64} strokeWidth={4} icon />
    </div>
  );
}
