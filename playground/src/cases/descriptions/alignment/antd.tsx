import { Descriptions } from 'antd';
import { base, toAntd } from '../_shared/data';

const items = toAntd(base);

export default function Demo() {
  return (
    <div>
      <Descriptions items={items} title='User Info' layout='horizontal' style={{ marginBottom: 12 }} />
      <Descriptions items={items} title='User Info' layout='horizontal' styles={{ label: { textAlign: 'end' } }} style={{ marginBottom: 12 }} />
      <Descriptions items={items} title='User Info' layout='vertical' />
    </div>
  );
}
