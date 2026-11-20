import { Rate } from 'shineout-v3';
import { star } from '../_shared/icons';

const StarRate = Rate(star, star);

export default function Demo() {
  return <StarRate max={10} defaultValue={3} />;
}
