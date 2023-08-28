import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react';
import Dropdown from '..';
import { TYPE } from 'shineout';
import mountTest from '../../tests/mountTest';
import { classLengthTest } from '../../tests/structureTest';
import {
  baseTest,
  snapshotTest,
  displayTest,
  attributesTest,
  classTest,
  textContentTest,
  styleTest,
  hasAttributesTest,
  classContentTest,
} from '../../tests/utils';
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
const dropdownButtonClassName = `${SO_PREFIX}-button-0-2-9`;
const dropdownContentClassName = `.${SO_PREFIX}-content-0-2-8`;
const dropdownCaretClassName = `.${SO_PREFIX}-caret-0-2-7`;
const dropdownListClassName = `.${SO_PREFIX}-list-0-2-3`;
const dropdownItemClassName = `${SO_PREFIX}-item-0-2-10`;
const dropdownDisabledClassName = 'button-disabled-0-2-43';
const dropdownOpen = `${SO_PREFIX}-open-0-2-2`;

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
const menu: DropdownItem[] = [{ content: 'America' }, { content: 'Germany' }];
const dataPosition = 'data-position';

afterEach(cleanup);
mountTest(<Dropdown data={data} />);
describe('Dropdown[Base]', () => {
  displayTest(Dropdown as React.FC, 'ShineoutDropdown');
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
  test('should render default', async () => {
    const childrens = ['Submenu', 'Link to Google', 'Disabled', 'Home', 'Message'];
    const { container } = render(<Dropdown placeholder='Dropdown' data={data} />);
    const dropdown = container.querySelector(dropdownClassName)!;
    expect(dropdown).toBeTruthy();
    attributesTest(dropdown, dataPosition, 'bottom-left');
    classLengthTest(dropdown, 'button', 1);
    const button = dropdown.querySelector('button')!;
    classTest(button, dropdownButtonClassName);
    textContentTest(button.querySelector(dropdownContentClassName)!, 'Dropdown');
    const caret = button.querySelector(dropdownCaretClassName)!;
    classLengthTest(caret, 'svg', 1);
    const list = dropdown.querySelector(dropdownListClassName)!;
    styleTest(list, 'display: none;');
    const listDropdown = list.querySelector(dropdownClassName)!;
    attributesTest(listDropdown, dataPosition, 'right-top');
    classTest(listDropdown.querySelector('.' + dropdownButtonClassName)!, dropdownItemClassName);
    classLengthTest(list, 'a', 5);
    list.querySelectorAll('a').forEach((a, index) => {
      classTest(a, dropdownItemClassName);
      textContentTest(a, childrens[index]);
    });
    fireEvent.click(dropdown);
    await waitFor(() => {
      classTest(container.querySelectorAll(dropdownClassName)[0]!, dropdownOpen);
      expect(list.getAttribute('style')).not.toBe('display: none;');
    });
  });
  test('should render when set disabled is true', () => {
    const clickFn = jest.fn();
    const { container } = render(
      <Dropdown placeholder='Dropdown' data={data} disabled onClick={clickFn} />,
    );
    const button = container.querySelector('button')!;
    classTest(button, dropdownDisabledClassName);
    fireEvent.click(button);
    expect(clickFn.mock.calls.length).toBe(0);
  });
  test('should render when set item disabled is true', () => {
    const clickFn = jest.fn();
    const dataD: DropdownItem[] = [
      {
        content: 'Message',
        onClick: clickFn,
        disabled: true,
      },
      {
        content: 'Message1',
      },
    ];
    const { container } = render(<Dropdown placeholder='Dropdown' data={dataD} />);
    const item = container.querySelectorAll('a')[0];
    hasAttributesTest(item, 'disabled');
    fireEvent.click(item);
    expect(clickFn.mock.calls.length).toBe(0);
    screen.debug();
  });
});
describe('Dropdown[Hover]', () => {
  test('should render when set hover', async () => {
    const { container } = render(<Dropdown trigger='hover' placeholder='Hover me' data={menu} />);
    const dropdown = container.querySelector(dropdownClassName)!;
    const list = dropdown.querySelector(dropdownListClassName)!;
    styleTest(list, 'display: none;');
    fireEvent.mouseEnter(dropdown);
    await waitFor(() => {
      classTest(dropdown, dropdownOpen);
      expect(list.getAttribute('style')).not.toBe('display: none;');
    });
  });
});
describe('Dropdown[position]', () => {
  const DropdownPositionDemo: React.FC = () => (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, padding: '0 120px' }}>
        <Dropdown placeholder='Bottom left' position='bottom-left' data={menu} />
        <Dropdown placeholder='Bottom' position='bottom' data={menu} />
        <Dropdown placeholder='Bottom right' position='bottom-right' data={menu} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Dropdown placeholder='Right Top' position='right-top' data={menu} />
        <Dropdown placeholder='Left Top' position='left-top' data={menu} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Dropdown placeholder='Right' position='right' data={menu} />
        <Dropdown placeholder='Left' position='left' data={menu} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Dropdown placeholder='Right Bottom' position='right-bottom' data={menu} />
        <Dropdown placeholder='Left Bottom' position='left-bottom' data={menu} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
        <Dropdown placeholder='Top Left' position='top-left' data={menu} />
        <Dropdown placeholder='Top' position='top' data={menu} />
        <Dropdown placeholder='Top right' position='top-right' data={menu} />
      </div>
    </div>
  );
  test('should render when set different position', () => {
    const { container } = render(<DropdownPositionDemo />);
    container.querySelectorAll(dropdownClassName).forEach((dropdown) => {
      attributesTest(
        dropdown,
        dataPosition,
        dropdown.textContent
          ?.split('AmericaGermany')[0]
          ?.toLocaleLowerCase()
          .split(' ')
          .join('-') as string,
      );
    });
  });
});
describe('Dropdown[Button]', () => {
  const DropdownButtonDemo: React.FC = () => (
    <div>
      <div className='type'>
        <Dropdown data={menu} type={'primary'} placeholder={'primary'} />
        <Dropdown data={menu} type={'secondary'} placeholder={'secondary'} />
        <Dropdown data={menu} type={'danger'} placeholder={'danger'} />
        <Dropdown data={menu} type={'warning'} placeholder={'warning'} />
        <Dropdown data={menu} type={'success'} placeholder={'success'} />
      </div>
      <div className='other'>
        <Dropdown data={menu} type={'primary'} placeholder={'Outline'} outline />
        <Dropdown data={menu} type={'primary'} placeholder={'Text'} text />
      </div>
    </div>
  );
  test('should render when set button', () => {
    const { container } = render(<DropdownButtonDemo />);
    const type = container.querySelector('.type');
    const dropdowns = type?.querySelectorAll(dropdownClassName);
    dropdowns?.forEach((dropdown) => {
      classContentTest(
        dropdown.querySelector('button')!,
        dropdown.textContent?.split('AmericaGermany')[0] as string,
      );
    });
  });
  test('should render when set different type', () => {
    const { container } = render(<DropdownButtonDemo />);
    const other = container.querySelector('.other');
    const dropdowns = other?.querySelectorAll(dropdownClassName);
    dropdowns?.forEach((dropdown) => {
      classContentTest(
        dropdown.querySelector('button')!,
        dropdown.textContent?.split('AmericaGermany')[0].toLocaleLowerCase() as string,
      );
    });
  });
});
