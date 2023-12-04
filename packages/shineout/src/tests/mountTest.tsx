import React from 'react';
import { render } from '@testing-library/react';

export default function mountTest(Component: React.ComponentType | JSX.Element) {
  let renderedComponent: JSX.Element;
  if (React.isValidElement(Component)) {
    // 如果传递的是 JSX 元素
    renderedComponent = React.cloneElement(Component);
  } else {
    // 如果传递的是 React 组件类型
    const ComponentType = Component as React.ComponentType;
    renderedComponent = <ComponentType />;
  }

  describe('mount and unmount', () => {
    test('component should be mount without errors', () => {
      expect(() => render(renderedComponent)).not.toThrow();
    });
    test('component should be updated and unmounted without errors', () => {
      const { unmount, rerender } = render(renderedComponent);
      expect(() => {
        rerender(renderedComponent);
        unmount();
      }).not.toThrow();
    });
  });
}
