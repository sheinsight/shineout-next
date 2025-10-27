import { cleanup, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Drawer } from 'shineout';
import React from 'react';
import mountTest from '../../tests/mountTest';
import { classTest, createClassName, displayTest, snapshotTestByClick } from '../../tests/utils';
import DrawerBase from '../__example__/01-base';
import DrawerPosition from '../__example__/02-position';
import DrawerContainer from '../__example__/03-container';
import DrawerForm from '../__example__/04-form';
import DrawerClose from '../__example__/05-close';
import DrawerFullScreen from '../__example__/06-full-screen';
import DrawerType from '../__example__/07-type';
import DrawerHideMask from '../__example__/08-hide-mask';
import DrawerResizable from '../__example__/09-resizable';

const { wrapper, panel, wrapperDrawerRight, wrapperDrawerTop,  } = createClassName(
  'modal',
  ['wrapper', 'panel'],
  ['wrapperDrawerRight', 'wrapperDrawerTop'],
);

afterEach(cleanup);
mountTest(<Drawer visible />);

describe('Drawer[Base]', () => {
  displayTest(Drawer, 'ShineoutDrawer');
  snapshotTestByClick(<DrawerBase />, 'about base', wrapper);
  snapshotTestByClick(<DrawerPosition />, 'about position', wrapper);
  snapshotTestByClick(<DrawerContainer />, 'about container', wrapper);
  snapshotTestByClick(<DrawerForm />, 'about form', wrapper);
  snapshotTestByClick(<DrawerClose />, 'about close', wrapper);
  snapshotTestByClick(<DrawerFullScreen />, 'about full screen', wrapper);
  snapshotTestByClick(<DrawerType />, 'about type', wrapper);
  snapshotTestByClick(<DrawerHideMask />, 'about hide mask', wrapper);
  snapshotTestByClick(<DrawerResizable />, 'about resizable', wrapper);
  test('should render default', () => {
    render(<Drawer visible />);
    const drawerWrapper = document.querySelector(wrapper)!;
    classTest(drawerWrapper, wrapperDrawerRight);
  });
  test('should render when set position is top', () => {
    render(<Drawer visible position='top' />);
    const drawerWrapper = document.querySelector(wrapper)!;
    classTest(drawerWrapper, wrapperDrawerTop);
  });

  test('should apply cascade offset with boolean', async () => {
    const App = () => {
      const [showSecond, setShowSecond] = React.useState(false);
      React.useEffect(() => {
        setTimeout(() => setShowSecond(true), 300);
      }, []);
      return (
        <>
          <Drawer visible position='right' cascade>First Drawer</Drawer>
          {showSecond && <Drawer visible position='right'>Second Drawer</Drawer>}
        </>
      );
    };
    render(<App />);

    // 等待第二个 Drawer 出现
    await waitFor(() => {
      const drawerWrappers = document.querySelectorAll(panel);
      expect(drawerWrappers.length).toBe(2);
    });

    // 验证第一个 Drawer 有默认偏移 180px
    const drawerWrappers = document.querySelectorAll(panel);
    // 打印 drawerWrappers[0] 的html 以便调试
    console.log(drawerWrappers[0].outerHTML);
    expect(drawerWrappers[0]).toHaveStyle({ transform: 'translateX(-180px)' });
  });

  test('should apply cascade offset with custom width', async () => {
    const App = () => {
      const [showSecond, setShowSecond] = React.useState(false);
      React.useEffect(() => {
        setTimeout(() => setShowSecond(true), 300);
      }, []);
      return (
        <>
          <Drawer visible position='left' cascade={{ width: 200 }}>First Drawer</Drawer>
          {showSecond && <Drawer visible position='left' cascade={{ width: 200 }}>Second Drawer</Drawer>}
        </>
      );
    };
    render(<App />);

    // 等待第二个 Drawer 出现
    await waitFor(() => {
      const drawerWrappers = document.querySelectorAll(panel);
      expect(drawerWrappers.length).toBe(2);
    });

    // 验证第一个 Drawer 有自定义偏移 200px
    const drawerWrappers = document.querySelectorAll(panel);
    expect(drawerWrappers[0]).toHaveStyle({ transform: 'translateX(200px)' });
  });

  // all tests can be reflected in Modal components
});
