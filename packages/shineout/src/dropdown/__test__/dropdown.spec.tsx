import { render, cleanup, screen } from '@testing-library/react';
import Dropdown from '..';
import { TYPE } from 'shineout';
import mountTest from '../../tests/mountTest';
import { baseTest } from '../../tests/utils';

const SO_PREFIX = 'dropdown';
const dropdownClassName = `.${SO_PREFIX}-wrapper-0-2-1`;

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

afterEach(cleanup);
mountTest(Dropdown);
describe('Dropdown[Base]', () => {
  //TODO: 没有displayname
  // displayTest(Dropdown, '')
  // baseTest(Dropdown, dropdownClassName, undefined, undefined, undefined, data)
  baseTest(
    <Dropdown
      placeholder='Dropdown'
      data={data}
      className='demo'
      style={{ backgroundColor: 'red' }}
    />,
    dropdownClassName,
  );
  // test('should show', () => {
  //   const { container } = render()
  // })
  test('should render', () => {
    const clickFn = jest.fn();
    render(<Dropdown placeholder='Dropdown' data={data} onClick={clickFn} />);
    screen.debug();
  });
});
