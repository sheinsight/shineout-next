import React from 'react';
import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tooltip from '..';
import { Button, setConfig } from 'shineout'
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
  styleContainTest,
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
  arrow: tooltipArrowClassName,
} = createClassName(SO_PREFIX, ['wrapper', 'content', 'target', 'arrow'], ['wrapperOpen'])

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

const defaultStyle = {
  position: 'absolute',
  zIndex: '1051',
  left: '0px',
  transform: 'translateX(-50%)',
  top: '0px',
  transformOrigin: 'center top',
}

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
    styleContainTest(wrapper, defaultStyle);
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
    styleContainTest(
      wrapper,
      {
        position: 'absolute',
        zIndex: '1051',
        left: '0px',
        transform: 'translateX(-50%)',
        top: '0px',
      },
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
    styleContainTest(
      wrapper,
      {
        position: 'absolute',
        zIndex: '1051',
        left: '0px',
        transform: 'translateX(-50%)',
        top: '0px',
      },
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
      styleContainTest(
        wrappers[0],
        {
          position: 'absolute',
          zIndex: '1051',
          top: '0px',
          transform: 'translateY(-50%)',
          right: '0px',
        },
      );
    });
    fireEvent.mouseEnter(screen.getByText(positions[1]));
    await waitFor(async () => {
      await delay(200);
      styleContainTest(
        wrappers[1],
        {
          position: 'absolute',
          zIndex: '1051',
          left: '0px',
          transform: 'translateX(-50%) translateY(-100%)',
          top: '0px',
          transformOrigin: 'center bottom',
        },
      );
    });
    fireEvent.mouseEnter(screen.getByText(positions[2]));
    await waitFor(async () => {
      await delay(200);
      styleContainTest(
        wrappers[2],
        {
          position: 'absolute',
          zIndex: '1051',
          left: '0px',
          transform: 'translateX(-50%)',
          top: '0px',
          transformOrigin: 'center top',
        },
      );
    });
    fireEvent.mouseEnter(screen.getByText(positions[3]));
    await waitFor(async () => {
      await delay(200);
      styleContainTest(
        wrappers[3],
        {
          position: 'absolute',
          zIndex: '1051',
          top: '0px',
          transform: 'translateY(-50%)',
          left: '0px',
        },
      );
    });
  });
  test('should render when set other postion', async () => {
    render(<TooltipDemo position='left-bottom' />);
    fireEvent.mouseEnter(screen.getByText('demo'));
    await waitFor(async () => {
      await delay(200);
      styleContainTest(
        document.querySelector(tooltipClassName)!,
        {
          position: 'absolute',
          zIndex: '1051',
          top: '0px',
          transform: 'translateY(-100%)',
          right: '0px',
        },
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
      styleContainTest(
        document.querySelector(tooltipClassName)!,
        {
          position: 'absolute',
          zIndex: '1051',
          top: '0px',
          transform: 'translateY(-50%)',
          right: '0px',
        },
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
  test('should render when set popupGap', async () => {
    render(<Tooltip popupGap={100} tip='hello'><span>demo</span></Tooltip>);
    fireEvent.mouseEnter(screen.getByText('demo'));
    await waitFor(async () => {
      await delay(200);
    });
    const wrapper = document.querySelector(tooltipClassName) ! as HTMLDivElement
    expect(wrapper.style.top).toBe('100px');
  });
  test('should not disable children when disabledChild is set but tip is empty', () => {
    const handleClick = jest.fn();
    const { container } = render(
      <Tooltip tip='' disabledChild>
        <button onClick={handleClick}>Click me</button>
      </Tooltip>,
    );
    const button = screen.getByText('Click me');
    expect(button.style.pointerEvents).not.toBe('none');
    expect(container.querySelector(tooltipTargetClassName)).toBeNull();
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  test('should disable children when disabledChild is set and tip has value', async () => {
    const { container } = render(
      <Tooltip tip='hello' disabledChild>
        <button>Click me</button>
      </Tooltip>,
    );
    expect(container.querySelector(tooltipTargetClassName)).not.toBeNull();
    const button = screen.getByText('Click me');
    expect(button.style.pointerEvents).toBe('none');
  });
  test('should show tooltip when tip changes from empty to value', async () => {
    const Demo = () => {
      const [tip, setTip] = React.useState('');
      return (
        <div>
          <button onClick={() => setTip('dynamic tip')}>set tip</button>
          <Tooltip tip={tip} trigger='hover'>
            <span>hover target</span>
          </Tooltip>
        </div>
      );
    };
    render(<Demo />);
    fireEvent.click(screen.getByText('set tip'));
    fireEvent.mouseEnter(screen.getByText('hover target'));
    await waitFor(async () => {
      await delay(200);
    });
    const wrapper = document.querySelector(tooltipClassName)!;
    classContentTest(wrapper, tooltipWrapperOpenClassName);
    textContentTest(wrapper.querySelector(tooltipContentClassName)!, 'dynamic tip');
  });
});

describe('Tooltip[Semantic styles]', () => {
  test('styles prop applies inline styles to root/arrow/content', async () => {
    render(
      <Tooltip
        tip='hello'
        styles={{
          root: { border: '2px solid red' },
          arrow: { opacity: '0.5' },
          content: { padding: '16px', borderRadius: '8px' },
        }}
      >
        <span>demo</span>
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByText('demo'));
    await waitFor(async () => {
      await delay(200);
    });
    const wrapper = document.querySelector(tooltipClassName)! as HTMLElement;
    expect(wrapper.style.border).toBe('2px solid red');
    const arrow = wrapper.querySelector(tooltipArrowClassName) as HTMLElement;
    expect(arrow.style.opacity).toBe('0.5');
    const content = wrapper.querySelector(tooltipContentClassName) as HTMLElement;
    expect(content.style.padding).toBe('16px');
    expect(content.style.borderRadius).toBe('8px');
  });

  test('styles prop merges with existing component style prop', async () => {
    render(
      <Tooltip tip='hello' style={{ color: 'blue' }} styles={{ content: { fontSize: '14px' } }}>
        <span>demo</span>
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByText('demo'));
    await waitFor(async () => {
      await delay(200);
    });
    const wrapper = document.querySelector(tooltipClassName)! as HTMLElement;
    const content = wrapper.querySelector(tooltipContentClassName) as HTMLElement;
    expect(content.style.fontSize).toBe('14px');
    expect(content.style.color).toBe('blue');
  });
});

describe('Tooltip[Semantic setConfig global fallback]', () => {
  afterEach(() => {
    setConfig({ tooltip: {} });
  });

  test('setConfig classNames applies globally to all Tooltip instances', async () => {
    setConfig({
      tooltip: {
        classNames: { arrow: 'global-arrow', content: 'global-content' },
      },
    });
    render(
      <Tooltip tip='hello'>
        <span>demo</span>
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByText('demo'));
    await waitFor(async () => {
      await delay(200);
    });
    const wrapper = document.querySelector(tooltipClassName)!;
    expect(wrapper.querySelector('.global-arrow')).toBeInTheDocument();
    expect(wrapper.querySelector('.global-content')).toBeInTheDocument();
  });

  test('setConfig styles applies globally to all Tooltip instances', async () => {
    setConfig({
      tooltip: {
        styles: { content: { padding: '24px' }, arrow: { opacity: '0.5' } },
      },
    });
    render(
      <Tooltip tip='hello'>
        <span>demo</span>
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByText('demo'));
    await waitFor(async () => {
      await delay(200);
    });
    const wrapper = document.querySelector(tooltipClassName)! as HTMLElement;
    const content = wrapper.querySelector(tooltipContentClassName) as HTMLElement;
    expect(content.style.padding).toBe('24px');
    const arrow = wrapper.querySelector(tooltipArrowClassName) as HTMLElement;
    expect(arrow.style.opacity).toBe('0.5');
  });

  test('component-level classNames takes priority over setConfig', async () => {
    setConfig({
      tooltip: {
        classNames: { arrow: 'global-arrow' },
      },
    });
    render(
      <Tooltip tip='hello' classNames={{ arrow: 'local-arrow' }}>
        <span>demo</span>
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByText('demo'));
    await waitFor(async () => {
      await delay(200);
    });
    const wrapper = document.querySelector(tooltipClassName)!;
    expect(wrapper.querySelector('.local-arrow')).toBeInTheDocument();
    expect(wrapper.querySelector('.global-arrow')).toBeInTheDocument();
  });
});

describe('Tooltip[Semantic classNames - functional]', () => {
  test('static string classNames still work (regression)', async () => {
    render(
      <Tooltip tip='hello' classNames={{ arrow: 'my-static-arrow', content: 'my-static-content' }}>
        <span>demo</span>
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByText('demo'));
    await waitFor(async () => {
      await delay(200);
    });
    const wrapper = document.querySelector(tooltipClassName)!;
    expect(wrapper.querySelector('.my-static-arrow')).toBeInTheDocument();
    expect(wrapper.querySelector('.my-static-content')).toBeInTheDocument();
  });

  test('functional root classNames receives open=true after popup opens', async () => {
    const rootFn = jest.fn(({ open }: { open: boolean; position: any; type?: string }) =>
      open ? 'fn-root-open' : 'fn-root-closed',
    );
    render(
      <Tooltip tip='hello' classNames={{ root: rootFn }}>
        <span>demo</span>
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByText('demo'));
    await waitFor(async () => {
      await delay(200);
      const wrapper = document.querySelector(tooltipClassName)! as HTMLElement;
      expect(wrapper.classList.contains('fn-root-open')).toBe(true);
      expect(wrapper.classList.contains('fn-root-closed')).toBe(false);
      const lastCall = rootFn.mock.calls[rootFn.mock.calls.length - 1][0];
      expect(lastCall.open).toBe(true);
    });
  });

  test('functional classNames receives correct type field', async () => {
    const contentFn = jest.fn(({ type }: { open: boolean; position: any; type?: string }) =>
      type ? `fn-content-${type}` : 'fn-content',
    );
    render(
      <Tooltip tip='hello' type='danger' classNames={{ content: contentFn }}>
        <span>demo</span>
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByText('demo'));
    await waitFor(async () => {
      await delay(200);
      const wrapper = document.querySelector(tooltipClassName)!;
      expect(wrapper.querySelector('.fn-content-danger')).toBeInTheDocument();
      const lastCall = contentFn.mock.calls[contentFn.mock.calls.length - 1][0];
      expect(lastCall.type).toBe('danger');
    });
  });

  test('functional classNames receives correct position field', async () => {
    const rootFn = jest.fn(({ position }: { open: boolean; position: any; type?: string }) =>
      `fn-pos-${position}`,
    );
    render(
      <Tooltip tip='hello' position='bottom' classNames={{ root: rootFn }}>
        <span>demo</span>
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByText('demo'));
    await waitFor(async () => {
      await delay(200);
      const wrapper = document.querySelector(tooltipClassName)! as HTMLElement;
      expect(wrapper.classList.contains('fn-pos-bottom')).toBe(true);
      const lastCall = rootFn.mock.calls[rootFn.mock.calls.length - 1][0];
      expect(lastCall.position).toBe('bottom');
    });
  });

  test('mixed static + functional classNames work together', async () => {
    const rootFn = jest.fn(({ open }: { open: boolean; position: any; type?: string }) =>
      open ? 'fn-open' : 'fn-closed',
    );
    render(
      <Tooltip tip='hello' classNames={{ root: rootFn, arrow: 'static-arrow' }}>
        <span>demo</span>
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByText('demo'));
    await waitFor(async () => {
      await delay(200);
      const wrapper = document.querySelector(tooltipClassName)! as HTMLElement;
      expect(wrapper.classList.contains('fn-open')).toBe(true);
      expect(wrapper.querySelector('.static-arrow')).toBeInTheDocument();
    });
  });
});
