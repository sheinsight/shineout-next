import { Button, Tooltip } from 'antd-v5';

export default function Demo() {
  return (
    <Tooltip title='Tip message has no arrow.' arrow={false}>
      <Button type='primary'>hover me</Button>
    </Tooltip>
  );
}
