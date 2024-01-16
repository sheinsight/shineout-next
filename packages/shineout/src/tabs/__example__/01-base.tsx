/**
 * cn - 基本用法
 *    -- 选项卡的基本用法
 * en - Basic
 *    -- Basic usage of Tabs
 */
import { Tabs } from 'shineout';

export default () => {
  const tabs = [];
  for (let i = 0; i < 3; i++) {
    tabs.push({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` });
  }
  return (
    <div style={{ height: 100 }}>
      <Tabs shape='line' defaultActive={0}>
        {tabs.map((tab, index) => {
          return (
            <Tabs.Panel key={index} tab={tab.title}>
              <div style={{ padding: 16, height: '100%', fontSize: 14 }}>{tab.content}</div>
            </Tabs.Panel>
          );
        })}
      </Tabs>
    </div>
  );
};
