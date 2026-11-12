import { Alert } from 'shineout-v3';

const box = { display: 'flex', flexWrap: 'wrap', gap: 24, width: 800 } as const;
const item = { width: 'calc(50% - 12px)' };

export default function Demo() {
  return (
    <div style={box}>
      <Alert icon type='info' style={item}>This is informative text.</Alert>
      <Alert icon type='success' style={item}>This is success text.</Alert>
      <Alert icon type='warning' style={item}>This is warning text.</Alert>
      <Alert icon type='danger' style={item}>This is danger text.</Alert>
    </div>
  );
}
