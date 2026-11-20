import { Progress } from 'shineout-v2';

export default function Demo() {
  return (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Progress value={100} type='success'>100%</Progress>
      <Progress value={90} type='info'>90%</Progress>
      <Progress value={80} type='warning'>80%</Progress>
      <Progress value={70} type='danger'>70%</Progress>
    </div>
  );
}
