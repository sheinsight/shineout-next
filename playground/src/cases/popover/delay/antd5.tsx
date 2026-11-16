import { Button, Popover } from 'antd-v5';

export default function Demo() {
  return (
    <Popover mouseEnterDelay={0.2} mouseLeaveDelay={1} content='Some text' placement='bottomLeft'>
      <Button>Hover</Button>
    </Popover>
  );
}
