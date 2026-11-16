import { Button, Popover } from 'antd';

export default function Demo() {
  return (
    <Popover mouseEnterDelay={0.2} mouseLeaveDelay={1} content='Some text' placement='bottomLeft'>
      <Button>Hover</Button>
    </Popover>
  );
}
