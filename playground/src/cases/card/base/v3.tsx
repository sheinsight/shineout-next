import { Button, Card } from 'shineout-v3';
import { FooterIcons, TEXT } from '../_shared/content';

export default function Demo() {
  return (
    <Card style={{ width: 360 }} split>
      <Card.Header
        extra={
          <Button mode='text' type='primary'>
            Text Button
          </Button>
        }
      >
        Card title
      </Card.Header>
      <Card.Body>{TEXT}</Card.Body>
      <Card.Footer>
        <FooterIcons />
      </Card.Footer>
    </Card>
  );
}
