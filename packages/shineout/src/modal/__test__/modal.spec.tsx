import React from 'react';
import { cleanup, fireEvent, render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Modal, Button, Form, Input } from 'shineout';
import mountTest from '../../tests/mountTest';
import { classLengthTest } from '../../tests/structureTest';
import {
  classTest,
  createClassName,
  delay,
  displayTest,
  styleContentTest,
  styleTest,
  textContentTest,
} from '../../tests/utils';

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
  'wrapperDrawer',
  'wrapperDrawerTop',
  'wrapperDrawerLeft',
  'wrapperDrawerRight',
  'wrapperDrawerBottom',
  'wrapperZoom',
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
  wrapperDrawer,
  wrapperDrawerTop,
  wrapperDrawerLeft,
  wrapperDrawerRight,
  wrapperDrawerBottom,
  wrapperZoom,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

const {
  infoIcon,
  dangerIcon,
  successIcon,
  warningIcon,
  confirmIcon
} = createClassName('alert', ['infoIcon', 'dangerIcon', 'successIcon', 'warningIcon', 'confirmIcon'], [''])

const defaultStyle = 'top: 10vh; width: 500px;';

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
    screen.debug();
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
    // const modalFooter = modalPanel.querySelector(footer)!;
    // expect(modalFooter).toBeInTheDocument();
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
  test('should render when set height', () => {
    const height = 100;
    render(<Modal height={height} visible={true} />);
    const modalPanel = document.querySelector(panel)!;
    styleContentTest(modalPanel, `height: ${height}px;`);
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
  test('should render when set hideClose', () => {
    render(
      <Modal title={title} hideClose visible>
        {content}
      </Modal>,
    );
    const tableWrapper = document.querySelector(wrapper)!;
    classLengthTest(tableWrapper, headerClose, 0);
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
  test('should render when set padding', () => {
    const padding = 20;
    render(
      <Modal title={title} padding={padding} visible>
        {content}
      </Modal>,
    );
    styleContentTest(document.querySelector(body)!, `padding: ${padding}px;`);
  });
  test('should render when set zoom', () => {
    const App = () => {
      const [visible, setVisible] = React.useState(false);
      return (
        <div>
          <Button onClick={() => setVisible(true)}>show</Button>
          <Modal visible={visible} onClose={() => setVisible(false)} zoom />
        </div>
      );
    };
    const { container } = render(<App />);
    fireEvent.click(container.querySelector('button')!);
    const modalWrappers = document.querySelector(wrapper)!;
    classTest(modalWrappers, wrapperZoom);
    fireEvent.animationStart(modalWrappers.querySelector(mask)!);
    fireEvent.animationEnd(modalWrappers);
  });
  test('should render when set zIndex', () => {
    const zIndex = 100;
    render(
      <Modal title={title} zIndex={zIndex} visible>
        {content}
      </Modal>,
    );
    const modalWrapper = document.querySelector(wrapper)!;
    styleContentTest(modalWrapper, `z-index: ${zIndex};`);
  });
  test('should render when set events', () => {
    const dbClickFn = jest.fn();
    const events = {
      onDoubleClick: dbClickFn,
    };
    render(
      <Modal title={title} visible events={events}>
        {content}
      </Modal>,
    );
    const modalWrapper = document.querySelector(wrapper)!;
    fireEvent.doubleClick(modalWrapper.querySelector(mask)!);
    expect(dbClickFn.mock.calls.length).toBe(1);
  });
  test.each(['info', 'success', 'warning', 'error'])(
    'should render when set type is %s',
    (type) => {
      type ModalType = 'error' | 'info' | 'warning' | 'success';
      const typesMap = {
        success: successIcon,
        info: infoIcon,
        warning: warningIcon,
        error: dangerIcon,
      };
      render(
        <Modal title={title} visible type={type as ModalType}>
          {content}
        </Modal>,
      );
      const modalHeaderIcon = document.querySelector(
        typesMap[type as ModalType],
      );
      expect(modalHeaderIcon).toBeInTheDocument();
    },
  );
  test('should render when set modal.closeAll', async () => {
    const App = () => {
      const [visible, setVisible] = React.useState(false);
      const [visibleSec, setVisibleSec] = React.useState(false);
      return (
        <div>
          <Button onClick={() => setVisible(true)}>show</Button>
          <Modal visible={visible} onClose={() => setVisible(false)}>
            <Button onClick={() => setVisibleSec(true)}>show</Button>
            <Modal visible={visibleSec} onClose={() => setVisibleSec(false)}>
              <Button onClick={() => Modal.closeAll()}>closeAll</Button>
            </Modal>
          </Modal>
        </div>
      );
    };
    const { container } = render(<App />);
    fireEvent.click(container.querySelector('button')!);
    const modalBody = document.querySelector(body)!;
    fireEvent.click(modalBody.querySelector('button')!);
    fireEvent.click(document.querySelectorAll(body)[1].querySelector('button')!);
    await waitFor(() => {
      const modalWrappersAfterClose = document.querySelectorAll(wrapper);
      return modalWrappersAfterClose.length === 0;
    });
  });
});
describe('Modal[Form]', () => {
  test('should render when set form and submit', async () => {
    const submitFn = jest.fn();
    const footer = () => <Modal.Submit type='primary'>Submit</Modal.Submit>;
    render(
      <Modal visible footer={footer()}>
        <Form onSubmit={submitFn}>
          <Form.Item required label='Name'>
            <Input name='name' />
          </Form.Item>
        </Form>
      </Modal>,
    );
    fireEvent.click(document.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
    });
    expect(submitFn.mock.calls.length).toBe(1);
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
    fireEvent.mouseDown(modalHeader);
    fireEvent.mouseMove(document, { clientX: 50 });
    fireEvent.mouseUp(document);
    // TODO： not work
  });
  test('should render when set resizable', () => {
    const startClientX = 20;
    const endClientX = 90;
    const startClientY = 0;
    const endClientY = 30;
    render(
      <Modal title={title} visible resizable>
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
    fireEvent.mouseDown(resizeXWrapper, { clientX: startClientX });
    fireEvent.mouseMove(document, { clientX: endClientX });
    fireEvent.mouseUp(document);
    styleContentTest(document.querySelector(panel)!, `width: ${endClientX - startClientX}px;`);
    fireEvent.mouseDown(resizeYWrapper, { clientY: startClientY });
    fireEvent.mouseMove(document, { clientY: endClientY });
    fireEvent.mouseUp(document);
    styleContentTest(document.querySelector(panel)!, `height: ${endClientY - startClientY}px;`);
    fireEvent.mouseDown(resizeXYWrapper, { clientX: startClientY, clientY: startClientY });
    fireEvent.mouseMove(document, { clientX: endClientY, clientY: endClientY });
    fireEvent.mouseUp(document);
    styleContentTest(document.querySelector(panel)!, `width: ${endClientY - startClientY}px;`);
    styleContentTest(document.querySelector(panel)!, `height: ${endClientY - startClientY}px;`);
  });
});
describe('Modal[Position]', () => {
  const positionMaps: { [key: string]: string } = {
    top: wrapperDrawerTop,
    left: wrapperDrawerLeft,
    right: wrapperDrawerRight,
    bottom: wrapperDrawerBottom,
  };
  test.each(['top', 'left', 'right', 'bottom'])(
    'should render when set position is %s',
    (position) => {
      render(
        <Modal title={title} position={position as 'top' | 'left' | 'right' | 'bottom'} visible>
          {content}
        </Modal>,
      );
      const modalWrapper = document.querySelector(wrapper)!;
      classTest(modalWrapper, wrapperDrawer);
      classTest(modalWrapper, positionMaps[position]);
    },
  );
  test('should render when set height and position', () => {
    const position = 'left';
    render(
      <Modal title={title} position={position} visible height={100}>
        {content}
      </Modal>,
    );
    styleContentTest(document.querySelector(panel)!, 'height', false);
  });
  test('should render when set postion and moveable', () => {
    const startClientX = 20;
    const endClientX = 10;
    const position = 'right';
    render(
      <Modal title={title} position={position} visible resizable>
        {content}
      </Modal>,
    );
    const modalResizeX = document.querySelector(resizeX)!;
    fireEvent.mouseDown(modalResizeX, { clientX: startClientX });
    fireEvent.mouseMove(document, { clientX: endClientX });
    fireEvent.mouseUp(document);
    styleContentTest(document.querySelector(panel)!, `width: ${startClientX - endClientX}px;`);
  });
});
describe('Modal[Mask]', () => {
  test('should render when set hideMask', () => {
    const { container } = render(<Modal hideMask visible />);
    expect(container.querySelector(mask)).not.toBeInTheDocument();
  });
  test('should render when set maskBackground', () => {
    const maskBackground = 'red';
    render(<Modal maskBackground={maskBackground} visible />);
    const modalWrapper = document.querySelector(wrapper)!;
    classTest(modalWrapper, wrapperIsMask);
    styleTest(modalWrapper, 'background: red;');
  });
  test('should render when set maskCloseAble is false', () => {
    const App = () => {
      const [visible, setVisible] = React.useState(false);
      return (
        <div>
          <Button onClick={() => setVisible(true)}>show</Button>
          <Modal visible={visible} onClose={() => setVisible(false)} maskCloseAble={false} />
        </div>
      );
    };
    const { container } = render(<App />);
    fireEvent.click(container.querySelector('button')!);
    const modalWrapper = document.querySelector(wrapper)!;
    fireEvent.click(modalWrapper.querySelector(mask)!);
    classTest(modalWrapper, wrapperShow);
    classLengthTest(modalWrapper, headerClose, 0);
  });
  test('should render when set maskCloseAble is null', () => {
    const App = () => {
      const [visible, setVisible] = React.useState(false);
      return (
        <div>
          <Button onClick={() => setVisible(true)}>show</Button>
          <Modal visible={visible} onClose={() => setVisible(false)} maskCloseAble={null} />
        </div>
      );
    };
    const { container } = render(<App />);
    fireEvent.click(container.querySelector('button')!);
    const modalWrapper = document.querySelector(wrapper)!;
    fireEvent.click(modalWrapper.querySelector(mask)!);
    classTest(modalWrapper, wrapperShow);
    classLengthTest(modalWrapper, headerClose, 1);
    fireEvent.click(modalWrapper.querySelector(headerClose)!);
    classTest(modalWrapper, wrapperHide);
  });
  test('should render when set forceMask', () => {
    const App = () => {
      const [visible, setVisible] = React.useState(false);
      const [visibleSec, setVisibleSec] = React.useState(false);
      return (
        <div>
          <Button onClick={() => setVisible(true)}>show</Button>
          <Modal visible={visible} onClose={() => setVisible(false)}>
            <Button onClick={() => setVisibleSec(true)}>show</Button>
            <Modal visible={visibleSec} onClose={() => setVisibleSec(false)} forceMask>
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
    modalWrappers.forEach((item) => {
      classTest(item, wrapperIsMask);
    });
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
    const modalWrapper = document.querySelector(wrapper)!;
    expect(document.querySelector(confirmIcon)!).toBeInTheDocument();
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
    success: successIcon,
    info: infoIcon,
    warn: warningIcon,
    error: dangerIcon,
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
    const modalHeaderIcon = document.querySelector(typesMap[type as ModalType]);
    expect(modalHeaderIcon).toBeInTheDocument();
    classTest(modalHeaderIcon!, headerIcon);
    classTest(document.querySelector(body)!, bodyWithIcon);
    fireEvent.click(document.querySelector(mask)!);
  });
});
// usePortal
// maskOpacity
// noPadding
