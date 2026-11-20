import { Descriptions } from 'antd';
import { three, toAntd } from '../_shared/data';

const items = toAntd(three);

export default function Demo() {
  return (
    <>
      <Descriptions items={items} title='User Info' layout='horizontal' column={1} style={{ marginBottom: 12 }} />
      <Descriptions items={items} title='User Info' layout='horizontal' column={1} styles={{ label: { textAlign: 'end' } }} />
    </>
  );
}
