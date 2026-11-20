import { Empty } from 'antd';
import { CustomIcon } from '../_shared/assets';

export default function Demo() {
  return <Empty image={<CustomIcon />} description='No network' />;
}
