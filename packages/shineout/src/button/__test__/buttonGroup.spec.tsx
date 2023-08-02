import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Button from '..';
import ButtonGroup from '../__example__/s-008-group';

const SO_PREFIX = 'button';
afterEach(cleanup);
describe('ButtonGroup[Base]', () => {
  test('should render correctly', () => {
    const { container } = render(<ButtonGroup />);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render button Group base', () => {
    const { container } = render(<ButtonGroup />);
    expect(container.querySelectorAll(`.${SO_PREFIX}-group-group-0-2-1`).length).toBe(5);
  });
  test('should render when set type and mode in button group', () => {
    const { container } = render(
      <Button.Group type='secondary' mode='outline'>
        <Button>test</Button>
        <Button>test</Button>
      </Button.Group>,
    );
    expect(container.querySelectorAll(`.${SO_PREFIX}-group-group-0-2-1`).length).toBe(1);
    expect(
      container
        .querySelector(`.${SO_PREFIX}-group-group-0-2-1`)
        ?.classList.contains(`${SO_PREFIX}-group-secondary-0-2-8`),
    ).toBeTruthy();
    expect(
      container
        .querySelector(`.${SO_PREFIX}-group-group-0-2-1`)
        ?.classList.contains(`${SO_PREFIX}-group-outline-0-2-12`),
    ).toBeTruthy();
    container.querySelectorAll('button').forEach((button) => {
      expect(button.classList.contains(`${SO_PREFIX}-secondary-0-2-20`)).toBeTruthy();
      expect(button.classList.contains(`${SO_PREFIX}-outline-0-2-25`)).toBeTruthy();
    });
  });
  test('should render children button type when set type in group and button at the same time', () => {
    const { container } = render(
      <Button.Group type='primary'>
        <Button type='secondary'>secondary</Button>
        <Button type='success'>success</Button>
      </Button.Group>,
    );
    expect(
      container
        .querySelector(`.${SO_PREFIX}-group-group-0-2-1`)
        ?.classList.contains(`${SO_PREFIX}-group-primary-0-2-7`),
    ).toBeTruthy();
    container.querySelectorAll('button').forEach((button) => {
      expect(button.classList[0].includes(button.textContent as string)).toBeTruthy();
    });
  });
  test('should render group mode when set mode in group and button at the same time', () => {
    const { container } = render(
      <Button.Group mode='text'>
        <Button mode='link'>link</Button>
        <Button mode='outline'>outline</Button>
      </Button.Group>,
    );
    expect(
      container
        .querySelector(`.${SO_PREFIX}-group-group-0-2-1`)
        ?.classList.contains(`${SO_PREFIX}-group-text-0-2-13`),
    ).toBeTruthy();
    container.querySelectorAll('button').forEach((button) => {
      expect(button.classList.contains(`${SO_PREFIX}-text-0-2-27`)).toBeTruthy();
    });
  });
  test('should render when set size in group and button at the same time', () => {
    const { container } = render(
      <Button.Group size='small'>
        <Button size='default'>default</Button>
        <Button size='large'>large</Button>
      </Button.Group>,
    );
    expect(
      container
        .querySelector(`.${SO_PREFIX}-group-group-0-2-1`)
        ?.classList.contains(`${SO_PREFIX}-group-small-0-2-4`),
    ).toBeTruthy();
    container.querySelectorAll('button').forEach((button) => {
      expect(button.classList.contains(`${SO_PREFIX}-small-0-2-16`)).toBeTruthy();
    });
  });
  test('should render when set shape in group and button at the same time', () => {
    const { container } = render(
      <Button.Group shape='round'>
        <Button shape='circle'>circle</Button>
        <Button shape='square'>square</Button>
        <Button>test</Button>
      </Button.Group>,
    );
    expect(
      container
        .querySelector(`.${SO_PREFIX}-group-group-0-2-1`)
        ?.classList.contains(`${SO_PREFIX}-group-round-0-2-2`),
    ).toBeTruthy();
    container.querySelectorAll('button').forEach((button) => {
      expect(button.classList.contains(`${SO_PREFIX}-round-0-2-29`)).toBeTruthy();
    });
  });
  // TODO: Group上的属性会透传
  test('should render when children is not button', () => {
    const { container } = render(
      <Button.Group shape='round'>
        <div>test</div>
      </Button.Group>,
    );
    screen.debug();
    expect(
      container
        .querySelector(`.${SO_PREFIX}-group-group-0-2-1`)
        ?.classList.contains(`${SO_PREFIX}-group-round-0-2-2`),
    ).toBeTruthy();
  });
  test('should not click when set click in button group', () => {
    const handleFn = jest.fn();
    const { container } = render(
      <Button.Group onClick={handleFn}>
        <Button>test</Button>
      </Button.Group>,
    );
    fireEvent.click(container.querySelector(`.${SO_PREFIX}-group-group-0-2-1`) as Element);
    expect(handleFn.mock.calls.length).toBe(0);
    fireEvent.click(container.querySelector('button') as Element);
    expect(handleFn.mock.calls.length).toBe(0);
  });
  test('should click when set click in button', () => {
    const handleFnA = jest.fn();
    const handleFnB = jest.fn();
    const { container } = render(
      <Button.Group>
        <Button onClick={handleFnA}>test</Button>
        <Button onClick={handleFnB}>test</Button>
      </Button.Group>,
    );
    fireEvent.click(container.querySelector(`.${SO_PREFIX}-group-group-0-2-1`) as Element);
    expect(handleFnA.mock.calls.length).toBe(0);
    expect(handleFnB.mock.calls.length).toBe(0);
    fireEvent.click(container.querySelectorAll('button')[0] as Element);
    expect(handleFnA.mock.calls.length).toBe(1);
    fireEvent.click(container.querySelectorAll('button')[1] as Element);
    expect(handleFnB.mock.calls.length).toBe(1);
  });
});
