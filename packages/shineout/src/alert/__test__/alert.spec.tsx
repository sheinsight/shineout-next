import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Alert from '..';
import mountTest from '../../tests/mountTest';
import { classLengthTest } from '../../tests/structureTest';
import {
  attributesTest,
  baseTest,
  childrenTest,
  classTest,
  delay,
  displayTest,
  snapshotTest,
  styleTest,
  textContentTest,
} from '../../tests/utils';
import AlertBase from '../__example__/01-base';
import AlertType from '../__example__/02-type';
import AlertCloseable from '../__example__/03-closeable';
import AlertTitle from '../__example__/04-title';

const SO_PREFIX = 'alert';
const alertClassName = `.${SO_PREFIX}-alert-0-2-1`;
const alertInfoClassName = `${SO_PREFIX}-info-0-2-7`;
const alertSuccessClassName = `${SO_PREFIX}-success-0-2-8`;
const alertWarningClassName = `${SO_PREFIX}-warning-0-2-9`;
const alertDangerClassName = `${SO_PREFIX}-danger-0-2-10`;
const alertIconClassName = `.${SO_PREFIX}-icon-0-2-12`;
const alertCloseClassName = `.${SO_PREFIX}-close-0-2-4`;
const alertPendingClassName = `${SO_PREFIX}-pending-0-2-6`;
const alertNoBorderedClassName = `${SO_PREFIX}-noBordered-0-2-11`;
const alertWidthTitleClassName = `${SO_PREFIX}-widthTitle-0-2-2`;
const alertTitleClassName = `.${SO_PREFIX}-title-0-2-3`;

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
    classTest(alert, alertWarningClassName);
    expect(alert.firstChild).toHaveAttribute('data-soui-layout', 'row');
    const content = alert.firstChild?.firstChild;
    expect(content).toHaveAttribute('data-soui-children', 'true');
    expect(content).toHaveAttribute('data-soui-layout', 'cell');
    textContentTest(content as Element, 'Demo');
  });
  test('should render when set icon', () => {
    const { container } = render(<Alert icon>Demo</Alert>);
    const alert = container.querySelector(alertClassName)!;
    const icon = alert.querySelector(alertIconClassName)!;
    expect(icon).toBeInTheDocument();
    attributesTest(icon.parentElement!, 'data-soui-icon', 'true');
    attributesTest(icon.parentElement!, 'data-soui-layout', 'cell');
    classLengthTest(icon, 'svg', 1);
  });
  test('should render when set iconSize', () => {
    const { container } = render(
      <Alert icon iconSize={20}>
        Demo
      </Alert>,
    );
    styleTest(container.querySelector(alertIconClassName)!, 'width: 20px;');
  });
  test('should render when icon is element', () => {
    const iconDemo = <i>i</i>;
    const { container } = render(<Alert icon={iconDemo}>Demo</Alert>);
    const alert = container.querySelector(alertClassName)!;
    const icon = alert.querySelector(alertIconClassName)!;
    classLengthTest(icon, 'i', 1);
  });
  test('should render when set bordered is fasle', () => {
    const { container } = render(<Alert bordered={false}>Demo</Alert>);
    const alert = container.querySelector(alertClassName)!;
    classTest(alert, alertNoBorderedClassName);
  });
});
describe('Alert[Type]', () => {
  test('should render when set different type', () => {
    const classes = [
      alertInfoClassName,
      alertSuccessClassName,
      alertWarningClassName,
      alertDangerClassName,
    ];
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
    const close = alert.querySelector(alertCloseClassName)!;
    expect(close).toBeInTheDocument();
    attributesTest(close.parentElement!, 'data-soui-close', 'true');
    classLengthTest(close, 'svg', 1);
  });
  // TODO: closeFn不支持boolean
  test('should render when set close', async () => {
    const closeFn = jest.fn();
    const { container } = render(<Alert onClose={closeFn}>Demo</Alert>);
    const alert = container.querySelector(alertClassName)!;
    const close = alert.querySelector(alertCloseClassName)!;
    expect(close).toBeInTheDocument();
    fireEvent.click(close);
    classTest(alert, alertPendingClassName);
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
    classLengthTest(alert, alertCloseClassName, 0);
  });
  test('should render when set close and closable at the same time', () => {
    const closeFn = jest.fn();
    const { container } = render(
      <Alert closable={false} onClose={closeFn}>
        Demo
      </Alert>,
    );
    const alert = container.querySelector(alertClassName)!;
    const close = alert.querySelector(alertCloseClassName)!;
    expect(close).not.toBeInTheDocument();
  });
  // TODO: closeItem
});
describe('Alert[Title]', () => {
  test('should render when set title', () => {
    const titleDemo = <div className='demo'>Hello</div>;
    const { container } = render(<Alert title={titleDemo}>Demo</Alert>);
    const alert = container.querySelector(alertClassName)!;
    classTest(alert, alertWidthTitleClassName);
    const title = alert.querySelector(alertTitleClassName)!;
    expect(title).toBeInTheDocument();
    classLengthTest(title, '.demo', 1);
    textContentTest(title, 'Hello');
  });
});
