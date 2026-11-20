import { Card } from 'shineout-v3';

const cardStyle = { width: 140, display: 'inline-flex', marginInlineEnd: 20 };

export default function Demo() {
  return (
    <div>
      <Card style={cardStyle}>
        <Card.Body>Never</Card.Body>
      </Card>
      <Card style={cardStyle} shadow='hover'>
        <Card.Body>Hover</Card.Body>
      </Card>
      <Card style={cardStyle} shadow>
        <Card.Body>Always</Card.Body>
      </Card>
    </div>
  );
}
