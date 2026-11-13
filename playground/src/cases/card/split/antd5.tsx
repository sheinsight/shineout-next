import { Button, Card } from 'antd-v5';
import { antdProps } from '../../button/_shared/antd-map';
import { FooterIcons, TEXT } from '../_shared/content';

// antd 没有 split 属性，去掉标题下的分割线要靠覆盖 header 样式
export default function Demo() {
  return (
    <Card
      style={{ width: 360 }}
      styles={{ header: { borderBottom: 'none' } }}
      title='Card title'
      extra={<Button {...antdProps('primary', 'text')}>Text Button</Button>}
      actions={[<FooterIcons key='icons' />]}
    >
      {TEXT}
    </Card>
  );
}
