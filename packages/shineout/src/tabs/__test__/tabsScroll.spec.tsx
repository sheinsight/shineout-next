import React from 'react';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tabs from '..';
import { Button } from 'shineout';
import { classLengthTest } from '../../tests/structureTest';
import { createClassName, delay } from '../../tests/utils';

const SO_PREFIX = 'tabs';
const originClasses = ['header', 'prev', 'next'];
const originItemClasses = [''];
const {
  header: tabsHeaderClassName,
  prev,
  next,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.runAllTimers();
});
afterEach(cleanup);

const tabs: any[] = [];
for (let i = 0; i < 30; i++) {
  tabs.push({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` });
}
const App = (props: any) => {
  const [v, setV] = React.useState(0);

  return (
    <div>
      <Button onClick={() => setV(v + 1)}>click</Button>
      <div>{v}</div>
      <Tabs shape='line' defaultActive={0} {...props}>
        {tabs.map((tab, index) => {
          return (
            <Tabs.Panel key={index} tab={tab.title}>
              <div style={{ padding: 5, height: '100%' }}>{tab.content}</div>
            </Tabs.Panel>
          );
        })}
      </Tabs>
      ,
    </div>
  );
};
beforeAll(() => {
  class MockResizeObserver {
    callback;
    constructor(callback: any) {
      this.callback = callback;
    }
    observe() {
      // Trigger the callback with mock data
      this.callback([{ contentRect: { width: 100, height: 100 } }]);
    }
    disconnect() {}
  }
  // @ts-ignore
  global.ResizeObserver = MockResizeObserver;
});

describe('Tabs[ScrollX]', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      get() {
        if (this.classList.contains(tabsHeaderClassName.split('.')[1])) {
          return 100;
        }
        return 300;
      },
    });
  });
  test('should render when can srcoll', async () => {
    const { container } = render(<App />);
    fireEvent.click(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(500);
    });
    const tabsPrev = container.querySelector(prev)!;
    const tabsNext = container.querySelector(next)!;
    classLengthTest(tabsPrev, 'svg', 1);
    classLengthTest(tabsNext, 'svg', 1);
    fireEvent.click(tabsNext.querySelector('svg')!);
    await waitFor(async () => {
      await delay(500);
    });
    fireEvent.click(tabsPrev.querySelector('svg')!);
    await waitFor(async () => {
      await delay(500);
    });
  });
  test('should render when can srcoll when set position is top-right', async () => {
    const { container } = render(<App position='top-right' />);
    fireEvent.click(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(500);
    });
    classLengthTest(container.querySelector(prev)!, 'svg', 1);
    classLengthTest(container.querySelector(next)!, 'svg', 1);
  });
});
describe('Tabs[ScrollY]', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      get() {
        if (this.classList.contains(tabsHeaderClassName.split('.')[1])) {
          return 100;
        }
        return 300;
      },
    });
  });
  test('should render when can srcoll when set position is left-top', async () => {
    const { container } = render(<App position='left-top' />);
    fireEvent.click(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(500);
    });
    classLengthTest(container.querySelector(prev)!, 'svg', 1);
    classLengthTest(container.querySelector(next)!, 'svg', 1);
  });
  test('should render when can srcoll when set position is left-bottom', async () => {
    const { container } = render(<App position='left-bottom' />);
    fireEvent.click(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(500);
    });
    classLengthTest(container.querySelector(prev)!, 'svg', 1);
    classLengthTest(container.querySelector(next)!, 'svg', 1);
  });
});
