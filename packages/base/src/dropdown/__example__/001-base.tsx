/**
 * cn - 基本用法
 *    -- Dropdown 通过数据来渲染，支持 json 格式数据、React 组件
 * en - Base
 *    -- Dropdown is rendered through data and supports json formatted data and React components.
 */
import React from 'react';
import { Dropdown, DropdownItem } from '@sheinx/base';
import { useAnimationListStyle, useButtonStyle, useDropdownStyle } from '@sheinx/shineout-style';

const data: DropdownItem[] = [
  {
    content: 'SubmenuSubmenuSubmenuSubmenuSubmenu',
    children: [
      {
        content: 'Link to Google',
        children: [
          {
            content: 'Link to Google',
          },
          {
            content: 'Disabled',
            disabled: true,
          },
          {
            content: '666',
          },
        ],
      },
      {
        content: 'Disabled',
        disabled: true,
      },
      {
        content: '666',
      },
    ],
  },
  <a key='home' href='/'>
    Home
  </a>,
  {
    content: 'Message',
    children: [
      {
        content: 'shuai',
      },
      {
        content: 'kukuku',
        disabled: true,
      },
      {
        content: 'memem666',
      },
    ],
  },
];

const App: React.FC = () => {
  const animationListStyle = useAnimationListStyle();
  const dropdownStyle = useDropdownStyle();
  const buttonStyle = useButtonStyle();
  return (
    <Dropdown
      jssStyle={{
        dropdown: dropdownStyle,
        animationList: animationListStyle,
        button: buttonStyle,
      }}
      position={'bottom'}
      trigger='click'
      placeholder='Dropdown'
      data={data}
    />
  );
};

export default App;
