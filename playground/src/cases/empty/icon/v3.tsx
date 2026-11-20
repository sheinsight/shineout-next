import { Empty } from 'shineout-v3';
import { CustomIcon } from '../_shared/assets';

export default function Demo() {
  return <Empty icon={<CustomIcon />} description='No network' />;
}
