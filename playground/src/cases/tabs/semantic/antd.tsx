import { Tabs } from 'antd';

export default function Demo() {
  return (
    <Tabs
      defaultActiveKey='0'
      type='line'
      tabBarExtraContent='Extra'
      styles={{
        header: { background: '#fafafa' },
        item: { fontWeight: 500 },
        content: { padding: 16 },
        indicator: { background: '#1890ff', height: 3 },
      }}
      items={[
        { key: '0', label: 'Tab 1', children: 'Content of Tab 1' },
        { key: '1', label: 'Tab 2', children: 'Content of Tab 2' },
        { key: '2', label: 'Tab 3', children: 'Content of Tab 3' },
      ]}
    />
  );
}
