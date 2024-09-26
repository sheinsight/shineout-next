/**
 * cn - 滚动debug
 *    -- 当 Tabs 数量过多时，将自动开启滚动功能
 * en - Scroll
 *    -- When there are too many Tabs, the scroll function will be automatically enabled
 */
import { useEffect, useState } from 'react';
import { Tabs } from 'shineout';

export default () => {
  const [tabsData, setTabsData] = useState([{title: '111', content:" 1111"}]);

  useEffect(() => {
    setTimeout(() => {
      const tabs = [];
      for (let i = 0; i < 100; i++) {
        tabs.push({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` });
      }
      setTabsData(tabs);
    }, 3000);
  }, [])


  return (
    <div style={{ height: 100, width: 300 }}>
      <Tabs shape='line' defaultActive={0}>
        {tabsData.map((tab, index) => {
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
