import { render, cleanup, fireEvent } from '@testing-library/react';
import Button from '..';
import { classTest, createClassName } from '../../tests/utils';
import ButtonGroup from '../__example__/s-008-group';

const SO_PREFIX = 'button';
const originClasses = ['group'];
const originItemClasses = ['secondary', 'outline', 'primary', 'text', 'small', 'round'];
const { group, secondary, outline, text, small, round } = createClassName(
  SO_PREFIX,
  originClasses,
  originItemClasses,
);

afterEach(cleanup);
describe('ButtonGroup[Base]', () => {
  test('should render correctly', () => {
    const { container } = render(<ButtonGroup />);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render button Group base', () => {
    const { container } = render(<ButtonGroup />);
    expect(container.querySelectorAll(group).length).toBe(6);
  });
  test('should render when set type and mode in button group', () => {
    const { container } = render(
      <Button.Group type='secondary' mode='outline'>
        <Button>test</Button>
        <Button>test</Button>
      </Button.Group>,
    );
    expect(container.querySelectorAll(group).length).toBe(1);
    container.querySelectorAll('button').forEach((button) => {
      expect(button.classList.contains(secondary)).toBeTruthy();
      expect(button.classList.contains(outline)).toBeTruthy();
    });
  });
  test('should render children button type when set type in group and button at the same time', () => {
    const { container } = render(
      <Button.Group type='primary'>
        <Button type='secondary'>secondary</Button>
      </Button.Group>,
    );
    classTest(container.querySelector('button') as Element, secondary);
  });
  test('should render group mode when set mode in group and button at the same time', () => {
    const { container } = render(
      <Button.Group mode='text'>
        <Button mode='outline'>outline</Button>
      </Button.Group>,
    );
    classTest(container.querySelector('button') as Element, text);
  });
  test('should render when set size in group and button at the same time', () => {
    const { container } = render(
      <Button.Group size='small'>
        <Button size='large'>large</Button>
      </Button.Group>,
    );
    expect(container.querySelector(group)?.classList.contains(small)).toBeTruthy();
    classTest(container.querySelector('button') as Element, small);
  });
  test('should render when set shape in group and button at the same time', () => {
    const { container } = render(
      <Button.Group shape='round'>
        <Button shape='circle'>circle</Button>
        <Button shape='square'>square</Button>
        <Button>test</Button>
      </Button.Group>,
    );
    expect(container.querySelector(group)?.classList.contains(round)).toBeTruthy();
    container.querySelectorAll('button').forEach((button) => {
      expect(button.classList.contains(round)).toBeTruthy();
    });
  });
  // TODO: Group上的属性会透传
  test('should render when children is not button', () => {
    const { container } = render(
      <Button.Group shape='round'>
        <div>test</div>
      </Button.Group>,
    );
    expect(container.querySelector(group)?.classList.contains(round)).toBeTruthy();
  });
  test('should not click when set click in button group', () => {
    const handleFn = jest.fn();
    const { container } = render(
      // @ts-ignore
      <Button.Group onClick={handleFn}>
        <Button>test</Button>
      </Button.Group>,
    );
    fireEvent.click(container.querySelector(group) as Element);
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
    fireEvent.click(container.querySelector(group) as Element);
    expect(handleFnA.mock.calls.length).toBe(0);
    expect(handleFnB.mock.calls.length).toBe(0);
    fireEvent.click(container.querySelectorAll('button')[0] as Element);
    expect(handleFnA.mock.calls.length).toBe(1);
    fireEvent.click(container.querySelectorAll('button')[1] as Element);
    expect(handleFnB.mock.calls.length).toBe(1);
  });
});
