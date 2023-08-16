/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Tabs } from '@sheinx/base';
import { useTabsStyle } from '@sheinx/shineout-style';

export default () => {
  const tabsStyle = useTabsStyle();
  return (
    <div>
      <Tabs jssStyle={{ tabs: tabsStyle }} />
    </div>
  );
};
