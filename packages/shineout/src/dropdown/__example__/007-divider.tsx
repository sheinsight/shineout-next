/**
 * cn - 带分割线下拉菜单
 *    -- 通过在数据项配置 divider:true 可以在菜单中添加分割线
 * en - Divider
 *    -- Add a divider to the menu by setting divider:true in the data item
 */
import React from 'react';
import { Dropdown, TYPE } from 'shineout';

type DropdownItem = TYPE.Dropdown.Item;

const menu: DropdownItem[] = [
  {
    content: 'First',
  },
  {
    content: 'Second',
  },
  {
    content: 'Third',
    divider: true,
  },
  {
    content: 'Fourth',
  },
];

const App: React.FC = () => (
  <Dropdown data={menu} placeholder={'Dividing Line'} position='bottom-left' />
);

export default App;
