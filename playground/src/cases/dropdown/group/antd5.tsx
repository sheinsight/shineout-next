import { Button, Dropdown } from 'antd-v5';

const items = [
  { type: 'group' as const, label: 'group0', children: [{ key: '0', label: 'item0' }] },
  { key: '1', label: 'item1' },
  { type: 'group' as const, label: 'group1', children: [{ key: '2', label: 'item2' }] },
  { key: '3', label: 'item3' },
];

export default function Demo() {
  return (
    <Dropdown menu={{ items }}>
      <Button>Group Menu</Button>
    </Dropdown>
  );
}
