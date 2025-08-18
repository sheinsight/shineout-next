import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Popover from '..';
import { Button } from 'shineout';
import { createClassName, delay } from '../../tests/utils';

const SO_PREFIX = 'popover';
const {
  wrapper: popoverClassName,
  wrapperOpen: popoverOpenClassName,
} = createClassName(SO_PREFIX, ['wrapper'], ['wrapperOpen']);

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.runAllTimers();
});
afterEach(cleanup);

const getPopoverRoot = () => document.querySelector(popoverClassName)!;

describe('Popover[Bug Regression Tests]', () => {
  describe('Issue #1288: Children function execution timing', () => {
    test('children function should not execute on mount when popover is closed', () => {
      const childrenFn = jest.fn(() => <div>Function content</div>);
      
      render(
        <Button>
          Trigger
          <Popover trigger="click">
            {childrenFn}
          </Popover>
        </Button>
      );

      // Children function should not be called on initial render
      expect(childrenFn).not.toHaveBeenCalled();
    });

    test('children function should execute only when popover opens for the first time', async () => {
      const childrenFn = jest.fn((close) => (
        <div>
          Function content
          <button onClick={close}>Close</button>
        </div>
      ));
      
      const { container } = render(
        <Button>
          Trigger
          <Popover trigger="click">
            {childrenFn}
          </Popover>
        </Button>
      );

      const triggerButton = container.querySelector('button')!;
      
      // Children function should not be called initially
      expect(childrenFn).not.toHaveBeenCalled();
      
      // Click to open popover
      fireEvent.click(triggerButton);
      
      await waitFor(async () => {
        await delay(200);
        // Now children function should be called exactly once
        expect(childrenFn).toHaveBeenCalledTimes(1);
        expect(getPopoverRoot()).toBeInTheDocument();
      });
    });

    test('children function should continue to execute after first open, even when closed and reopened', async () => {
      const childrenFn = jest.fn((close) => (
        <div>
          Function content
          <button onClick={close}>Close</button>
        </div>
      ));
      
      const { container } = render(
        <Button>
          Trigger
          <Popover trigger="click">
            {childrenFn}
          </Popover>
        </Button>
      );

      const triggerButton = container.querySelector('button')!;
      
      // Open popover first time
      fireEvent.click(triggerButton);
      
      await waitFor(async () => {
        await delay(200);
        expect(childrenFn).toHaveBeenCalledTimes(1);
      });
      
      // Close popover by clicking the close button inside
      const closeButton = getPopoverRoot().querySelector('button')!;
      fireEvent.click(closeButton);
      
      await waitFor(async () => {
        await delay(200);
        expect(getPopoverRoot().classList.contains(popoverOpenClassName)).toBe(false);
      });
      
      // Reset the mock to track calls from this point
      childrenFn.mockClear();
      
      // Open popover again
      fireEvent.click(triggerButton);
      
      await waitFor(async () => {
        await delay(200);
        // Children function should be called again since popover has opened before
        expect(childrenFn).toHaveBeenCalledTimes(1);
        expect(getPopoverRoot().classList.contains(popoverOpenClassName)).toBe(true);
      });
    });

    test('children function should receive close callback and work correctly', async () => {
      const childrenFn = jest.fn((close) => (
        <div>
          <span>Function content</span>
          <button data-testid="close-btn" onClick={close}>Close</button>
        </div>
      ));
      
      const { container } = render(
        <Button>
          Trigger
          <Popover trigger="click">
            {childrenFn}
          </Popover>
        </Button>
      );

      const triggerButton = container.querySelector('button')!;
      
      // Open popover
      fireEvent.click(triggerButton);
      
      await waitFor(async () => {
        await delay(200);
        expect(childrenFn).toHaveBeenCalledTimes(1);
        expect(childrenFn).toHaveBeenCalledWith(expect.any(Function));
      });
      
      // Use the close callback
      const closeButton = getPopoverRoot().querySelector('[data-testid="close-btn"]')!;
      fireEvent.click(closeButton);
      
      await waitFor(async () => {
        await delay(200);
        expect(getPopoverRoot().classList.contains(popoverOpenClassName)).toBe(false);
      });
    });

    test('children function behavior should be consistent with ReactNode children when popover is visible', async () => {
      const childrenFn = jest.fn(() => <div>Function content</div>);
      
      render(
        <Button>
          Trigger
          <Popover trigger="click" visible={true}>
            {childrenFn}
          </Popover>
        </Button>
      );
      
      // When visible is explicitly true, children function should execute immediately
      expect(childrenFn).toHaveBeenCalledTimes(1);
      expect(getPopoverRoot()).toBeInTheDocument();
    });
  });
});