import { cleanup, render, screen } from '@testing-library/react';
import Tabs from '..';
import mountTest from '../../tests/mountTest';
import { classTest, displayTest, snapshotTest, styleTest } from '../../tests/utils';
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

const TabsDemo = ({
  className,
  style,
}: {
  className?: string;
  style?: { [k: string]: string };
}) => {
  const tabs = [];
  for (let i = 0; i < 3; i++) {
    tabs.push({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` });
  }
  return (
    <Tabs shape='line' defaultActive={0} className={className} style={style}>
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
  displayTest(Tabs.Panel, 'ShineoutTabsPanel');
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
  test('should render', () => {
    render(<Tabs className='demo' />);
    screen.debug();
  });
});
