import { render, cleanup, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Message from '..';
import type { MessageOptions } from '../message.type';
import { Button } from 'shineout';
import {
  attributesTest,
  classContentTest,
  createClassName,
  delay,
  textContentTest,
} from '../../tests/utils';
// import MessageBase from '../__example__/01-base'
import MessageContainer from '../__example__/06-container';

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
  close: closeClassName,
  ...rest
} = createClassName(SO_PREFIX_Alert, originAlertClasses, originAlertItemClasses);

const typeClassNameMap: { [key: string]: string } = {
  info: 'info',
  success: 'success',
  warn: 'warning',
  error: 'danger',
};

const MessageTest = ({ options }: { options?: MessageOptions }) => (
  <Button
    onClick={() => {
      Message.show('Test', 5, options);
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
      classContentTest(messageMain, rest.warning);
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
    fireEvent.click(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      expect(document.querySelectorAll(item).length).toBe(1);
    });
    fireEvent.click(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      expect(document.querySelectorAll(item).length).toBe(2);
      expect(document.querySelector(wrapper)).toMatchSnapshot();
    });
    await waitFor(
      async () => {
        await delay(3200);
        expect(document.querySelectorAll(item).length).toBe(0);
      },
      { timeout: 10000 },
    );
  });
  test.each(['info', 'success', 'warn', 'error'])(
    'should render when set method is %s',
    async (type) => {
      const { container } = render(
        <Button
          onClick={() => {
            // @ts-ignore
            Message[type](`${type}`, 0);
          }}
        >
          Test
        </Button>,
      );
      fireEvent.click(container.querySelector('button')!);
      await waitFor(async () => {
        await delay(200);
        classContentTest(document.querySelector(message)!, rest[typeClassNameMap[type]]);
        fireEvent.click(document.querySelector(closeClassName)!);
      });
      await waitFor(async () => {
        await delay(200);
        expect(document.querySelector(wrapper)).not.toBeInTheDocument();
      });
    },
  );
  test('should render when set method is close', async () => {
    Message.success('success', 0);
    await waitFor(async () => {
      await delay(200);
      expect(document.querySelectorAll(item).length).toBe(1);
    });
    Message.warn('warn', 0);
    await waitFor(async () => {
      await delay(200);
      expect(document.querySelectorAll(item).length).toBe(2);
    });
    Message.close();
    await waitFor(async () => {
      await delay(200);
      expect(document.querySelectorAll(item).length).toBe(0);
    });
  });
  test('should render when set duration', async () => {
    const { container, rerender } = render(
      <Button
        onClick={() => {
          Message.show('Test', 0);
        }}
      >
        Test
      </Button>,
    );
    fireEvent.click(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      expect(document.querySelector(wrapper)).toBeInTheDocument();
    });
    await waitFor(
      async () => {
        await delay(3200);
        expect(document.querySelector(wrapper)).toBeInTheDocument();
      },
      { timeout: 10000 },
    );
    fireEvent.click(document.querySelector(closeClassName)!);
    await waitFor(async () => {
      await delay(200);
      expect(document.querySelector(wrapper)).not.toBeInTheDocument();
    });
    rerender(
      <Button
        onClick={() => {
          Message.show('Test', 5);
        }}
      >
        Test
      </Button>,
    );
    fireEvent.click(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      expect(document.querySelector(wrapper)).toBeInTheDocument();
    });
    await waitFor(
      async () => {
        await delay(5200);
        expect(document.querySelector(wrapper)).not.toBeInTheDocument();
      },
      { timeout: 10000 },
    );
  });
  test('should hover message when mouseenter', async () => {
    const { container } = render(<MessageTest />);
    fireEvent.click(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      screen.debug();
      expect(document.querySelector(wrapper)).toBeInTheDocument();
      fireEvent.mouseEnter(document.querySelector(item)!);
    });
    await waitFor(
      async () => {
        await delay(3200);
        expect(document.querySelector(wrapper)).toBeInTheDocument();
        fireEvent.mouseLeave(document.querySelector(item)!);
      },
      { timeout: 10000 },
    );
    await waitFor(
      async () => {
        await delay(3200);
        expect(document.querySelector(wrapper)).not.toBeInTheDocument();
      },
      { timeout: 10000 },
    );
  });
});
describe('Message[Option]', () => {
  test('should render when set className', async () => {
    const { container } = render(
      <Button
        onClick={() => {
          Message.show('Test', 5, {
            className: 'demo',
          });
        }}
      >
        Test
      </Button>,
    );
    fireEvent.click(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      classContentTest(document.querySelector(item)!, 'demo');
    });
    fireEvent.click(document.querySelector(closeClassName)!);
    await waitFor(async () => {
      await delay(200);
      expect(document.querySelector(wrapper)).not.toBeInTheDocument();
    });
  });
  test('should render when set container', async () => {
    const { container } = render(<MessageContainer />);
    fireEvent.click(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      expect(container.querySelector('#container')?.querySelector(wrapper)).toBeInTheDocument();
    });
  });
  test('should render when set hideClose is true', async () => {
    const { container } = render(
      <Button
        onClick={() => {
          Message.show('Test', 5, {
            hideClose: true,
          });
        }}
      >
        Test
      </Button>,
    );
    fireEvent.click(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
      screen.debug();
    });
  });
});
