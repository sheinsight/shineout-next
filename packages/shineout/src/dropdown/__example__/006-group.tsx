/**
 * cn - 分组菜单
 *    -- 通过在数据项配置 group 可以在菜单中添加分组
 * en - Group
 *   -- Add a group to the menu by setting group in the data item.
 */
import React from 'react';
import { Dropdown } from 'shineout';

const menu = new Array(6).fill(null).map((_, index) => ({
  id: `${index}`,
  content: `item${index}`,
  group: index % 3 === 0 ? `group${index / 3}` : undefined,
}));

const App: React.FC = () => <Dropdown data={menu} placeholder={'Dropdown'} />;

export default App;
