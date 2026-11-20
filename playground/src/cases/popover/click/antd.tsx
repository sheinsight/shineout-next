import { Button, Popover } from 'antd';

export default function Demo() {
  return (
    <Popover trigger='click' content='hello shineout' placement='bottomLeft'>
      <Button>Click me</Button>
    </Popover>
  );
}
