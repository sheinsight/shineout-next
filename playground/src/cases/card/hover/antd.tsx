import { Button, Card } from 'antd';
import { antdProps } from '../../button/_shared/antd-map';
import { FooterIcons, TEXT } from '../_shared/content';

const CSS = `
.bench-card-lift { transition-property: all; }
.bench-card-lift:hover { transform: translateY(-4px); }
`;

const HoverCard = ({ className }: { className?: string }) => (
    <Card
      style={{ width: 360, display: 'inline-flex', flexDirection: 'column', margin: 16 }}
      title='Card title'
      extra={<Button {...antdProps('primary', 'text')}>Text Button</Button>}
      actions={[<FooterIcons key='icons' />]}
      hoverable
      className={className}
    >
      {TEXT}
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
