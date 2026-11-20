import { Button, Card } from 'antd';
import { antdProps } from '../../button/_shared/antd-map';
import { FooterIcons, TEXT } from '../_shared/content';

export default function Demo() {
  return (
    <Card
      style={{ width: 360 }}
      title='Card title'
      extra={<Button {...antdProps('primary', 'text')}>Text Button</Button>}
      actions={[<FooterIcons key='icons' />]}
    >
      {TEXT}
    </Card>
  );
}
