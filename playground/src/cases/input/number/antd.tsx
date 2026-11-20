import { InputNumber } from 'antd';

const style = { marginBottom: 24, width: '100%' };

// Shineout 的 type='number' 输入框 ↔ antd 的 InputNumber：digits ↔ precision，numType='non-negative' ↔ min={0}
export default function Demo() {
  return (
    <div style={{ width: 300 }}>
      <InputNumber style={style} placeholder='digits undefined' />
      <InputNumber style={style} precision={0} placeholder='digits 0' />
      <InputNumber style={style} precision={1} placeholder='digits 1' />
      <InputNumber style={style} precision={2} placeholder='digits 2' />
      <InputNumber style={style} min={0} placeholder='non-negative' />
      <InputNumber style={style} precision={3} placeholder='digits 3; autoFix' />
      <InputNumber style={style} placeholder='Input.Number' />
    </div>
  );
}
