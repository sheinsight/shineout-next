import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import Checkbox from '..';
import mountTest from '../../tests/mountTest';
import structureTest, { inputTest } from '../../tests/structureTest';
import CheckboxBase from '../__example__/001-base';
import CheckboxStatus from '../__example__/002-checked-1';
import CheckboxIndeterminate from '../__example__/002-checked-2';
import CheckboxHtmlValue from '../__example__/003-value';

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
  });
});
describe('Checkbox[Checked]', () => {
  test('should render corretly about checked', () => {
    const { container } = render(<CheckboxStatus />);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render corretly about checked is indeterminate', () => {
    const { container } = render(<CheckboxIndeterminate />);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should set correct class', () => {
    const { container } = render(<CheckboxStatus />);
    // array[0]: checked (false: -1, 'indeterminate: 0', true: 1)
    // array[1]: disabled (false: 0, true: 1)
    const statusMap = [
      [-1, 0],
      [1, 0],
      [0, 0],
      [-1, 1],
      [1, 1],
      [0, 1],
    ];
    container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-1`).forEach((checkbox, index) => {
      expect(checkbox.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBe(
        statusMap[index][0] === 1 ? true : false,
      );
      expect(checkbox.querySelector('input')?.hasAttribute('checked')).toBe(
        statusMap[index][0] === 1 ? true : false,
      );
      expect(checkbox.classList.contains(`${SO_PREFIX}-wrapperIndeterminate-0-2-4`)).toBe(
        statusMap[index][0] === 0 ? true : false,
      );
      expect(checkbox.classList.contains(`${SO_PREFIX}-wrapperDisabled-0-2-5`)).toBe(
        !!statusMap[index][1],
      );
      expect(checkbox.querySelector('input')?.hasAttribute('disabled')).toBe(!!statusMap[index][1]);
    });
  });
  test('should render when set checked', () => {
    const clickFn = jest.fn();
    const { container } = render(
      <Checkbox onClick={clickFn} checked>
        Checkbox
      </Checkbox>,
    );
    const checkbox = container.querySelector(`.${SO_PREFIX}-wrapper-0-2-1`)!;
    fireEvent.click(checkbox);
    expect(checkbox.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBeTruthy();
    expect(checkbox.querySelector('input')?.hasAttribute('checked')).toBeTruthy();
    expect(clickFn.mock.calls.length).toBe(1);
  });
  test('should render when set checked is indeterminate', () => {
    const clickFn = jest.fn();
    const { container } = render(
      <Checkbox onClick={clickFn} checked='indeterminate'>
        Checkbox
      </Checkbox>,
    );
    const checkbox = container.querySelector(`.${SO_PREFIX}-wrapper-0-2-1`)!;
    fireEvent.click(checkbox);
    expect(checkbox.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBeFalsy();
    expect(checkbox.querySelector('input')?.hasAttribute('checked')).toBeFalsy();
    expect(clickFn.mock.calls.length).toBe(1);
  });
  test('should render about indetermimnate', () => {
    const { container } = render(<CheckboxIndeterminate />);
    const checkboxAll = container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-1`)[0];
    const checkboxs = container
      .querySelector(`.${SO_PREFIX}-group-0-2-9`)
      ?.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-1`) as NodeListOf<Element>;
    expect(checkboxAll.textContent).toBe('CheckAll');
    expect(checkboxAll.classList.contains(`${SO_PREFIX}-wrapperIndeterminate-0-2-4`)).toBeFalsy();
    expect(checkboxAll.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBeFalsy();
    fireEvent.click(checkboxs[0]);
    expect(checkboxAll.textContent).toBe('CheckAll');
    expect(checkboxAll.classList.contains(`${SO_PREFIX}-wrapperIndeterminate-0-2-4`)).toBeTruthy();
    expect(checkboxAll.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBeFalsy();
    expect(checkboxs[0].classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBeTruthy();
    fireEvent.click(checkboxs[1]);
    fireEvent.click(checkboxs[2]);
    expect(checkboxAll.textContent).toBe('UnCheckAll');
    expect(checkboxAll.classList.contains(`${SO_PREFIX}-wrapperIndeterminate-0-2-4`)).toBeFalsy();
    expect(checkboxAll.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBeTruthy();
    fireEvent.click(checkboxs[0]);
    expect(checkboxAll.textContent).toBe('CheckAll');
    expect(checkboxAll.classList.contains(`${SO_PREFIX}-wrapperIndeterminate-0-2-4`)).toBeTruthy();
    expect(checkboxAll.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBeFalsy();
    expect(checkboxs[0].classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBeFalsy();
  });
});
describe('Checkbox[HtmlValue]', () => {
  test('should render corretly about htmlValue', () => {
    const { container } = render(<CheckboxHtmlValue />);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should renturn htmlValue', () => {
    const clickFn = jest.fn();
    const changeFn = jest.fn();
    const checkedText = 'ok';
    const { container } = render(
      <Checkbox htmlValue={checkedText} onClick={clickFn} onChange={changeFn}>
        Checkbox
      </Checkbox>,
    );
    const checkbox = container.querySelector(`.${SO_PREFIX}-wrapper-0-2-1`)!;
    fireEvent.click(checkbox);
    expect(changeFn.mock.calls[0][0]).toBe(checkedText);
    screen.debug();
  });
});
