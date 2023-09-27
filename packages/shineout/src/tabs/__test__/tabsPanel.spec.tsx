import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tabs from '..';
import { classLengthTest } from '../../tests/structureTest';
import { attributesTest } from '../../tests/utils';

const SO_PREFIX = 'tabs';
const tabsPanelClassName = `.${SO_PREFIX}-panel-0-2-3`;
const tabsTabClassName = `.${SO_PREFIX}-tab-0-2-5`;

afterEach(cleanup);
describe('Tabs.Panel[Base]', () => {
  // TODO：没有className、style等等
});
describe('Tabs.Panel[Background]', () => {
  test('should render when set panel background', () => {
    // const pannel = [
    //   {
    //     tab: 'A',
    //     background: 'red',
    //   },
    //   {
    //     tab: 'B',
    //     background: 'blue',
    //   },
    //   {
    //     tab: 'C',
    //     background: 'green',
    //   },
    // ]
    // const { container } = render(
    //   <Tabs defaultActive={1}>
    //     {pannel.map(i => (
    //       <Tabs.Panel key={i.tab} tab={i.tab} activeBackground={i.background}>
    //         Test
    //       </Tabs.Panel>
    //     ))}
    //   </Tabs>
    // )
  });
});
describe('Tabs.Panel[Children]', () => {
  test('should render when set children is reactNode', () => {
    const content = <div className='demo'>demoA</div>;
    const { container } = render(
      <Tabs defaultActive={0}>
        <Tabs.Panel tab='A'>{content}</Tabs.Panel>
      </Tabs>,
    );
    const panel = container.querySelector(tabsPanelClassName)!;
    classLengthTest(panel, '.demo', 1);
    screen.debug();
  });
});
describe('Tabs.Panel[Disabled]', () => {
  test('should render when set panel disabled', () => {
    const changeFn = jest.fn();
    const { container } = render(
      <Tabs defaultActive={1} onChange={changeFn}>
        <Tabs.Panel tab='A'>Test</Tabs.Panel>
        <Tabs.Panel tab='B'>Test</Tabs.Panel>
        <Tabs.Panel tab='C' disabled>
          Test
        </Tabs.Panel>
      </Tabs>,
    );
    const tabs = container.querySelectorAll(tabsTabClassName)!;
    attributesTest(tabs[2], 'data-soui-state', 'disabled');
    fireEvent.click(tabs[2]);
    expect(changeFn.mock.calls.length).toBe(0);
  });
});
describe('Tabs.Panel[Tab]', () => {
  const Demo = ({ pannel }: any) => (
    <Tabs defaultActive={1}>
      {pannel.map((i: any) => (
        <Tabs.Panel key={i.id} tab={i.tab} id={i.id}>
          Test
        </Tabs.Panel>
      ))}
    </Tabs>
  );
  test('should render when set tab is string', () => {
    const pannel = [
      {
        id: 'A',
        tab: 'A',
      },
      {
        id: 'B',
        tab: 'B',
      },
      {
        id: 'C',
        tab: 'C',
      },
    ];
    const { container } = render(<Demo pannel={pannel} />);
    container.querySelectorAll(tabsTabClassName).forEach((item, index) => {
      expect(item.textContent).toBe(pannel[index].tab);
    });
  });
  test('should render when tab is reactNode', () => {
    const pannel = [
      {
        id: 'A',
        tab: <div className='demo'>A</div>,
      },
      {
        id: 'B',
        tab: <div className='demo'>B</div>,
      },
      {
        id: 'C',
        tab: <div className='demo'>C</div>,
      },
    ];
    const { container } = render(<Demo pannel={pannel} />);
    container.querySelectorAll(tabsTabClassName).forEach((item, index) => {
      classLengthTest(item, '.demo', 1);
      expect(item.textContent).toBe(pannel[index].id);
    });
  });
});
describe('Tabs.Panel[Id]', () => {
  test('should set Tabs.Panel id', () => {
    const pannel = [
      {
        id: 'A',
        tab: 'A',
      },
      {
        id: 'B',
        tab: 'B',
      },
      {
        id: 'C',
        tab: 'C',
      },
    ];

    const handleChange = jest.fn();
    const { container } = render(
      <Tabs defaultActive={1} onChange={handleChange}>
        {pannel.map((i) => (
          <Tabs.Panel key={i.id} tab={i.tab} id={i.id}>
            Test
          </Tabs.Panel>
        ))}
      </Tabs>,
    );
    container.querySelectorAll(tabsTabClassName).forEach((item) => {
      fireEvent.click(item);
    });
    expect(handleChange).toBeCalledTimes(pannel.length);
    handleChange.mock.calls.forEach((item, index) => {
      expect(item[0]).toBe(pannel[index].id);
    });
  });
});
