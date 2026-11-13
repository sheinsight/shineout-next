import { Collapse } from 'antd';

// 节点对应：content ↔ body；extra 在 antd 里没有单独的语义化节点，省略
export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Collapse
        defaultActiveKey={['1']}
        styles={{
          root: { borderRadius: 8 },
          header: { background: '#fafafa' },
          title: { fontWeight: 600 },
          body: { padding: '16px 24px', color: '#333' },
          icon: { color: '#1890ff' },
        }}
        items={[
          { key: '1', label: 'Panel Title 1', extra: 'Extra', children: 'Content of panel 1 with semantic styles.' },
          { key: '2', label: 'Panel Title 2', children: 'Content of panel 2 with semantic styles.' },
        ]}
      />

      <Collapse
        defaultActiveKey={['1']}
        expandIconPlacement='end'
        styles={{
          header: { background: '#f0f7ff' },
          icon: { color: '#52c41a' },
        }}
        items={[
          { key: '1', label: 'Right Icon', extra: 'Hint', children: 'Icon on the right side with semantic styles.' },
          { key: '2', label: 'Another Panel', extra: 'Info', children: 'Another panel content.' },
        ]}
      />
    </div>
  );
}
