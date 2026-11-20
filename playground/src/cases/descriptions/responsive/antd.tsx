import { Descriptions } from 'antd';
import { longAddress, toAntd } from '../_shared/data';

const items = toAntd(longAddress);

export default function Demo() {
  return (
    <Descriptions
      items={items}
      title='User Info'
      bordered
      layout='horizontal'
      styles={{ label: { textAlign: 'end' } }}
      column={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 3, xxl: 4 }}
    />
  );
}
