/**
 * cn - 
 *    -- 设置 `shape = "card"` 标签页显示为卡片式
 * en - 
 *    -- Set `shape = "card"` to show tabs as card
 */
import { Tabs } from 'shineout';

export default () => {
  const tabs: any[] = [];
  for (let i = 0; i < 3; i++) {
    tabs.push({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` });
  }

  return (
    <div style={{ height: 100 }}>
      <Tabs shape={'card'} defaultActive={0}>
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
