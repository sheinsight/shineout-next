import { Tabs } from 'shineout-v2';

const tabs = Array.from({ length: 3 }, (_, i) => ({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` }));

export default function Demo() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <div style={{ height: 150 }}>
        <Tabs shape='line'  defaultActive={0}>
          {tabs.map((tab, index) => (
            <Tabs.Panel key={index} tab={tab.title}>
              <div style={{ padding: 16, fontSize: 14 }}>{tab.content}</div>
            </Tabs.Panel>
          ))}
        </Tabs>
      </div>
      <div style={{ height: 150 }}>
        <Tabs shape='line' align='bottom' defaultActive={0}>
          {tabs.map((tab, index) => (
            <Tabs.Panel key={index} tab={tab.title}>
              <div style={{ padding: 16, fontSize: 14 }}>{tab.content}</div>
            </Tabs.Panel>
          ))}
        </Tabs>
      </div>
      <div style={{ height: 150 }}>
        <Tabs shape='line' align='vertical-left' defaultActive={0}>
          {tabs.map((tab, index) => (
            <Tabs.Panel key={index} tab={tab.title}>
              <div style={{ padding: 16, fontSize: 14 }}>{tab.content}</div>
            </Tabs.Panel>
          ))}
        </Tabs>
      </div>
      <div style={{ height: 150 }}>
        <Tabs shape='line' align='vertical-right' defaultActive={0}>
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
