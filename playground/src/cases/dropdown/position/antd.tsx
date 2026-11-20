import { Button, Dropdown } from 'antd';
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
      <Dropdown menu={{ items }} placement='rightTop'>
        <Button>Right Top</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement='leftTop'>
        <Button>Left Top</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement='right'>
        <Button>Right</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement='left'>
        <Button>Left</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement='rightBottom'>
        <Button>Right Bottom</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement='leftBottom'>
        <Button>Left Bottom</Button>
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
