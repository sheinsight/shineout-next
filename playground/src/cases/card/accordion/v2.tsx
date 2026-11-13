import { Card } from 'shineout-v2';
import { LONG_TEXT } from '../_shared/content';

// 原示例的 Body 背景用 3.x 的主题变量 --soui-neutral-fill-2，2.x 里没有这个变量，两个库统一用固定值
const bodyStyle = { background: '#f2f3f5' };

export default function Demo() {
  return (
    <Card.Accordion defaultActive={1}>
      {[1, 2, 3].map((n) => (
        <Card key={n}>
          <Card.Header>Card title {n}</Card.Header>
          <Card.Body style={bodyStyle}>{LONG_TEXT}</Card.Body>
        </Card>
      ))}
    </Card.Accordion>
  );
}
