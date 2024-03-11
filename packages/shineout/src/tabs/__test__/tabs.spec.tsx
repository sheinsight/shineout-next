import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tabs from '..';
import mountTest from '../../tests/mountTest';
import { classLengthTest } from '../../tests/structureTest';
import {
  attributesTest,
  classTest,
  createClassName,
  delay,
  displayTest,
  snapshotTest,
  styleTest,
  textContentTest,
} from '../../tests/utils';
import TabsBase from '../__example__/01-base';
import TabsShape from '../__example__/02-shape';
import TabsPositon from '../__example__/03-position';
import TabsControl from '../__example__/04-control';
import TabsAutofill from '../__example__/05-autofill';
import TabsExtra from '../__example__/06-extra';
import TabsScroll from '../__example__/07-scroll';
import TabsCollapsible from '../__example__/08-collapsible';

const SO_PREFIX = 'tabs';
const originClasses = [
  'tabs',
  'headerWrapper',
  'header',
  'headerScroll',
  'hr',
  'panelWrapper',
  'tab',
  'panel',
  'show',
  'collapsible',
  'extra',
  'prev',
  'next',
];
const originItemClasses = ['lineInner', 'fillInner', 'collapsed', 'autoFill'];
const {
  tabs: tabsClassName,
  headerWrapper: tabsHeaderWrapperClassName,
  header: tabsHeaderClassName,
  headerScroll: tabsHeaderScrollClassName,
  hr: tabsHrClassName,
  panelWrapper: tabsPanelWrapperClassName,
  tab: tabsTabClassName,
  panel: tabsPanelClassName,
  show: tabsShowClassName,
  lineInner: tabsLineInnerClassName,
  fillInner: tabsFillInnerClassName,
  collapsible: tabsCollapsibleClassName,
  collapsed: tabsCollapsedClassName,
  autoFill: tabsAutoFillClassName,
  extra: tabsExtraClassName,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

const { secondary, button } = createClassName('button', [''], ['secondary', 'button']);

const { wrapper: radioWrapperClassName } = createClassName('radio', ['wrapper'], ['']);

const TabsDemo = ({
  className,
  style,
  position,
  align,
  shape = 'line',
  collapsible,
  defaultCollapsed,
  defaultActive = 0,
  active,
  onChange,
}: {
  className?: string;
  style?: { [k: string]: string };
  position?: any;
  align?: any;
  shape?: any;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  defaultActive?: number;
  active?: string | number;
  onChange?: any;
}) => {
  const tabs = [];
  for (let i = 0; i < 3; i++) {
    tabs.push({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` });
  }
  return (
    <Tabs
      shape={shape}
      defaultActive={defaultActive}
      className={className}
      style={style}
      position={position}
      align={align}
      collapsible={collapsible}
      defaultCollapsed={defaultCollapsed}
      active={active}
      onChange={onChange}
    >
      {tabs.map((tab, index) => {
        return (
          <Tabs.Panel key={index} tab={tab.title}>
            <div style={{ padding: 5, height: '100%' }}>{tab.content}</div>
          </Tabs.Panel>
        );
      })}
    </Tabs>
  );
};

afterEach(cleanup);
describe('Tabs[Base]', () => {
  mountTest(<TabsDemo />);
  displayTest(Tabs, 'ShineoutTabs');
  displayTest(Tabs.Panel as React.FC, 'ShineoutTabsPanel');
  snapshotTest(<TabsBase />);
  snapshotTest(<TabsShape />, 'about shape');
  snapshotTest(<TabsPositon />, 'about position');
  snapshotTest(<TabsControl />, 'about control');
  snapshotTest(<TabsAutofill />, 'about autofill');
  snapshotTest(<TabsExtra />, 'about extra');
  snapshotTest(<TabsScroll />, 'about scroll');
  snapshotTest(<TabsCollapsible />, 'about collapsible');
  test('should render when set style and className', () => {
    const { container } = render(<TabsDemo className='demo' style={{ backgroundColor: 'red' }} />);
    const component = container.querySelector(tabsClassName)!;
    classTest(component, 'demo');
    styleTest(component, 'background-color: red;');
  });
  test('should render default', () => {
    const { container } = render(<Tabs className='demo' />);
    const tabs = container.querySelector(tabsClassName)!;
    attributesTest(tabs, 'data-soui-position', 'top-left');
    attributesTest(tabs, 'data-soui-shape', 'card');
    const headerWrapper = container.querySelector(tabsHeaderWrapperClassName)!;
    expect(headerWrapper).toBeTruthy();
    const header = headerWrapper.querySelector(tabsHeaderClassName)!;
    attributesTest(header, 'data-soui-shape', 'card');
    styleTest(header.querySelector(tabsHeaderScrollClassName)!, 'transform: translateX(0px);');
    classLengthTest(tabs, tabsPanelWrapperClassName, 1);
  });
  test('should active controlled', () => {
    const { container } = render(<TabsBase />);
    const tabs = container.querySelector(tabsClassName)!;
    classLengthTest(tabs, tabsTabClassName, 3);
    const tab = container.querySelectorAll(tabsTabClassName)!;
    attributesTest(tab[0], 'data-soui-state', 'active');
    tab.forEach((item, index) => {
      if (index === 0) return;
      attributesTest(item, 'data-soui-state', '');
    });
    const panel = container.querySelector(tabsPanelWrapperClassName)!;
    expect(panel.querySelector(tabsPanelClassName)).toBeTruthy();
    textContentTest(panel.querySelector(tabsShowClassName)!, 'Content of Tab 1');
    fireEvent.click(tab[1]);
    attributesTest(tab[1], 'data-soui-state', 'active');
    tab.forEach((item, index) => {
      if (index === 1) return;
      attributesTest(item, 'data-soui-state', '');
    });
    classLengthTest(panel, tabsPanelClassName, 2);
    textContentTest(panel.querySelector(tabsShowClassName)!, 'Content of Tab 2');
  });
});
describe('Tabs[Shape]', () => {
  const ShapeDemo = ({ shape }: any) => (
    <Tabs defaultActive={1} shape={shape}>
      <Tabs.Panel tab='Home'>Test</Tabs.Panel>
    </Tabs>
  );
  const attTest = (container: HTMLElement, shape: string) => {
    const tabs = container.querySelector(tabsClassName)!;
    const header = tabs.querySelector(tabsHeaderClassName)!;
    attributesTest(tabs, 'data-soui-shape', shape);
    attributesTest(header, 'data-soui-shape', shape);
  };
  test('should render when set shape is line', () => {
    const { container } = render(<ShapeDemo shape='line' />);
    attTest(container, 'line');
    classTest(screen.getByText('Home'), tabsLineInnerClassName);
  });
  test('should render when set shape is card', () => {
    const { container } = render(<ShapeDemo shape='card' />);
    attTest(container, 'card');
    classTest(screen.getByText('Home'), tabsTabClassName.split('.')[1]);
  });
  test('should render when set shape is button', () => {
    const { container } = render(<ShapeDemo shape='button' />);
    attTest(container, 'button');
    classTest(container.querySelector(tabsTabClassName)!, secondary);
    classTest(container.querySelector(tabsTabClassName)!, button);
  });
  test('should render when set shape is fill', () => {
    const { container } = render(<ShapeDemo shape='fill' />);
    attTest(container, 'fill');
    classTest(screen.getByText('Home'), tabsFillInnerClassName);
  });
  test('should render when set shape is dash', () => {
    const { container } = render(<ShapeDemo shape='dash' />);
    attTest(container, 'dash');
    classTest(screen.getByText('Home'), tabsLineInnerClassName);
  });
});
describe('Tabs[Position]', () => {
  ['top-left', 'top-right', 'left-top', 'left-bottom'].forEach((item) => {
    test(`should render when set position is ${item}`, () => {
      const { container } = render(<TabsDemo position={item} />);
      const tabs = container.querySelector(tabsClassName)!;
      const panel = container.querySelector(tabsPanelWrapperClassName)!;
      const header = container.querySelector(tabsHeaderWrapperClassName)!;
      attributesTest(tabs, 'data-soui-position', item);
      expect(
        header.compareDocumentPosition(panel) & Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeGreaterThan(0);
    });
  });
});
describe('Tabs[Position(Reverse)]', () => {
  ['bottom-left', 'bottom-right', 'right-top', 'right-bottom'].forEach((item) => {
    test(`should render when set position is ${item}`, () => {
      const { container } = render(<TabsDemo position={item} />);
      const tabs = container.querySelector(tabsClassName)!;
      const panel = container.querySelector(tabsPanelWrapperClassName)!;
      const header = container.querySelector(tabsHeaderWrapperClassName)!;
      attributesTest(tabs, 'data-soui-position', item);
      expect(
        panel.compareDocumentPosition(header) & Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeGreaterThan(0);
    });
  });
});
describe('Tabs[Position(button/fill)]', () => {
  test('should render when set position and shape is button', () => {
    ['right-top', 'right-bottom', 'left-top', 'left-bottom'].forEach((item) => {
      const { container } = render(<TabsDemo position={item} shape='button' />);
      const tabs = container.querySelector(tabsClassName)!;
      attributesTest(tabs, 'data-soui-position', 'top-left');
    });
  });
  test('should render when set position and shape is fill', () => {
    ['right-top', 'right-bottom', 'left-top', 'left-bottom'].forEach((item) => {
      const { container } = render(<TabsDemo position={item} shape='fill' />);
      const tabs = container.querySelector(tabsClassName)!;
      attributesTest(tabs, 'data-soui-position', 'top-left');
    });
  });
});
describe('Tabs[Align]', () => {
  const alignMap: { [k: string]: string } = {
    'vertical-left': 'left-top',
    'vertical-right': 'right-top',
    bottom: 'bottom-left',
    left: 'left-top',
    right: 'right-top',
  };
  test('should render when set align', () => {
    Object.keys(alignMap).forEach((item) => {
      const { container } = render(<TabsDemo align={item} />);
      const tabs = container.querySelector(tabsClassName)!;
      attributesTest(tabs, 'data-soui-position', alignMap[item]);
    });
  });
  test('should render when set align is bottom and shape is button', () => {
    Object.keys(alignMap).forEach((item) => {
      if (item === 'bottom') return;
      const { container } = render(<TabsDemo align={item} shape='button' />);
      const tabs = container.querySelector(tabsClassName)!;
      attributesTest(tabs, 'data-soui-position', 'top-left');
    });
  });
  test('should render when set align is bottom and shape is fill', () => {
    Object.keys(alignMap).forEach((item) => {
      if (item === 'bottom') return;
      const { container } = render(<TabsDemo align={item} shape='fill' />);
      const tabs = container.querySelector(tabsClassName)!;
      attributesTest(tabs, 'data-soui-position', 'top-left');
    });
  });
  test('should render when set align and position', () => {
    const align = 'right';
    const { container } = render(<TabsDemo align={align} position='bottom-left' />);
    const tabs = container.querySelector(tabsClassName)!;
    attributesTest(tabs, 'data-soui-position', alignMap[align]);
  });
});
describe('Tabs[Collapsible/defaultCollapsed]', () => {
  test('should render when set position and collapsible', () => {
    [
      'right-top',
      'right-bottom',
      'left-top',
      'left-bottom',
      'right-top',
      'right-bottom',
      'left-top',
      'left-bottom',
    ].forEach((item) => {
      const { container } = render(<TabsDemo position={item} collapsible />);
      const tabs = container.querySelector(tabsClassName)!;
      attributesTest(tabs, 'data-soui-position', 'top-left');
    });
  });
  test('should render when set defaultCollapsed', () => {
    const { container } = render(<TabsDemo collapsible defaultCollapsed />);
    const tabs = container.querySelector(tabsClassName)!;
    classTest(tabs, tabsCollapsedClassName);
    const panel = tabs.querySelector(tabsPanelWrapperClassName)!;
    styleTest(panel, 'height: 0px;');
  });
  test('should render when set collapsible', async () => {
    const height = 200;
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      value: height,
    });
    const { container } = render(<TabsDemo collapsible />);
    const tabs = container.querySelector(tabsClassName)!;
    const header = tabs.querySelector(tabsHeaderWrapperClassName)!;
    const coll = header.querySelector(tabsCollapsibleClassName)!;
    const panel = tabs.querySelector(tabsPanelWrapperClassName)!;
    expect(coll).toBeInTheDocument();
    fireEvent.click(coll);

    styleTest(panel, `height: ${height}px;`);
    await waitFor(async () => {
      await delay(200);
    });

    styleTest(panel, 'height: 0px; flex: 0 0 auto;');
    fireEvent.click(header.querySelector(tabsCollapsibleClassName)!);
    await waitFor(async () => {
      await delay(500);
    });
    styleTest(panel, 'height: auto;');
  });
  // TODO: test collapsed time
});
describe('Tabs[Children]', () => {
  test('should render when set children is not panel', () => {
    const { container } = render(
      <Tabs>
        <div className='demo'>demoA</div>
        <div className='demo'>demoB</div>
      </Tabs>,
    );
    classLengthTest(container, tabsTabClassName, 2);
    container.querySelectorAll(tabsTabClassName).forEach((item) => {
      attributesTest(item, 'data-soui-state', '');
    });
    classLengthTest(container, '.demo', 2);
    container.querySelectorAll('.demo').forEach((item, index) => {
      attributesTest(item, 'id', String(index));
    });
    classLengthTest(container, tabsPanelClassName, 0);
  });
  test('should render when set children is panel', () => {
    const { container } = render(
      <Tabs defaultActive={1}>
        <Tabs.Panel tab='A'>Test</Tabs.Panel>
        <Tabs.Panel tab='B'>Test</Tabs.Panel>
        <Tabs.Panel tab='C'>Test</Tabs.Panel>
      </Tabs>,
    );
    classLengthTest(container, tabsPanelClassName, 1);
  });
});
describe('Tabs[Active/DefaultActive]', () => {
  test('should render when set defaultActive', () => {
    const { container } = render(<TabsDemo defaultActive={1} />);
    const tabs = container.querySelectorAll(tabsTabClassName)!;
    attributesTest(tabs[1], 'data-soui-state', 'active');
    tabs.forEach((item, index) => {
      if (index === 1) return;
      attributesTest(item, 'data-soui-state', '');
    });
    fireEvent.click(tabs[0]);
    attributesTest(tabs[0], 'data-soui-state', 'active');
    tabs.forEach((item, index) => {
      if (index === 0) return;
      attributesTest(item, 'data-soui-state', '');
    });
  });
  test('should render when set active', () => {
    const { container } = render(<TabsDemo active={1} />);
    const tabs = container.querySelectorAll(tabsTabClassName)!;
    attributesTest(tabs[1], 'data-soui-state', 'active');
    tabs.forEach((item, index) => {
      if (index === 1) return;
      attributesTest(item, 'data-soui-state', '');
    });
    fireEvent.click(tabs[0]);
    attributesTest(tabs[1], 'data-soui-state', 'active');
    tabs.forEach((item, index) => {
      if (index === 1) return;
      attributesTest(item, 'data-soui-state', '');
    });
  });
  test('should render when set active and defaultActive', () => {
    const { container } = render(<TabsDemo active={1} defaultActive={0} />);
    const tabs = container.querySelectorAll(tabsTabClassName)!;
    attributesTest(tabs[1], 'data-soui-state', 'active');
    tabs.forEach((item, index) => {
      if (index === 1) return;
      attributesTest(item, 'data-soui-state', '');
    });
  });
  test('should render when tabs is control', () => {
    const { container } = render(<TabsControl />);
    const radios = container.querySelectorAll(radioWrapperClassName)!;
    const tabs = container.querySelectorAll(tabsTabClassName)!;
    attributesTest(tabs[1], 'data-soui-state', 'active');
    tabs.forEach((item, index) => {
      if (index === 1) return;
      attributesTest(item, 'data-soui-state', '');
    });
    fireEvent.click(radios[0]);
    attributesTest(tabs[0], 'data-soui-state', 'active');
    tabs.forEach((item, index) => {
      if (index === 0) return;
      attributesTest(item, 'data-soui-state', '');
    });
  });
});
describe('Tabs[AutoFill]', () => {
  test('should render when set autoFill', () => {
    const { container } = render(
      <div style={{ height: 500 }}>
        <Tabs defaultActive={1} autoFill>
          <Tabs.Panel tab='Home'>Test</Tabs.Panel>
        </Tabs>
      </div>,
    );
    const tabs = container.querySelector(tabsClassName)!;
    classTest(tabs, tabsAutoFillClassName);
  });
});
describe('Tabs[Extra/TabBarExtraContent]', () => {
  test('should render when set extra is string', () => {
    const { container, rerender } = render(
      <Tabs defaultActive={1}>
        <Tabs.Panel tab='Home'>Test</Tabs.Panel>
      </Tabs>,
    );
    classLengthTest(container, tabsExtraClassName, 0);
    rerender(
      <Tabs defaultActive={1} extra='demo'>
        <Tabs.Panel tab='Home'>Test</Tabs.Panel>
      </Tabs>,
    );
    classLengthTest(container, tabsExtraClassName, 1);
  });
  test('should render when set extra is reactNode', () => {
    const tabBarExtraContent = <div className='hello'>Hello</div>;
    const { container } = render(
      <Tabs defaultActive={1} extra={tabBarExtraContent}>
        <Tabs.Panel tab='Home'>Test</Tabs.Panel>
      </Tabs>,
    );
    classLengthTest(container, tabsExtraClassName, 1);
    classLengthTest(container.querySelector(tabsExtraClassName)!, '.hello', 1);
  });
  test('should render when set tabBarExtraContent is string', () => {
    const { container, rerender } = render(
      <Tabs defaultActive={1}>
        <Tabs.Panel tab='Home'>Test</Tabs.Panel>
      </Tabs>,
    );
    classLengthTest(container, tabsExtraClassName, 0);
    rerender(
      <Tabs defaultActive={1} tabBarExtraContent='demo'>
        <Tabs.Panel tab='Home'>Test</Tabs.Panel>
      </Tabs>,
    );
    classLengthTest(container, tabsExtraClassName, 1);
  });
  test('should render when set tabBarExtraContent is reactNode', () => {
    const tabBarExtraContent = <div className='hello'>Hello</div>;
    const { container } = render(
      <Tabs defaultActive={1} tabBarExtraContent={tabBarExtraContent}>
        <Tabs.Panel tab='Home'>Test</Tabs.Panel>
      </Tabs>,
    );
    classLengthTest(container, tabsExtraClassName, 1);
    classLengthTest(container.querySelector(tabsExtraClassName)!, '.hello', 1);
  });
  test('should render when set tabBarExtraContent and extra', () => {
    const { container } = render(
      <Tabs defaultActive={1} tabBarExtraContent='demo' extra='demoA'>
        <Tabs.Panel tab='Home'>Test</Tabs.Panel>
      </Tabs>,
    );
    textContentTest(container.querySelector(tabsExtraClassName)!, 'demo');
  });
});
describe('Tabs[tabBarStyle]', () => {
  test('shoul render when set tabBarStyle', () => {
    const tabBarStyle = 'red';
    const { container } = render(
      <Tabs defaultActive={1} tabBarStyle={{ color: tabBarStyle }}>
        <Tabs.Panel tab='A'>Test</Tabs.Panel>
        <Tabs.Panel tab='B'>Test</Tabs.Panel>
        <Tabs.Panel tab='C'>Test</Tabs.Panel>
      </Tabs>,
    );
    const header = container.querySelector(tabsHeaderWrapperClassName)!;
    styleTest(header, 'color: red;');
  });
});
describe('Tabs[Background]', () => {
  const activeBackground = 'blue';
  const inactiveBackgroud = 'red';
  test('should render when set background', () => {
    const { container } = render(
      <Tabs defaultActive={1} background={activeBackground}>
        <Tabs.Panel tab='A'>Test</Tabs.Panel>
        <Tabs.Panel tab='B'>Test</Tabs.Panel>
        <Tabs.Panel tab='C'>Test</Tabs.Panel>
      </Tabs>,
    );
    const tabs = container.querySelectorAll(tabsTabClassName)!;
    attributesTest(tabs[1], 'data-soui-state', 'active');
    styleTest(tabs[1], 'background: blue;');
  });
  test('should render when set activeBackground and inactiveBackground', () => {
    const { container } = render(
      <Tabs
        defaultActive={1}
        activeBackground={activeBackground}
        inactiveBackground={inactiveBackgroud}
      >
        <Tabs.Panel tab='A'>Test</Tabs.Panel>
        <Tabs.Panel tab='B'>Test</Tabs.Panel>
        <Tabs.Panel tab='C'>Test</Tabs.Panel>
      </Tabs>,
    );
    const tabs = container.querySelectorAll(tabsTabClassName)!;
    attributesTest(tabs[1], 'data-soui-state', 'active');
    styleTest(tabs[1], 'background: blue;');
    tabs.forEach((item, index) => {
      if (index === 1) return;
      attributesTest(item, 'data-soui-state', '');
      styleTest(item, 'background: red;');
    });
  });
  test('should render when set activeBackground and background', () => {
    const { container } = render(
      <Tabs defaultActive={1} background={activeBackground} activeBackground={inactiveBackgroud}>
        <Tabs.Panel tab='A'>Test</Tabs.Panel>
        <Tabs.Panel tab='B'>Test</Tabs.Panel>
        <Tabs.Panel tab='C'>Test</Tabs.Panel>
      </Tabs>,
    );
    const tabs = container.querySelectorAll(tabsTabClassName)!;
    styleTest(tabs[1], 'background: red;');
  });
});
describe('Tabs[Border/splitColor/hideSplit]', () => {
  test('should render when set border', () => {
    const { container } = render(
      <Tabs defaultActive={1} border='red' shape='button'>
        <Tabs.Panel tab='A'>Test</Tabs.Panel>
        <Tabs.Panel tab='B'>Test</Tabs.Panel>
        <Tabs.Panel tab='C'>Test</Tabs.Panel>
      </Tabs>,
    );
    const hr = container.querySelector(tabsHrClassName)!;
    styleTest(hr, 'background: red;');
  });
  test('should render when set splitColor', () => {
    const { container } = render(
      <Tabs defaultActive={1} splitColor='red' shape='button'>
        <Tabs.Panel tab='A'>Test</Tabs.Panel>
        <Tabs.Panel tab='B'>Test</Tabs.Panel>
        <Tabs.Panel tab='C'>Test</Tabs.Panel>
      </Tabs>,
    );
    const hr = container.querySelector(tabsHrClassName)!;
    styleTest(hr, 'background: red;');
  });
  test('should render when set splitColor and border', () => {
    const { container } = render(
      <Tabs defaultActive={1} splitColor='red' border='blue' shape='button'>
        <Tabs.Panel tab='A'>Test</Tabs.Panel>
        <Tabs.Panel tab='B'>Test</Tabs.Panel>
        <Tabs.Panel tab='C'>Test</Tabs.Panel>
      </Tabs>,
    );
    const hr = container.querySelector(tabsHrClassName)!;
    styleTest(hr, 'background: red;');
  });
  test('should render when set hideSplit', () => {
    const { container, rerender } = render(
      <Tabs defaultActive={1} shape='button'>
        <Tabs.Panel tab='A'>Test</Tabs.Panel>
      </Tabs>,
    );
    classLengthTest(container, tabsHrClassName, 1);
    rerender(
      <Tabs defaultActive={1} hideSplit shape='button'>
        <Tabs.Panel tab='A'>Test</Tabs.Panel>
      </Tabs>,
    );
    classLengthTest(container, tabsHrClassName, 0);
  });
});
// TODO: don`t have color
describe('Tabs[Lazy]', () => {
  test('should render when set lazy is false', () => {
    const { container } = render(
      <Tabs defaultActive={1} lazy={false}>
        <Tabs.Panel tab='A'>Test</Tabs.Panel>
        <Tabs.Panel tab='B'>Test</Tabs.Panel>
        <Tabs.Panel tab='C'>Test</Tabs.Panel>
      </Tabs>,
    );
    const tabs = container.querySelectorAll(tabsTabClassName)!;
    const panels = container.querySelectorAll(tabsPanelClassName);
    expect(tabs.length).toBe(panels.length);
  });
  test('should render when set lazy', () => {
    const { container } = render(
      <Tabs defaultActive={1} lazy>
        <Tabs.Panel tab='A'>Test</Tabs.Panel>
        <Tabs.Panel tab='B'>Test</Tabs.Panel>
        <Tabs.Panel tab='C'>Test</Tabs.Panel>
      </Tabs>,
    );
    const tabs = container.querySelectorAll(tabsTabClassName)!;
    expect(container.querySelectorAll(tabsPanelClassName).length).toBe(1);
    tabs.forEach((item) => {
      fireEvent.click(item);
    });
    expect(container.querySelectorAll(tabsPanelClassName).length).toBe(3);
  });
});
describe('Tabs[onChange]', () => {
  test('should render when set onChange', () => {
    const changeFn = jest.fn();
    const { container } = render(
      <Tabs defaultActive={1} onChange={changeFn}>
        <Tabs.Panel tab='A'>Test</Tabs.Panel>
        <Tabs.Panel tab='B'>Test</Tabs.Panel>
        <Tabs.Panel tab='C'>Test</Tabs.Panel>
      </Tabs>,
    );
    const tabs = container.querySelectorAll(tabsTabClassName)!;
    fireEvent.click(tabs[0]);
    expect(changeFn.mock.calls.length).toBe(1);
  });
});
// TODO: switchToTop
describe('Tabs[SwitchToTop/Sticky]', () => {
  test('should render when set switchToTop', () => {
    render(
      <Tabs defaultActive={1} sticky>
        <Tabs.Panel tab='A'>Test</Tabs.Panel>
        <Tabs.Panel tab='B'>Test</Tabs.Panel>
        <Tabs.Panel tab='C'>Test</Tabs.Panel>
      </Tabs>,
    );
  });
});
describe('Tabs[ScrollNums]', () => {
  test('should render nums when set scroll', async () => {
    jest.mock('react', () => {
      const originReact = jest.requireActual('react');
      const mUseRef = jest.fn();
      return {
        ...originReact,
        useRef: mUseRef,
      };
    });
    const mRef = { current: { clientWidth: 300 } };
    Object.defineProperty(mRef, 'current', {
      get: jest.fn(() => ({ clientWidth: 300 })),
      set: jest.fn(() => null),
    });
    jest.spyOn(React, 'useRef').mockReturnValue(mRef);
    const tabs = [];
    for (let i = 0; i < 30; i++) {
      tabs.push({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` });
    }
    const { container } = render(
      <Tabs shape='line' defaultActive={0}>
        {tabs.map((tab, index) => {
          return (
            <Tabs.Panel key={index} tab={tab.title}>
              <div style={{ padding: 5, height: '100%' }}>{tab.content}</div>
            </Tabs.Panel>
          );
        })}
      </Tabs>,
    );
    classLengthTest(container, tabsTabClassName, 30);
  });
});
