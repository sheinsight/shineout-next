import { Button, Popover } from 'shineout-v3';

export default function Demo() {
  return (
    <Button mode='outline'>
      <Popover mouseEnterDelay={200} mouseLeaveDelay={1000}>
        Some text
      </Popover>
      Hover
    </Button>
  );
}
