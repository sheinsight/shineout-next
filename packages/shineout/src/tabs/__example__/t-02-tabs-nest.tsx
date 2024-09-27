
/**
 * cn - Tabs嵌套
 *    -- Tabs嵌套
 * en - Tabs nested
 *    -- Tabs nested
 */
import React from 'react'
import { Tabs } from 'shineout';

export default () => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [innerTabIndex, setInnerTabIndex] = React.useState([0, 0]);
  console.log('======================')
  console.log('innerTabIndex: >>', innerTabIndex)
  console.log('======================')
  return (
    <div style={{ height: 100 }}>
      <Tabs shape='card' active={tabIndex} onChange={setTabIndex}>
        <Tabs.Panel tab="home">
          <Tabs shape='line' active={innerTabIndex[0]} onChange={v => setInnerTabIndex([v, innerTabIndex[1]])}>
            <Tabs.Panel tab="aaa">
              aaa
            </Tabs.Panel>
            <Tabs.Panel tab="bbb">
              bbb
            </Tabs.Panel>
            <Tabs.Panel tab="ccc">
              ccc
            </Tabs.Panel>
          </Tabs>
        </Tabs.Panel>
        <Tabs.Panel tab="demo">
          <Tabs shape='line' active={innerTabIndex[1]} onChange={v => setInnerTabIndex([innerTabIndex[0], v])}>
              <Tabs.Panel tab="111">
                111
              </Tabs.Panel>
              <Tabs.Panel tab="222">
                222
              </Tabs.Panel>
            </Tabs>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
