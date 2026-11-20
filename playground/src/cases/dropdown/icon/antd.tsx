import { Button, Dropdown } from 'antd';
import { UserIcon } from '../_shared/data';

const items = Array.from({ length: 5 }, (_, i) => ({
  key: String(i),
  label: `item${i}`,
  icon: <UserIcon />,
}));

export default function Demo() {
  return (
    <Dropdown menu={{ items }}>
      <Button>Icon Menu</Button>
    </Dropdown>
  );
}
