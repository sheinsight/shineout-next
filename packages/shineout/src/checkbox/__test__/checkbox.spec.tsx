import { render, cleanup } from '@testing-library/react';
import Checkbox from '..';
import mountTest from '../../tests/mountTest';
import CheckboxBase from '../__example__/001-base';

// const SO_PREFIX = 'checkbox'
afterEach(cleanup);
describe('Checkbox[Base]', () => {
  mountTest(Checkbox);
  test('should render correctly', () => {
    const { container } = render(<CheckboxBase />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
