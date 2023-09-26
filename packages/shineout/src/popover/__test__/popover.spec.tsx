import { render, cleanup, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Popover from '..';
import Button from '../../button';
import mountTest from '../../tests/mountTest';
import { attributesTest, classTest, delay, displayTest, styleTest } from '../../tests/utils';
import PopoverBase from '../__example__/01-base';
import PopoverControll from '../__example__/04-controll';

const SO_PREFIX = 'popover';
const popoverClassName = `.${SO_PREFIX}-wrapper-0-2-65`;
const popoverBaseClassName = `.${SO_PREFIX}-wrapper-0-2-1`;
const popoverContentClassName = `.${SO_PREFIX}-content-0-2-68`;
const popoverContentBaseClassName = `.${SO_PREFIX}-content-0-2-4`;
const popoverOpenClassName = `${SO_PREFIX}-wrapperOpen-0-2-66`;
const popoverOpenBaseClassName = `${SO_PREFIX}-wrapperOpen-0-2-2`;
const popoverArrowClassName = `.${SO_PREFIX}-arrow-0-2-3`;
const popoverArrowBaseClassName = `.${SO_PREFIX}-arrow-0-2-67`;
const popoverTextClassName = `${SO_PREFIX}-text-0-2-69`;
const popoverBaseTextClassName = `${SO_PREFIX}-text-0-2-5`;

// const positions = ['bottom-left', 'bottom', 'bottom-right', 'right-top', 'left-top', 'right', 'left', 'right-bottom', 'left-bottom', 'top-left', 'top', 'top-right']

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.runAllTimers();
});
afterEach(cleanup);
mountTest(<Popover />);

const PopoverDemo = ({ className, style, trigger, position }: any) => {
  return (
    <Button>
      Hover
      <Popover className={className} style={style} trigger={trigger} position={position}>
        some Text
      </Popover>
    </Button>
  );
};

const getPopoverRoot = () =>
  document.querySelector(popoverClassName)! || document.querySelector(popoverBaseClassName)!;
const getPopoverContent = () =>
  document.querySelector(popoverContentClassName)! ||
  document.querySelector(popoverContentBaseClassName)!;

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
          popover.classList.contains(popoverOpenBaseClassName),
      ).toBeTruthy();
      styleTest(
        popover,
        'position: absolute; z-index: 1060; left: 0px; transform: translateX(-50%); top: 0px;',
      );
      attributesTest(popover, 'data-soui-position', 'bottom');
      expect(
        popover.querySelector(popoverArrowClassName) ||
          popover.querySelector(popoverArrowBaseClassName),
      ).toBeTruthy();
      const content = getPopoverContent();
      expect(content.textContent).toBe('some Text');
      expect(
        content.classList.contains(popoverTextClassName) ||
          content.classList.contains(popoverBaseTextClassName),
      ).toBeTruthy();
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

  const positionStyleMap: Record<string, string> = {
    'bottom-left': 'position: absolute; z-index: 1060; left: 0px; top: 0px;',
    bottom: 'position: absolute; z-index: 1060; left: 0px; transform: translateX(-50%); top: 0px;',
    'bottom-right':
      'position: absolute; z-index: 1060; left: 0px; transform: translateX(-100%); top: 0px;',
    'right-top': 'position: absolute; z-index: 1060; top: 0px; left: 0px;',
    'left-top':
      'position: absolute; z-index: 1060; top: 0px; transform: translateX(-100%); left: 0px;',
    right: 'position: absolute; z-index: 1060; top: 0px; transform: translateY(-50%); left: 0px;',
    left: 'position: absolute; z-index: 1060; top: 0px; transform: translateY(-50%) translateX(-100%); left: 0px;',
    'right-bottom':
      'position: absolute; z-index: 1060; top: 0px; transform: translateY(-100%); left: 0px;',
    'left-bottom':
      'position: absolute; z-index: 1060; top: 0px; transform: translateY(-100%) translateX(-100%); left: 0px;',
    'top-left':
      'position: absolute; z-index: 1060; left: 0px; transform: translateY(-100%); top: 0px;',
    top: 'position: absolute; z-index: 1060; left: 0px; transform: translateX(-50%)translateY(-100%); top: 0px;',
    'top-right':
      'position: absolute; z-index: 1060; left: 0px; transform: translateX(-100%)translateY(-100%); top: 0px;',
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
  test('should render that is controll', () => {
    render(<PopoverControll />);
    screen.debug();
  });
});
