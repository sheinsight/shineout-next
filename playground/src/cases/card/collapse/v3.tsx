import { Card, DatePicker } from 'shineout-v3';

export default function Demo() {
  return (
    <Card collapsible>
      <Card.Header>Card title</Card.Header>
      <Card.Body>
        <div>
          <DatePicker />
        </div>
      </Card.Body>
    </Card>
  );
}
