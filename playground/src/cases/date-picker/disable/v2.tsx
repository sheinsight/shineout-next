import { DatePicker } from 'shineout-v2';

const NOW = Date.now();
const RANGE = ['2017-05-10', '2017-05-20'];

// 2.x 的 disabled 只接受 boolean 或函数，没有 [start, end] 的单端禁用
export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <DatePicker disabled defaultValue={NOW} width={240} />
      <DatePicker range disabled defaultValue={RANGE as any} width={240} />
    </div>
  );
}
