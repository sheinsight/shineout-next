import { Tabs } from 'shineout-v3';

export default function Demo() {
  return (
    <Tabs
      defaultActive={0}
      shape='line'
      extra='Extra'
      styles={{
        header: { background: '#fafafa' },
        tab: { fontWeight: 500 },
        panel: { padding: 16 },
        extra: { color: '#1890ff' },
        ink: { background: '#1890ff', height: 3 },
      }}
    >
      <Tabs.Panel tab='Tab 1'>Content of Tab 1</Tabs.Panel>
      <Tabs.Panel tab='Tab 2'>Content of Tab 2</Tabs.Panel>
      <Tabs.Panel tab='Tab 3'>Content of Tab 3</Tabs.Panel>
    </Tabs>
  );
}
