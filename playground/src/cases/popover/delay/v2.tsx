import { Button, Popover } from 'shineout-v2';

export default function Demo() {
  return (
    <Button outline>
      <Popover mouseEnterDelay={200} mouseLeaveDelay={1000}>
        Some text
      </Popover>
      Hover
    </Button>
  );
}
