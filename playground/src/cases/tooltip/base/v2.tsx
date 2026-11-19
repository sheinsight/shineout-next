import { Button, Tooltip } from 'shineout-v2';

export default function Demo() {
  return (
    <Tooltip tip='hello world' trigger='hover'>
      <Button type='primary'>hover me</Button>
    </Tooltip>
  );
}
