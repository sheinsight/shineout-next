import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tooltip from '..';
import mountTest from '../../tests/mountTest';
import {
  StyleProps,
  attributesTest,
  classContentTest,
  delay,
  displayTest,
  snapshotTest,
  styleTest,
  textContentTest,
} from '../../tests/utils';
import TooltipBase from '../__example__/example-1-base';
import TooltipClick from '../__example__/example-2-click';
import TooltipDisabled from '../__example__/example-3-disabled-inner';

const SO_PREFIX = 'tooltip';
const tooltipClassName = `.${SO_PREFIX}-wrapper-0-2-6`;
const tooltipContentClassName = `.${SO_PREFIX}-content-0-2-9`;
const tooltipWrapperOpenClassName = `${SO_PREFIX}-wrapperOpen-0-2-7`;

const TooltipDemo = ({
  className,
  style,
  trigger,
}: {
  className?: string;
  style?: StyleProps;
  trigger?: 'click' | 'hover' | 'none' | undefined;
}) => (
  <Tooltip tip='hello' className={className} style={style} trigger={trigger}>
    <span>demo</span>
  </Tooltip>
);

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
  snapshotTest(<TooltipClick />);
  snapshotTest(<TooltipDisabled />);
  test('should render default', async () => {
    const { container } = render(<TooltipDemo />);
    textContentTest(container, 'demo');
    const wrapper = document.querySelector(tooltipClassName)!;
    attributesTest(wrapper, 'data-soui-position', 'bottom-left');
    styleTest(wrapper, 'opacity: 0; pointer-events: none; position: absolute; z-index: 1051;');
    const content = wrapper.querySelector(tooltipContentClassName)!;
    textContentTest(content, 'hello');
  });
  test('should render when set className and style', () => {
    render(<TooltipDemo className='demo' style={{ color: 'black' }} />);
    const wrapper = document.querySelector(tooltipClassName)!;
    classContentTest(wrapper, 'demo');
    styleTest(wrapper.querySelector(tooltipContentClassName)!, 'color: black;');
  });
  test('should render when mouse', async () => {
    render(<TooltipDemo />);
    const wrapper = document.querySelector(tooltipClassName)!;
    classContentTest(wrapper, tooltipWrapperOpenClassName, false);
    fireEvent.mouseEnter(screen.getByText('demo'));
    await waitFor(async () => {
      await delay(200);
      classContentTest(wrapper, tooltipWrapperOpenClassName);
      styleTest(
        wrapper,
        'position: absolute; z-index: 1051; left: 0px; transform: translateX(-50%); top: 0px;',
      );
    });
    fireEvent.mouseLeave(screen.getByText('demo'));
    await waitFor(async () => {
      await delay(200);
      classContentTest(wrapper, tooltipWrapperOpenClassName, false);
    });
  });
  test('should render when set trigger is click', async () => {
    render(<TooltipDemo trigger='click' />);
    const wrapper = document.querySelector(tooltipClassName)!;
    classContentTest(wrapper, tooltipWrapperOpenClassName, false);
    fireEvent.click(screen.getByText('demo'));
    await waitFor(async () => {
      await delay(200);
      classContentTest(wrapper, tooltipWrapperOpenClassName);
      styleTest(
        wrapper,
        'position: absolute; z-index: 1051; left: 0px; transform: translateX(-50%); top: 0px;',
      );
    });
    fireEvent.click(screen.getByText('demo'));
    await waitFor(async () => {
      await delay(200);
      classContentTest(wrapper, tooltipWrapperOpenClassName, false);
    });
  });
  test('should render when set different position', () => {});
});
