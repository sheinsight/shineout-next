import { Tag } from 'shineout-v3';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <Tag
          color='info'
          styles={{
            root: { borderRadius: 16, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
            wrapper: { padding: '0 12px', fontWeight: 500 },
          }}
        >
          Custom Root &amp; Wrapper
        </Tag>
        <Tag color='success' classNames={{ root: 'custom-tag-root' }} styles={{ root: { border: '2px solid #52c41a' } }}>
          Root border
        </Tag>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Tag color='warning' onClose styles={{ closeIcon: { color: '#fa8c16', fontSize: 14 } }}>
          Close Style
        </Tag>
        <Tag
          color='danger'
          onClose
          styles={{ root: { borderRadius: 4 }, wrapper: { padding: '0 8px' }, closeIcon: { color: '#ff4d4f' } }}
        >
          All Slots
        </Tag>
      </div>
    </div>
  );
}
