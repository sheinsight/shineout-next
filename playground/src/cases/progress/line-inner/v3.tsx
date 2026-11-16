import { Progress } from 'shineout-v3';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 400 }}>
      <Progress value={0} shape='line-inner' type='info'>
        0%
      </Progress>
      <Progress value={5} shape='line-inner' type='info'>
        5%
      </Progress>
      <Progress value={40} shape='line-inner' type='info'>
        10%
      </Progress>
      <Progress value={50} shape='line-inner' type='warning'>
        50%
      </Progress>
      <Progress value={100} shape='line-inner' type='success'>
        100%
      </Progress>
      <Progress value={60} shape='line-inner' type='danger'>
        60%
      </Progress>
    </div>
  );
}
