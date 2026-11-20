import { Collapse } from 'antd';
import { TEXT } from '../_shared/content';

const inner = [
  { key: '1', label: 'This is panel nest header 2', children: TEXT },
  { key: '2', label: 'This is panel nest header 3', children: TEXT },
];

const items = [
  { key: '0', label: 'This is panel header 1', children: <Collapse defaultActiveKey={['1']} items={inner} /> },
  { key: '3', label: 'This is panel header 2', children: TEXT },
  { key: '4', label: 'This is panel header 3', children: TEXT },
  { key: '5', label: 'This is panel header 4', children: TEXT },
];

export default function Demo() {
  return <Collapse defaultActiveKey={['0']} style={{ maxWidth: 1180 }} items={items} />;
}
