import { Rate } from 'antd-v5';

const letters = ['A', 'B', 'C', 'D', 'E'];
const numbers = ['1', '2', '3', '4', '5'];

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Rate style={{ fontSize: 16 }} defaultValue={3} character={({ index = 0 }) => letters[index]} />
      <Rate style={{ fontSize: 16 }} defaultValue={3} character={({ index = 0 }) => numbers[index]} />
    </div>
  );
}
