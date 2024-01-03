import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Modal, Button } from 'shineout';
import mountTest from '../../tests/mountTest';
import { classLengthTest } from '../../tests/structureTest';
import {
  classTest,
  createClassName,
  displayTest,
  styleContentTest,
  styleTest,
  textContentTest,
} from '../../tests/utils';
// import ModalBase from '../__example__/01-base';
// import ModalType from '../__example__/02-type';

const SO_PREFIX = 'modal';
const originClasses = [
  'wrapper',
  'panel',
  'mask',
  'header',
  'headerTitle',
  'headerClose',
  'body',
  'footer',
  'resizeX',
  'resizeY',
  'resizeXY',
];
const originItemClasses = [
  'wrapperAnimation',
  'wrapperShow',
  'wrapperIsMask',
  'wrapperHide',
  'headerIcon',
  'bodyWithIcon',
  'wrapperFullScreen',
  'wrapperMoveable',
];
const {
  wrapper,
  panel,
  wrapperAnimation,
  wrapperShow,
  wrapperIsMask,
  mask,
  header,
  headerTitle,
  headerClose,
  body,
  footer,
  wrapperHide,
  headerIcon,
  bodyWithIcon,
  wrapperFullScreen,
  wrapperMoveable,
  resizeX,
  resizeY,
  resizeXY,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

const defaultStyle = 'width: 500px; top: 10vh;';

const title = 'this is a title';
const content = 'this is a content';

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
  test('should set children', () => {
    const testContent = 'Test Children';
    const children = <div className='test'>{testContent}</div>;
    render(<Modal visible={true}>{children}</Modal>);
    const modalPanel = document.querySelector(panel)!;
    expect(modalPanel?.querySelectorAll('.test').length).toBe(1);
    expect(modalPanel?.querySelector('.test')?.textContent).toBe(testContent);
  });
  test('should render when set rootClassName', () => {
    const rootClassName = 'root';
    render(<Modal rootClassName={rootClassName} visible={true} />);
    const modalWrapper = document.querySelector(wrapper)!;
    classTest(modalWrapper, rootClassName);
  });
  test('should render default', () => {
    render(<Modal visible={true} />);
    const modalWrapper = document.querySelector(wrapper)!;
    classTest(modalWrapper, wrapperAnimation);
    classTest(modalWrapper, wrapperShow);
    classTest(modalWrapper, wrapperIsMask);
    const modalMask = modalWrapper.querySelector(mask)!;
    const modalPanel = modalMask.querySelector(panel)!;
    styleTest(modalPanel, defaultStyle);
    const modalHeader = modalPanel.querySelector(header)!;
    const modalHeaderTitle = modalHeader.querySelector(headerTitle)!;
    expect(modalHeaderTitle).toBeInTheDocument();
    const modalHeaderClose = modalHeader.querySelector(headerClose)!;
    classLengthTest(modalHeaderClose, 'svg', 1);
    const modalBody = modalPanel.querySelector(body)!;
    expect(modalBody).toBeInTheDocument();
    const modalFooter = modalPanel.querySelector(footer)!;
    expect(modalFooter).toBeInTheDocument();
  });
  test('should render when set visible is control', () => {
    const App = () => {
      const [visible, setVisible] = React.useState(false);
      return (
        <div>
          <Button onClick={() => setVisible(true)}>show</Button>
          <Modal visible={visible} onClose={() => setVisible(false)}>
            Demo
          </Modal>
        </div>
      );
    };
    const { container } = render(<App />);
    expect(document.querySelector(wrapper)).not.toBeInTheDocument();
    fireEvent.click(container.querySelector('button')!);
    expect(document.querySelector(wrapper)).toBeInTheDocument();
    classTest(document.querySelector(wrapper)!, wrapperShow);
    fireEvent.click(document.querySelector(headerClose)!);
    expect(document.querySelector(wrapper)).toBeInTheDocument();
    classTest(document.querySelector(wrapper)!, wrapperHide);
    fireEvent.click(container.querySelector('button')!);
    classTest(document.querySelector(wrapper)!, wrapperShow);
    fireEvent.click(document.querySelector(mask)!);
    classTest(document.querySelector(wrapper)!, wrapperHide);
  });
  test('should render when set width', () => {
    const width = 100;
    render(<Modal width={width} visible={true} />);
    const modalPanel = document.querySelector(panel)!;
    styleContentTest(modalPanel, `width: ${width}px;`);
  });
  test('should render when set title and footer', () => {
    const okFn = jest.fn();
    const footers = [
      <Button key='cancel' mode='outline'>
        Cancel
      </Button>,
      <Button key='ok' type='primary' onClick={okFn}>
        Ok
      </Button>,
    ];
    render(
      <Modal width={400} title={title} footer={footers} visible>
        {content}
      </Modal>,
    );
    const tableWrapper = document.querySelector(wrapper)!;
    textContentTest(tableWrapper.querySelector(headerTitle)!, title);
    textContentTest(tableWrapper.querySelector(body)!, content);
    const tableFooter = tableWrapper.querySelector(footer)!;
    expect(tableFooter.querySelectorAll('button').length).toBe(2);
  });
  test('should render when set fullScreen', () => {
    render(
      <Modal title={title} fullScreen visible>
        {content}
      </Modal>,
    );
    const tableWrapper = document.querySelector(wrapper)!;
    classTest(tableWrapper, wrapperFullScreen);
  });
  test('should render when set container', () => {
    const className = 'demo';
    const App = () => {
      const wrapperRef = React.useRef<HTMLDivElement | null>(null);
      const [visible, setVisible] = React.useState(false);
      return (
        <div ref={wrapperRef} className={className}>
          <Button onClick={() => setVisible(true)}>show</Button>
          <Modal container={wrapperRef.current || undefined} visible={visible} />
        </div>
      );
    };
    const { container } = render(<App />);
    fireEvent.click(container.querySelector('button')!);
    expect(container.querySelector(`.${className}`)?.querySelector(wrapper)).toBeInTheDocument();
  });
  test('should render when set multi-layer modal', () => {
    const App = () => {
      const [visible, setVisible] = React.useState(false);
      const [visibleSec, setVisibleSec] = React.useState(false);
      return (
        <div>
          <Button onClick={() => setVisible(true)}>show</Button>
          <Modal visible={visible} onClose={() => setVisible(false)}>
            <Button onClick={() => setVisibleSec(true)}>show</Button>
            <Modal visible={visibleSec} onClose={() => setVisibleSec(false)}>
              Demo
            </Modal>
          </Modal>
        </div>
      );
    };
    const { container } = render(<App />);
    fireEvent.click(container.querySelector('button')!);
    const modalBody = document.querySelector(body)!;
    fireEvent.click(modalBody.querySelector('button')!);
    const modalWrappers = document.querySelectorAll(wrapper);
    expect(modalWrappers.length).toBe(2);
    classTest(modalWrappers[0], wrapperIsMask);
    classTest(modalWrappers[1], wrapperIsMask, false);
    fireEvent.click(modalWrappers[1].querySelector(mask)!);
    classTest(modalWrappers[1], wrapperHide);
    fireEvent.click(modalWrappers[0].querySelector(mask)!);
    classTest(modalWrappers[0], wrapperHide);
  });
  test('should render when set destroy', async () => {
    const App = () => {
      const [visible, setVisible] = React.useState(false);
      return (
        <div>
          <Button onClick={() => setVisible(true)}>show</Button>
          <Modal visible={visible} onClose={() => setVisible(false)} destroy>
            Demo
          </Modal>
        </div>
      );
    };
    const { container } = render(<App />);
    fireEvent.click(container.querySelector('button')!);
    const modalWrappers = document.querySelectorAll(wrapper);
    expect(modalWrappers.length).toBe(1);
    fireEvent.click(modalWrappers[0].querySelector(headerClose)!);
    await waitFor(() => {
      const modalWrappersAfterClose = document.querySelectorAll(wrapper);
      return modalWrappersAfterClose.length === 0;
    });
  });
  test('should render when set top', () => {
    const topByNumber = 20;
    const topByString = '20vh';
    const { rerender } = render(
      <Modal title={title} top={topByNumber} visible>
        {content}
      </Modal>,
    );
    const modalPanel = document.querySelector(panel)!;
    styleContentTest(modalPanel, `top: ${topByNumber}px;`);
    rerender(
      <Modal title={title} top={topByString} visible>
        {content}
      </Modal>,
    );
    styleContentTest(modalPanel, `top: ${topByString};`);
  });
  test('should render when set bodyStyle', () => {
    const bodyStyle = { backgroundColor: 'red' };
    render(
      <Modal title={title} bodyStyle={bodyStyle} visible>
        {content}
      </Modal>,
    );
    const modalBody = document.querySelector(body)!;
    styleContentTest(modalBody, 'background-color: red;');
  });
  test('should render when click esc', () => {
    const App = () => {
      const [visible, setVisible] = React.useState(false);
      return (
        <div>
          <Button onClick={() => setVisible(true)}>show</Button>
          <Modal visible={visible} onClose={() => setVisible(false)} />
        </div>
      );
    };
    const { container } = render(<App />);
    fireEvent.click(container.querySelector('button')!);
    const modalWrappers = document.querySelectorAll(wrapper);
    classTest(modalWrappers[0], wrapperShow);
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    classTest(modalWrappers[0], wrapperHide);
  });
  test('should render when set esc is false', () => {
    const App = () => {
      const [visible, setVisible] = React.useState(false);
      return (
        <div>
          <Button onClick={() => setVisible(true)}>show</Button>
          <Modal visible={visible} onClose={() => setVisible(false)} esc={false} />
        </div>
      );
    };
    const { container } = render(<App />);
    fireEvent.click(container.querySelector('button')!);
    const modalWrappers = document.querySelectorAll(wrapper);
    classTest(modalWrappers[0], wrapperShow);
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    classTest(modalWrappers[0], wrapperShow);
  });
});
describe('Modal[Moveable/Resizable]', () => {
  test('should render when set moveable', () => {
    render(
      <Modal title={title} moveable visible width={400}>
        {content}
      </Modal>,
    );
    const modalWrapper = document.querySelector(wrapper)!;
    classTest(modalWrapper, wrapperMoveable);
    styleContentTest(modalWrapper.querySelector(panel)!, 'transform: translate(0px, 0px);');
    const modalHeader = modalWrapper.querySelector(header)!;
    fireEvent.mouseDown(modalHeader, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(document, { clientX: 50, clientY: 50 });
    fireEvent.mouseUp(document);
    // TODO： not work
    screen.debug();
  });
  test('should render when set resizable', () => {
    render(
      <Modal title={title} visible width={400} resizable>
        {content}
      </Modal>,
    );

    const modalWrapper = document.querySelector(wrapper)!;
    const resizeXWrapper = modalWrapper.querySelector(resizeX)!;
    const resizeYWrapper = modalWrapper.querySelector(resizeY)!;
    const resizeXYWrapper = modalWrapper.querySelector(resizeXY)!;
    expect(resizeXWrapper).toBeInTheDocument();
    expect(resizeYWrapper).toBeInTheDocument();
    expect(resizeXYWrapper).toBeInTheDocument();
    fireEvent.mouseDown(resizeXWrapper, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(document, { clientX: 50, clientY: 50 });
    fireEvent.mouseUp(document);

    screen.debug();
  });
});
describe('Modal[Confirm]', () => {
  test('should render when set text', () => {
    const okFn = jest.fn();
    const confirm = () => {
      Modal.confirm({
        title: 'this is a title',
        content: 'this is a content',
        text: {
          ok: 'ok',
          cancel: 'cancel',
        },
        onOk: okFn,
      });
    };
    const { container } = render(<Button onClick={confirm} />);
    fireEvent.click(container.querySelector('button')!);
    screen.debug();
    const modalWrapper = document.querySelector(wrapper)!;
    expect(document.querySelector('.so-alert-confirm-icon')!).toBeInTheDocument();
    const tableButtons = modalWrapper.querySelectorAll('button');
    expect(tableButtons.length).toBe(2);
    fireEvent.click(tableButtons[1]);
    expect(okFn.mock.calls.length).toBe(1);
  });
  test('should render when set autoFocusButton', () => {
    const okFn = jest.fn();
    const confirm = () => {
      Modal.confirm({
        title: 'this is a title',
        content: 'this is a content',
        autoFocusButton: 'ok',
        text: {
          ok: 'ok',
          cancel: 'cancel',
        },
        onOk: okFn,
      });
    };
    const { container } = render(<Button onClick={confirm} />);
    fireEvent.click(container.querySelector('button')!);
    const modalWrapper = document.querySelector(wrapper)!;
    const tableButtons = modalWrapper.querySelectorAll('button');
    expect(tableButtons[1]).toHaveFocus();
  });
});
describe('Modal[Function(Type)]', () => {
  const types = ['success', 'info', 'error', 'warn'];
  type ModalType = 'success' | 'info' | 'error' | 'warn';
  const typesMap = {
    success: 'success',
    info: 'info',
    warn: 'warning',
    error: 'danger',
  };
  const modalByType = (type: ModalType) => {
    const show = () => {
      Modal[type]({
        title: 'this is a title',
        content: 'this is a content',
      });
    };
    return <Button onClick={show} />;
  };
  test.each(types)('should render when set type is %s', (type) => {
    const { container } = render(modalByType(type as ModalType));
    fireEvent.click(container.querySelector('button')!);
    const modalHeaderIcon = document.querySelector(`.so-alert-${typesMap[type as ModalType]}-icon`);
    expect(modalHeaderIcon).toBeInTheDocument();
    classTest(modalHeaderIcon!, headerIcon);
    classTest(document.querySelector(body)!, bodyWithIcon);
    fireEvent.click(document.querySelector(mask)!);
  });
});
// usePortal
// maskOpacity
