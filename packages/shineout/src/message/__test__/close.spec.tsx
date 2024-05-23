import { render, cleanup, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MessageTest } from './message.spec'
import { delay, createClassName, textContentTest, styleTest, attributesTest } from '../../tests/utils';
import MessageClose from '../__example__/04-close';
import MessageManualClose from '../__example__/05-manual-close';

const SO_PREFIX = 'message';
const originClasses = ['wrapper', 'message'];
const originItemClasses = [''];
const { wrapper, message } = createClassName(
  SO_PREFIX,
  originClasses,
  originItemClasses,
);

const SO_PREFIX_Alert = 'alert';
const originAlertClasses = ['close', 'title'];
const originAlertItemClasses = [''];
const {
  close: closeClassName,
  title: titleClassName,
} = createClassName(SO_PREFIX_Alert, originAlertClasses, originAlertItemClasses);

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.runAllTimers();
  cleanup()
});

afterEach(cleanup);

describe('Message[Close]', () => {
  afterEach(cleanup);
  test('should render when set onClose', async () => {
    const closeFn = jest.fn();
    const { container, rerender } = render(<MessageTest options={{ onClose: closeFn }} />);
    fireEvent.click(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      fireEvent.click(document.querySelector(closeClassName)!);
    });
    await waitFor(async () => {
      await delay(200);
      expect(closeFn.mock.calls.length).toBe(1);
    });
    rerender(<MessageClose />);
    fireEvent.click(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      const temp = document.querySelector(closeClassName)!
      fireEvent.click(temp.querySelector('svg')!);
    });
    // expect(document.querySelector(wrapper)).not.toBeInTheDocument();
  });

  test('should render when set title', async () => {
    const { container } = render(<MessageTest options={{ title: 'hello' }} />);
    fireEvent.click(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      textContentTest(document.querySelector(titleClassName)!, 'hello');
      fireEvent.click(document.querySelector(closeClassName)!);
    });
    await waitFor(async () => {
      await delay(200);
      // expect(document.querySelector(wrapper)).not.toBeInTheDocument();
    });
  });

  test('should render manual close', async () => {
    const { container } = render(<MessageManualClose />);
    fireEvent.click(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
    });
    expect(document.querySelector(wrapper)).toBeInTheDocument();
    // fireEvent.click(document.querySelector('a')!);
    // await waitFor(async () => {
    //   await delay(200);
    // });
    // expect(document.querySelector(wrapper)).not.toBeInTheDocument();
  });
})
describe('Message[Options]', () => {
  test('should render when set top', async () => {
    const { container } = render(<MessageTest options={{ top: '-20px' }} />);
    fireEvent.click(container.querySelector('button')!);
    // await waitFor(async () => {
    //   await delay(200);
    //   styleTest(document.querySelector(message)!, 'top: -20px;');
    //   fireEvent.click(document.querySelector(closeClassName)!);
    // });
    // await waitFor(async () => {
    //   await delay(200);
    //   expect(document.querySelector(wrapper)).not.toBeInTheDocument();
    // });
  });
  // test('should render when set position is middle', async () => {
  //   const { container } = render(<MessageTest options={{ position: 'middle' }} />);
  //   fireEvent.click(container.querySelector('button')!);
  //   screen.debug()
  //   await waitFor(() => {attributesTest(document.querySelector(wrapper)!, 'data-soui-position', 'middle')})
  // })
})