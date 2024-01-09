import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Drawer } from 'shineout';
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

const { wrapper, wrapperDrawerRight, wrapperDrawerTop } = createClassName(
  'modal',
  ['wrapper'],
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

  // all tests can be reflected in Modal components
});
