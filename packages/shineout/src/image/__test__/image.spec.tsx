import { cleanup } from '@testing-library/react';
import Image from '..';
import mountTest from 'src/tests/mountTest';

afterEach(cleanup);
describe('Image[Base]', () => {
  mountTest(Image);
  test('should render correctly', () => {});
});
