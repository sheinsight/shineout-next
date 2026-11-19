import { Button, Tooltip } from 'antd';

export default function Demo() {
  return (
    <Tooltip title='Tip message has no arrow.' arrow={false}>
      <Button type='primary'>hover me</Button>
    </Tooltip>
  );
}
