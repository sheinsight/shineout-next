import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Menu, TYPE } from 'shineout';
import {
  attributesTest,
  baseTest,
  classTest,
  createClassName,
  displayTest,
  snapshotTest,
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
const originClasses = ['wrapper', 'scrollbox', 'itemContent', 'expand'];
const originItemClasses = [
  'wrapperInline',
  'wrapperLight',
  'itemContentBack',
  'title',
  'root',
  'item',
  'wrapperHasExpand',
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
  wrapperHasExpand,
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
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

interface MenuItem {
  id: string;
  title: string;
  children?: MenuItem[];
}

interface MenuLinkItem extends MenuItem {
  link?: string;
}

type MenuProps = TYPE.Menu.Props<MenuItem, string>;
type MenuRenderItem = MenuProps['renderItem'];

const testDataWithoutChild: MenuItem[] = [
  {
    id: '1',
    title: '1',
  },
  {
    id: '2',
    title: '2',
  },
  {
    id: '3',
    title: '3',
  },
];

const testDataWithLink: MenuLinkItem[] = testDataWithoutChild.map((item) => ({
  ...item,
  link: 'https://www.github.com',
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
    classTest(menuWrapper, wrapperHasExpand);
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
    screen.debug();
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
  test('should render when set disable is function', () => {});
});
