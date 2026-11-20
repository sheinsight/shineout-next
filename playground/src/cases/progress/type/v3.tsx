import { Progress } from 'shineout-v3';

export default function Demo() {
  return (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Progress value={100} type='success' icon>100%</Progress>
      <Progress value={90} type='info' icon>90%</Progress>
      <Progress value={80} type='warning' icon>80%</Progress>
      <Progress value={70} type='danger' icon>70%</Progress>
    </div>
  );
}
