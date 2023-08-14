import { cleanup, render, screen, waitFor } from '@testing-library/react';
import Image from '..';
import mountTest from '../../tests/mountTest';
import { displayTest } from '../../tests/utils';
import ImageBase from '../__example__/s-001-base';

afterEach(cleanup);
describe('Image[Base]', () => {
  mountTest(Image);
  displayTest(Image, 'ShineoutImage');
  test('should render correct dom structure', async () => {
    const { getByAltText } = render(<ImageBase />);
    await waitFor(() => getByAltText('demo'));
    screen.debug();
  });
});
