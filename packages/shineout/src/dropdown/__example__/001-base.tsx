/**
 * cn - 基本用法
 *    -- Dropdown 通过数据来渲染，支持 json 格式数据、React 组件
 * en - Base
 *   -- Dropdown is rendered through data and supports json formatted data and React components
 */
import React from 'react';
import { Dropdown, TYPE } from 'shineout';

type DropdownItem = TYPE.Dropdown.Item;
const data: DropdownItem[] = [
  {
    content: 'Submenu',
    children: [
      {
        content: 'Link to Google',
        target: '_blank',
        url: 'https://google.com',
      },
      {
        content: <div style={{cursor: 'not-allowed'}}>Disabled</div>,
        disabled: true,
        children: [
          { content: 'Child 1' },
          { content: 'Child 2' },
        ],
      },
    ],
  },
  <a key={'link'} href='/'>
    Home
  </a>,
  {
    content: 'Message',
    onClick: () => {
      console.info('Some message.');
    },
  },
];

const App: React.FC = () => {
  return (
    <>
      <Dropdown placeholder='Click me' data={data} onClick={console.log} />
      <Dropdown placeholder='Click me' data={data} disabled />
    </>
  );
};

export default App;
