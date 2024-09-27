/**
 * cn - Tab nest
 *    -- 嵌套使用
 * en - Tab nest
 *    -- Nest usage
 */
import React from 'react';
import { Tabs } from 'shineout';

export default () => {
   const [outerIndex, setOuterIndex] = React.useState(0);
   const [innerIndex, setInnerIndex] = React.useState([0, 0]);
  return (
    <div style={{ height: 100 }}>
      <Tabs active={outerIndex} onChange={setOuterIndex}>
        <Tabs.Panel tab="home">
          <Tabs
            shape="line"
            active={innerIndex[0]} onChange={v => {
            setInnerIndex([v, innerIndex[1]]);
          }}>
              <Tabs.Panel tab="111">111</Tabs.Panel>
              <Tabs.Panel tab="222">222</Tabs.Panel>
              <Tabs.Panel tab="333">333</Tabs.Panel>
          </Tabs>
        </Tabs.Panel>
        <Tabs.Panel tab="demo">
          <Tabs
            shape="line"
            active={innerIndex[1]} onChange={v => {
            setInnerIndex([innerIndex[0], v]);
          }}>
              <Tabs.Panel tab="aaa">aaa</Tabs.Panel>
              <Tabs.Panel tab="bbb">bbb</Tabs.Panel>
          </Tabs>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
