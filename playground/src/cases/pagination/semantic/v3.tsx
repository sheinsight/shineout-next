import { Pagination } from 'shineout-v3';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Pagination
        total={200}
        defaultCurrent={3}
        layout={['links', 'jumper', 'list']}
        text={{ jumper: 'Go to {input}' }}
        classNames={{ root: 'my-pagination', prev: 'my-prev', next: 'my-next' }}
        styles={{
          item: { borderRadius: '50%' },
          jumper: { marginLeft: 16 },
          sizeList: { marginLeft: 16 },
        }}
      />
      <Pagination
        total={100}
        defaultCurrent={1}
        layout={['links']}
        styles={{
          root: { padding: '8px 16px', background: '#f5f5f5', borderRadius: 4 },
          prev: { color: '#1890ff' },
          next: { color: '#1890ff' },
          item: { fontWeight: 500 },
        }}
      />
    </div>
  );
}
