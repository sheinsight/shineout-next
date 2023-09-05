import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tabs from '..';
import mountTest from '../../tests/mountTest';
import { classLengthTest } from '../../tests/structureTest';
import {
  attributesTest,
  classTest,
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
const tabsClassName = `.${SO_PREFIX}-tabs-0-2-1`;
const tabsHeaderWrapperClassName = `.${SO_PREFIX}-headerWrapper-0-2-7`;
const tabsHeaderClassName = `.${SO_PREFIX}-header-0-2-9`;
const tabsHeaderScrollClassName = `.${SO_PREFIX}-headerScroll-0-2-8`;
const tabsHrClassName = `.${SO_PREFIX}-hr-0-2-6`;
const tabsPanelWrapperClassName = `.${SO_PREFIX}-panelWrapper-0-2-2`;
const tabsTabClassName = `.${SO_PREFIX}-tab-0-2-5`;
const tabsPanelClassName = `.${SO_PREFIX}-panel-0-2-3`;
const tabsShowClassName = `.${SO_PREFIX}-show-0-2-20`;
const tabsLineInnerClassName = `${SO_PREFIX}-lineInner-0-2-12`;
const tabsFillInnerClassName = `${SO_PREFIX}-fillInner-0-2-13`;
const tabsCollapsibleClassName = `.${SO_PREFIX}-collapsible-0-2-24`;
const tabsCollapsedClassName = `${SO_PREFIX}-collapsed-0-2-25`;

const TabsDemo = ({
  className,
  style,
  position,
  align,
  shape = 'line',
  collapsible,
  defaultCollapsed,
  defaultActive = 0,
}: {
  className?: string;
  style?: { [k: string]: string };
  position?: any;
  align?: any;
  shape?: any;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  defaultActive?: number;
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
    // TODO: 存在bug
    // classTest(component, 'demo');
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
    classLengthTest(headerWrapper, tabsHrClassName, 1);
    classLengthTest(tabs, tabsPanelWrapperClassName, 1);
    screen.debug();
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
    screen.debug();
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
    classTest(screen.getByText('Home'), `${SO_PREFIX}-tab-0-2-5`);
  });
  test('should render when set shape is button', () => {
    const { container } = render(<ShapeDemo shape='button' />);
    attTest(container, 'button');
    classTest(container.querySelector(tabsTabClassName)!, 'button-secondary-0-2-31');
    classTest(container.querySelector(tabsTabClassName)!, 'button-button-0-2-26');
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
describe('Tabs[Collapsible]', () => {
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
  test('should render when set collapsible', () => {
    const { container } = render(<TabsDemo collapsible />);
    const tabs = container.querySelector(tabsClassName)!;
    const header = tabs.querySelector(tabsHeaderWrapperClassName)!;
    const coll = header.querySelector(tabsCollapsibleClassName)!;
    const panel = tabs.querySelector(tabsPanelWrapperClassName)!;
    expect(coll).toBeInTheDocument();
    fireEvent.click(coll);
    styleTest(panel, 'height: 0px;');
  });
  test('should render when set defaultCollapsed', () => {
    const { container } = render(<TabsDemo collapsible defaultCollapsed />);
    const tabs = container.querySelector(tabsClassName)!;
    classTest(tabs, tabsCollapsedClassName);
    const panel = tabs.querySelector(tabsPanelWrapperClassName)!;
    styleTest(panel, 'height: 0px;');
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
  });
});
describe('Tabs[Active/DefaultActive]', () => {
  test('should render when set active', () => {
    const { container } = render(<TabsDemo defaultActive={1} />);
    const tabs = container.querySelectorAll(tabsTabClassName)!;
    attributesTest(tabs[1], 'data-soui-state', 'active');
    tabs.forEach((item, index) => {
      if (index === 1) return;
      attributesTest(item, 'data-soui-state', '');
    });
  });
});
