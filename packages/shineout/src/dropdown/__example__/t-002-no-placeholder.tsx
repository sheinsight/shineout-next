/**
 * cn - no-placeholder
 *    -- no-placeholder
 * en - no-placeholder
 *   -- no-placeholder
 */
import React from 'react';
import { Dropdown, TYPE } from 'shineout';

const moreIcon = <svg viewBox="0 0 24 24" width="24px" height="24px" style={{display: 'block'}}>
<path d="M4.00195 10C5.10652 10 6.00195 10.8954 6.00195 12C6.00195 13.1046 5.10652 14 4.00195 14C2.89738 14 2.00195 13.1046 2.00195 12C2.00195 10.8954 2.89738 10 4.00195 10ZM12.002 10C13.1065 10 14.002 10.8954 14.002 12C14.002 13.1046 13.1065 14 12.002 14C10.8974 14 10.002 13.1046 10.002 12C10.002 10.8954 10.8974 10 12.002 10ZM20.002 10C21.1065 10 22.002 10.8954 22.002 12C22.002 13.1046 21.1065 14 20.002 14C18.8974 14 18.002 13.1046 18.002 12C18.002 10.8954 18.8974 10 20.002 10Z"></path>
</svg>

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
      <Dropdown data={data} placeholder="Default" />
      <Dropdown data={data} placeholder={moreIcon} buttonShape="circle" hideArrow />
    </>
  );
};

export default App;
