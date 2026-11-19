import { Button, Tabs } from 'shineout-v2';

const tabs = Array.from({ length: 3 }, (_, i) => ({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` }));

export default function Demo() {
  return (
    <div style={{ height: 100 }}>
      <Tabs shape='line' defaultActive={0} tabBarExtraContent={<Button text type='primary'>extra operation</Button>}>
        {tabs.map((tab, index) => (
          <Tabs.Panel key={index} tab={tab.title}>
            <div style={{ padding: 16, height: '100%', fontSize: 14 }}>{tab.content}</div>
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
}
