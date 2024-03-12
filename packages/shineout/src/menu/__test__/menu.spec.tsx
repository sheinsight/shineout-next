import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Menu, TYPE } from 'shineout';
import {
  attributesTest,
  baseTest,
  classTest,
  createClassName,
  delay,
  displayTest,
  snapshotTest,
  styleContentTest,
  styleTest,
  textContentTest,
} from '../../tests/utils';
import { classLengthTest } from '../../tests/structureTest';
import mountTest from '../../tests/mountTest';
import MenuBase from '../__example__/01-base';
import MenuLink from '../__example__/02-01-link';
import MenuClickFather from '../__example__/03-click';
import MenuFront from '../__example__/04-front';
import MenuDisabled from '../__example__/05-disabled';
import MenuControl from '../__example__/06-control';
import MenuRender from '../__example__/07-render';
import MenuClick from '../__example__/08-click';
import MenuHorizontal from '../__example__/09-horizontal';
import MenuVertical from '../__example__/10-vertical';
import MenuDark from '../__example__/11-dark';

const SO_PREFIX = 'menu';
const originClasses = [
  'wrapper',
  'scrollbox',
  'itemContent',
  'expand',
  'scrollbar',
  'scrolbarHandler',
];
const originItemClasses = [
  'wrapperInline',
  'wrapperLight',
  'itemContentBack',
  'title',
  'root',
  'item',
  'childrenHasExpand',
  'expandBack',
  'children',
  'itemHasChildren',
  'itemOpen',
  'wrapperHasOpen',
  'itemActive',
  'expandHover',
  'itemContentFront',
  'expandFront',
  'itemDisabled',
  'wrapperDark',
  'wrapperHorizontal',
  'wrapperVertical',
  'scrollbarY',
  'scrollbarX',
];
const {
  wrapper,
  wrapperInline,
  wrapperLight,
  scrollbox,
  root,
  item: itemClassName,
  itemContent,
  itemContentBack,
  title,
  childrenHasExpand,
  itemHasChildren,
  expand,
  expandBack,
  children: childrenClassName,
  itemOpen,
  wrapperHasOpen,
  itemActive,
  expandHover,
  itemContentFront,
  expandFront,
  itemDisabled,
  wrapperDark,
  wrapperHorizontal,
  wrapperVertical,
  scrollbar,
  scrolbarHandler,
  scrollbarY,
  scrollbarX,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

interface MenuItem {
  id: string;
  title: string;
  children?: MenuItem[];
}

interface MenuLinkItem extends MenuItem {
  link?: string;
}

interface MenuDisabledItem extends MenuItem {
  disabled?: boolean;
}

type MenuProps = TYPE.Menu.Props<MenuItem, string>;
type MenuRenderItem = MenuProps['renderItem'];

const createMoreData = (num: number) => {
  const result: MenuItem[] = [];
  for (let i = 1; i <= num; i++) {
    result.push({
      id: `${i}`,
      title: `${i}`,
    });
  }
  return result;
};

const testDataWithoutChild: MenuItem[] = createMoreData(3);

const link = 'https://www.github.com';

const testDataWithLink: MenuLinkItem[] = testDataWithoutChild.map((item) => ({
  ...item,
  link,
}));

const testData: MenuItem[] = [
  {
    id: '1',
    title: '1',
    children: [
      {
        id: '1-1',
        title: '1-1',
      },
    ],
  },
  {
    id: '2',
    title: '2',
    children: [
      {
        id: '2-1',
        title: '2-1',
      },
    ],
  },
  {
    id: '3',
    title: '3',
  },
];

const testDataDisabled: MenuDisabledItem[] = testData.map((item) => ({
  ...item,
  disabled: true,
}));

const renderItem: MenuRenderItem = (d: MenuItem) => d.title;

const MenuTest = (props: any) => (
  <Menu keygen='id' data={testData} renderItem={renderItem} {...props} />
);

const defaultChildStyle = 'width: 24px; flex-shrink: 0;';

afterEach(cleanup);
mountTest(<Menu keygen='id' />);

describe('Menu[Base]', () => {
  displayTest(Menu as React.FC, 'ShineoutMenu');
  baseTest(Menu as React.FC, wrapper);
  snapshotTest(<MenuBase />);
  snapshotTest(<MenuLink />, 'about link');
  snapshotTest(<MenuClickFather />, 'about click father');
  snapshotTest(<MenuFront />, 'about front');
  snapshotTest(<MenuDisabled />, 'about disabled');
  snapshotTest(<MenuControl />, 'about control');
  snapshotTest(<MenuRender />, 'about render');
  snapshotTest(<MenuClick />, 'about click');
  snapshotTest(<MenuHorizontal />, 'about horizontal');
  snapshotTest(<MenuVertical />, 'about vertical');
  snapshotTest(<MenuDark />, 'about dark');
  test('should render default', () => {
    const { container } = render(<MenuTest data={testDataWithoutChild} />);
    const menuWrapper = container.querySelector(wrapper)!;
    classTest(menuWrapper, wrapperInline);
    classTest(menuWrapper, wrapperLight);
    const menuScrollbox = menuWrapper.querySelector(scrollbox)!;
    const menuRoot = menuScrollbox.querySelector('ul')!;
    classTest(menuRoot, root);
    const items = menuRoot.querySelectorAll('li');
    expect(items.length).toBe(testDataWithoutChild.length);
    items.forEach((item, index) => {
      classTest(item, itemClassName);
      const itemContentWrapper = item.querySelector(itemContent)!;
      classTest(itemContentWrapper, itemContentBack);
      const itemTitle = itemContentWrapper.querySelector('a')!;
      classTest(itemTitle, title);
      expect(itemTitle.textContent).toBe(testDataWithoutChild[index].title);
    });
  });
  test('should render default when have children', () => {
    const { container } = render(<MenuTest />);
    const menuWrapper = container.querySelector(wrapper)!;
    classTest(menuWrapper.querySelector(`.${root}`)!, childrenHasExpand);
    const items = container.querySelectorAll(`.${root} > li`);
    expect(items?.length).toBe(testData.length);
    items.forEach((item, index) => {
      if (!testData[index]?.children) return;
      
      classTest(item, itemHasChildren);
      const expandWrapper = item.querySelector(expand)!;
      classTest(expandWrapper, expandBack);
      classLengthTest(expandWrapper, 'svg', 1);
      const children = item.querySelector('ul')!;
      classTest(children, childrenClassName);
      const childItemContent = children.querySelector(itemContent)!;
      styleTest(childItemContent.firstElementChild as Element, defaultChildStyle);
      textContentTest(childItemContent, testData[index].children![0].title);
    });
    fireEvent.click(items[0].querySelector(expand)!);
    classTest(items[0], itemOpen);
    classTest(menuWrapper, wrapperHasOpen);
    const child = items[0].querySelector('ul')!;
    fireEvent.click(child.querySelector(itemContent)!);
    classTest(child.querySelector('li')!, itemActive);
    fireEvent.click(items[0].querySelector(expand)!);
    classTest(items[0], itemOpen, false);
  });
  test('should render when set link is href', () => {
    const { container } = render(<MenuTest data={testDataWithLink} linkKey='link' />);
    const menuWrapper = container.querySelector(wrapper)!;
    const items = menuWrapper.querySelectorAll('li');
    items.forEach((item, index) => {
      const title = item.querySelector('a')!;
      attributesTest(title, 'href', testDataWithLink[index].link!);
    });
  });
  test('should render when set link is element', () => {
    const { container } = render(
      <MenuTest data={testDataWithoutChild} renderItem={() => <a href={link}></a>} />,
    );
    const menuWrapper = container.querySelector(wrapper)!;
    const items = menuWrapper.querySelectorAll('li');
    items.forEach((item) => {
      const title = item.querySelector('a')!;
      attributesTest(title, 'href', link);
    });
  });
  test('should render when set parentSelectable', () => {
    const { container } = render(<MenuTest parentSelectable />);
    const items = container.querySelectorAll(`.${root} > li`);
    items.forEach((item, index) => {
      if (!testData[index]?.children) return;
      classTest(item.querySelector(expand)!, expandHover);
    });
    const firstItemTitle = items[0].querySelector('a')!;
    const firstItemExpand = items[0].querySelector(expand)!;
    fireEvent.click(firstItemTitle);
    classTest(items[0], itemActive);
    fireEvent.click(firstItemExpand);
    classTest(items[0], itemOpen);
  });
  test('should render when set frontCaret', () => {
    const { container, rerender } = render(<MenuTest frontCaret />);
    const items = container.querySelectorAll(`.${root} > li`);
    items.forEach((item, index) => {
      if (!testData[index]?.children) return;
      const expandWrapper = item.querySelector(expand)!;
      classTest(expandWrapper, expandFront);
      classTest(item.querySelector(itemContent)!, itemContentFront);
    });
    rerender(<MenuTest frontCaret frontCaretType='hollow' />);
  });
  test('should render when set active and onClick', () => {
    const App = () => {
      const [activeId, setActiveId] = React.useState<string>('1');
      const checkActive = (d: MenuItem) => d.id === activeId;
      return (
        <MenuTest
          active={checkActive}
          onClick={(d: MenuItem) => setActiveId(d.id)}
          data={testDataWithoutChild}
        />
      );
    };
    const { container } = render(<App />);
    const items = container.querySelectorAll('li');
    classTest(items[0], itemActive);
    fireEvent.click(items[1].querySelector(itemContent)!);
    classTest(items[0], itemActive, false);
    classTest(items[1], itemActive);
  });
  // disable is must a function, there are only a test case
  test('should render when set disable all', () => {
    const { container } = render(<MenuTest disabled />);
    const itemsAll = container.querySelectorAll('li');
    const items = container.querySelectorAll(`.${root} > li`);
    itemsAll.forEach((item) => {
      classTest(item, itemDisabled);
    });
    fireEvent.click(items[0].querySelector(itemContent)!);
    classTest(items[0], itemOpen);
    fireEvent.click(items[2].querySelector(itemContent)!);
    classTest(items[2], itemActive, false);
  });
  test('should render when set disable is function', () => {
    const { container } = render(
      <MenuTest data={testDataDisabled} disabled={(d: MenuDisabledItem) => !!d.disabled} />,
    );
    const items = container.querySelectorAll(`.${root} > li`);
    items.forEach((item) => {
      classTest(item, itemDisabled);
    });
    fireEvent.click(items[2].querySelector(itemContent)!);
    classTest(items[2], itemActive, false);
    fireEvent.click(items[0].querySelector(itemContent)!);
    classTest(items[0], itemOpen);
    const itemChild = items[0].querySelector('ul')!;
    fireEvent.click(itemChild.querySelector(itemContent)!);
    classTest(itemChild.querySelector('li')!, itemActive);
  });
  test('should render when set multiple choice by active is array', () => {
    const App = () => {
      const [activeId, setActiveId] = React.useState<string[]>(['1']);
      const checkActive = (d: MenuItem) => activeId.includes(d.id);
      return (
        <MenuTest
          active={checkActive}
          onClick={(d: MenuItem) => setActiveId([...activeId, d.id])}
          data={testDataWithoutChild}
        />
      );
    };
    const { container } = render(<App />);
    const items = container.querySelectorAll('li');
    classTest(items[0], itemActive);
    fireEvent.click(items[1].querySelector(itemContent)!);
    classTest(items[0], itemActive);
    classTest(items[1], itemActive);
  });
  test('should render when set inlineIndent', () => {
    const inlineIndent = 48;
    const { container } = render(<MenuTest inlineIndent={inlineIndent} />);
    const items = container.querySelectorAll(`.${root} > li`);
    items.forEach((item, index) => {
      if (!testData[index]?.children) return;
      const itemChild = item.querySelector('ul')!;
      const itemChildContent = itemChild.querySelector(itemContent)!;
      styleContentTest(itemChildContent.firstElementChild as Element, `width: ${inlineIndent}px;`);
    });
  });
  test('should render when set onClick in data', () => {
    const onClick = jest.fn();
    const { container } = render(
      <MenuTest data={testDataWithoutChild.map((item) => ({ ...item, onClick }))} />,
    );
    const items = container.querySelectorAll('li');
    fireEvent.click(items[0].querySelector(itemContent)!);
    expect(onClick.mock.calls.length).toBe(1);
  });
  test('should render when set theme is dark', () => {
    const { container } = render(<MenuTest theme='dark' />);
    const menuWrapper = container.querySelector(wrapper)!;
    classTest(menuWrapper, wrapperDark);
  });
  test('should render when set caretColor', () => {
    const caretColor = 'red';
    const { container } = render(<MenuTest caretColor={caretColor} />);
    const expands = container.querySelectorAll(expand);
    expands.forEach((expand) => {
      styleTest(expand, `color: ${caretColor};`);
    });
  });
  test('should render when set height', () => {
    const height = 200;
    const { container } = render(<MenuTest height={height} />);
    const menuWrapper = container.querySelector(wrapper)!;
    styleTest(menuWrapper, `height: ${height}px;`);
  });
  test('should render when set defaultOpenKeys', () => {
    const defaultOpenKeys = ['1'];
    const { container } = render(<MenuTest defaultOpenKeys={defaultOpenKeys} />);
    const items = container.querySelectorAll(`.${root} > li`);
    classTest(items[0], itemOpen);
  });
  test('should render when set looseChildren', () => {
    const { container } = render(
      <MenuTest
        looseChildren
        data={testDataWithoutChild.map((item) => ({ ...item, children: [] }))}
      />,
    );
    const menuWrapper = container.querySelector(wrapper)!;
    classTest(menuWrapper.querySelector(`.${root}`)!, childrenHasExpand);
    const items = container.querySelectorAll(`.${root} > li`);
    fireEvent.click(items[0].querySelector(itemContent)!);
    classTest(items[0], itemOpen);
  });
  test('should render when set openKeys and onOpenChange', () => {
    const App = () => {
      const [openKeys, setOpenKeys] = React.useState<string[]>([]);
      return <MenuTest openKeys={openKeys} onOpenChange={(keys: any[]) => setOpenKeys(keys)} />;
    };
    const { container } = render(<App />);
    const items = container.querySelectorAll(`.${root} > li`);
    fireEvent.click(items[0].querySelector(itemContent)!);
    classTest(items[0], itemOpen);
    fireEvent.click(items[1].querySelector(itemContent)!);
    classTest(items[0], itemOpen);
    classTest(items[1], itemOpen);
  });
  test('should render when set openKeys and defaultOpenKeys at the same time', () => {
    const openKeys = ['1'];
    const defaultOpenKeys = ['2'];
    const { container } = render(
      <MenuTest defaultOpenKeys={defaultOpenKeys} openKeys={openKeys} />,
    );
    const items = container.querySelectorAll(`.${root} > li`);
    classTest(items[0], itemOpen);
    classTest(items[1], itemOpen, false);
  });
});
describe('Menu[Mode]', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.runAllTimers();
  });
  test('should render when set mode is horizontal', async () => {
    const { container } = render(<MenuTest mode='horizontal' />);
    const menuWrapper = container.querySelector(wrapper)!;
    classTest(menuWrapper, wrapperHorizontal);
    const items = container.querySelectorAll(`.${root} > li`);
    fireEvent.mouseEnter(items[0]);
    classTest(items[0], itemOpen);
    fireEvent.mouseLeave(items[0]);
    await waitFor(async () => {
      await delay(200);
    });
    classTest(items[0], itemOpen, false);
  });
  test('should render when set mode is vertical', async () => {
    const { container } = render(<MenuTest mode='vertical' />);
    const menuWrapper = container.querySelector(wrapper)!;
    classTest(menuWrapper, wrapperVertical);
    const items = container.querySelectorAll(`.${root} > li`);
    fireEvent.mouseEnter(items[0]);
    classTest(items[0], itemOpen);
    fireEvent.mouseLeave(items[0]);
    await waitFor(async () => {
      await delay(200);
    });
    classTest(items[0], itemOpen, false);
  });
  test('should render when set mode is vertical-auto', () => {
    const { container } = render(<MenuTest mode='vertical-auto' />);
    const menuWrapper = container.querySelector(wrapper)!;
    classTest(menuWrapper, wrapperVertical);
    const items = container.querySelectorAll(`.${root} > li`);
    fireEvent.mouseEnter(items[0]);
    classTest(items[0], itemOpen);
  });
});
describe('Menu[ScrollY]', () => {
  const moreData = createMoreData(20);
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      value: 300,
    });
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      value: 200,
    });
  });
  test('should render when mouserMove and mouseDown in y', async () => {
    const clientY = 50;
    const { container } = render(<MenuTest data={moreData} mode='vertical' />);
    await waitFor(async () => {
      await delay(200);
    });
    const scrollbarWrapper = container.querySelector(scrollbar)!;
    const scrollbarHandlerWrapper = scrollbarWrapper.querySelector(scrolbarHandler)!;
    classTest(scrollbarWrapper, scrollbarY);
    styleContentTest(scrollbarHandlerWrapper, `top: ${0}px;`);
    fireEvent.mouseDown(scrollbarHandlerWrapper);
    fireEvent.mouseMove(document, { clientY });
    fireEvent.mouseUp(document);
    styleContentTest(scrollbarHandlerWrapper, `top: ${clientY}px;`);
  });
  test('should render when set wheel in x', async () => {
    const { container } = render(<MenuTest data={moreData} mode='vertical' />);
    await waitFor(async () => {
      await delay(200);
    });
    const scrollbarWrapper = container.querySelector(scrollbar)!;
    const scrollbarHandlerWrapper = scrollbarWrapper.querySelector(scrolbarHandler)!;
    const scrollBoxWrapper = container.querySelector(scrollbox)!;
    styleContentTest(scrollbarHandlerWrapper, `top: ${0}px;`);
    fireEvent.wheel(scrollBoxWrapper, { deltaY: 20 });
    styleContentTest(scrollbarHandlerWrapper, `top: ${6.666666666666666}px;`);
  });
  test('should render when click scrollbar', async () => {
    const { container } = render(<MenuTest data={moreData} mode='vertical' />);
    await waitFor(async () => {
      await delay(200);
    });
    const scrollbarWrapper = container.querySelector(scrollbar)!;
    fireEvent.click(scrollbarWrapper);
  });
});
describe('Menu[ScrollX]', () => {
  const moreData = createMoreData(20);
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', { configurable: true, value: 300 });
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 200 });
  });
  test('should render when mouserMove and mouseDown in x', async () => {
    const clientX = 10;
    const { container } = render(<MenuTest data={moreData} mode='horizontal' />);
    await waitFor(async () => {
      await delay(200);
    });
    const scrollbarWrapper = container.querySelector(scrollbar)!;
    const scrollbarHandlerWrapper = scrollbarWrapper.querySelector(scrolbarHandler)!;
    classTest(scrollbarWrapper, scrollbarX);
    styleContentTest(scrollbarHandlerWrapper, `left: ${0}px;`);
    fireEvent.mouseDown(scrollbarHandlerWrapper);
    fireEvent.mouseMove(document, { clientX });
    fireEvent.mouseUp(document);
    styleContentTest(scrollbarHandlerWrapper, `left: ${clientX}px;`);
  });
  test('should render when set wheel in y', async () => {
    const { container } = render(<MenuTest data={moreData} mode='horizontal' />);
    await waitFor(async () => {
      await delay(200);
    });
    const scrollbarWrapper = container.querySelector(scrollbar)!;
    const scrollbarHandlerWrapper = scrollbarWrapper.querySelector(scrolbarHandler)!;
    const scrollBoxWrapper = container.querySelector(scrollbox)!;
    styleContentTest(scrollbarHandlerWrapper, `left: ${0}px;`);
    fireEvent.wheel(scrollBoxWrapper, { deltaX: 10 });
    styleContentTest(scrollbarHandlerWrapper, `left: ${3.333333333333333}px;`);
  });
});
