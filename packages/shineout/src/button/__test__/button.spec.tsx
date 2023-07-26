import { render, screen, cleanup } from '@testing-library/react';
import Button from '..';
import mountTest from '../../tests/mountTest';
import ButtonBase from '../__example__/s-001-base';
import ButtonIcon from '../__example__/s-002-icon';
import ButtonShape from '../__example__/s-003-shape';
import ButtonSize from '../__example__/s-004-size';

const SO_PREFIX = 'button';
afterEach(cleanup);
describe('Button[Base]', () => {
  mountTest(Button);
  test('should render correctly', () => {
    const { container } = render(<ButtonBase />);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render className in a button', () => {
    const { container } = render(<ButtonBase />);
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(5);
    buttons.forEach((button) => {
      expect(button.getAttribute('style')).toBe('margin: 0px;');
      expect(button.classList.contains(`${SO_PREFIX}-button-0-2-1`)).toBeTruthy();
      expect(
        button.getAttribute('class')?.includes(button.textContent?.toLocaleLowerCase() as string),
      ).toBeTruthy();
    });
  });
  test('should render className about type and mode', () => {
    const { container } = render(
      <Button type='secondary' mode='outline'>
        Outline
      </Button>,
    );
    const button = container.querySelector('button');
    expect(button?.classList.contains(`${SO_PREFIX}-secondary-0-2-6`)).toBeTruthy();
    expect(button?.classList.contains(`${SO_PREFIX}-outline-0-2-11`)).toBeTruthy();
  });
  test('should render when default', () => {
    const { container } = render(<Button>button</Button>);
    expect(
      container.querySelector('button')?.classList.contains(`${SO_PREFIX}-default-0-2-4`),
    ).toBeTruthy();
  });
  test('should render when set className', () => {
    const { container } = render(<Button className='button'>className</Button>);
    expect(container.querySelector('button')?.classList.contains('button')).toBeTruthy();
  });
  test('should render when set icon', () => {
    const { container } = render(<ButtonIcon />);
    container.querySelectorAll('button').forEach((button) => {
      expect(button.querySelectorAll('svg').length).toBe(1);
    });
  });
  test('should render when set outline or text', () => {
    const { container } = render(<Button outline>button</Button>);
    expect(
      container.querySelector('button')?.classList.contains(`${SO_PREFIX}-outline-0-2-11`),
    ).toBeTruthy();
  });
  test('should render mode first when set mode and text or outline', () => {
    const { container } = render(
      <Button mode='outline' text>
        button
      </Button>,
    );
    const button = container.querySelector('button');
    expect(button?.classList.contains(`${SO_PREFIX}-outline-0-2-11`)).toBeTruthy();
    expect(button?.classList.contains(`${SO_PREFIX}-text-0-2-13`)).toBeFalsy();
  });
  test('should render when set shape', () => {
    const shape = ['square', 'circle', 'round'];
    const { container } = render(<ButtonShape />);
    container.querySelectorAll('button').forEach((button, index) => {
      if (index === 3) return;
      expect(button.classList[2].includes(shape[index])).toBeTruthy();
    });
  });
  test('should render when set size', () => {
    const sizes = ['small', '', 'large'];
    const { container } = render(<ButtonSize />);
    screen.debug();
    container.querySelectorAll('button').forEach((button, index) => {
      if (!button.classList[2]) return;
      expect(button.classList[2].includes(sizes[index])).toBeTruthy();
    });
  });
});
