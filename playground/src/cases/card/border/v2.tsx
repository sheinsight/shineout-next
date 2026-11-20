import { Card } from 'shineout-v2';
import { TEXT } from '../_shared/content';

export default function Demo() {
  return (
    <div style={{ padding: 32, background: '#f4f5f8' }}>
      <Card style={{ width: 360, border: 'none' }}>
        <Card.Header>Card title</Card.Header>
        <Card.Body>{TEXT}</Card.Body>
      </Card>
    </div>
  );
}
