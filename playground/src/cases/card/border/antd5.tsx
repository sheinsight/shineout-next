import { Button, Card } from 'antd-v5';
import { antdProps } from '../../button/_shared/antd-map';
import { TEXT } from '../_shared/content';

export default function Demo() {
  return (
    <div style={{ padding: 32, background: '#f4f5f8' }}>
      <Card
        style={{ width: 360 }}
        variant='borderless'
        title='Card title'
        extra={<Button {...antdProps('primary', 'text')}>Text Button</Button>}
      >
        {TEXT}
      </Card>
    </div>
  );
}
