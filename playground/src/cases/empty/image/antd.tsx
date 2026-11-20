import { Button, Empty } from 'antd';
import { IMG_SRC } from '../_shared/assets';

export default function Demo() {
  return <Empty image={IMG_SRC} description={<Button type='primary'>Refresh</Button>} />;
}
