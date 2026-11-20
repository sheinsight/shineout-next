import { Descriptions } from 'antd-v5';
import { longAddress, toAntd } from '../_shared/data';

const items = toAntd(longAddress);

export default function Demo() {
  return (
    <div>
      <Descriptions items={items} title='User Info' layout='horizontal' bordered style={{ marginBottom: 24 }} />
      <Descriptions items={items} title='User Info' layout='horizontal' bordered styles={{ label: { textAlign: 'end' } }} style={{ marginBottom: 24 }} />
      <Descriptions items={items} title='User Info' layout='vertical' bordered column={4} />
    </div>
  );
}
