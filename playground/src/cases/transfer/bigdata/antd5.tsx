import { Transfer } from 'antd-v5';
import { makeItems } from '../_shared/data';

const data = makeItems(5000).map((d) => ({ key: d.id, title: d.name }));

export default function Demo() {
  return <Transfer dataSource={data} render={(item) => item.title} listStyle={{ height: 274, width: 200 }} targetKeys={[]} />;
}
