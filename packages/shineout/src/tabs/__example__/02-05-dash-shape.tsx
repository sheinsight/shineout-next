/**
 * cn - 
 *    -- 设置 `shape = "dash"` 标签页显示为短线
 * en - 
 *    -- Set `shape = "dash"` to show tabs as dash
 */
import { Tabs } from 'shineout';

export default () => {
  const tabs: any[] = [];
  for (let i = 0; i < 3; i++) {
    tabs.push({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` });
  }

  return (
    <div style={{ height: 100 }}>
      <Tabs shape={'dash'} defaultActive={0}>
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
