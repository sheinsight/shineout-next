import { Button, Checkbox, Collapse } from 'antd';
import { MoreIcon, TEXT } from '../_shared/content';

const items = [
  { key: '0', label: 'This is panel header 1', children: TEXT, extra: <MoreIcon /> },
  { key: '1', label: 'This is panel header 2', children: TEXT, extra: <Checkbox style={{ margin: 0 }}>checkbox</Checkbox> },
  {
    key: '2',
    label: 'This is panel header 3',
    children: TEXT,
    extra: (
      <Button type='primary' size='small'>
        Button
      </Button>
    ),
  },
];

export default function Demo() {
  return <Collapse defaultActiveKey={['1']} style={{ maxWidth: 1180 }} items={items} />;
}
