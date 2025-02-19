import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Alert from '..';
import mountTest from '../../tests/mountTest';
import { classLengthTest } from '../../tests/structureTest';
import {
  baseTest,
  childrenTest,
  classTest,
  delay,
  displayTest,
  snapshotTest,
  styleTest,
  textContentTest,
  createClassName,
} from '../../tests/utils';
import AlertBase from '../__example__/01-base';
import AlertType from '../__example__/02-type';
import AlertCloseable from '../__example__/03-closeable';
import AlertTitle from '../__example__/04-title';

const SO_PREFIX = 'alert';
const originClasses = ['alert', 'icon', 'content', 'text', 'close', 'title'];
const originItemClasses = [
  'info',
  'success',
  'warning',
  'danger',
  'pending',
  'noBordered',
  'withTitle',
];
const {
  alert: alertClassName,
  info: infoClassName,
  success: successClassName,
  warning: warningClassName,
  danger: dangerClassName,
  icon: iconClassName,
  close: closeClassName,
  pending: pendingClassName,
  noBordered: noBorderedClassName,
  withTitle: withTitleClassName,
  title: titleClassName,
  content: contentClassName,
  text: textClassName,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.runAllTimers();
});
afterEach(cleanup);
mountTest(<Alert />);

describe('Alert[Base]', () => {
  displayTest(Alert, 'ShineoutAlert');
  baseTest(Alert, alertClassName);
  childrenTest(Alert, alertClassName);
  snapshotTest(<AlertBase />);
  snapshotTest(<AlertType />, 'about type');
  snapshotTest(<AlertCloseable />, 'about closeable');
  snapshotTest(<AlertTitle />, 'about title');
  test('should render default', () => {
    const { container } = render(<Alert>Demo</Alert>);
    const alert = container.querySelector(alertClassName)!;
    classTest(alert, warningClassName);
    classLengthTest(alert, contentClassName, 1);
    const content = alert.querySelector(contentClassName)!;
    classLengthTest(content, textClassName, 1);
    textContentTest(content.querySelector(textClassName) as Element, 'Demo');
  });
  test('should render when set icon', () => {
    const { container } = render(
      <Alert icon type='info'>
        Demo
      </Alert>,
    );
    const alert = container.querySelector(alertClassName)!;
    const icon = alert.querySelector(iconClassName)!;
    expect(icon).toBeInTheDocument();
    classLengthTest(icon, 'svg', 1);
  });
  test('should render when set iconSize', () => {
    const { container } = render(
      <Alert icon iconSize={20} type='info'>
        Demo
      </Alert>,
    );
    styleTest(container.querySelector(iconClassName)!, 'width: 20px;');
  });
  test('should render when icon is element', () => {
    const iconDemo = <i>i</i>;
    const { container } = render(<Alert icon={iconDemo}>Demo</Alert>);
    const alert = container.querySelector(alertClassName)!;
    const icon = alert.querySelector(iconClassName)!;
    classLengthTest(icon, 'i', 1);
  });
  test('should render when set bordered is false', () => {
    const { container } = render(<Alert bordered={false}>Demo</Alert>);
    const alert = container.querySelector(alertClassName)!;
    classTest(alert, noBorderedClassName);
  });
});
describe('Alert[Type]', () => {
  test('should render when set different type', () => {
    const classes = [infoClassName, successClassName, warningClassName, dangerClassName];
    const { container } = render(<AlertType />);
    container.querySelectorAll(alertClassName).forEach((item, index) => {
      classTest(item, classes[index]);
    });
  });
});
describe('Alert[Close]', () => {
  test('should render when set closable', () => {
    const { container } = render(<Alert closable>Demo</Alert>);
    const alert = container.querySelector(alertClassName)!;
    const close = alert.querySelector(closeClassName)!;
    expect(close).toBeInTheDocument();
    classLengthTest(close, 'svg', 1);
  });
  // TODO: closeFn不支持boolean
  test('should render when set close', async () => {
    const closeFn = jest.fn();
    const { container } = render(<Alert onClose={closeFn}>Demo</Alert>);
    const alert = container.querySelector(alertClassName)!;
    const close = alert.querySelector(closeClassName)!;
    expect(close).toBeInTheDocument();
    fireEvent.click(close);
    classTest(alert, pendingClassName);
    await waitFor(async () => {
      await delay(400);
      expect(alert).not.toBeInTheDocument();
      expect(closeFn.mock.calls.length).toBe(1);
    });
  });
  test('should render when set hideClose', () => {
    const closeFn = jest.fn();
    const { container } = render(
      <Alert hideClose onClose={closeFn}>
        Demo
      </Alert>,
    );
    const alert = container.querySelector(alertClassName)!;
    classLengthTest(alert, closeClassName, 0);
  });
  test('should render when set close and closable at the same time', () => {
    const closeFn = jest.fn();
    const { container } = render(
      <Alert closable={false} onClose={closeFn}>
        Demo
      </Alert>,
    );
    const alert = container.querySelector(alertClassName)!;
    const close = alert.querySelector(closeClassName)!;
    expect(close).not.toBeInTheDocument();
  });
  test('should render when set closable is only', async () => {
    const { container } = render(<Alert closable='only'>Demo</Alert>);
    const alert = container.querySelector(alertClassName)!;
    const close = alert.querySelector(closeClassName)!;
    expect(close).toBeInTheDocument();
    fireEvent.click(close);
    await waitFor(async () => {
      await delay(400);
      expect(alert).toBeInTheDocument();
    });
  });
  test('should render when set closeItem is ReactNode', async () => {
    const closeFn = jest.fn();
    const { container } = render(
      <Alert closable onClose={closeFn} closeItem={<div className='closeOtherNode'>1</div>}>
        Demo
      </Alert>,
    );
    const alert = container.querySelector(alertClassName)!;
    const closeOtherNode = alert.querySelector('.closeOtherNode')!;
    expect(alert.querySelector(closeClassName)).not.toBeInTheDocument();
    expect(closeOtherNode).toBeInTheDocument();
    textContentTest(closeOtherNode, '1');
    fireEvent.click(closeOtherNode);
    await waitFor(async () => {
      await delay(400);
      expect(alert).not.toBeInTheDocument();
    });
  });
  test('should render when set closeItem is icon', async () => {
    const closeFn = jest.fn();
    const { container } = render(
      <Alert closable onClose={closeFn} closeItem={1}>
        Demo
      </Alert>,
    );
    const alert = container.querySelector(alertClassName)!;
    const close = alert.querySelector(closeClassName)!;
    expect(close).toBeInTheDocument();
    textContentTest(close, '1');
    fireEvent.click(close);
    await waitFor(async () => {
      await delay(400);
      expect(alert).not.toBeInTheDocument();
    });
  });
  test('should render closeable', async () => {
    const { container } = render(<AlertCloseable />);
    const alert = container.querySelector(alertClassName)!;
    const close = alert.querySelector(closeClassName)!;
    fireEvent.click(close);
    await waitFor(async () => {
      await delay(300);
      expect(alert).not.toBeInTheDocument();
    });
    fireEvent.click(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(300);
      expect(container.querySelector(alertClassName)).toBeInTheDocument();
    });
  });
});
describe('Alert[Title]', () => {
  test('should render when set title', () => {
    const titleDemo = <div className='demo'>Hello</div>;
    const { container } = render(
      <Alert title={titleDemo} closable>
        Demo
      </Alert>,
    );
    const alert = container.querySelector(alertClassName)!;
    classTest(alert, withTitleClassName);
    const title = alert.querySelector(titleClassName)!;
    expect(title).toBeInTheDocument();
    classLengthTest(title, '.demo', 1);
    textContentTest(title, 'Hello');
    const close = alert.querySelector(closeClassName)!;
    expect(close).toBeInTheDocument();
  });
});
