import { render, cleanup, screen } from '@testing-library/react';
import Dropdown from '..';
import { TYPE } from 'shineout';
import mountTest from '../../tests/mountTest';
import { baseTest, snapshotTest, displayTest } from '../../tests/utils';
import DropdownBase from '../__example__/001-base';
import DropdownHover from '../__example__/002-hover';
import DropdownPosition from '../__example__/003-position';
import DropdownButton from '../__example__/004-button';
import DropdownChildren from '../__example__/005-children';
import DropdownGroup from '../__example__/006-group';
import DropdownDivider from '../__example__/007-divider';
import DropdownColumns from '../__example__/008-columns';
import DropdownIcon from '../__example__/009-icon';
import DropdownSize from '../__example__/010-size';
import DropdownSplit from '../__example__/011-split';
import DropdownAbsolute from '../__example__/012-absolute';

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
mountTest(<Dropdown data={data} />);
describe('Dropdown[Base]', () => {
  displayTest(Dropdown, 'ShineoutDropdown');
  baseTest(
    <Dropdown
      placeholder='Dropdown'
      data={data}
      className='demo'
      style={{ backgroundColor: 'red' }}
    />,
    dropdownClassName,
  );
  snapshotTest(<DropdownBase />);
  snapshotTest(<DropdownHover />, 'about hover');
  snapshotTest(<DropdownPosition />, 'about position');
  snapshotTest(<DropdownButton />, 'about button');
  snapshotTest(<DropdownChildren />, 'about children');
  snapshotTest(<DropdownGroup />, 'about group');
  snapshotTest(<DropdownDivider />, 'about divider');
  snapshotTest(<DropdownColumns />, 'about columns');
  snapshotTest(<DropdownIcon />, 'about icon');
  snapshotTest(<DropdownSize />, 'about size');
  snapshotTest(<DropdownSplit />, 'about split');
  snapshotTest(<DropdownAbsolute />, 'about absolute');
  test('should render', () => {
    const clickFn = jest.fn();
    render(<Dropdown placeholder='Dropdown' data={data} onClick={clickFn} />);
    screen.debug();
  });
});
