import { Button, Tooltip } from 'shineout-v3';

export default function Demo() {
  return (
    <Tooltip tip='Tip message has no arrow.' showArrow={false} persistent>
      <Button type='primary'>hover me</Button>
    </Tooltip>
  );
}
