import { Rate } from 'shineout-v2';

const LetterRate = Rate(['A', 'B', 'C', 'D', 'E'], ['A', 'B', 'C', 'D', 'E']);
const NumberRate = Rate(['1', '2', '3', '4', '5'], ['1', '2', '3', '4', '5']);

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <LetterRate size={16} repeat={false} defaultValue={3} />
      <NumberRate size={16} repeat={false} defaultValue={3} />
    </div>
  );
}
