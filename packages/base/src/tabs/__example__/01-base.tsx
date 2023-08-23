/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import { useState } from 'react';
import { Tabs } from '@sheinx/base';
import { useTabsStyle } from '@sheinx/shineout-style';

export default () => {
  const [active, setActive] = useState(0);
  const tabsStyle = useTabsStyle();
  const tabs = [];

  for (let i = 0; i < 20; i++) {
    tabs.push({ title: `选项卡 ${i + 1}`, content: `Content of Tab ${i + 1}` });
  }

  const handleChange = (v: any) => {
    setActive(v);
  };

  return (
    <div>
      <Tabs
        jssStyle={{ tabs: tabsStyle }}
        onChange={handleChange}
        active={active}
        shape='card'
        autoFill
        collapsible
        // hideSplit
        style={{ height: 200 }}
        position='top-left'
        // position='left-top'
        // position='right-top'
        // position='bottom-left'
      >
        {tabs.map((tab, index) => {
          return (
            <Tabs.Panel key={index} tab={tab.title} jssStyle={{ tabs: tabsStyle }}>
              <div style={{ padding: 5, height: '100%' }}>{tab.content}</div>
            </Tabs.Panel>
          );
        })}
      </Tabs>
    </div>
  );
};
