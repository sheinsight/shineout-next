/**
 * cn - 基本用法
 *    -- Dropdown 通过数据来渲染，支持 json 格式数据、React 组件
 * en - Base
 *   -- Dropdown is rendered through data and supports json formatted data and React components.
 */
import React from 'react';
import { Dropdown, TYPE } from 'shineout';

type DropdownItem = TYPE.Dropdown.Item;
const data: DropdownItem[] = [
  {
    content: 'SubmenuSubmenuSubmenuSubm',
    children: [
      {
        content: 'Link to GoogleLink to GoogleLink to GoogleLink to GoogleLink to Google',
        target: '_blank',
        url: 'https://google.com',
      },
      {
        content: 'Disabled',
        disabled: true,
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
    <div
      style={{
        width: 300,
        height: 300,
        position: 'relative',
        background: '#ccc',
        overflow: 'auto',
      }}
      id='nice'
    >
      <div style={{ width: 600 }}></div>
      <Dropdown
        style={{ marginLeft: 200 }}
        position={'bottom-right'}
        absolute={() => document.querySelector('#nice')}
        placeholder='Dropdown'
        data={data}
        onClick={console.log}
      />
    </div>
  );
};

export default App;
