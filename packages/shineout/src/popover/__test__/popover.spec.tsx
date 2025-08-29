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
