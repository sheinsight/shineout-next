import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Divider from '..';
import mountTest from '../../tests/mountTest';
import { displayTest } from '../../tests/utils';

// const SO_PREFIX = 'divider'
// const originClasses = ['wrapper', 'vertical', 'horizontal', 'withText', 'withTextCenter', 'withTextLeft', 'withTextRight', 'innerText']

afterEach(cleanup);

mountTest(<Divider />);
describe('Divider[Base]', () => {
  displayTest(Divider, 'ShineoutDivider');
  test('should render default', () => {
    render(<Divider />);
    screen.debug();
  });
});
