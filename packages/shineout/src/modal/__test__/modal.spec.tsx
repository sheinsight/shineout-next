import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from '..';
import mountTest from '../../tests/mountTest';
import { classTest, createClassName, displayTest, styleContentTest } from '../../tests/utils';

const SO_PREFIX = 'modal';
const originClasses = ['wrapper', 'panel'];
const originItemClasses = [''];
const { wrapper, panel } = createClassName(SO_PREFIX, originClasses, originItemClasses);

afterEach(cleanup);
mountTest(<Modal visible={true} />);

describe('Modal[Base]', () => {
  displayTest(Modal, 'ShineoutModal');
  test('should render when set style and className', () => {
    const style = { backgroundColor: 'red' };
    const className = 'demo';
    render(<Modal className={className} visible={true} style={style} />);
    const modalPanel = document.querySelector(panel)!;
    classTest(modalPanel, className);
    styleContentTest(modalPanel, 'background-color: red;');
  });
  test('should render when set rootClassName', () => {
    const rootClassName = 'root';
    render(<Modal rootClassName={rootClassName} visible={true} />);
    const modalWrapper = document.querySelector(wrapper)!;
    classTest(modalWrapper, rootClassName);
  });
  test('should render default', () => {
    render(<Modal visible={true} />);
    screen.debug();
  });
});

// usePortal
// maskCloseAble
