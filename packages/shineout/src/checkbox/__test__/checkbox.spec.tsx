import { render, cleanup, fireEvent } from '@testing-library/react';
import Checkbox from '..';
import mountTest from '../../tests/mountTest';
import structureTest, { inputTest, classLengthTest } from '../../tests/structureTest';
import disabledTest, { componentProps } from '../../tests/disabledTest';
import {
  classTest,
  snapshotTest,
  hasAttributesTest,
  attributesTest,
  textContentTest,
} from '../../tests/utils';
import CheckboxBase from '../__example__/001-base';
import CheckboxStatus from '../__example__/002-checked-1';
import CheckboxIndeterminate from '../__example__/002-checked-2';
import CheckboxHtmlValue from '../__example__/003-value';
import CheckboxInputable from '../__example__/008-inputable';
import CheckboxClick from '../__example__/009-click';

const SO_PREFIX = 'checkbox';
const checkboxClassName = `.${SO_PREFIX}-wrapper-0-2-1`;
const checkboxCheckedClassName = `${SO_PREFIX}-wrapperChecked-0-2-3`;
const checkboxDisabledClassName = `${SO_PREFIX}-wrapperDisabled-0-2-5`;
const checkboxIndeterminateClassName = `${SO_PREFIX}-wrapperIndeterminate-0-2-4`;
const checkboxInputClassName = `.${SO_PREFIX}-input-0-2-2`;
const checkboxGroupClassName = `.${SO_PREFIX}-group-0-2-9`;
const checkboxWrapperCheckedClassName = `${SO_PREFIX}-wrapperChecked-0-2-3`;

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
  const checkbox = container.querySelector(checkboxClassName)!;
  classTest(checkbox, checkboxCheckedClassName, status);
  const input = checkbox.querySelector('input')!;
  hasAttributesTest(input, 'checked', status);
  fireEvent.click(checkbox);
  classTest(checkbox, checkboxCheckedClassName, status);
  hasAttributesTest(input, 'checked', status);
};

afterEach(cleanup);
describe('Checkbox[Base]', () => {
  mountTest(Checkbox);
  structureTest(<Checkbox>Checkbox</Checkbox>, attributes);
  snapshotTest(<CheckboxBase />);
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
    attributesTest(container.querySelector('i')!, 'tabindex', '1');
    textContentTest(container.querySelector('span')!, 'Checkbox');
  });
  test('should render when click', () => {
    const clickFn = jest.fn();
    const { container } = render(<Checkbox onClick={clickFn}>Checkbox</Checkbox>);
    const checkbox = container.querySelector(checkboxClassName)!;
    classTest(checkbox, checkboxCheckedClassName, false);
    fireEvent.click(checkbox);
    classTest(checkbox, checkboxCheckedClassName);
    expect(clickFn.mock.calls.length).toBe(1);
    fireEvent.click(checkbox);
    classTest(checkbox, checkboxCheckedClassName, false);
    expect(clickFn.mock.calls.length).toBe(2);
  });
});
describe('Checkbox[Checked, disabled]', () => {
  snapshotTest(<CheckboxStatus />, 'about checked');
  snapshotTest(<CheckboxIndeterminate />, 'about checked is indeterminate');
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
    container.querySelectorAll(checkboxClassName).forEach((checkbox, index) => {
      classTest(checkbox, checkboxCheckedClassName, statusMap[index][0] === 1 ? true : false);
      const input = checkbox.querySelector('input')!;
      hasAttributesTest(input, 'checked', statusMap[index][0] === 1 ? true : false);
      classTest(checkbox, checkboxIndeterminateClassName, statusMap[index][0] === 0 ? true : false);
      classTest(checkbox, checkboxDisabledClassName, !!statusMap[index][1]);
      hasAttributesTest(input, 'disabled', !!statusMap[index][1]);
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
    const checkboxAll = container.querySelectorAll(checkboxClassName)[0];
    const checkboxs = container
      .querySelector(checkboxGroupClassName)
      ?.querySelectorAll(checkboxClassName) as NodeListOf<Element>;
    const checkboxAllTest = (iStatus: boolean, cStatus: boolean) => {
      classTest(checkboxAll, checkboxIndeterminateClassName, iStatus);
      classTest(checkboxAll, checkboxCheckedClassName, cStatus);
    };
    expect(checkboxAll.textContent).toBe('CheckAll');
    checkboxAllTest(false, false);
    fireEvent.click(checkboxs[0]);
    expect(checkboxAll.textContent).toBe('CheckAll');
    checkboxAllTest(true, false);
    classTest(checkboxs[0], checkboxCheckedClassName);
    fireEvent.click(checkboxs[1]);
    fireEvent.click(checkboxs[2]);
    expect(checkboxAll.textContent).toBe('UnCheckAll');
    checkboxAllTest(false, true);
    fireEvent.click(checkboxs[0]);
    expect(checkboxAll.textContent).toBe('CheckAll');
    checkboxAllTest(true, false);
    classTest(checkboxs[0], checkboxCheckedClassName, false);
  });

  test('should render when set disabled', () => {
    disabledTest(
      Checkbox as React.FC<componentProps>,
      checkboxClassName,
      checkboxWrapperCheckedClassName,
    );
  });
});
describe('Checkbox[HtmlValue]', () => {
  snapshotTest(<CheckboxHtmlValue />, 'about htmlValue');
  test('should renturn htmlValue', () => {
    const clickFn = jest.fn();
    const changeFn = jest.fn();
    const checkedText = 'ok';
    const { container } = render(
      <Checkbox htmlValue={checkedText} onClick={clickFn} onChange={changeFn}>
        Checkbox
      </Checkbox>,
    );
    const checkbox = container.querySelector(checkboxClassName)!;
    fireEvent.click(checkbox);
    expect(changeFn.mock.calls[0][0]).toBe(checkedText);
  });
});
describe('Checkbox[Inputable]', () => {
  snapshotTest(<CheckboxInputable />, 'about inputable');
  test('should show input while selected', () => {
    const clickFn = jest.fn();
    const { container } = render(
      <Checkbox inputable onClick={clickFn}>
        more...
      </Checkbox>,
    );
    classLengthTest(container, checkboxInputClassName, 0);
    const checkbox = container.querySelector(checkboxClassName)!;
    fireEvent.click(checkbox);

    expect(clickFn.mock.calls.length).toBe(1);
    const input = container.querySelector(checkboxInputClassName)!;
    classLengthTest(container, checkboxInputClassName, 1);
    classLengthTest(input, 'input', 1);
    attributesTest(input?.querySelector('input') as Element, 'value', '');

    fireEvent.change(input?.querySelector('input') as HTMLInputElement, {
      target: {
        value: 'no',
      },
    });
    attributesTest(input?.querySelector('input') as Element, 'value', 'no');
  });
  test('should show input while selected by htmlValue', () => {
    const { container } = render(
      <Checkbox inputable htmlValue='no'>
        more...
      </Checkbox>,
    );
    const checkbox = container.querySelector(checkboxClassName)!;
    fireEvent.click(checkbox);
    expect(
      container
        .querySelector(checkboxInputClassName)
        ?.querySelector('input')
        ?.getAttribute('value'),
    ).toBe('no');
  });
});
describe('Checkbox[Value]', () => {
  test('should checked same as value === htmlValue', () => {
    const clickFn = jest.fn();
    const { container } = render(<Checkbox htmlValue='red' value='blue' onClick={clickFn} />);
    const checkbox = container.querySelector(checkboxClassName)!;
    fireEvent.click(checkbox);
    classTest(checkbox, checkboxCheckedClassName, false);
  });
});
describe('Checkbox[Click]', () => {
  snapshotTest(<CheckboxClick />, 'about click');
  test('should render when click', () => {
    const { container } = render(<CheckboxClick />);
    const checkbox = container.querySelector(checkboxClassName)!;
    textContentTest(checkbox, 'Click Me 0 Times!');
    fireEvent.click(checkbox);
    textContentTest(checkbox, 'Click Me 1 Times!');
    fireEvent.click(checkbox);
    textContentTest(checkbox, 'Click Me 2 Times!');
  });
});
