import { render, cleanup } from '@testing-library/react';
import React from 'react';
// import { Button } from '@sheinx/base';
import ButtonBase from '../__example__/s-001-base';

// const SO_PREFIX = 'button'
afterEach(cleanup);
describe('Button[Base]', () => {
  test('should render correctly', () => {
    const { container } = render(<ButtonBase />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
