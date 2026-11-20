import { Tabs } from 'antd-v5';

const tabs = Array.from({ length: 3 }, (_, i) => ({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` }));

export default function Demo() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <div style={{ height: 150 }}>
        <Tabs
          tabPosition='top'
          defaultActiveKey='0'
          items={tabs.map((tab, index) => ({ key: String(index), label: tab.title, children: <div style={{ padding: 16, fontSize: 14 }}>{tab.content}</div> }))}
        />
      </div>
      <div style={{ height: 150 }}>
        <Tabs
          tabPosition='bottom'
          defaultActiveKey='0'
          items={tabs.map((tab, index) => ({ key: String(index), label: tab.title, children: <div style={{ padding: 16, fontSize: 14 }}>{tab.content}</div> }))}
        />
      </div>
      <div style={{ height: 150 }}>
        <Tabs
          tabPosition='left'
          defaultActiveKey='0'
          items={tabs.map((tab, index) => ({ key: String(index), label: tab.title, children: <div style={{ padding: 16, fontSize: 14 }}>{tab.content}</div> }))}
        />
      </div>
      <div style={{ height: 150 }}>
        <Tabs
          tabPosition='right'
          defaultActiveKey='0'
          items={tabs.map((tab, index) => ({ key: String(index), label: tab.title, children: <div style={{ padding: 16, fontSize: 14 }}>{tab.content}</div> }))}
        />
      </div>
    </div>
  );
}
