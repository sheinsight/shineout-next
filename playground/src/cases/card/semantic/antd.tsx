import { Card } from 'antd';

// antd 6 的节点是 root / header / title / extra / body / actions / cover，没有 headerContent / footer，
// 按语义对应：headerContent → title，headerExtra → extra，footer → actions
export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <Card
        style={{ width: 320 }}
        title='Card Title'
        extra='More'
        actions={['Footer']}
        classNames={{ root: 'my-card' }}
        styles={{
          root: { borderRadius: 12 },
          header: { background: '#fafafa', borderRadius: '12px 12px 0 0' },
          title: { fontWeight: 600, fontSize: 16 },
          extra: { color: '#1890ff' },
          body: { padding: '16px 24px', color: '#333' },
          actions: { borderTop: '1px solid #f0f0f0' },
        }}
      >
        This is the card content area with semantic styles applied.
      </Card>
    </div>
  );
}
