import React, { RefAttributes } from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import Radio from '..';
import { Form } from 'shineout';
import mountTest from '../../tests/mountTest';
import {
  snapshotTest,
  textContentTest,
  classTest,
  attributesTest,
  hasAttributesTest,
  baseTest,
  childrenTest,
  displayTest,
} from '../../tests/utils';
import { classLengthTest, inputTest } from '../../tests/structureTest';
import RadioBase from '../__example__/001-base-0';
import RadioStatus from '../__example__/001-base-1';
import RadioGroup from '../__example__/002-group-0';
import RadioGroupByChildren from '../__example__/002-group-1';
import RadioBlock from '../__example__/003-block';
import RadioCancel from '../__example__/003-cancel';
import RadioButton from '../__example__/004-button';
import RadioButtonOutline from '../__example__/005-button-outline';
import RadioSize from '../__example__/006-button-size';
import RadioDisabled from '../__example__/007-disabled';
import RadioDisabledFunc from '../__example__/008-disabled-func';
import { RadioGroupProps } from '../group.type';

const SO_PREFIX = 'radio';
const radioClassName = `.${SO_PREFIX}-wrapper-0-2-1`;
const radioCheckedClassName = `${SO_PREFIX}-wrapperChecked-0-2-4`;
const radioIndicatorWrapper = `.${SO_PREFIX}-indicatorWrapper-0-2-6`;
const radioDescClassName = `.${SO_PREFIX}-desc-0-2-8`;
const radioGroupClassName = `.${SO_PREFIX}-group-0-2-9`;
const radioBlockClassName = `${SO_PREFIX}-groupBlock-0-2-10`;
const radioGroupButtonClassName = `${SO_PREFIX}-groupButton-0-2-11`;
const buttonGroupClassName = 'button-group-0-2-32';
const radioDisabledClassName = `${SO_PREFIX}-wrapperDisabled-0-2-5`;
const radioOutlineClassName = 'button-outline-0-2-22';
const buttonSmallClassName = 'button-small-0-2-13';
const buttonLargeClassName = 'button-large-0-2-14';

const renderData = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];
const preData = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
];
function createRadioGroup<DataItem, Value>(
  props: RadioGroupProps<DataItem, Value> & RefAttributes<HTMLDivElement>,
) {
  const { data = preData as DataItem[], keygen = true, ...other } = props;
  return <Radio.Group data={data} keygen={keygen} {...other} />;
}
// const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.runAllTimers();
});
afterEach(cleanup);
describe('Radio[Base]', () => {
  const defaultValue = 'blue';
  mountTest(Radio);
  mountTest(Radio.Group as React.ComponentType);
  baseTest(Radio, radioClassName);
  baseTest(Radio.Group as React.ComponentType, radioGroupClassName);
  childrenTest(Radio, radioClassName);
  childrenTest(Radio.Group as React.ComponentType, radioGroupClassName);
  displayTest(Radio, 'ShineoutRadio');
  displayTest(Radio.Group as React.FC, 'ShineoutRadioGroup');
  snapshotTest(<RadioBase />);
  snapshotTest(<RadioStatus />, 'about status');
  snapshotTest(<RadioGroup />, 'about group');
  snapshotTest(<RadioGroupByChildren />, 'about group children');
  snapshotTest(<RadioBlock />, 'about block');
  snapshotTest(<RadioCancel />, 'about cancel');
  snapshotTest(<RadioButton />, 'about button');
  snapshotTest(<RadioButtonOutline />, 'about button outline');
  snapshotTest(<RadioSize />, 'about size');
  snapshotTest(<RadioDisabled />, 'about disabled');
  snapshotTest(<RadioDisabledFunc />, 'about disabled func');
  test('should render base', () => {
    const attributes = [
      {
        attribute: 'style',
        value: 'display: none;',
      },
      {
        attribute: 'type',
        value: 'radio',
      },
    ];
    const { container } = render(<RadioBase />);
    classLengthTest(container, 'input', 1);
    inputTest(<RadioBase />, attributes);
    classLengthTest(container, radioIndicatorWrapper, 1);
    classLengthTest(container, radioDescClassName, 1);
    textContentTest(container.querySelector(radioDescClassName)!, 'Option');
    fireEvent.click(container.querySelector(radioClassName)!);
    classTest(container.querySelector(radioClassName)!, radioCheckedClassName);
  });
  test('should render radios while through data', () => {
    const { container } = render(<RadioGroup />);
    container.querySelectorAll(radioClassName).forEach((radio, index) => {
      classLengthTest(radio, 'input', 1);
      textContentTest(radio, renderData[index]);
      if (radio.textContent === defaultValue) return;
      classTest(radio, radioCheckedClassName, false);
    });
    container.querySelectorAll(radioClassName).forEach((radio) => {
      if (radio.textContent !== defaultValue) return;
      classTest(radio, radioCheckedClassName);
    });
    container.querySelectorAll(radioClassName).forEach((radio) => {
      fireEvent.click(radio);
      classTest(radio, radioCheckedClassName);
    });
  });
  test('should call onChange', () => {
    const changeFn = jest.fn();
    const { container } = render(<Radio.Group keygen data={renderData} onChange={changeFn} />);
    container.querySelectorAll(radioClassName).forEach((radio) => {
      fireEvent.click(radio);
      classTest(radio, radioCheckedClassName);
    });
    changeFn.mock.calls.forEach((call, index) => {
      expect(call[0]).toBe(renderData[index]);
    });
  });
});
describe('Radio[Raw]', () => {
  test('should render radios while through data in raw', () => {
    const defaultValue = 'yellow';
    const { container } = render(
      <Radio.Group
        keygen
        defaultValue='yellow'
        onChange={(...args: any[]) => {
          console.log(args);
        }}
      >
        {renderData.map((d) => (
          <Radio key={d} htmlValue={d}>
            {d}
          </Radio>
        ))}
      </Radio.Group>,
    );
    container.querySelectorAll(radioClassName).forEach((radio, index) => {
      classLengthTest(radio, 'input', 1);
      textContentTest(radio, renderData[index]);
      if (radio.textContent === defaultValue) return;
      classTest(radio, radioCheckedClassName, false);
    });
    container.querySelectorAll(radioClassName).forEach((radio) => {
      if (radio.textContent !== defaultValue) return;
      classTest(radio, radioCheckedClassName);
    });
  });
});
describe('Radio[Block]', () => {
  test('should render radios as block', () => {
    const { container } = render(<RadioBlock />);
    const radios = container.querySelectorAll(radioGroupClassName);
    classTest(radios[1], radioBlockClassName);
  });
});
describe('Radio[Button]', () => {
  test('should render radios when set button', () => {
    const { container } = render(<RadioButton />);
    const radios = container.querySelectorAll(radioGroupClassName);
    radios.forEach((radio) => {
      classTest(radio, radioGroupButtonClassName);
      classTest(radio, buttonGroupClassName);
    });
    radios[0].querySelectorAll('button').forEach((button) => {
      classLengthTest(button, 'input', 1);
      fireEvent.click(button);
      classTest(button, radioCheckedClassName);
    });
    radios[1].querySelectorAll('button').forEach((button) => {
      classLengthTest(button, 'input', 1);
      attributesTest(button, 'disabled', '');
      classTest(button, radioDisabledClassName);
      fireEvent.click(button);
      if (button.textContent === 'Wednesday') return;
      classTest(button, radioCheckedClassName, false);
    });
  });
});
describe('Radio[ButtonOutline]', () => {
  test('should render radios when set ontline', () => {
    const { container } = render(<RadioButtonOutline />);
    container.querySelectorAll('button').forEach((button) => {
      classTest(button, radioOutlineClassName);
    });
  });
});
describe('Radio[ButtonSize]', () => {
  test('should render radios when set different size', () => {
    const { container } = render(<RadioSize />);
    const radios = container.querySelectorAll(radioGroupClassName)!;
    radios[0].querySelectorAll('button').forEach((button) => {
      classTest(button, buttonSmallClassName);
    });
    radios[2].querySelectorAll('button').forEach((button) => {
      classTest(button, buttonLargeClassName);
    });
  });
});
describe('Radio[Disabled]', () => {
  test('should disabled on each input', () => {
    const { container } = render(<RadioDisabled />);
    container.querySelectorAll(radioClassName).forEach((radio) => {
      classTest(radio, radioDisabledClassName);
      attributesTest(radio.querySelector('input')!, 'disabled', '');
    });
  });
  test('should not call onClick', () => {
    const changeFn = jest.fn();
    const defaultValue = 'hello';
    const { container } = render(
      <Radio.Group
        keygen
        data={['hello', 'world']}
        disabled
        onChange={changeFn}
        defaultValue='hello'
      />,
    );
    container.querySelectorAll(radioClassName).forEach((radio) => {
      fireEvent.click(radio);
      if (radio.textContent === defaultValue) return;
      classTest(radio, radioCheckedClassName, false);
    });
    expect(changeFn.mock.calls.length).toBe(0);
  });
});
describe('Radio[DisabledFunc]', () => {
  test('should render while set disabled by function', () => {
    const { container } = render(
      <Radio.Group keygen data={renderData} disabled={(d: any) => d === 'yellow'} />,
    );
    expect(container.querySelectorAll('.' + radioDisabledClassName).length).toBe(1);
    expect(container.querySelector('.' + radioDisabledClassName)?.textContent).toBe('yellow');
  });
});
describe('Radio[Cancel]', () => {
  test('should not fire change events when value not change', () => {
    const changeFn = jest.fn();
    const { container } = render(
      createRadioGroup({ data: renderData, onChange: changeFn, keygen: true, defaultValue: 'red' }),
    );
    const radios = container.querySelectorAll(radioClassName);
    fireEvent.click(radios[0]);
    expect(changeFn.mock.calls.length).toBe(0);
  });
  test('should render while set cancel function', () => {
    const { container } = render(<RadioCancel />);
    const defaultValue = 'red';
    textContentTest(container.querySelector('.' + radioCheckedClassName)!, 'red');
    container.querySelectorAll(radioClassName).forEach((radio) => {
      if (defaultValue === radio.textContent) return;
      fireEvent.click(radio);
      classTest(radio, radioCheckedClassName);
      fireEvent.click(radio);
      classTest(radio, radioCheckedClassName, false);
    });
  });
});
describe('Radio[Checked]', () => {
  test('should checked', () => {
    const { container } = render(<Radio checked />);
    const radio = container.querySelector(radioClassName)!;
    classTest(radio, radioCheckedClassName);
    const inputs = container.querySelectorAll('input')!;
    expect(inputs.length).toBe(1);
    hasAttributesTest(container.querySelector('input')!, 'checked');
    fireEvent.click(container.querySelector(radioClassName) as Element);
    classTest(radio, radioCheckedClassName);
    hasAttributesTest(container.querySelector('input')!, 'checked');
  });
  test('should not checked', () => {
    const { container } = render(<Radio checked={false} />);
    const radio = container.querySelector(radioClassName)!;
    classTest(radio, radioCheckedClassName, false);
    const inputs = container.querySelectorAll('input')!;
    expect(inputs.length).toBe(1);
    hasAttributesTest(container.querySelector('input')!, 'checked', false);
    fireEvent.click(container.querySelector(radioClassName) as Element);
    classTest(radio, radioCheckedClassName, false);
    hasAttributesTest(container.querySelector('input')!, 'checked', false);
  });
});
describe('Radio[HtmlValue]', () => {
  test('should set htmlValue', () => {
    const handleChange = jest.fn();
    const htmlValue = 'Hello';
    const { container } = render(<Radio htmlValue={htmlValue} onChange={handleChange} />);
    classLengthTest(container, 'input', 1);
    fireEvent.click(container.querySelector(radioClassName) as Element);
    expect(handleChange).toBeCalled();
    expect(handleChange.mock.calls[0][0]).toBe(htmlValue);
  });
});
describe('Radio[RenderItem]', () => {
  test('should set renderItem by string', () => {
    const data = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
    ];
    const handleChange = jest.fn();
    const { container } = render(
      <Radio.Group
        keygen={(d: any) => d.id}
        data={data}
        renderItem='name'
        onChange={handleChange}
      />,
    );
    container.querySelectorAll(radioClassName).forEach((radio, index) => {
      textContentTest(radio, data[index].name);
      fireEvent.click(radio);
      expect(handleChange.mock.calls[index][0]['id']).toBe(data[index].id);
    });
  });
  test('should set renderItem by function', () => {
    const data = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
    ];
    const handleChange = jest.fn();
    const { container } = render(
      <Radio.Group
        keygen={(d: any) => d.id}
        data={data}
        renderItem={(d: any) => d.name}
        onChange={handleChange}
      />,
    );
    container.querySelectorAll(radioClassName).forEach((radio, index) => {
      textContentTest(radio, data[index].name);
      fireEvent.click(radio);
      expect(handleChange.mock.calls[index][0]['id']).toBe(data[index].id);
    });
  });
});
describe('Radio[Format]', () => {
  test('should set format by string', () => {
    const data = [
      { id: 1, name: 'a', age: 12 },
      { id: 2, name: 'b', age: 22 },
    ];
    const handleChange = jest.fn();
    const { container } = render(
      <Radio.Group
        keygen={(d: any) => d.id}
        data={data}
        renderItem={(d: any) => d.name}
        onChange={handleChange}
        format='age'
      />,
    );
    container.querySelectorAll(radioClassName).forEach((radio, index) => {
      fireEvent.click(radio);
      expect(handleChange.mock.calls[index][0]).toBe(data[index]['age']);
    });
  });
  test('should set format by function', () => {
    const data = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
    ];
    const handleChange = jest.fn();
    const { container } = render(
      <Radio.Group
        keygen={(d: any) => d.id}
        data={data}
        renderItem={(d: any) => d.name}
        onChange={handleChange}
        format={(d: any) => d.id + 1}
      />,
    );
    container.querySelectorAll(radioClassName).forEach((radio, index) => {
      fireEvent.click(radio);
      expect(handleChange.mock.calls[index][0]).toBe(data[index].id + 1);
    });
  });
});
describe('Radio[Form]', () => {
  // Radio can't use alone, so its disabled status can't control by form disabled status
  test('should use form disabled status first', () => {
    const data = [
      { id: 1, name: 'a', age: 12 },
      { id: 2, name: 'b', age: 22 },
    ];
    const handleChange = jest.fn();
    const { container } = render(
      <Form disabled>
        <Radio.Group
          keygen={(d: any) => d.id}
          data={data}
          renderItem={(d: any) => d.name}
          onChange={handleChange}
          format='age'
          disabled={false}
        />
      </Form>,
    );
    fireEvent.click(
      (container.querySelector(`.${SO_PREFIX}-wrapper-0-2-3`) as Element) ||
        (container.querySelector(radioClassName) as Element),
    );
    expect(handleChange.mock.calls.length).toBe(0);
  });
});
describe('Radio[Value]', () => {
  test(`should render when data is undefined`, () => {
    const tempData = undefined;
    const { container, rerender } = render(<Radio.Group keygen data={renderData} />);
    classLengthTest(container, radioClassName, renderData.length);
    rerender(<Radio.Group keygen data={tempData} />);
    classLengthTest(container, radioClassName, 0);
  });
  test(`should render when value is undefined`, () => {
    const tempData = undefined;
    const { container } = render(<Radio.Group keygen data={renderData} value={tempData} />);
    const radios = container.querySelectorAll(radioClassName);
    classLengthTest(container, radioCheckedClassName, 0);
    fireEvent.click(radios[0]);
    classLengthTest(container, radioCheckedClassName, 0);
  });
  test('use `defaultValue` when `value` is undefined', () => {
    const tempData = undefined;
    const { container } = render(
      <Radio.Group keygen data={renderData} value={tempData} defaultValue='red' />,
    );
    const radios = container.querySelectorAll(radioClassName);
    classLengthTest(container, radioCheckedClassName, 0);
    fireEvent.click(radios[0]);
    classLengthTest(container, radioCheckedClassName, 0);
  });
  test('should render when the type of value is array', () => {
    const changeFn = jest.fn();
    const defaultValue = ['red', 'yellow'];
    const { container } = render(
      <Radio.Group keygen data={renderData} onChange={changeFn} value={defaultValue} />,
    );
    classLengthTest(container, '.' + radioCheckedClassName, defaultValue.length);
    container.querySelectorAll(radioClassName).forEach((radio) => {
      if (!radio.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)) return;
      expect(defaultValue.includes(radio.textContent as string)).toBeTruthy();
    });
  });
  test('should change checked status when set value', () => {
    const changeFn = jest.fn();
    const defaultValue = ['red', 'yellow'];
    const { container } = render(
      <Radio.Group keygen data={renderData} onChange={changeFn} value={defaultValue} />,
    );
    container.querySelectorAll(radioClassName).forEach((radio) => {
      if (radio.classList.contains(radioCheckedClassName)) return;
      fireEvent.click(radio);
      classTest(radio, radioCheckedClassName, false);
    });
  });
  test('should render when set value and defaultValue', () => {
    const { container } = render(
      <Radio.Group keygen data={renderData} value='red' defaultValue='yellow' />,
    );
    classLengthTest(container, '.' + radioCheckedClassName, 1);
    textContentTest(container.querySelector('.' + radioCheckedClassName)!, 'red');
  });
});
