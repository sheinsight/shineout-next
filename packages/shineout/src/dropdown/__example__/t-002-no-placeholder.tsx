/**
 * cn - no-placeholder
 *    -- no-placeholder
 * en - no-placeholder
 *   -- no-placeholder
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
    <>
      <Dropdown data={data} onClick={console.log} />
      <Dropdown data={data} disabled />
    </>
  );
};

export default App;
