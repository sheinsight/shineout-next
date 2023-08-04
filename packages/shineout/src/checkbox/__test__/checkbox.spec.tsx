import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import Checkbox from '..';
import mountTest from '../../tests/mountTest';
import structureTest, { inputTest } from '../../tests/structureTest';
import disabledTest from '../../tests/disabledTest';
import CheckboxBase from '../__example__/001-base';
import CheckboxStatus from '../__example__/002-checked-1';
import CheckboxIndeterminate from '../__example__/002-checked-2';
import CheckboxHtmlValue from '../__example__/003-value';
import CheckboxInputable from '../__example__/008-inputable';
import CheckboxClick from '../__example__/009-click';

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
const checkTest = (container: HTMLElement, status: boolean) => {
  const checkbox = container.querySelector(`.${SO_PREFIX}-wrapper-0-2-1`)!;
  expect(checkbox.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBe(status);
  expect(checkbox.querySelector('input')?.hasAttribute('checked')).toBe(status);
  fireEvent.click(checkbox);
  expect(checkbox.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBe(status);
  expect(checkbox.querySelector('input')?.hasAttribute('checked')).toBe(status);
};
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
describe('Checkbox[Checked, disabled]', () => {
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
    checkTest(container, true);
    expect(clickFn.mock.calls.length).toBe(1);
  });
  test('should render when set checked is false', () => {
    const clickFn = jest.fn();
    const { container } = render(
      <Checkbox onClick={clickFn} checked={false}>
        Checkbox
      </Checkbox>,
    );
    checkTest(container, false);
    expect(clickFn.mock.calls.length).toBe(1);
  });
  test('should render when set checked is indeterminate', () => {
    const clickFn = jest.fn();
    const { container } = render(
      <Checkbox onClick={clickFn} checked='indeterminate'>
        Checkbox
      </Checkbox>,
    );
    checkTest(container, false);
    expect(clickFn.mock.calls.length).toBe(1);
  });
  test('should render about indetermimnate', () => {
    const { container } = render(<CheckboxIndeterminate />);
    const checkboxAll = container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-1`)[0];
    const checkboxs = container
      .querySelector(`.${SO_PREFIX}-group-0-2-9`)
      ?.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-1`) as NodeListOf<Element>;
    const checkboxAllTest = (iStatus: boolean, cStatus: boolean) => {
      expect(checkboxAll.classList.contains(`${SO_PREFIX}-wrapperIndeterminate-0-2-4`)).toBe(
        iStatus,
      );
      expect(checkboxAll.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBe(cStatus);
    };
    expect(checkboxAll.textContent).toBe('CheckAll');
    checkboxAllTest(false, false);
    fireEvent.click(checkboxs[0]);
    expect(checkboxAll.textContent).toBe('CheckAll');
    checkboxAllTest(true, false);
    expect(checkboxs[0].classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBeTruthy();
    fireEvent.click(checkboxs[1]);
    fireEvent.click(checkboxs[2]);
    expect(checkboxAll.textContent).toBe('UnCheckAll');
    checkboxAllTest(false, true);
    fireEvent.click(checkboxs[0]);
    expect(checkboxAll.textContent).toBe('CheckAll');
    checkboxAllTest(true, false);
    expect(checkboxs[0].classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBeFalsy();
  });

  test('should render when set disabled', () => {
    disabledTest(Checkbox, `.${SO_PREFIX}-wrapper-0-2-1`, `${SO_PREFIX}-wrapperChecked-0-2-3`);
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
  });
});
describe('Checkbox[Inputable]', () => {
  test('should render corretly about inputable', () => {
    const { container } = render(<CheckboxInputable />);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should show input while selected', () => {
    const clickFn = jest.fn();
    const { container } = render(
      <Checkbox inputable onClick={clickFn}>
        more...
      </Checkbox>,
    );
    expect(container.querySelectorAll(`.${SO_PREFIX}-input-0-2-2`).length).toBe(0);
    const checkbox = container.querySelector(`.${SO_PREFIX}-wrapper-0-2-1`)!;
    fireEvent.click(checkbox);
    expect(clickFn.mock.calls.length).toBe(1);
    const input = container.querySelector(`.${SO_PREFIX}-input-0-2-2`);
    expect(container.querySelectorAll(`.${SO_PREFIX}-input-0-2-2`).length).toBe(1);
    expect(input?.querySelectorAll('input').length).toBe(1);
    expect(input?.querySelector('input')?.getAttribute('value')).toBe('');
    fireEvent.change(input?.querySelector('input') as HTMLInputElement, {
      target: {
        value: 'no',
      },
    });
    expect(input?.querySelector('input')?.getAttribute('value')).toBe('no');
  });
  test('should show input while selected by htmlValue', () => {
    const { container } = render(
      <Checkbox inputable htmlValue='no'>
        more...
      </Checkbox>,
    );
    const checkbox = container.querySelector(`.${SO_PREFIX}-wrapper-0-2-1`)!;
    fireEvent.click(checkbox);
    expect(
      container
        .querySelector(`.${SO_PREFIX}-input-0-2-2`)
        ?.querySelector('input')
        ?.getAttribute('value'),
    ).toBe('no');
  });
});
// TODO：有点问题
describe('Checkbox[Value]', () => {
  test('should checked same as value === htmlValue', () => {
    const clickFn = jest.fn();
    const { container } = render(<Checkbox htmlValue='red' value='blue' onClick={clickFn} />);
    fireEvent.click(container.querySelector(`.${SO_PREFIX}-wrapper-0-2-1`)!);
    screen.debug();
  });
});
describe('Checkbox[Click]', () => {
  test('should render corretly about click', () => {
    const { container } = render(<CheckboxClick />);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render when click', () => {
    const { container } = render(<CheckboxClick />);
    const checkbox = container.querySelector(`.${SO_PREFIX}-wrapper-0-2-1`)!;
    expect(checkbox?.textContent).toBe('Click Me 0 Times!');
    fireEvent.click(checkbox);
    expect(checkbox?.textContent).toBe('Click Me 1 Times!');
    fireEvent.click(checkbox);
    expect(checkbox?.textContent).toBe('Click Me 2 Times!');
  });
});
