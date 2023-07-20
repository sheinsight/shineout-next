/**
 * cn - 多级下拉
 *    -- 带有多个下钻层级菜单的下拉框, 在 data 中设置 children 属性即可
 * en - Multi-level
 *   -- Dropdown with multiple levels of menu, set the children property in data.
 */
import React from 'react';
import { Dropdown } from 'shineout';

const menu = new Array(5).fill(null).map((_, index) => ({
  id: `${index}`,
  content: `item${index}`,
  children: new Array(5).fill(null).map((_, i) => ({
    id: `${index}-${i}`,
    content: `item${index}-${i}`,
  })),
}));

const App: React.FC = () => <Dropdown data={menu} placeholder={'Dropdown'} />;

export default App;
