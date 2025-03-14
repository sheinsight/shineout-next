import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tooltip from '..';
import { Button } from 'shineout'
import mountTest from '../../tests/mountTest';
import { classLengthTest } from '../../tests/structureTest';
import {
  StyleProps,
  attributesTest,
  classContentTest,
  classTest,
  createClassName,
  delay,
  displayTest,
  snapshotTest,
  styleTest,
  textContentTest,
} from '../../tests/utils';
import TooltipBase from '../__example__/example-01-base';
import TooltipClick from '../__example__/example-03-01-click';
import TooltipDisabled from '../__example__/example-04-disabled-inner';

const SO_PREFIX = 'tooltip';
const {
  wrapper: tooltipClassName,
  content: tooltipContentClassName,
  wrapperOpen: tooltipWrapperOpenClassName,
  target: tooltipTargetClassName,
} = createClassName(SO_PREFIX, ['wrapper', 'content', 'target'], ['wrapperOpen'])

const TooltipDemo = ({
  className,
  style,
  trigger,
  position,
  delay,
  animation,
  priorityDirection,
  disabled,
  persistent,
}: {
  className?: string;
  style?: StyleProps;
  trigger?: 'click' | 'hover' | 'focus';
  position?: any;
  delay?: number;
  animation?: boolean;
  priorityDirection?: 'auto' | 'vertical' | 'horizontal' | undefined;
  disabled?: boolean;
  persistent?: boolean;
}) => (
  <Tooltip
    tip='hello'
    className={className}
    style={style}
    trigger={trigger}
    position={position}
    delay={delay}
    animation={animation}
    priorityDirection={priorityDirection}
    disabledChild={disabled}
    persistent={persistent}
  >
    <span>demo</span>
  </Tooltip>
);

const defaultStyle = 'position: absolute; z-index: 1051; left: 0px; transform: translateX(-50%); top: 0px; transform-origin: center top;'

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.runAllTimers();
});
afterEach(cleanup);
describe('Tooltip[Base]', () => {
  mountTest(<TooltipDemo />);
  displayTest(Tooltip as React.FC, 'ShineoutTooltip');
  snapshotTest(<TooltipBase />);
  snapshotTest(<TooltipClick />, 'about click');
  snapshotTest(<TooltipDisabled />, 'about disabled');
  test('should render default', async () => {
    const { container } = render(<TooltipDemo />);
    textContentTest(container, 'demo');
    fireEvent.mouseEnter(screen.getByText('demo'));
    await waitFor(async () => {
      await delay(200);
    })
    const wrapper = document.querySelector(tooltipClassName)!;
    classTest(wrapper, tooltipWrapperOpenClassName)
    attributesTest(wrapper, 'data-soui-position', 'bottom');
    styleTest(wrapper, defaultStyle);
    const content = wrapper.querySelector(tooltipContentClassName)!;
    textContentTest(content, 'hello');
  });
  test('should render when set className and style', async () => {
    render(<TooltipDemo className='demo' style={{ color: 'black' }} />);
    fireEvent.mouseEnter(screen.getByText('demo'));
    await waitFor(async () => {
      await delay(200);
    })

    const wrapper = document.querySelector(tooltipClassName)!;
    classContentTest(wrapper, 'demo');
    styleTest(wrapper.querySelector(tooltipContentClassName)!, 'color: black;');
  });
  test('should render when mouse', async () => {
    render(<TooltipDemo />);

    fireEvent.mouseEnter(screen.getByText('demo'));
    await waitFor(async () => {
      await delay(200);
    });
    const wrapper = document.querySelector(tooltipClassName)!;
    classContentTest(wrapper, tooltipWrapperOpenClassName);
    styleTest(
      wrapper,
      defaultStyle,
    );
    fireEvent.mouseLeave(screen.getByText('demo'));

    await waitFor(async () => {
      await delay(200);
      classContentTest(wrapper, tooltipWrapperOpenClassName, false);
    });
  });
  test('should render when set trigger is click', async () => {
    render(<TooltipDemo trigger='click' />);

    fireEvent.click(screen.getByText('demo'));
    await waitFor(async () => {
      await delay(200);
    });
    const wrapper = document.querySelector(tooltipClassName)!;
    classContentTest(wrapper, tooltipWrapperOpenClassName);
      styleTest(
        wrapper,
        defaultStyle,
      );
    fireEvent.click(screen.getByText('demo'));
    await waitFor(async () => {
      await delay(200);
      classContentTest(wrapper, tooltipWrapperOpenClassName, false);
    });
  });
  test('should render when set different position', async () => {
    const positions = ['left', 'top', 'bottom', 'right'];
    render(
      <div>
        <Tooltip tip='hello world' trigger='hover' position='left'>
          <Button type='primary'>left</Button>
        </Tooltip>
        <Tooltip tip='hello world' trigger='hover' position='top'>
          <Button type='primary'>top</Button>
        </Tooltip>
        <Tooltip tip='hello world' trigger='hover' position='bottom'>
          <Button type='primary'>bottom</Button>
        </Tooltip>
        <Tooltip tip='hello world' trigger='hover' position='right'>
          <Button type='primary'>right</Button>
        </Tooltip>
      </div>
    );
    positions.forEach((item) => {
      fireEvent.mouseEnter(screen.getByText(item));
    })
    await waitFor(async () => {
      await delay(200);
    });
    const wrappers = document.querySelectorAll(tooltipClassName)!;
    wrappers.forEach((item, index) => {
      attributesTest(item, 'data-soui-position', positions[index]);
    });
    fireEvent.mouseEnter(screen.getByText(positions[0]));
    await waitFor(async () => {
      await delay(200);
      styleTest(
        wrappers[0],
        'position: absolute; z-index: 1051; top: 0px; transform: translateY(-50%); right: 0px;',
      );
    });
    fireEvent.mouseEnter(screen.getByText(positions[1]));
    await waitFor(async () => {
      await delay(200);
      styleTest(
        wrappers[1],
        'position: absolute; z-index: 1051; left: 0px; transform: translateX(-50%)translateY(-100%); top: 0px; transform-origin: center bottom;',
      );
    });
    fireEvent.mouseEnter(screen.getByText(positions[2]));
    await waitFor(async () => {
      await delay(200);
      styleTest(
        wrappers[2],
        'position: absolute; z-index: 1051; left: 0px; transform: translateX(-50%); top: 0px; transform-origin: center top;',
      );
    });
    fireEvent.mouseEnter(screen.getByText(positions[3]));
    await waitFor(async () => {
      await delay(200);
      styleTest(
        wrappers[3],
        'position: absolute; z-index: 1051; top: 0px; transform: translateY(-50%); left: 0px;',
      );
    });
  });
  test('should render when set other postion', async () => {
    render(<TooltipDemo position='left-bottom' />);
    fireEvent.mouseEnter(screen.getByText('demo'));
    await waitFor(async () => {
      await delay(200);
      styleTest(
        document.querySelector(tooltipClassName)!,
        'position: absolute; z-index: 1051; top: 0px; transform: translateY(-100%); right: 0px;',
      );
    });
  });
  test('should render when set disabledChild', async () => {
    const { container } = render(<TooltipDisabled />);
    fireEvent.mouseEnter(screen.getByText('Disabled'))
    await waitFor(async () => {
      await delay(200);
    });
    styleTest(container.querySelector(tooltipTargetClassName)!, 'cursor: not-allowed;');
    classContentTest(document.querySelector(tooltipClassName)!, tooltipWrapperOpenClassName);
    fireEvent.mouseLeave(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      classContentTest(
        document.querySelector(tooltipClassName)!,
        tooltipWrapperOpenClassName,
        false,
      );
    });
  });
  test('should render when set delay', async () => {
    render(<TooltipDemo delay={500} />);
    fireEvent.mouseEnter(screen.getByText('demo'));
    await waitFor(async () => {
      await delay(200);
      classContentTest(
        document.querySelector(tooltipClassName)!,
        tooltipWrapperOpenClassName,
      );
    });
    await waitFor(async () => {
      await delay(300);
      classContentTest(document.querySelector(tooltipClassName)!, tooltipWrapperOpenClassName);
    });
    fireEvent.mouseLeave(screen.getByText('demo'));
    await waitFor(async () => {
      await delay(200);
      classContentTest(
        document.querySelector(tooltipClassName)!,
        tooltipWrapperOpenClassName,
        false,
      );
    });
  });
  // TODO: animation is lose
  test('should render when set animation is false', () => {
    render(<TooltipDemo animation={false} />);
  });
  test('should render when set priorityDirection', async () => {
    render(<TooltipDemo priorityDirection='vertical' position='left' />);
    fireEvent.mouseEnter(screen.getByText('demo'));
    await waitFor(async () => {
      await delay(200);
      styleTest(
        document.querySelector(tooltipClassName)!,
        'position: absolute; z-index: 1051; top: 0px; transform: translateY(-50%); right: 0px;',
      );
    });
  });
  // Dont have disabled
  test('should render when set disable', async () => {
    render(<TooltipDemo disabled />);
    fireEvent.mouseEnter(screen.getByText('demo'));
    await waitFor(async () => {
      await delay(200);
    });
    const wrapper = document.querySelector(tooltipClassName)!;
    classContentTest(wrapper, tooltipWrapperOpenClassName);
  });
  test('should render when tip is lose', () => {
    render(
      // @ts-ignore
      <Tooltip>
        <span>demo</span>
      </Tooltip>,
    );
    classLengthTest(document, tooltipClassName, 0);
  });
  test('should render when children is lose', () => {
    const spyError = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      // @ts-ignore
      <Tooltip tip='hello'></Tooltip>,
    );
    expect(spyError).toHaveBeenCalled();
    classLengthTest(document, tooltipClassName, 0);
    spyError.mockRestore();
  });
  test('should render when set persistent', async () => {
    render(<TooltipDemo persistent />);
    fireEvent.mouseEnter(screen.getByText('demo'));
    await waitFor(async () => {
      await delay(200);
    });
    const wrapper = document.querySelector(tooltipClassName)! as HTMLDivElement;
    expect(wrapper.style.pointerEvents).toBe('initial');
  });
});
