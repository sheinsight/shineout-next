import { Tabs } from 'antd-v5';

const tabs = Array.from({ length: 3 }, (_, i) => ({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` }));

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ height: 100 }}>
        <Tabs
          type='line'
          defaultActiveKey='0'
          items={tabs.map((tab, index) => ({ key: String(index), label: tab.title, children: <div style={{ padding: 16, height: '100%', fontSize: 14 }}>{tab.content}</div> }))}
        />
      </div>
      <div style={{ height: 100 }}>
        <Tabs
          type='card'
          defaultActiveKey='0'
          items={tabs.map((tab, index) => ({ key: String(index), label: tab.title, children: <div style={{ padding: 16, height: '100%', fontSize: 14 }}>{tab.content}</div> }))}
        />
      </div>
    </div>
  );
}
