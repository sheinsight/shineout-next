import { Button, Empty } from 'shineout-v3';
import { IMG_SRC } from '../_shared/assets';

export default function Demo() {
  return <Empty imgSrc={IMG_SRC} description={<Button type='primary'>Refresh</Button>} />;
}
