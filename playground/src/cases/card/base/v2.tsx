import { Card } from 'shineout-v2';
import { FooterIcons, TEXT } from '../_shared/content';

export default function Demo() {
  return (
    <Card style={{ width: 360 }}>
      <Card.Header>Card title</Card.Header>
      <Card.Body>{TEXT}</Card.Body>
      <Card.Footer>
        <FooterIcons />
      </Card.Footer>
    </Card>
  );
}
