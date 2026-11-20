import { Button, Tooltip } from 'antd';

export default function Demo() {
  return (
    <Tooltip title='hello world' trigger='hover'>
      <Button type='primary'>hover me</Button>
    </Tooltip>
  );
}
