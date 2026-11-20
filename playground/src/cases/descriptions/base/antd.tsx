import { Descriptions } from 'antd';
import { base, toAntd } from '../_shared/data';

const items = toAntd(base);

export default function Demo() {
  return <Descriptions items={items} title='User Info' />;
}
