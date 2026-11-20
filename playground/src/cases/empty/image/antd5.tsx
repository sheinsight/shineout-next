import { Button, Empty } from 'antd-v5';
import { IMG_SRC } from '../_shared/assets';

export default function Demo() {
  return <Empty image={IMG_SRC} description={<Button type='primary'>Refresh</Button>} />;
}
