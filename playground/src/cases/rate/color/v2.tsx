import { Rate } from 'shineout-v2';
import { heartBg, heart } from '../_shared/icons';

const HeartRate = Rate(heartBg, heart);

export default function Demo() {
  return <HeartRate defaultValue={2} />;
}
