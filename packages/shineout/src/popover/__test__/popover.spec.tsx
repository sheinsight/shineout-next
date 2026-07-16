import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Popover from '..';
import { Button } from 'shineout';
import mountTest from '../../tests/mountTest';
import {
  attributesTest,
  classTest,
  createClassName,
  delay,
  displayTest,
  styleContentTest,
  styleTest,
} from '../../tests/utils';
import PopoverBase from '../__example__/01-base';
import PopoverControll from '../__example__/04-controll';
import PopoverContainer from '../__example__/06-container';
import PopoverDisabled from '../__example__/07-disabled';
import PopoverFunc from '../__example__/10-func';
import PopoverDestroy from '../__example__/t-01-destroy';

const SO_PREFIX = 'popover';
const {
  wrapper: popoverClassName,
  content: popoverContentClassName,
  wrapperOpen: popoverOpenClassName,
  arrow: popoverArrowClassName,
  text: popoverTextClassName,
} = createClassName(SO_PREFIX, ['wrapper', 'content', 'arrow'], ['wrapperOpen', 'text'])

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.runAllTimers();
});
afterEach(cleanup);
mountTest(<Popover />);

const PopoverDemo = ({
  className,
  style,
  trigger,
  position,
  mouseEnterDelay,
  mouseLeaveDelay,
  type,
  onOpen,
  onClose,
  visible,
  defaultVisible,
  background,
  border,
  clickToCancelDelay,
  showArrow,
  priorityDirection,
  scrollDismiss,
}: any) => {
  return (
    <Button>
      Hover
      <Popover
        className={className}
        style={style}
        trigger={trigger}
        position={position}
        mouseEnterDelay={mouseEnterDelay}
        mouseLeaveDelay={mouseLeaveDelay}
        type={type}
        onOpen={onOpen}
        onClose={onClose}
        visible={visible}
        defaultVisible={defaultVisible}
        background={background}
        border={border}
        clickToCancelDelay={clickToCancelDelay}
        showArrow={showArrow}
        priorityDirection={priorityDirection}
        scrollDismiss={scrollDismiss}
      >
        some Text
      </Popover>
    </Button>
  );
};

const getPopoverRoot = () =>
  document.querySelector(popoverClassName)!

const getPopoverStatus = (status: boolean) => {
  expect(
    getPopoverRoot().classList.contains(popoverOpenClassName)
  ).toBe(status);
};
const getPopoverContent = () =>
  document.querySelector(popoverContentClassName)!

describe('Popover[Snapshot]', () => {
  test('render snapshot default', async () => {
    const { container } = render(<PopoverBase />);
    fireEvent.mouseEnter(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      expect(document.querySelector(popoverClassName)).toMatchSnapshot();
    });
  });
});

describe('Popover[Base]', () => {
  displayTest(Popover, 'ShineoutPopover');
  test('should render default', async () => {
    const { container } = render(<PopoverDemo />);
    let popover = getPopoverRoot();
    expect(popover).not.toBeInTheDocument();
    fireEvent.mouseEnter(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      popover = getPopoverRoot();
      expect(
        popover.classList.contains(popoverOpenClassName) ||
          popover.classList.contains(popoverOpenClassName),
      ).toBeTruthy();
      styleTest(
        popover,
        'position: absolute; z-index: 1060; left: 0px; transform: translateX(-50%); --soui-popup-transform: translateX(-50%); top: 0px; transform-origin: center top;',
      );
      attributesTest(popover, 'data-soui-position', 'bottom');
      expect(
        popover.querySelector(popoverArrowClassName)
      ).toBeTruthy();
      const content = getPopoverContent();
      expect(content.textContent).toBe('some Text');
      expect(
        content.classList.contains(popoverTextClassName)
      ).toBeTruthy();
    });
    fireEvent.mouseLeave(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      getPopoverStatus(false);
    });
  });
  test('should render when set className and style', async () => {
    const { container } = render(<PopoverDemo className='demo' style={{ color: 'black' }} />);
    fireEvent.mouseEnter(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      const popover = getPopoverRoot();
      classTest(popover, 'demo');
      const content = getPopoverContent();
      styleTest(content, 'color: black;');
    });
  });
  test('should render when set trigger is click', async () => {
    const { container } = render(<PopoverDemo trigger='click' />);
    expect(getPopoverRoot()).not.toBeInTheDocument();
    const button = container.querySelector('button')!;
    fireEvent.mouseEnter(button);
    await waitFor(async () => {
      await delay(200);
      expect(getPopoverRoot()).not.toBeInTheDocument();
    });
    fireEvent.click(button);
    await waitFor(async () => {
      await delay(200);
      expect(getPopoverRoot()).toBeInTheDocument();
    });
  });

  test('should close when click double and click outside', async () => {
    const { container } = render(<PopoverDemo trigger='click' />);
    expect(getPopoverRoot()).not.toBeInTheDocument();
    const button = container.querySelector('button')!;
    fireEvent.click(button);
    await waitFor(async () => {
      await delay(200);
      expect(getPopoverRoot()).toBeInTheDocument();
    });
    fireEvent.click(button);
    await waitFor(async () => {
      await delay(200);
      getPopoverStatus(false);
    });
    fireEvent.click(button);
    await waitFor(async () => {
      await delay(200);
      getPopoverStatus(true);
    });
    fireEvent.mouseDown(document);
    await waitFor(async () => {
      await delay(500);
    });
    getPopoverStatus(false);
  });

  const positionStyleMap: Record<string, string> = {
    'bottom-left': 'position: absolute; z-index: 1060; left: 0px; top: 0px; transform-origin: center top;',
    bottom: 'position: absolute; z-index: 1060; left: 0px; transform: translateX(-50%); --soui-popup-transform: translateX(-50%); top: 0px; transform-origin: center top;',
    'bottom-right':
      'position: absolute; z-index: 1060; right: 0px; top: 0px; transform-origin: center top;',
    'right-top': 'position: absolute; z-index: 1060; top: 0px; transform: translateX(0%); --soui-popup-transform: translateX(0%); left: 0px;',
    'left-top':
      'position: absolute; z-index: 1060; top: 0px; transform: translateX(0%); --soui-popup-transform: translateX(0%); right: 0px;',
    right: 'position: absolute; z-index: 1060; top: 0px; transform: translateY(-50%); --soui-popup-transform: translateY(-50%); left: 0px;',
    left: 'position: absolute; z-index: 1060; top: 0px; transform: translateY(-50%); --soui-popup-transform: translateY(-50%); right: 0px;',
    'right-bottom':
      'position: absolute; z-index: 1060; top: 0px; transform: translateY(-100%); --soui-popup-transform: translateY(-100%); left: 0px;',
    'left-bottom':
      'position: absolute; z-index: 1060; top: 0px; transform: translateY(-100%); --soui-popup-transform: translateY(-100%); right: 0px;',
    'top-left':
      'position: absolute; z-index: 1060; left: 0px; transform: translateY(-100%); --soui-popup-transform: translateY(-100%); top: 0px; transform-origin: center bottom;',
    top: 'position: absolute; z-index: 1060; left: 0px; transform: translateX(-50%) translateY(-100%); --soui-popup-transform: translateX(-50%) translateY(-100%); top: 0px; transform-origin: center bottom;',
    'top-right':
      'position: absolute; z-index: 1060; right: 0px; transform: translateY(-100%); --soui-popup-transform: translateY(-100%); top: 0px; transform-origin: center bottom;',
  };

  Object.keys(positionStyleMap).forEach((item: string) => {
    test(`should render when set position is ${item}`, async () => {
      const { container } = render(<PopoverDemo position={item} trigger='click' />);
      fireEvent.click(container.querySelector('button')!);
      await waitFor(async () => {
        await delay(200);
        const popover = getPopoverRoot();
        attributesTest(popover, 'data-soui-position', item);
        styleTest(popover, positionStyleMap[item]);
      });
    });
  });
  test('should render when set background', async () => {
    const { container } = render(<PopoverDemo background='black' />);
    fireEvent.mouseEnter(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      styleContentTest(getPopoverRoot(), 'background-color: black;');
    });
  });
  test('should render when set border', async () => {
    const { container } = render(<PopoverDemo border='black' />);
    fireEvent.mouseEnter(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      styleContentTest(getPopoverRoot(), 'border-color: black;');
    });
  });
});

describe('Popover[Visible]', () => {
  test('should render when set visible is true', async () => {
    const { container } = render(<PopoverDemo visible={true} trigger='click' />);
    expect(getPopoverRoot()).toBeInTheDocument();
    fireEvent.click(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      expect(getPopoverRoot()).toBeInTheDocument();
    });
  });
  test('should render when set visible is false', async () => {
    const { container } = render(<PopoverDemo visible={false} trigger='click' />);
    expect(getPopoverRoot()).not.toBeInTheDocument();
    fireEvent.click(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      expect(getPopoverRoot()).not.toBeInTheDocument();
    });
  });
  test('should render that is controll by set visible', async () => {
    const { container } = render(<PopoverControll />);
    expect(getPopoverRoot()).not.toBeInTheDocument();
    const buttons = container.querySelectorAll('button')!;
    fireEvent.mouseEnter(buttons[1]);
    await waitFor(async () => {
      await delay(200);
      expect(getPopoverRoot()).not.toBeInTheDocument();
    });
    fireEvent.click(buttons[0]);
    await waitFor(async () => {
      await delay(200);
      expect(getPopoverRoot()).toBeInTheDocument();
    });
  });
  test('should render when set defaultVisible', async () => {
    const { container } = render(<PopoverDemo defaultVisible={true} trigger='click' />);
    expect(getPopoverRoot()).toBeInTheDocument();
    fireEvent.mouseDown(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      getPopoverStatus(true);
    });
  });
});

describe('Popover[delay]', () => {
  test('should render when set delay', async () => {
    const { container } = render(<PopoverDemo mouseEnterDelay={500} mouseLeaveDelay={500} />);
    const button = container.querySelector('button')!;
    fireEvent.mouseEnter(button);
    await waitFor(async () => {
      await delay(200);
      expect(getPopoverRoot()).not.toBeInTheDocument();
    });
    await waitFor(async () => {
      await delay(300);
      expect(getPopoverRoot()).toBeInTheDocument();
    });
    fireEvent.mouseLeave(button);
    await waitFor(async () => {
      await delay(200);
      expect(getPopoverRoot()).toBeInTheDocument();
      getPopoverStatus(true);
    });
    await waitFor(async () => {
      await delay(300);
      getPopoverStatus(false);
    });
  });
});
describe('Popover[Container]', () => {
  test('should render when set getPopupContainer', async () => {
    const { container } = render(<PopoverContainer />);
    const button = container.querySelector('button')!;
    fireEvent.click(button);
    await waitFor(async () => {
      await delay(200);
      expect(
        container.querySelector(popoverClassName) || container.querySelector(popoverClassName),
      ).toBeTruthy();
    });
  });
});
// TODO: have some bug
describe('Popover[Disabled]', () => {
  test('should render when set disabled', async () => {
    const { container } = render(<PopoverDisabled />);
    const button = container.querySelector('button')!;
    fireEvent.mouseEnter(button);
    await waitFor(async () => {
      await delay(200);
      // expect(getPopoverRoot()).toBeInTheDocument();
    });
  });
});
describe('Popover[Type]', () => {
  const types = ['success', 'info', 'warning', 'danger'];
  types.forEach((item: string) => {
    test(`should render when set type is ${item}`, async () => {
      const { container } = render(<PopoverDemo type={item} />);
      const button = container.querySelector('button')!;
      fireEvent.mouseEnter(button);
      await waitFor(async () => {
        await delay(200);
        attributesTest(getPopoverRoot(), 'data-soui-type', item);
      });
    });
  });
});
describe('Popover[Event]', () => {
  test('should render when set onOpen and onClose', async () => {
    const openFn = jest.fn();
    const closeFn = jest.fn();
    const { container } = render(<PopoverDemo onOpen={openFn} onClose={closeFn} />);
    const button = container.querySelector('button')!;
    fireEvent.mouseEnter(button);
    await waitFor(async () => {
      await delay(200);
      expect(openFn.mock.calls.length).toBe(1);
    });
    fireEvent.mouseLeave(button);
    await waitFor(async () => {
      await delay(200);
      expect(closeFn.mock.calls.length).toBe(1);
    });
  });
});
describe('Popover[UseTextStyle]', () => {
  test('should render when set useTextStyle', async () => {
    const { container, rerender } = render(
      <Button>
        <Popover useTextStyle>
          <div>hello</div>
        </Popover>
        useTextStyle
      </Button>,
    );
    let button = container.querySelector('button')!;
    fireEvent.mouseEnter(button);
    await waitFor(async () => {
      await delay(200);
      expect(
        getPopoverContent().classList.contains(popoverTextClassName)
      ).toBeTruthy();
    });
    rerender(
      <Button>
        <Popover useTextStyle={false}>
          <div>hello</div>
        </Popover>
        useTextStyle
      </Button>,
    );
    button = container.querySelector('button')!;
    fireEvent.mouseEnter(button);
    await waitFor(async () => {
      await delay(200);
      expect(
        getPopoverContent().classList.contains(popoverTextClassName)
      ).toBeFalsy();
    });
  });
});
describe('Popover[Destroy]', () => {
  test('should render set destroy', async () => {
    const { container } = render(<PopoverDestroy />);
    const button = container.querySelector('button')!;
    fireEvent.mouseEnter(button);
    await waitFor(async () => {
      await delay(200);
      expect(getPopoverRoot()).toBeInTheDocument();
    });
    fireEvent.mouseLeave(button);
    await waitFor(async () => {
      await delay(200);
      expect(getPopoverRoot()).not.toBeInTheDocument();
    });
  });
});
describe('Popover[Children]', () => {
  test('should render when set children is ReactNode', async () => {
    const { container } = render(
      <Button>
        Hover
        <Popover>
          <Button>Hello</Button>
        </Popover>
      </Button>,
    );
    const button = container.querySelector('button')!;
    fireEvent.mouseEnter(button);
    await waitFor(async () => {
      await delay(200);
      expect(getPopoverRoot().querySelector('button')).toBeTruthy();
    });
  });
  test('should render when set children is function', async () => {
    const { container } = render(<PopoverFunc />);
    const button = container.querySelector('button')!;
    fireEvent.click(button);
    await waitFor(async () => {
      await delay(200);
      expect(getPopoverRoot().querySelector('button')).toBeTruthy();
    });
    fireEvent.click(getPopoverRoot().querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      getPopoverStatus(false);
    });
  });
});
describe('Popover[ClickToCancelDelay]', () => {
  test('should render when set clickToCancelDelay', async () => {
    const { container } = render(<PopoverDemo clickToCancelDelay={true} mouseEnterDelay={500} />);
    const button = container.querySelector('button')!;
    fireEvent.mouseEnter(button);
    await waitFor(async () => {
      await delay(200);
      expect(getPopoverRoot()).not.toBeInTheDocument();
    });
    fireEvent.click(button);
    await waitFor(async () => {
      await delay(300);
      expect(getPopoverRoot()).not.toBeInTheDocument();
    });
  });
});
describe('Popover[ShowArrow]', () => {
  test('should render when set showArrow is false', async () => {
    const { container } = render(<PopoverDemo showArrow={false} />);
    const button = container.querySelector('button')!;
    fireEvent.mouseEnter(button);
    await waitFor(async () => {
      await delay(200);
      const popover = getPopoverRoot();
      expect(
        popover.querySelector(popoverArrowClassName)
      ).toBeFalsy();
    });
  });
});
describe('Popover[PriorityDirection]', () => {
  test('should render when set PriorityDirection is horizontal', async () => {
    const { container } = render(<PopoverDemo priorityDirection='horizontal' />);
    const button = container.querySelector('button')!;
    fireEvent.mouseEnter(button);
    await waitFor(async () => {
      await delay(200);
      styleTest(
        getPopoverRoot(),
        'position: absolute; z-index: 1060; top: 0px; transform: translateY(-50%); --soui-popup-transform: translateY(-50%); left: 0px;',
      );
    });
  });
});
describe('Popover[ScrollDismiss]', () => {
  test('should render when set scrollDismiss is true', async () => {
    const { container } = render(<PopoverDemo scrollDismiss={true} />);
    const button = container.querySelector('button')!;
    fireEvent.mouseEnter(button);
    await waitFor(async () => {
      await delay(200);
    });
    fireEvent.scroll(document, { target: { scrollY: 100 } });
    await waitFor(async () => {
      await delay(200);
      getPopoverStatus(false);
    });
  });
  test('should render when set scrollDismiss is false', async () => {
    const { container } = render(<PopoverDemo scrollDismiss={false} />);
    const button = container.querySelector('button')!;
    fireEvent.mouseEnter(button);
    await waitFor(async () => {
      await delay(200);
    });
    fireEvent.scroll(document, { target: { scrollY: 100 } });
    await waitFor(async () => {
      await delay(200);
      getPopoverStatus(true);
    });
  });
  test('should render when set scrollDismiss is function', async () => {
    const targetStyle: React.CSSProperties = {
      height: 200,
      overflowY: 'auto',
      position: 'relative',
    };
    const { container } = render(
      <div id='popup-target' style={targetStyle}>
        <Button>
          Scrollable
          <Popover scrollDismiss={() => document.querySelector('#popup-target')}>
            render in parent element
          </Popover>
        </Button>
      </div>,
    );
    const button = container.querySelector('button')!;
    fireEvent.mouseEnter(button);
    await waitFor(async () => {
      await delay(200);
    });
    fireEvent.scroll(document.querySelector('#popup-target')!, { target: { scrollY: 100 } });
    await waitFor(async () => {
      await delay(200);
      getPopoverStatus(false);
    });
  });
});

describe('Popover[Semantic styles]', () => {
  test('styles prop applies inline styles to root/arrow/content', async () => {
    const { container } = render(
      <Button>
        Hover
        <Popover
          styles={{
            root: { border: '2px solid red' },
            arrow: { backgroundColor: '#fafafa' },
            content: { padding: '16px', borderRadius: '8px' },
          }}
        >
          content
        </Popover>
      </Button>,
    );
    fireEvent.mouseEnter(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      const popover = getPopoverRoot() as HTMLElement;
      expect(popover.style.border).toBe('2px solid red');
      const arrow = popover.querySelector(popoverArrowClassName) as HTMLElement;
      expect(arrow.style.backgroundColor).toBe('rgb(250, 250, 250)');
      const content = popover.querySelector(popoverContentClassName) as HTMLElement;
      expect(content.style.padding).toBe('16px');
      expect(content.style.borderRadius).toBe('8px');
    });
  });

  test('styles prop merges with existing component style prop', async () => {
    const { container } = render(
      <Button>
        Hover
        <Popover style={{ color: 'blue' }} styles={{ content: { fontSize: '14px' } }}>
          content
        </Popover>
      </Button>,
    );
    fireEvent.mouseEnter(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      const popover = getPopoverRoot() as HTMLElement;
      const content = popover.querySelector(popoverContentClassName) as HTMLElement;
      expect(content.style.fontSize).toBe('14px');
      expect(content.style.color).toBe('blue');
    });
  });
});

describe('Popover[Semantic setConfig global fallback]', () => {
  afterEach(() => {
    // 恢复默认配置
    const { setConfig } = require('shineout');
    setConfig({ popover: {} });
  });

  test('setConfig classNames applies globally to all Popover instances', async () => {
    const { setConfig } = require('shineout');
    setConfig({
      popover: {
        classNames: { arrow: 'global-arrow', content: 'global-content' },
      },
    });
    const { container } = render(
      <Button>
        Hover
        <Popover>content</Popover>
      </Button>,
    );
    fireEvent.mouseEnter(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      const popover = getPopoverRoot();
      expect(popover.querySelector('.global-arrow')).toBeInTheDocument();
      expect(popover.querySelector('.global-content')).toBeInTheDocument();
    });
  });

  test('setConfig styles applies globally to all Popover instances', async () => {
    const { setConfig } = require('shineout');
    setConfig({
      popover: {
        styles: { content: { padding: '24px' }, arrow: { opacity: '0.5' } },
      },
    });
    const { container } = render(
      <Button>
        Hover
        <Popover>content</Popover>
      </Button>,
    );
    fireEvent.mouseEnter(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      const popover = getPopoverRoot() as HTMLElement;
      const content = popover.querySelector(popoverContentClassName) as HTMLElement;
      expect(content.style.padding).toBe('24px');
      const arrow = popover.querySelector(popoverArrowClassName) as HTMLElement;
      expect(arrow.style.opacity).toBe('0.5');
    });
  });

  test('component-level classNames takes priority over setConfig', async () => {
    const { setConfig } = require('shineout');
    setConfig({
      popover: {
        classNames: { arrow: 'global-arrow' },
      },
    });
    const { container } = render(
      <Button>
        Hover
        <Popover classNames={{ arrow: 'local-arrow' }}>content</Popover>
      </Button>,
    );
    fireEvent.mouseEnter(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      const popover = getPopoverRoot();
      // 两者都应被应用（semClass 合并内部 + global + local）
      expect(popover.querySelector('.local-arrow')).toBeInTheDocument();
      expect(popover.querySelector('.global-arrow')).toBeInTheDocument();
    });
  });
});

describe('Popover[Semantic classNames - functional]', () => {
  test('static string classNames still work (regression)', async () => {
    const { container } = render(
      <Button>
        Hover
        <Popover classNames={{ arrow: 'my-static-arrow', content: 'my-static-content' }}>
          content
        </Popover>
      </Button>,
    );
    fireEvent.mouseEnter(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      const popover = getPopoverRoot();
      expect(popover.querySelector('.my-static-arrow')).toBeInTheDocument();
      expect(popover.querySelector('.my-static-content')).toBeInTheDocument();
    });
  });

  test('functional root classNames receives open=true after popup opens', async () => {
    const rootFn = jest.fn(({ open }: { open: boolean; position: any; type?: string }) =>
      open ? 'fn-root-open' : 'fn-root-closed',
    );
    const { container } = render(
      <Button>
        Hover
        <Popover classNames={{ root: rootFn }}>content</Popover>
      </Button>,
    );
    fireEvent.mouseEnter(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      const popover = getPopoverRoot();
      expect(popover.classList.contains('fn-root-open')).toBe(true);
      expect(popover.classList.contains('fn-root-closed')).toBe(false);
      // 函数被调用，且 open 参数为 true
      const lastCall = rootFn.mock.calls[rootFn.mock.calls.length - 1][0];
      expect(lastCall.open).toBe(true);
    });
  });

  test('functional root classNames receives open=false after popup closes', async () => {
    const rootFn = jest.fn(({ open }: { open: boolean; position: any; type?: string }) =>
      open ? 'fn-root-open' : 'fn-root-closed',
    );
    // 先打开（让 DOM 渲染），再关闭，验证关闭态的 class
    const { container, rerender } = render(
      <Button>
        Hover
        <Popover visible={true} classNames={{ root: rootFn }}>
          content
        </Popover>
      </Button>,
    );
    await waitFor(async () => {
      await delay(200);
      expect(getPopoverRoot().classList.contains('fn-root-open')).toBe(true);
    });
    rerender(
      <Button>
        Hover
        <Popover visible={false} classNames={{ root: rootFn }}>
          content
        </Popover>
      </Button>,
    );
    await waitFor(async () => {
      await delay(200);
      const popover = getPopoverRoot();
      expect(popover.classList.contains('fn-root-closed')).toBe(true);
      expect(popover.classList.contains('fn-root-open')).toBe(false);
      const lastCall = rootFn.mock.calls[rootFn.mock.calls.length - 1][0];
      expect(lastCall.open).toBe(false);
    });
  });

  test('functional classNames receives correct type field', async () => {
    const contentFn = jest.fn(({ type }: { open: boolean; position: any; type?: string }) =>
      type ? `fn-content-${type}` : 'fn-content',
    );
    const { container } = render(
      <Button>
        Hover
        <Popover type='danger' classNames={{ content: contentFn }}>
          content
        </Popover>
      </Button>,
    );
    fireEvent.mouseEnter(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      const popover = getPopoverRoot();
      expect(popover.querySelector('.fn-content-danger')).toBeInTheDocument();
      const lastCall = contentFn.mock.calls[contentFn.mock.calls.length - 1][0];
      expect(lastCall.type).toBe('danger');
    });
  });

  test('functional classNames receives correct position field', async () => {
    const rootFn = jest.fn(({ position }: { open: boolean; position: any; type?: string }) =>
      `fn-pos-${position}`,
    );
    const { container } = render(
      <Button>
        Hover
        <Popover position='bottom' classNames={{ root: rootFn }}>content</Popover>
      </Button>,
    );
    fireEvent.mouseEnter(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      const popover = getPopoverRoot();
      expect(popover.classList.contains('fn-pos-bottom')).toBe(true);
      const lastCall = rootFn.mock.calls[rootFn.mock.calls.length - 1][0];
      expect(lastCall.position).toBe('bottom');
    });
  });

  test('mixed static + functional classNames work together', async () => {
    const rootFn = jest.fn(({ open }: { open: boolean; position: any; type?: string }) =>
      open ? 'fn-open' : 'fn-closed',
    );
    const { container } = render(
      <Button>
        Hover
        <Popover classNames={{ root: rootFn, arrow: 'static-arrow' }}>content</Popover>
      </Button>,
    );
    fireEvent.mouseEnter(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      const popover = getPopoverRoot();
      // 函数式 root class
      expect(popover.classList.contains('fn-open')).toBe(true);
      // 静态 arrow class
      expect(popover.querySelector('.static-arrow')).toBeInTheDocument();
    });
  });
});
