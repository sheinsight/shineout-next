import { Collapse } from 'antd-v5';
import { TEXT } from '../_shared/content';

const items = [
  { key: '0', label: 'This is panel header 1', children: TEXT },
  { key: '1', label: 'This is panel header 2', children: TEXT },
  { key: '2', label: 'This is panel header 3 (simple=false)', children: TEXT },
];

export default function Demo() {
  return <Collapse defaultActiveKey={['0']} style={{ maxWidth: 1180 }} bordered={false} ghost items={items} />;
}
