import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Popover from '..';
import { Button } from 'shineout';
import { classLengthTest } from '../../tests/structureTest';
import { classContentTest, createClassName, delay, displayTest, textContentTest } from '../../tests/utils';
import PopoverConfirm from '../__example__/09-confirm';

const SO_PREFIX = 'popover';

const { wrapper: popoverClassName, content: popoverContentClassName, wrapperOpen: popoverOpenClassName, mention: popoverMentionClassName, footer: popoverFooterClassName } = createClassName(SO_PREFIX, ['wrapper', 'content', 'mention', 'footer'], ['wrapperOpen'])

const { spin: buttonSpinClassName } = createClassName('button', ['spin'], ['']);
const { icon: alertIconClassName } = createClassName('alert', ['icon'], ['']);

const { 
  danger,
  warning,
  success
 } = createClassName('button', [''], ['danger', 'warning', 'success'])

const {
  success: successAlert,
  danger: dangerAlert
} = createClassName('alert', [''], ['success', 'danger'])

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.runAllTimers();
});
afterEach(cleanup);

const getPopoverRoot = () =>
  document.querySelector(popoverClassName)!
const getPopoverContent = () =>
  getPopoverRoot().querySelector(popoverContentClassName)!
const getPopoverStatus = (status: boolean) => {
  expect(
    getPopoverRoot().classList.contains(popoverOpenClassName)
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
      'TipsAre you sure you want to delete this content ?',
    );
    const buttons = getPopoverContent()
      .querySelector(popoverFooterClassName)
      ?.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    expect(buttons.length).toBe(2);
    textContentTest(buttons[0], 'Cancel');
    textContentTest(buttons[1], 'Ok');
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
    classContentTest(buttons[1], danger);
    rerender(<PopoverConfimDemo okType='success' />);
    fireEvent.click(button);
    await waitFor(async () => {
      await delay(200);
    });
    classContentTest(buttons[1], success);
    rerender(<PopoverConfimDemo okType='warning' />);
    fireEvent.click(button);
    await waitFor(async () => {
      await delay(200);
    });
    classContentTest(buttons[1], warning);
  });
  test('should render when set type', async () => {
    const { container, rerender } = render(<PopoverConfimDemo type='success' />);
    const button = container.querySelector('button')!;
    fireEvent.click(button);
    await waitFor(async () => {
      await delay(200);
      classContentTest(getPopoverContent().querySelector(popoverMentionClassName)!, successAlert);
    });
    rerender(<PopoverConfimDemo type='danger' />);
    fireEvent.click(button);
    await waitFor(async () => {
      await delay(200);
      classContentTest(getPopoverContent().querySelector(popoverMentionClassName)!, dangerAlert);
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
  test('should render when set onVisibleChange', async () => {
    const changeFn = jest.fn();
    const { container } = render(
      <Button>
        Hover
        <Popover onVisibleChange={changeFn}>some Text</Popover>
      </Button>,
    );
    const button = container.querySelector('button')!;
    fireEvent.mouseEnter(button);
    await waitFor(async () => {
      await delay(200);
      expect(changeFn.mock.calls.length).toBe(1);
    });
  });
});
