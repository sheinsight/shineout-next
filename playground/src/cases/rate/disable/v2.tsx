import { Rate } from 'shineout-v2';
import { star } from '../_shared/icons';

const StarRate = Rate(star, star);

export default function Demo() {
  return <StarRate value={3.6} disabled />;
}
