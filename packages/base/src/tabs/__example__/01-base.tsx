/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import { Tabs } from '@sheinx/base';
import { useTabsStyle } from '@sheinx/shineout-style';

export default () => {
  const tabsStyle = useTabsStyle();
  return (
    <div>
      <Tabs jssStyle={{ tabs: tabsStyle }} active={0}>
        <Tabs.Panel tab='1'>111</Tabs.Panel>
        <Tabs.Panel tab='2'>222</Tabs.Panel>
        <Tabs.Panel tab='3'>333</Tabs.Panel>
        <Tabs.Panel tab='4'>444</Tabs.Panel>
        <Tabs.Panel tab='5'>555</Tabs.Panel>
      </Tabs>
    </div>
  );
};
