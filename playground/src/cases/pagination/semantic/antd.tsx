import { Pagination } from 'antd';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Pagination
        total={200}
        defaultCurrent={3}
        showQuickJumper
        showSizeChanger
        classNames={{ root: 'my-pagination' }}
        styles={{ item: { borderRadius: '50%' } }}
      />
      <Pagination
        total={100}
        defaultCurrent={1}
        showSizeChanger={false}
        styles={{
          root: { padding: '8px 16px', background: '#f5f5f5', borderRadius: 4 },
          item: { fontWeight: 500 },
        }}
      />
    </div>
  );
}
