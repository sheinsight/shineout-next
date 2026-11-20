import { Button, Dropdown } from 'antd-v5';
import { nestedAntd } from '../_shared/data';

const items = nestedAntd.slice(0, 2);

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, width: 700 }}>
      <Dropdown menu={{ items }} placement='bottomLeft'>
        <Button>Bottom left</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement='bottom'>
        <Button>Bottom</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement='bottomRight'>
        <Button>Bottom right</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement='topLeft'>
        <Button>Top Left</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement='top'>
        <Button>Top</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement='topRight'>
        <Button>Top right</Button>
      </Dropdown>
    </div>
  );
}
