import { Input } from 'shineout-v3';

const style = { marginBottom: 24 };

export default function Demo() {
  return (
    <div style={{ width: 300 }}>
      <Input style={style} type='number' placeholder='digits undefined' clearable />
      <Input style={style} digits={0} type='number' placeholder='digits 0' clearable />
      <Input style={style} digits={1} type='number' placeholder='digits 1' clearable />
      <Input style={style} digits={2} type='number' placeholder='digits 2' clearable />
      <Input style={style} numType='non-negative' type='number' placeholder='non-negative' clearable />
      <Input style={style} autoFix digits={3} type='number' placeholder='digits 3; autoFix' clearable />
      <Input.Number placeholder='Input.Number' clearable />
    </div>
  );
}
