import { Card } from 'antd';

// antd 只有 hoverable（悬浮时显示阴影），没有「常驻阴影」，Always 那张没有实现
const cardStyle = { width: 140, display: 'inline-flex', marginInlineEnd: 20 };

export default function Demo() {
  return (
    <div>
      <Card style={cardStyle}>Never</Card>
      <Card style={cardStyle} hoverable>
        Hover
      </Card>
    </div>
  );
}
