import { Collapse } from 'antd-v5';
import { TEXT } from '../_shared/content';

const items = [
  { key: '0', label: 'This is panel header 1', children: TEXT },
  { key: '1', label: 'This is panel header 2', children: TEXT },
  { key: '2', label: 'This is panel header 3', children: TEXT, collapsible: 'disabled' as const },
  { key: '3', label: 'This is panel header 4', children: TEXT, collapsible: 'disabled' as const },
];

export default function Demo() {
  return <Collapse defaultActiveKey={['1', '3']} style={{ maxWidth: 1180 }} items={items} />;
}
