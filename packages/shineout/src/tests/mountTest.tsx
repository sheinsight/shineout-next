import React from 'react';
import { render } from '@testing-library/react';
export default function mountTest(Component: React.ComponentType) {
  describe('mount and unmount', () => {
    test('component should be mount without errors', () => {
      expect(() => render(<Component />)).not.toThrow();
    });
    test('component should be updated and unmounted without errors', () => {
      const { unmount, rerender } = render(<Component />);
      expect(() => {
        rerender(<Component />);
        unmount();
      }).not.toThrow();
    });
  });
}
