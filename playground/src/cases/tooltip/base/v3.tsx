import { Button, Tooltip } from 'shineout-v3';

export default function Demo() {
  return (
    <Tooltip tip='hello world' trigger='hover'>
      <Button type='primary'>hover me</Button>
    </Tooltip>
  );
}
