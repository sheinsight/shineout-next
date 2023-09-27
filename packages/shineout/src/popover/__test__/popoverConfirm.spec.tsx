import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Popover from '..';
import { Button } from 'shineout';
import { classLengthTest } from '../../tests/structureTest';
import { classContentTest, delay, displayTest, textContentTest } from '../../tests/utils';
import PopoverConfirm from '../__example__/09-confirm';

const SO_PREFIX = 'popover';
const popoverClassName = `.${SO_PREFIX}-wrapper-0-2-65`;
const popoverBaseClassName = `.${SO_PREFIX}-wrapper-0-2-1`;
const popoverContentClassName = `.${SO_PREFIX}-content-0-2-68`;
const popoverContentBaseClassName = `.${SO_PREFIX}-content-0-2-4`;
const popoverMentionClassName = `.${SO_PREFIX}-mention-0-2-71`;
const popoverFooterClassName = `.${SO_PREFIX}-footer-0-2-72`;
const popoverOpenClassName = `${SO_PREFIX}-wrapperOpen-0-2-66`;
const popoverOpenBaseClassName = `${SO_PREFIX}-wrapperOpen-0-2-2`;
const buttonSpinClassName = '.button-spin-0-2-22';
const alertIconClassName = '.alert-icon-0-2-84';

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.runAllTimers();
});
afterEach(cleanup);

const getPopoverRoot = () =>
  document.querySelector(popoverClassName)! || document.querySelector(popoverBaseClassName)!;
const getPopoverContent = () =>
  getPopoverRoot().querySelector(popoverContentClassName)! ||
  getPopoverRoot().querySelector(popoverContentBaseClassName)!;
const getPopoverStatus = (status: boolean) => {
  expect(
    getPopoverRoot().classList.contains(popoverOpenClassName) ||
      getPopoverRoot().classList.contains(popoverOpenBaseClassName),
  ).toBe(status);
};

const PopoverConfimDemo = ({ icon, text, okType, type, onCancel, onOk }: any) => (
  <Button>
    <Popover.Confirm
      icon={icon}
      text={text}
      okType={okType}
      type={type}
      onCancel={onCancel}
      onOk={onOk}
    >
      Are you sure delete ?
    </Popover.Confirm>
    Delete
  </Button>
);

describe('Popover[Base]', () => {
  displayTest(Popover.Confirm as React.FC, 'ShineoutPopoverConfirm');
  test('should render when use popover confirm', async () => {
    const { container } = render(<PopoverConfirm />);
    const button = container.querySelector('button')!;
    fireEvent.click(button);
    await waitFor(async () => {
      await delay(200);
    });
    expect(getPopoverRoot()).toBeInTheDocument();
    expect(getPopoverContent()).toBeInTheDocument();
    textContentTest(
      getPopoverContent().querySelector(popoverMentionClassName)!,
      'Are you sure delete ?',
    );
    const buttons = getPopoverContent()
      .querySelector(popoverFooterClassName)
      ?.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    expect(buttons.length).toBe(2);
    textContentTest(buttons[0], 'No');
    textContentTest(buttons[1], 'Yes');
    fireEvent.click(buttons[1]);
    await waitFor(async () => {
      await delay(200);
    });
    expect(buttons[1].querySelector(buttonSpinClassName)).toBeInTheDocument();
    fireEvent.click(buttons[0]);
    await waitFor(async () => {
      await delay(200);
      getPopoverStatus(false);
    });
  });
  test('should render when set icon is true', async () => {
    const { container } = render(<PopoverConfimDemo icon={true} />);
    const button = container.querySelector('button')!;
    fireEvent.click(button);
    await waitFor(async () => {
      await delay(200);
      classLengthTest(getPopoverRoot(), alertIconClassName, 1);
    });
  });
  test('should render when set icon is false', async () => {
    const { container } = render(<PopoverConfimDemo icon={false} />);
    const button = container.querySelector('button')!;
    fireEvent.click(button);
    await waitFor(async () => {
      await delay(200);
      classLengthTest(getPopoverRoot(), alertIconClassName, 0);
    });
  });
  test('should render when set icon is ReactElement', async () => {
    const { container } = render(<PopoverConfimDemo icon={<div>demo</div>} />);
    const button = container.querySelector('button')!;
    fireEvent.click(button);
    await waitFor(async () => {
      await delay(200);
      textContentTest(getPopoverRoot().querySelector(alertIconClassName)!, 'demo');
    });
  });
  test('should render when set text', async () => {
    const { container } = render(<PopoverConfimDemo text={{ ok: 'hello', cancel: 'hi' }} />);
    const button = container.querySelector('button')!;
    fireEvent.click(button);
    await waitFor(async () => {
      await delay(200);
      const buttons = getPopoverContent()
        .querySelector(popoverFooterClassName)
        ?.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
      textContentTest(buttons[0], 'hi');
      textContentTest(buttons[1], 'hello');
    });
  });
  test('should render when set okType', async () => {
    const { container, rerender } = render(<PopoverConfimDemo />);
    const button = container.querySelector('button')!;
    fireEvent.click(button);
    await waitFor(async () => {
      await delay(200);
    });
    let buttons = getPopoverContent()
      .querySelector(popoverFooterClassName)
      ?.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    classContentTest(buttons[1], 'danger');
    rerender(<PopoverConfimDemo okType='success' />);
    fireEvent.click(button);
    await waitFor(async () => {
      await delay(200);
    });
    classContentTest(buttons[1], 'success');
    rerender(<PopoverConfimDemo okType='warning' />);
    fireEvent.click(button);
    await waitFor(async () => {
      await delay(200);
    });
    classContentTest(buttons[1], 'warning');
  });
  test('should render when set type', async () => {
    const { container, rerender } = render(<PopoverConfimDemo type='success' />);
    const button = container.querySelector('button')!;
    fireEvent.click(button);
    await waitFor(async () => {
      await delay(200);
      classContentTest(getPopoverContent().querySelector(popoverMentionClassName)!, 'success');
    });
    rerender(<PopoverConfimDemo type='danger' />);
    fireEvent.click(button);
    await waitFor(async () => {
      await delay(200);
      classContentTest(getPopoverContent().querySelector(popoverMentionClassName)!, 'danger');
    });
  });
});
describe('Popover[OnCancel/OnOk]', () => {
  test('should render when set onCancel', async () => {
    const cancelFn = jest.fn();
    const { container } = render(<PopoverConfimDemo onCancel={cancelFn} />);
    const button = container.querySelector('button')!;
    fireEvent.click(button);
    await waitFor(async () => {
      await delay(200);
      const buttons = getPopoverContent()
        .querySelector(popoverFooterClassName)
        ?.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
      fireEvent.click(buttons[0]);
      expect(cancelFn.mock.calls.length).toBe(1);
    });
  });
  test('should render when set onOk', async () => {
    const okFn = jest.fn();
    const { container } = render(<PopoverConfimDemo onOk={okFn} />);
    const button = container.querySelector('button')!;
    fireEvent.click(button);
    await waitFor(async () => {
      await delay(200);
      const buttons = getPopoverContent()
        .querySelector(popoverFooterClassName)
        ?.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
      fireEvent.click(buttons[1]);
      expect(okFn.mock.calls.length).toBe(1);
    });
  });
  test('should render when set onCancel that is promise', async () => {
    const cancelFn = jest.fn(() => Promise.resolve());
    const { container } = render(<PopoverConfimDemo onCancel={cancelFn} />);
    const button = container.querySelector('button')!;
    fireEvent.click(button);
    await waitFor(async () => {
      await delay(200);
      const buttons = getPopoverContent()
        .querySelector(popoverFooterClassName)
        ?.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
      fireEvent.click(buttons[0]);
      expect(cancelFn.mock.calls.length).toBe(1);
    });
    await waitFor(async () => {
      await delay(200);
      getPopoverStatus(false);
    });
  });
  test('should render when set onOk that is promise', async () => {
    const okFn = jest.fn(() => Promise.resolve());
    const { container } = render(<PopoverConfimDemo onOk={okFn} />);
    const button = container.querySelector('button')!;
    fireEvent.click(button);
    await waitFor(async () => {
      await delay(200);
      const buttons = getPopoverContent()
        .querySelector(popoverFooterClassName)
        ?.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
      fireEvent.click(buttons[1]);
      expect(okFn.mock.calls.length).toBe(1);
    });
    await waitFor(async () => {
      await delay(200);
      getPopoverStatus(false);
    });
  });
});
