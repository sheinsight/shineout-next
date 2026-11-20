import { Rate } from 'shineout-v3';
import { star } from '../_shared/icons';

const titleStyle = { marginBottom: 8, fontSize: 16, fontWeight: 500 };
const StarRate = Rate(star, star);

export default function Demo() {
  return (
    <div>
      <div style={titleStyle}>16px</div>
      <StarRate size={16} style={{ marginBottom: 32 }} />
      <div style={titleStyle}>24px</div>
      <StarRate size={24} />
    </div>
  );
}
