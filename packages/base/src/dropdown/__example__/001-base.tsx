/**
 * cn - 基本用法
 *    -- Dropdown 通过数据来渲染，支持 json 格式数据、React 组件
 * en - Base
 *    -- Dropdown is rendered through data and supports json formatted data and React components.
 */
import React from 'react';
import { Dropdown, DropdownItem } from '@sheinx/base';
import { useAnimationListStyle, useDropdownStyle } from '@sheinx/shineout-style';

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
        content: 'Disabled',
        disabled: true,
      },
    ],
  },
  <a key='home' href='/'>
    Home
  </a>,
  {
    content: 'Message',
    onClick: () => {
      alert('Some message.');
    },
  },
];

const App: React.FC = () => {
  const animationListStyle = useAnimationListStyle();
  const dropdownStyle = useDropdownStyle();
  return (
    <Dropdown
      animationListJssStyle={animationListStyle}
      jssStyle={dropdownStyle}
      trigger='click'
      absolute
      placeholder='Dropdown'
      data={data}
    />
  );
};

export default App;
