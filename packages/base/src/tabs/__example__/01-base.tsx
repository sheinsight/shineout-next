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
  const tabs = [
    { title: '选项卡 1', content: 'Content of Tab 1' },
    { title: '选项卡 2', content: 'Content of Tab 2' },
    { title: '选项卡 3', content: 'Content of Tab 3' },
    { title: '选项卡 4', content: 'Content of Tab 4' },
    { title: '选项卡 5', content: 'Content of Tab 5' },
  ];

  const handleChange = (v: any) => {
    setActive(v);
  };

  return (
    <div>
      <Tabs jssStyle={{ tabs: tabsStyle }} onChange={handleChange} active={active}>
        {tabs.map((tab, index) => {
          return (
            <Tabs.Panel key={index} tab={tab.title} jssStyle={{ tabs: tabsStyle }}>
              {tab.content}
            </Tabs.Panel>
          );
        })}
      </Tabs>
    </div>
  );
};
