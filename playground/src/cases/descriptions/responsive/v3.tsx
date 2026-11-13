import { Descriptions } from 'shineout-v3';
import { longAddress } from '../_shared/data';

export default function Demo() {
  return (
    <Descriptions
      items={longAddress}
      title='User Info'
      border
      layout='horizontal'
      labelStyle={{ textAlign: 'end' }}
      column={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 3, xxl: 4 }}
    />
  );
}
