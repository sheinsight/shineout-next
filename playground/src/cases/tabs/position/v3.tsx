import { Tabs } from 'shineout-v3';

const tabs = Array.from({ length: 3 }, (_, i) => ({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` }));

export default function Demo() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <div style={{ height: 150 }}>
        <Tabs shape='line' position='top-left' defaultActive={0}>
          {tabs.map((tab, index) => (
            <Tabs.Panel key={index} tab={tab.title}>
              <div style={{ padding: 16, fontSize: 14 }}>{tab.content}</div>
            </Tabs.Panel>
          ))}
        </Tabs>
      </div>
      <div style={{ height: 150 }}>
        <Tabs shape='line' position='bottom-left' defaultActive={0}>
          {tabs.map((tab, index) => (
            <Tabs.Panel key={index} tab={tab.title}>
              <div style={{ padding: 16, fontSize: 14 }}>{tab.content}</div>
            </Tabs.Panel>
          ))}
        </Tabs>
      </div>
      <div style={{ height: 150 }}>
        <Tabs shape='line' position='left-top' defaultActive={0}>
          {tabs.map((tab, index) => (
            <Tabs.Panel key={index} tab={tab.title}>
              <div style={{ padding: 16, fontSize: 14 }}>{tab.content}</div>
            </Tabs.Panel>
          ))}
        </Tabs>
      </div>
      <div style={{ height: 150 }}>
        <Tabs shape='line' position='right-top' defaultActive={0}>
          {tabs.map((tab, index) => (
            <Tabs.Panel key={index} tab={tab.title}>
              <div style={{ padding: 16, fontSize: 14 }}>{tab.content}</div>
            </Tabs.Panel>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
