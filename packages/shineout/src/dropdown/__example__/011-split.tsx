/**
 * cn - 组合
 *    -- 在 Button.Group 中组合使用，通常用于隐藏一组按钮中不太常用的选项
 * en - Group
 *    -- Dropdown can be combined with Button used in Button.Group.
 */
import React from 'react';
import { Button, Dropdown, TYPE } from 'shineout';

type DropdownItem = TYPE.Dropdown.Item;

const menu: DropdownItem[] = [
  {
    content: 'First',
  },
  {
    content: 'Second',
    target: '_blank',
    url: 'http://www.google.com',
  },
];

const App: React.FC = () => (
  <>
    <Button.Group mode={'outline'} type={'secondary'}>
      <Button>Option</Button>
      <Button>Option</Button>
      <Dropdown
        data={menu}
        position='bottom-right'
        onClick={(data: any) => console.info(`The Dropdown clicked ${data.content}.`)}
      />
    </Button.Group>
    <Button.Group outline type={'secondary'} style={{ marginTop: 12 }}>
      <Button disabled>Option</Button>
      <Button disabled>Option</Button>
      <Dropdown
        disabled
        data={menu}
        position='bottom-right'
        placeholder={'Dropdown'}
        onClick={(data: any) => console.info(`The Dropdown clicked ${data.content}.`)}
      />
    </Button.Group>
  </>
);

export default App;
