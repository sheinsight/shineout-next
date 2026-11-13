import { Card } from 'shineout-v3';

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <Card
        style={{ width: 320 }}
        classNames={{ root: 'my-card' }}
        styles={{
          root: { borderRadius: 12 },
          header: { background: '#fafafa', borderRadius: '12px 12px 0 0' },
          headerContent: { fontWeight: 600, fontSize: 16 },
          headerExtra: { color: '#1890ff' },
          body: { padding: '16px 24px', color: '#333' },
          footer: { borderTop: '1px solid #f0f0f0' },
        }}
      >
        <Card.Header extra='More'>Card Title</Card.Header>
        <Card.Body>This is the card content area with semantic styles applied.</Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>
    </div>
  );
}
