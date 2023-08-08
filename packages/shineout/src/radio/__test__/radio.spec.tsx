import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Radio from '..';
import { Form } from 'shineout';
import mountTest from '../../tests/mountTest';
import RadioBase from '../__example__/002-group-0';
import RadioGroup from '../__example__/002-group-1';
import RadioBlock from '../__example__/003-block';
import RadioButton from '../__example__/004-button';
import RadioButtonOutline from '../__example__/005-button-outline';
import RadioSize from '../__example__/006-button-size';
import RadioDisabled from '../__example__/007-disabled';
import RadioCancel from '../__example__/003-cancel';
import { RadioGroupProps } from '../group.type';
import { RefAttributes } from 'react';

const SO_PREFIX = 'radio';
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
afterEach(cleanup);
describe('Radio[Base]', () => {
  const defaultValue = 'blue';
  mountTest(Radio);
  mountTest(Radio.Group as React.ComponentType);
  test('should render correctly', () => {
    const { container } = render(<Radio className='customized'>Test</Radio>);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render radios while through data', () => {
    const { container } = render(<RadioBase />);
    container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-2`).forEach((radio, index) => {
      expect(radio.querySelectorAll('input').length).toBe(1);
      expect(radio.textContent).toBe(renderData[index]);
      expect(
        screen.getByText(renderData[index]).getAttribute('style')?.indexOf(renderData[index]),
      ).toBeTruthy();
      if (radio.textContent === defaultValue) return;
      expect(radio.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBeFalsy();
    });
    container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-2`).forEach((radio) => {
      if (radio.textContent !== defaultValue) return;
      expect(radio.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBeTruthy();
    });
  });
  test('should call onChange', () => {
    const changeFn = jest.fn();
    const { container } = render(<Radio.Group keygen data={renderData} onChange={changeFn} />);
    container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-2`).forEach((radio) => {
      fireEvent.click(radio);
      expect(radio.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBeTruthy();
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
    container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-2`).forEach((radio, index) => {
      expect(radio.querySelectorAll('input').length).toBe(1);
      expect(radio.textContent).toBe(renderData[index]);
      if (radio.textContent === defaultValue) return;
      expect(radio.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBeFalsy();
    });
    container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-2`).forEach((radio) => {
      if (radio.textContent !== defaultValue) return;
      expect(radio.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBeTruthy();
    });
  });
  test('should render radios while through data', () => {
    const { container, unmount } = render(<RadioGroup />);
    expect(container.querySelectorAll(`.${SO_PREFIX}-group-0-2-10`).length).toBe(2);
    unmount();
    expect(container.querySelectorAll(`.${SO_PREFIX}-group-0-2-10`).length).toBe(0);
  });
});
describe('Radio[Block]', () => {
  test('should render radios as block', () => {
    const { container } = render(<RadioBlock />);
    expect(
      container
        .querySelector(`.${SO_PREFIX}-group-0-2-10`)
        ?.classList.contains(`${SO_PREFIX}-groupBlock-0-2-11`),
    ).toBeTruthy();
  });
});
describe('Radio[Button]', () => {
  test('should render radios when set button', () => {
    const { container } = render(<RadioButton />);
    expect(
      container
        .querySelector(`.${SO_PREFIX}-group-0-2-10`)
        ?.classList.contains(`${SO_PREFIX}-groupButton-0-2-12`),
    ).toBeTruthy();
  });
});
describe('Radio[ButtonOutline]', () => {
  test('should render radios when set ontline', () => {
    const { container } = render(<RadioButtonOutline />);
    expect(
      container
        .querySelector(`.${SO_PREFIX}-group-0-2-10`)
        ?.classList.contains(`${SO_PREFIX}-groupButton-0-2-12`),
    ).toBeTruthy();
    expect(
      container
        .querySelector(`.${SO_PREFIX}-group-0-2-10`)
        ?.classList.contains(`${SO_PREFIX}-groupOutline-0-2-13`),
    ).toBeTruthy();
  });
});
describe('Radio[ButtonSize]', () => {
  test('should render radios when set different size', () => {
    const { container } = render(<RadioSize />);
    expect(container.querySelectorAll(`.${SO_PREFIX}-groupSmall-0-2-14`).length).toBe(1);
    expect(container.querySelectorAll(`.${SO_PREFIX}-groupLarge-0-2-15`).length).toBe(1);
  });
});
describe('Radio[Disabled]', () => {
  test('should disabled on each input', () => {
    const { container } = render(<RadioDisabled />);
    expect(container.querySelectorAll(`.${SO_PREFIX}-wrapperDisabled-0-2-7`).length).toBe(
      renderData.length,
    );
    container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-2`).forEach((radio) => {
      expect(radio.classList.contains(`${SO_PREFIX}-wrapperDisabled-0-2-7`)).toBeTruthy();
      expect(radio.querySelector('input')?.hasAttribute('disabled')).toBeTruthy();
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
    container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-2`).forEach((radio) => {
      fireEvent.click(radio);
      if (radio.textContent === defaultValue) return;
      expect(radio.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBeFalsy();
    });
    expect(changeFn.mock.calls.length).toBe(0);
  });
});
describe('Radio[DisabledFunc]', () => {
  test('should render while set disabled by function', () => {
    const { container } = render(
      <Radio.Group keygen data={renderData} disabled={(d: any) => d === 'yellow'} />,
    );
    expect(container.querySelectorAll(`.${SO_PREFIX}-wrapperDisabled-0-2-7`).length).toBe(1);
    expect(container.querySelector(`.${SO_PREFIX}-wrapperDisabled-0-2-7`)?.textContent).toBe(
      'yellow',
    );
  });
});
describe('Radio[Cancel]', () => {
  test('should not fire change events when value not change', () => {
    const changeFn = jest.fn();
    const { container } = render(
      createRadioGroup({ data: renderData, onChange: changeFn, keygen: true, defaultValue: 'red' }),
    );
    const radios = container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-2`);
    fireEvent.click(radios[0]);
    expect(changeFn.mock.calls.length).toBe(0);
  });
  test('should render while set cancel function', () => {
    const { container } = render(<RadioCancel />);
    const defaultValue = 'red';
    expect(container.querySelector(`.${SO_PREFIX}-wrapperChecked-0-2-3`)?.textContent).toBe('red');
    container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-2`).forEach((radio) => {
      if (defaultValue === radio.textContent) return;
      fireEvent.click(radio);
      expect(radio.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBeTruthy();
      fireEvent.click(radio);
      expect(radio.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBeFalsy();
    });
  });
});
describe('Radio[Checked]', () => {
  test('should checked', () => {
    const { container } = render(<Radio checked />);
    expect(
      container
        .querySelector(`.${SO_PREFIX}-wrapper-0-2-2`)
        ?.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`),
    ).toBeTruthy();
    expect(container.querySelectorAll('input').length).toBe(1);
    expect(container.querySelector('input')?.hasAttribute('checked')).toBeTruthy();
    fireEvent.click(container.querySelector(`.${SO_PREFIX}-wrapper-0-2-2`) as Element);
    expect(
      container
        .querySelector(`.${SO_PREFIX}-wrapper-0-2-2`)
        ?.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`),
    ).toBeTruthy();
    expect(container.querySelector('input')?.hasAttribute('checked')).toBeTruthy();
  });
  test('should not checked', () => {
    const { container } = render(<Radio checked={false} />);
    expect(
      container
        .querySelector(`.${SO_PREFIX}-wrapper-0-2-2`)
        ?.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`),
    ).toBeFalsy();
    expect(container.querySelectorAll('input').length).toBe(1);
    expect(container.querySelector('input')?.hasAttribute('checked')).toBeFalsy();
    fireEvent.click(container.querySelector(`.${SO_PREFIX}-wrapper-0-2-2`) as Element);
    expect(
      container
        .querySelector(`.${SO_PREFIX}-wrapper-0-2-2`)
        ?.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`),
    ).toBeFalsy();
    expect(container.querySelector('input')?.hasAttribute('checked')).toBeFalsy();
  });
});
describe('Radio[HtmlValue]', () => {
  test('should set htmlValue', () => {
    const handleChange = jest.fn();
    const htmlValue = 'Hello';
    const { container } = render(<Radio htmlValue={htmlValue} onChange={handleChange} />);
    expect(container.querySelectorAll('input').length).toBe(1);
    fireEvent.click(container.querySelector(`.${SO_PREFIX}-wrapper-0-2-2`) as Element);
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
    container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-2`).forEach((radio, index) => {
      expect(radio.textContent).toBe(data[index].name);
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
    container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-2`).forEach((radio, index) => {
      expect(radio.textContent).toBe(data[index].name);
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
    container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-2`).forEach((radio, index) => {
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
    container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-2`).forEach((radio, index) => {
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
      (container.querySelector(`.${SO_PREFIX}-wrapper-0-2-4`) as Element) ||
        (container.querySelector(`.${SO_PREFIX}-wrapper-0-2-2`) as Element),
    );
    expect(handleChange.mock.calls.length).toBe(0);
  });
});
describe('Radio[Value]', () => {
  test(`should render when data is undefined`, () => {
    const tempData = undefined;
    const { container, rerender } = render(<Radio.Group keygen data={renderData} />);
    expect(container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-2`).length).toBe(
      renderData.length,
    );
    rerender(<Radio.Group keygen data={tempData} />);
    expect(container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-2`).length).toBe(0);
  });
  test(`should render when value is undefined`, () => {
    const tempData = undefined;
    const { container } = render(<Radio.Group keygen data={renderData} value={tempData} />);
    const radios = container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-2`);
    expect(container.querySelectorAll(`.${SO_PREFIX}-wrapperChecked-0-2-3`).length).toBe(0);
    fireEvent.click(radios[0]);
    expect(container.querySelectorAll(`.${SO_PREFIX}-wrapperChecked-0-2-3`).length).toBe(0);
  });
  test('use `defaultValue` when `value` is undefined', () => {
    const tempData = undefined;
    const { container } = render(
      <Radio.Group keygen data={renderData} value={tempData} defaultValue='red' />,
    );
    const radios = container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-2`);
    expect(container.querySelectorAll(`.${SO_PREFIX}-wrapperChecked-0-2-3`).length).toBe(0);
    fireEvent.click(radios[0]);
    expect(container.querySelectorAll(`.${SO_PREFIX}-wrapperChecked-0-2-3`).length).toBe(0);
  });
  test('should render when the type of value is array', () => {
    const changeFn = jest.fn();
    const defaultValue = ['red', 'yellow'];
    const { container } = render(
      <Radio.Group keygen data={renderData} onChange={changeFn} value={defaultValue} />,
    );
    expect(container.querySelectorAll(`.${SO_PREFIX}-wrapperChecked-0-2-3`).length).toBe(
      defaultValue.length,
    );
    container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-2`).forEach((radio) => {
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
    container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-2`).forEach((radio) => {
      if (radio.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)) return;
      fireEvent.click(radio);
      expect(radio.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBeFalsy();
    });
  });
  test('should render when set value and defaultValue', () => {
    const { container } = render(
      <Radio.Group keygen data={renderData} value='red' defaultValue='yellow' />,
    );
    expect(container.querySelectorAll(`.${SO_PREFIX}-wrapperChecked-0-2-3`).length).toBe(1);
    expect(container.querySelector(`.${SO_PREFIX}-wrapperChecked-0-2-3`)?.textContent).toBe('red');
  });
});
