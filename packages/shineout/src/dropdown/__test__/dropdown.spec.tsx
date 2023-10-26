import { render, cleanup, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
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
  styleContentTest,
  delay,
  createClassName,
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
const originClasses = ['wrapper', 'content', 'caret', 'list', 'optionGroup', 'optionDivider'];
const originItemClasses = ['button', 'item', 'open', 'listSmall', 'listLarge', 'splitButton'];
const {
  wrapper: dropdownClassName,
  button: dropdownButtonClassName,
  content: dropdownContentClassName,
  caret: dropdownCaretClassName,
  list: dropdownListClassName,
  item: dropdownItemClassName,
  open: dropdownOpenClassName,
  optionGroup: dropdownGroupClassName,
  optionDivider: dropdownDividerClassName,
  listSmall: dropdownListSmallClassName,
  listLarge: dropdownListLargeClassName,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

const dropdownDisabledClassName = 'so-button-disabled';
const buttonSmallClassName = 'so-button-small';
const buttonLargeClassName = 'so-button-large';
const animationList = 'so-animation-list-fade-animation';

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
const closeStyle =
  'pointer-events: none; position: absolute; z-index: -1000; display: none; opacity: 1;';

const textSplit = (e: Element) => e.textContent?.split('AmericaGermany')[0];

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.runAllTimers();
});
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
    styleTest(list, closeStyle);
    const listDropdown = list.querySelector(dropdownClassName)!;
    attributesTest(listDropdown, dataPosition, 'right-top');
    classTest(listDropdown.querySelector('.' + dropdownButtonClassName)!, dropdownItemClassName);
    classLengthTest(list, 'a', 5);
    list.querySelectorAll('a').forEach((a, index) => {
      classTest(a, dropdownItemClassName);
      textContentTest(a, childrens[index]);
    });
    fireEvent.click(dropdown);
    await waitFor(async () => {
      await delay(200);
      classTest(container.querySelectorAll(dropdownClassName)[0]!, dropdownOpenClassName);
      attributesTest(list, 'data-sheinx-animation-duration', 'fast');
      attributesTest(list, 'data-sheinx-animation-type', 'fade');
      expect(list.getAttribute('style')).not.toBe(closeStyle);
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
  });
});
describe('Dropdown[Hover]', () => {
  test('should render when set hover', async () => {
    const { container } = render(<Dropdown trigger='hover' placeholder='Hover me' data={menu} />);
    const dropdown = container.querySelector(dropdownClassName)!;
    const list = dropdown.querySelector(dropdownListClassName)!;
    styleTest(list, closeStyle);
    fireEvent.mouseEnter(dropdown);
    await waitFor(() => {
      classTest(dropdown, dropdownOpenClassName);
      expect(list.getAttribute('style')).not.toBe(closeStyle);
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
        textSplit(dropdown)?.toLocaleLowerCase().split(' ').join('-') as string,
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
      classContentTest(dropdown.querySelector('button')!, textSplit(dropdown) as string);
    });
  });
  test('should render when set different type', () => {
    const { container } = render(<DropdownButtonDemo />);
    const other = container.querySelector('.other');
    const dropdowns = other?.querySelectorAll(dropdownClassName);
    dropdowns?.forEach((dropdown) => {
      classContentTest(
        dropdown.querySelector('button')!,
        textSplit(dropdown)?.toLocaleLowerCase() as string,
      );
    });
  });
});
describe('Dropdown[Children]', () => {
  test('should render when set group in children', () => {
    const { container } = render(<DropdownGroup />);
    const list = container.querySelector(dropdownListClassName)!;
    const groups = list.querySelectorAll(dropdownGroupClassName)!;
    const items = list.querySelectorAll('a')!;
    expect(groups.length).toBe(items.length / 2);
    for (let i = 0; i < groups.length; i++) {
      textContentTest(groups[i], 'group' + i);
      expect(groups[i]).toBeInTheDocument();
      expect(items[i * 2]).toBeInTheDocument();
      expect(items[i * 2 + 1]).toBeInTheDocument();
    }
  });
  test('should render when set divider in children', () => {
    const { container } = render(<DropdownDivider />);
    const list = container.querySelector(dropdownListClassName)!;
    expect(list.querySelector(dropdownDividerClassName)).toBeInTheDocument();
  });
});
describe('Dropdown[Columns]', () => {
  const width = 500;
  const columns = 5;
  const DropdownColumsDemo = ({ c, w }: { c?: number; w?: number }) => {
    const menu = new Array(30).fill(null).map((_, index) => ({
      id: `${index}`,
      content: `item${index}`,
    }));
    return <Dropdown placeholder='Tiling Menu' width={w} columns={c} data={menu} />;
  };
  test('should render when set columns', () => {
    const { container } = render(<DropdownColumsDemo c={columns} w={width} />);
    const list = container.querySelector(dropdownListClassName)!;
    styleContentTest(list, `width: ${width}px; grid-template-columns: repeat(${columns}, 1fr);`);
  });
  test('should render when set columns without width', () => {
    const { container } = render(<DropdownColumsDemo c={columns} />);
    const list = container.querySelector(dropdownListClassName)!;
    styleContentTest(list, `grid-template-columns: repeat(${columns}, 1fr);`);
  });
});
describe('Dropdown[Icon]', () => {
  test('should render when set icon', () => {
    const { container } = render(<DropdownIcon />);
    const list = container.querySelector(dropdownListClassName)!;
    list.querySelectorAll(dropdownItemClassName).forEach((item) => {
      classLengthTest(item, 'i', 1);
      classTest(item.querySelector('i')!, 'fa-user-o');
    });
  });
});
describe('Dropdown[Size]', () => {
  const buttonClassNames = [buttonSmallClassName, '', buttonLargeClassName];
  const listClassNames = [dropdownListSmallClassName, '', dropdownListLargeClassName];
  test('should render when set size', () => {
    const { container } = render(<DropdownSize />);
    screen.debug();
    container.querySelectorAll('button').forEach((button, index) => {
      if (index === 1) return;
      classTest(button, buttonClassNames[index]);
    });
    container.querySelectorAll(dropdownListClassName).forEach((list, index) => {
      if (index === 1) return;
      classTest(list, listClassNames[index]);
    });
  });
});
describe('Dropdown[Split]', () => {
  test('should render in group', () => {
    const { container } = render(<DropdownSplit />);
    container.querySelectorAll(dropdownClassName).forEach((item) => {
      classTest(item.querySelector('button')!, dropdownButtonClassName);
    });
  });
});
describe('Dropdown[absolute]', () => {
  test('should render when set absolute', async () => {
    jest.useRealTimers();
    const { container, rerender } = render(
      <Dropdown type={'primary'} placeholder='Absolute' data={menu} />,
    );
    const dropdown = container.querySelector(dropdownClassName)!;
    expect(dropdown.querySelector(dropdownListClassName)).toBeTruthy();
    rerender(<Dropdown type={'primary'} absolute placeholder='Absolute' data={menu} />);
    expect(dropdown.querySelector(dropdownListClassName)).toBeFalsy();
    expect(document.querySelector(dropdownListClassName)).toBeTruthy();
    styleTest(document.querySelector(dropdownListClassName)!, closeStyle);
    fireEvent.click(dropdown);
    await waitFor(async () => {
      await delay(200);
      styleTest(
        document.querySelector(dropdownListClassName)!,
        'position: absolute; z-index: 1051; display: block; opacity: 1; min-width: 0; left: 0px; top: 2px; transition: opacity 240ms ease-in-out;',
      );
    });
  });
});
describe('Dropdown[Animation]', () => {
  test('should render when set animation is false', () => {
    const { container } = render(<Dropdown animation={false} data={menu} placeholder='Dropdown' />);
    classTest(container.querySelector(dropdownListClassName)!, animationList, false);
  });
});
describe('Dropdown[OnClick]', () => {
  test('should render when set onClick', async () => {
    const clickFn = jest.fn();
    const { container } = render(<Dropdown onClick={clickFn} data={menu} placeholder='Dropdown' />);
    const dropdown = container.querySelector(dropdownClassName)!;
    fireEvent.click(dropdown);
    await waitFor(async () => {
      await delay(200);
      fireEvent.click(dropdown.querySelectorAll('a')[0]!);
      expect(clickFn.mock.calls.length).toBe(1);
    });
  });
  test('should render when have onClick in data', async () => {
    const clickFn = jest.fn();
    const clickChildrenFn = jest.fn();
    const menu: DropdownItem[] = [
      { content: 'America', onClick: clickChildrenFn },
      { content: 'Germany' },
    ];
    const { container } = render(<Dropdown onClick={clickFn} data={menu} placeholder='Dropdown' />);
    const dropdown = container.querySelector(dropdownClassName)!;
    fireEvent.click(dropdown);
    await waitFor(async () => {
      await delay(200);
      fireEvent.click(dropdown.querySelectorAll('a')[0]!);
      expect(clickFn.mock.calls.length).toBe(0);
      expect(clickChildrenFn.mock.calls.length).toBe(1);
    });
  });
});
describe('Dropdown[renderItem]', () => {
  const dropData = [
    {
      id: 0,
      content: 'a',
    },
    {
      id: 1,
      content: 'b',
    },
  ];
  test('should render when set renderItem is string', () => {
    const { container } = render(
      <Dropdown renderItem='id' data={dropData} placeholder='Dropdown' />,
    );
    container.querySelectorAll('a').forEach((item, index) => {
      textContentTest(item, String(dropData[index].id));
    });
  });
  test('should render when set renderItem is function', () => {
    const { container } = render(
      <Dropdown renderItem={(d: any) => `id ${d.id}`} data={dropData} placeholder='Dropdown' />,
    );
    container.querySelectorAll('a').forEach((item, index) => {
      textContentTest(item, 'id ' + dropData[index].id);
    });
  });
});
describe('Dropdown[Open]', () => {
  test('should render when set open', () => {
    const { container } = render(<Dropdown open data={menu} placeholder='Dropdown' />);
    const dropdown = container.querySelector(dropdownClassName)!;
    const list = dropdown.querySelector(dropdownListClassName)!;
    classTest(dropdown, dropdownOpenClassName);
    attributesTest(list, 'data-sheinx-animation-duration', 'fast');
    attributesTest(list, 'data-sheinx-animation-type', 'fade');
    styleTest(
      list,
      'pointer-events: none; position: absolute; z-index: -1000; display: block; opacity: 0;',
    );
  });
});
describe('Dropdown[OnCollapse]', () => {
  test('should render when set onCollapes', async () => {
    const collapseFn = jest.fn();
    const { container } = render(
      <Dropdown open data={menu} placeholder='Dropdown' onCollapse={collapseFn} />,
    );
    const dropdown = container.querySelector(dropdownClassName)!;
    fireEvent.click(dropdown);
    await waitFor(async () => {
      await delay(200);
      expect(collapseFn.mock.calls.length).toBe(1);
      fireEvent.click(dropdown);
      await delay(200);
      expect(collapseFn.mock.calls.length).toBe(2);
    });
  });
});
describe('Dropdown[Close]', () => {
  test('should close when click button', async () => {
    jest.useFakeTimers();
    const { container } = render(<Dropdown absolute data={menu} placeholder='Dropdown' />);
    const dropdown = container.querySelector(dropdownClassName)!;
    const list = document.querySelector(dropdownListClassName)!;
    styleContentTest(list, 'display: none;');
    fireEvent.click(dropdown);
    await waitFor(async () => {
      await delay(200);
      styleContentTest(list, 'display: block;');
    });
    fireEvent.click(dropdown);
    await waitFor(async () => {
      await delay(200);
      styleContentTest(list, 'display: none;');
    });
  });
});
