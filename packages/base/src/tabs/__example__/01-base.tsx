/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import { useState } from 'react';
import { Tabs } from '@sheinx/base';
import { useTabsStyle, useButtonStyle } from '@sheinx/shineout-style';

export default () => {
  const [active, setActive] = useState(3);
  const tabsStyle = useTabsStyle();
  const buttonStyle = useButtonStyle();

  const tabs = [];

  for (let i = 0; i < 25; i++) {
    tabs.push({ title: `选项卡 ${i + 1}`, content: `Content of Tab ${i + 1}` });
  }

  const handleChange = (v: any) => {
    setActive(v);
  };

  return (
    <div style={{ height: 200 }}>
      <Tabs
        jssStyle={{ tabs: tabsStyle, button: buttonStyle }}
        onChange={handleChange}
        active={active}
        shape='button'
        autoFill
        defaultActive={2}
        // splitColor='red'
        // collapsible
        // hideSplit
        // defaultCollapsed
        // position='top-left'
        // tabBarStyle={{ color: 'red' }}
        // position='left-top'
        // position='left-bottom'
        position='right-top'
        // position='right-bottom'
        // position='bottom-right'
        // position='bottom-left'
        // position='top-right'
        // position='top-left'
      >
        {tabs.map((tab, index) => {
          return (
            <Tabs.Panel
              key={index}
              tab={tab.title}
              jssStyle={{ tabs: tabsStyle, button: buttonStyle }}
            >
              <div style={{ padding: 5, height: '100%' }}>{tab.content}</div>
            </Tabs.Panel>
          );
        })}
      </Tabs>
    </div>
  );
};
