import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Message from '..';
import { Button } from 'shineout';
import {
  attributesTest,
  classContentTest,
  createClassName,
  delay,
  textContentTest,
} from '../../tests/utils';

const SO_PREFIX = 'message';
const originClasses = ['wrapper', 'item', 'message'];
const originItemClasses = ['itemDismissed', 'itemShow'];
const { wrapper, item, itemShow, message } = createClassName(
  SO_PREFIX,
  originClasses,
  originItemClasses,
);
const SO_PREFIX_Alert = 'alert';
const originAlertClasses = ['content', 'close'];
const originAlertItemClasses = ['alert', 'info', 'success', 'warning', 'danger', 'pending'];
const {
  content: contentClassName,
  alert: alertClassName,
  success: successClassName,
  close: closeClassName,
} = createClassName(SO_PREFIX_Alert, originAlertClasses, originAlertItemClasses);

const MessageTest = () => (
  <Button
    onClick={() => {
      Message.success('Test');
    }}
  >
    Test
  </Button>
);

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.runAllTimers();
});

afterEach(cleanup);

describe('Message[Base]', () => {
  test('should start with Shineout display', () => {
    expect(Message.displayName).toBe('ShineoutMessage');
  });
  test('should render default', async () => {
    const { container } = render(<MessageTest />);
    expect(document.querySelector(wrapper)).not.toBeInTheDocument();
    fireEvent.click(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      const messageWrapper = document.querySelector(wrapper)!;
      attributesTest(messageWrapper, 'data-soui-position', 'top');
      const messageItem = messageWrapper.querySelector(item)!;
      classContentTest(messageItem, itemShow);
      const messageMain = messageItem.querySelector(message)!;
      classContentTest(messageMain, alertClassName);
      classContentTest(messageMain, successClassName);
      textContentTest(messageMain.querySelector(contentClassName)!, 'Test');
      const messageClose = messageMain.querySelector(closeClassName)!;
      fireEvent.click(messageClose);
    });
    await waitFor(async () => {
      await delay(200);
      expect(document.querySelector(wrapper)).not.toBeInTheDocument();
      fireEvent.click(container.querySelector('button')!);
    });
    await waitFor(async () => {
      await delay(200);
      expect(document.querySelector(wrapper)).toBeInTheDocument();
    });
    await waitFor(
      async () => {
        await delay(3200);
        expect(document.querySelector(wrapper)).not.toBeInTheDocument();
      },
      { timeout: 10000 },
    );
  });
});
