import { Button, Dropdown, Space } from 'antd-v5';
import { simpleAntd } from '../_shared/data';

const items = simpleAntd(5);

export default function Demo() {
  return (
    <Space>
      <Dropdown menu={{ items }} trigger={['click']}>
        <Button>Click me</Button>
      </Dropdown>
      <Dropdown menu={{ items }} trigger={['hover']}>
        <Button>Hover me</Button>
      </Dropdown>
    </Space>
  );
}
