import { Rate } from 'shineout-v3';
import { star } from '../_shared/icons';

const StarRate = Rate(star, star);

export default function Demo() {
  return <StarRate allowHalf defaultValue={4} text={['poor', 'fair', 'good', 'very good', 'excellent']} />;
}
