import { Button, Dropdown } from 'antd';

const items = [
  { key: '1', label: 'First' },
  { key: '2', label: 'Second' },
  { key: '3', label: 'Third' },
  { type: 'divider' as const },
  { key: '4', label: 'Fourth' },
];

export default function Demo() {
  return (
    <Dropdown menu={{ items }} placement='bottomLeft'>
      <Button>Dividing Line</Button>
    </Dropdown>
  );
}
