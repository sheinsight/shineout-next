/**
 * Bug Regression Tests for Popover Component
 * 
 * This file contains regression test cases for various bug fixes in the Popover component.
 * Each test suite is organized by the specific issue/PR it addresses to prevent future regressions.
 * 
 * Test Organization:
 * - Each bug fix should have its own describe block
 * - Include PR links and issue descriptions in the describe block comments
 * - Maintain comprehensive test coverage for critical bug fixes
 */

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
  /**
   * PR #1288: 修复 Popover children 函数执行时机问题
   * 
   * Related PR: https://github.com/sheinsight/shineout-next/pull/1288
   * Fixed Version: 3.7.9-beta.6
   * 
   * Issue Description:
   * - 问题：3.2.0-beta.2 版本后，Popover 的 children 函数在组件挂载时就会执行，而不是在 Popover 打开时才执行
   * - 原因：在提交 4e47d2e0 中，lazy 逻辑修改导致默认不再懒加载，children 函数会在渲染时立即执行
   * - 修复：只有当 Popover 打开时才执行 children 函数，未打开时返回 null
   * 
   * Test Coverage:
   * 1. 函数型 children 在组件挂载时不执行 - 确保修复了原问题，避免过早执行
   * 2. 函数型 children 只在首次打开时执行 - 验证懒加载行为，保证性能优化
   * 3. 关闭后重新打开的正确行为 - 确保后续操作正常，维持一致性体验
   * 4. close 回调函数正常工作 - 验证函数参数传递和功能完整性
   * 5. visible=true 时立即执行 - 确保显式控制时的行为符合预期
   */
  describe('Issue #1288: Children function execution timing', () => {
    /**
     * Test 1: 验证函数型 children 在组件挂载时不执行
     * 
     * 目的：确保修复了原问题，避免过早执行
     * 流程：
     * 1. 渲染包含函数型 children 的 Popover 组件
     * 2. 验证函数在初始渲染时未被调用
     * 
     * 预期：函数不应该在组件挂载时执行，只有打开时才执行
     */
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

    /**
     * Test 2: 验证函数型 children 只在首次打开时执行
     * 
     * 目的：验证懒加载行为，保证性能优化
     * 流程：
     * 1. 渲染包含函数型 children 的 Popover 组件
     * 2. 验证函数在初始状态未被调用
     * 3. 点击触发按钮打开 Popover
     * 4. 验证函数被调用且 Popover 显示
     * 
     * 预期：函数只在 Popover 首次打开时执行一次
     */
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

    /**
     * Test 3: 验证关闭后重新打开的正确行为
     * 
     * 目的：确保后续操作正常，维持一致性体验
     * 流程：
     * 1. 首次打开 Popover，验证函数执行
     * 2. 通过内部关闭按钮关闭 Popover
     * 3. 重置 mock 计数器
     * 4. 再次打开 Popover，验证函数重新执行
     * 
     * 预期：一旦 Popover 曾经打开过，后续每次打开都应该正常执行函数
     */
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

    /**
     * Test 4: 验证 close 回调函数正常工作
     * 
     * 目的：验证函数参数传递和功能完整性
     * 流程：
     * 1. 创建包含关闭按钮的函数型 children
     * 2. 打开 Popover，验证函数被调用且接收到 close 参数
     * 3. 点击内部关闭按钮，验证 close 回调正常工作
     * 4. 验证 Popover 成功关闭
     * 
     * 预期：函数应该接收到 close 回调函数且能够正常关闭 Popover
     */
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

    /**
     * Test 5: 验证 visible=true 时立即执行
     * 
     * 目的：确保显式控制时的行为符合预期
     * 流程：
     * 1. 创建设置了 visible={true} 的 Popover 组件
     * 2. 验证函数型 children 立即执行
     * 3. 验证 Popover 立即显示
     * 
     * 预期：当显式设置 visible 为 true 时，函数应该立即执行，与 ReactNode children 行为一致
     */
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