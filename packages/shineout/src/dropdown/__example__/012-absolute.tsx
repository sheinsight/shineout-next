/**
 * cn - 绝对定位
 *    -- 如果选项弹出层的父容器被遮挡，可以设置 absolute 属性使弹出选项在单独层中渲染
 * en - Absolute
 *    -- If the parent container of the pop-up layer is occluded, you can set the absolute property to make the pop-up options rendered in a separate layer
 */
import React from 'react';
import { Dropdown, TYPE } from 'shineout';

type DropdownItem = TYPE.Dropdown.Item;

const data: DropdownItem[] = [
  {
    content:
      'subMenu',
    children: [
      {
        content: 'Link to Google',
        target: '_blank',
        url: 'https://google.com',
      },
      {
        content: 'Disabled',
        disabled: true,
      },
    ],
  },
  <a href='/' key={'home'}>
    Home
  </a>,
  {
    content: 'Message',
    onClick: () => {
      console.info('Some message.');
    },
  },
];

const App: React.FC = () => (
  <div style={{ background: '#eee', padding: 20, borderRadius: 4, overflow: 'hidden' }}>
    <Dropdown
      mode="outline"
      type={'primary'}
      absolute
      placeholder='Absolute'
      data={data}
    />

    <Dropdown
      outline
      type={'primary'}
      placeholder='Default'
      data={data}
      style={{ marginInlineStart: 24 }}
    />
  </div>
);

export default App;
