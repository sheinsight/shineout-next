import { Button, Popover } from 'shineout-v2';

export default function Demo() {
  return (
    <Button outline>
      <Popover trigger='click'>hello shineout</Popover>
      Click me
    </Button>
  );
}
