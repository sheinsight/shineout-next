import { render, screen, cleanup } from '@testing-library/react';
import Tag from '..';
import { snapshotTest } from '../../tests/utils';
import mountTest from '../../tests/mountTest';
import TagBase from '../__example__/s-001-base';

afterEach(cleanup);
describe('Tag[Base]', () => {
  mountTest(Tag);
  snapshotTest(<TagBase />);
  test('should render when set different color', () => {
    render(<TagBase />);
    screen.debug();
  });
});
