import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import Checkbox from '..';
import mountTest from '../../tests/mountTest';
import structureTest, { inputTest } from '../../tests/structureTest';
import CheckboxBase from '../__example__/001-base';

const SO_PREFIX = 'checkbox';
const attributes = [
  {
    attribute: 'input',
    num: 1,
  },
  {
    attribute: 'i',
    num: 1,
  },
  {
    attribute: 'span',
    num: 1,
  },
];
afterEach(cleanup);
describe('Checkbox[Base]', () => {
  mountTest(Checkbox);
  structureTest(<Checkbox>Checkbox</Checkbox>, attributes);
  test('should render correctly', () => {
    const { container } = render(<CheckboxBase />);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render about class when not set attribute', () => {
    const renderContent = <Checkbox>Checkbox</Checkbox>;
    const inputAttributes = [
      {
        attribute: 'style',
        value: 'display: none;',
      },
      {
        attribute: 'tabindex',
        value: '0',
      },
      {
        attribute: 'type',
        value: 'checkbox',
      },
    ];
    inputTest(renderContent, inputAttributes);
    const { container } = render(renderContent);
    expect(container.querySelector('i')?.getAttribute('tabindex')).toBe('1');
    expect(container.querySelector('span')?.textContent).toBe('Checkbox');
  });
  test('should render when click', () => {
    const clickFn = jest.fn();
    const { container } = render(<Checkbox onClick={clickFn}>Checkbox</Checkbox>);
    const checkbox = container.querySelector(`.${SO_PREFIX}-wrapper-0-2-1`)!;
    expect(checkbox.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBeFalsy();
    fireEvent.click(checkbox);
    expect(checkbox.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBeTruthy();
    expect(clickFn.mock.calls.length).toBe(1);
    fireEvent.click(checkbox);
    expect(checkbox.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBeFalsy();
    expect(clickFn.mock.calls.length).toBe(2);
    screen.debug();
  });
});
