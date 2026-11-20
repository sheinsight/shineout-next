import { Card } from 'shineout-v2';
import { FooterIcons, TEXT } from '../_shared/content';

const CSS = `
.bench-card-lift { transition-property: all; }
.bench-card-lift:hover { transform: translateY(-4px); }
`;

const HoverCard = ({ className }: { className?: string }) => (
    <Card style={{ width: 360, display: 'inline-flex', margin: 16 }} shadow='hover' className={className}>
      <Card.Header>Card title</Card.Header>
      <Card.Body>{TEXT}</Card.Body>
      <Card.Footer>
        <FooterIcons />
      </Card.Footer>
    </Card>
);

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', margin: -16 }}>
      <style>{CSS}</style>
      <HoverCard />
      <HoverCard className='bench-card-lift' />
    </div>
  );
}
