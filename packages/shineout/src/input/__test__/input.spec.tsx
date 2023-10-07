import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import React, { ReactElement, useState } from 'react';
import Input from '..';
import { Form } from 'shineout';
const SO_PREFIX = 'input';
describe('Input[Base]', () => {
  test('should render correct dom structure', () => {
    const { container } = render(<Input />);
    screen.debug();
    expect(container.innerHTML).toBe(
      `<div data-soui-type="input" class="${SO_PREFIX}-wrapper-0-2-1"><input class="${SO_PREFIX}-input-0-2-12 ${SO_PREFIX}-paddingBox-0-2-2" value=""></div>`,
    );
  });
  test('should clear the value', async () => {
    const { container } = render(<Input clearable />);
    const input = container.querySelector('input');
    fireEvent.change(input as HTMLInputElement, { target: { value: 'value' } });
    await waitFor(() => expect(input?.getAttribute('value')).toBe('value'));
    const clear = container.querySelector(`.${SO_PREFIX}-clear-0-2-14`);
    fireEvent.mouseDown(clear as HTMLInputElement);
    await waitFor(() => {
      expect(input?.getAttribute('value')).toBe('');
    });
  });
  test('should set size', () => {
    const style: React.CSSProperties = { width: 12, marginInlineEnd: 12 };
    const InputSize: React.FC<any> = () => (
      <div>
        <Input size='small' style={style} placeholder='small size' />
        <Input style={style} placeholder='default size' />
        <Input size='large' style={style} placeholder='large size' />
      </div>
    );
    const { container } = render(<InputSize />);
    container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-1`).forEach((input: Element) => {
      const size = (input?.firstChild as HTMLElement)?.getAttribute('placeholder')?.split(' ')[0];
      if (size === 'default') return;
      expect(
        input.classList.contains(
          `${SO_PREFIX}-wrapper${size?.charAt(0).toUpperCase()}${size?.slice(1)}-0-2-${
            size === 'small' ? 3 : 4
          }`,
        ),
      ).toBeTruthy();
    });
  });
});
describe('input number', () => {
  const testInputValue = (expectedValue: string, inputMain: HTMLInputElement | null) => {
    expect(inputMain?.getAttribute('value')).toBe(expectedValue);
  };
  const getFromRender = (component: ReactElement) => {
    const { container } = render(component);
    const preDigits = (
      container.querySelector(`.${SO_PREFIX}-wrapper-0-2-1`)?.firstChild as HTMLElement
    )
      ?.getAttribute('placeholder')
      ?.split(' ')[1];
    const digits: number | string = preDigits ? Number(preDigits) : 'undefined';
    const inputMain = container.querySelector('input');
    return { digits, inputMain };
  };
  test('should only input number default', () => {
    const inputValue = '2424.2424';
    const { digits, inputMain } = getFromRender(
      <Input type='number' placeholder='digits undefined' />,
    );
    if (inputMain !== null) {
      fireEvent.change(inputMain, { target: { value: inputValue } });
    }
    if (digits === 'undefined') {
      testInputValue(inputValue, inputMain);
    }
  });
  test('should only input number others', () => {
    const valueMap = ['2424', '2424.2', '2424.24', '2424.242'];
    const inputs = [
      <Input digits={0} type='number' placeholder='digits 0' key={0} />,
      <Input digits={1} type='number' placeholder='digits 1' key={1} />,
      <Input digits={2} type='number' placeholder='digits 2' key={2} />,
      <Input digits={3} type='number' placeholder='digits 3' key={3} />,
    ];
    inputs.forEach((input) => {
      const { digits, inputMain } = getFromRender(input);
      if (inputMain !== null && typeof digits === 'number') {
        fireEvent.change(inputMain, { target: { value: valueMap[digits] } });
      }
      testInputValue(valueMap[digits as number], inputMain);
    });
  });
  test('should number of integer restricted by integerLimit', () => {
    const valueMap = ['12.34', '123.4', '1234'];
    valueMap.forEach((v, i) => {
      const integerLimit = i + 1;
      const { container } = render(<Input type='number' integerLimit={integerLimit} />);
      const input = container.querySelector('input');
      if (input !== null) {
        fireEvent.change(input, { target: { value: v } });
        fireEvent.blur(input);
      }
      const result =
        v.indexOf('.') >= 0
          ? `${v.split('.')[0].substring(0, integerLimit)}`
          : v.substring(0, integerLimit);
      expect(input?.getAttribute('value')).toBe(result);
    });
  });
  test('should render correct with numType props', () => {
    const inputValue = '-123.4';
    const valueMap = ['-123.4', '123.4', '123.4'];
    const inputs = [
      <Input type='number' placeholder='digits undefined' key={0} />,
      <Input numType='positive' type='number' placeholder='digits 0' key={1} />,
      <Input numType='non-negative' type='number' placeholder='digits 0' key={2} />,
    ];
    inputs.forEach(async (input, index) => {
      const { container } = render(input);
      const inputMain = container.querySelector('input');
      if (inputMain === null) return;
      for (let i = 0; i < inputValue.length; i++) {
        const originalVal = inputMain?.getAttribute('value');
        fireEvent.change(inputMain, { target: { value: originalVal + inputValue[i] } });
      }
      expect(inputMain?.getAttribute('value')).toBe(valueMap[index]);
    });
  });
  test('should 0 is not allowed when numType is positive', () => {
    const expectValue = ['123.4', '123.4', '', ''];
    const inputValue = ['123.4', '-123.4', '0', '0.'];
    inputValue.forEach((input, index) => {
      const { container } = render(<Input type='number' numType='positive' />);
      const inputMain = container.querySelector('input');
      if (inputMain === null) return;
      for (let i = 0; i < input.length; i++) {
        const originalVal = inputMain?.getAttribute('value');
        fireEvent.change(inputMain, { target: { value: originalVal + input[i] } });
      }
      fireEvent.blur(inputMain);
      expect(inputMain?.getAttribute('value')).toBe(expectValue[index]);
    });
  });
  test('should render correct after blur', () => {
    const expectValue = ['', '', '', '0', '-0', '0.123', '-0.123'];
    const inputValue = ['-', '.', '-.', '00000.', '-00000.', '.123', '-0000.123'];
    inputValue.forEach(async (input, index) => {
      const { container } = render(<Input type='number' />);
      const inputMain = container.querySelector('input');
      if (inputMain === null) return;
      await fireEvent.change(inputMain, { target: { value: inputValue[index] } });
      await fireEvent.blur(inputMain);
      expect(inputMain?.getAttribute('value')).toBe(expectValue[index]);
    });
  });
  test('should fix correct after blur', () => {
    const inputValue = '-123.4';
    const valueMap = ['-123', '-123.40'];
    const inputs = [
      <Input digits={0} autoFix type='number' placeholder='digits 0' key={1} />,
      <Input digits={2} autoFix type='number' placeholder='digits 2' key={2} />,
    ];
    inputs.forEach(async (input, index) => {
      const { container } = render(input);
      const inputMain = container.querySelector('input');
      if (inputMain === null) return;
      await fireEvent.change(inputMain, { target: { value: inputValue } });
      await fireEvent.blur(inputMain);
      expect(inputMain?.getAttribute('value')).toBe(valueMap[index]);
    });
  });
  test('should custom style and className', () => {
    const style = { color: 'blue' };
    const className = 'class-name-test';
    const { container } = render(<Input style={style} className={className} />);
    expect(
      container.querySelector('input')?.classList.contains(`${SO_PREFIX}-input-0-2-12`),
    ).toBeTruthy();
    expect(
      container.querySelector(`.${SO_PREFIX}-wrapper-0-2-1`)?.classList.contains('class-name-test'),
    ).toBeTruthy();
    expect(container.querySelector(`.${SO_PREFIX}-wrapper-0-2-1`)?.getAttribute('style')).toBe(
      'color: blue;',
    );
  });
});
describe('Input.Number', () => {
  test('should have up/down button', () => {
    const { container } = render(<Input.Number width={120} min={23} max={100} digits={0} />);
    const inputMain = container.querySelector(`.${SO_PREFIX}-wrapper-0-2-1`);
    expect(inputMain?.getAttribute('style')).toBe('width: 120px;');
    expect(inputMain?.querySelectorAll('svg').length).toBe(2);
  });
  test('should change value while up/down value click', () => {
    const { container } = render(<Input.Number width={120} min={23} max={100} digits={0} />);
    function getValue() {
      return container.querySelector('input')?.getAttribute('value');
    }
    const inputMain = container.querySelector(`.${SO_PREFIX}-wrapper-0-2-1`);
    // origin is a empty string
    expect(getValue()).toBe('');
    if (inputMain?.querySelectorAll('svg').length === 2) {
      // down the value 10times
      for (let i = 0; i < 10; i++) {
        fireEvent.mouseDown(inputMain?.querySelectorAll('svg')[1]);
      }
    }
    expect(getValue()).toBe('23');
    if (inputMain?.querySelectorAll('svg').length === 2) {
      // up the value 50times
      for (let i = 0; i < 50; i++) {
        fireEvent.mouseDown(inputMain?.querySelectorAll('svg')[0]);
      }
    }
    expect(getValue()).toBe('73');
  });
  test('should set with step', () => {
    const { container } = render(<Input.Number step={10} min={1} max={100} digits={0} />);
    fireEvent.mouseDown(container.querySelectorAll('svg')[0]);
    expect(container.querySelector('input')?.getAttribute('value')).toBe('10');
  });
  test('should max/min work', () => {
    const { container } = render(
      <Input.Number width={120} defaultValue={'50'} min={23} max={100} digits={0} />,
    );
    const input = container.querySelector('input');
    function getValue() {
      return input?.getAttribute('value');
    }
    fireEvent.blur(input as HTMLElement, { target: { value: 400 } });
    expect(getValue()).toBe('100');
    fireEvent.blur(input as HTMLElement, { target: { value: 1 } });
    expect(getValue()).toBe('23');
  });
  test('should change value restricted by integerLimit while up value click', () => {
    const { container } = render(<Input.Number width={120} integerLimit={3} />);
    const input = container.querySelector('input');
    function getValue() {
      return input?.getAttribute('value');
    }
    fireEvent.change(input as HTMLElement, { target: { value: '998' } });
    fireEvent.mouseDown(container.querySelectorAll('svg')[0]);
    expect(getValue()).toBe('999');
    fireEvent.mouseDown(container.querySelectorAll('svg')[0]);
    expect(getValue()).toBe('999');
  });
  test('should value cannot <= 0 when numType is positive while down value click', () => {
    const { container } = render(<Input.Number width={120} numType='positive' />);
    const input = container.querySelector('input');
    fireEvent.change(input as HTMLElement, { target: { value: '1' } });
    fireEvent.mouseDown(container.querySelectorAll('svg')[1]);
    expect(input?.getAttribute('value')).toBe('1');
  });
  test('should value is null when numType is positive and input value is 0', () => {
    const { container } = render(<Input.Number width={120} numType='positive' />);
    const input = container.querySelector('input');
    fireEvent.change(input as HTMLElement, { target: { value: '0' } });
    fireEvent.blur(input as HTMLElement);
    expect(input?.getAttribute('value')).toBe('');
  });
});
describe('Input[Group]', () => {
  test('should render correct dom structure', () => {
    const { container } = render(
      <Input.Group size='small'>
        <Input placeholder='email' />
        .com
      </Input.Group>,
    );
    const selector = [
      `.${SO_PREFIX}-group-0-2-15`,
      `.${SO_PREFIX}-wrapper-0-2-1`,
      `.${SO_PREFIX}-input-0-2-12`,
    ];
    selector.forEach((value) => {
      expect(container.querySelectorAll(value).length).toBe(1);
    });
  });
});
describe('Input[Rule]', () => {
  jest.useRealTimers();
  test('should render error when get error & set popover in Form', async () => {
    const { container } = render(
      <Form.Item label={'哈哈哈'}>
        <Input
          rules={[
            (value, formValue, callback) => {
              if (!value) {
                callback(new Error('必填'));
              }
              callback(true);
            },
          ]}
        />
      </Form.Item>,
    );
    const input = container.querySelector('input') as HTMLElement;
    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.change(input, { target: { value: '' } });
    await waitFor(() =>
      expect(container.querySelector('.form-item-error-0-2-12')?.textContent).toBe('必填'),
    );
  });
  test('should render error when get error & set popover', async () => {
    const { container } = render(
      <Input
        popover
        rules={[
          (value, formValue, callback) => {
            if (!value) {
              callback(new Error('必填'));
            }
            callback(true);
          },
        ]}
      />,
    );
    const input = container.querySelector('input') as HTMLElement;
    fireEvent.change(input, { target: { value: '11' } });
    fireEvent.change(input, { target: { value: '' } });
    await waitFor(() => expect(container.querySelector('span')?.textContent).toBe('必填'));
  });
});
describe('Input[Disabled]', () => {
  test('should have disabled attr', () => {
    const { container } = render(<Input disabled placeholder='disabled input' />);
    expect(container.querySelector('input')?.hasAttribute('disabled')).toBeTruthy();
  });
  test('should have disabled class', () => {
    const { container } = render(<Input disabled placeholder='disabled input' />);
    expect(container.querySelectorAll(`.${SO_PREFIX}-wrapperDisabled-0-2-7`).length).toBe(1);
  });
  test('should through disabled while on group', () => {
    const { container } = render(
      <Input.Group disabled>
        <Input placeholder='first name' />
        <Input placeholder='last name' />
      </Input.Group>,
    );
    container.querySelectorAll('input').forEach((input: Element) => {
      expect(input.hasAttribute('disabled')).toBeTruthy();
    });
  });
});
describe('Input[Password]', () => {
  test('should render text type', () => {
    const { container } = render(<Input.Password placeholder='input password' />);
    expect(container.querySelector('input')?.getAttribute('type')).toBe('text');
  });
  test('should render • default', async () => {
    const { container } = render(<Input.Password placeholder='input password' />);
    const input = container.querySelector('input');
    await fireEvent.change(input as HTMLElement, { target: { value: 'hello' } });
    expect(input?.getAttribute('value')).toBe('*****');
  });
});
describe('Input[innerTitle]', () => {
  test('content will show when focus', () => {
    const { container } = render(<Input.Password innerTitle='please input something' />);
    const input = container.querySelector('input');
    expect(container.querySelectorAll('.inner-title-wrapperOpen-0-2-30').length).toBe(0);
    fireEvent.focus(input as HTMLElement);
    expect(container.querySelectorAll('.inner-title-wrapperOpen-0-2-30').length).toBe(1);
    fireEvent.blur(input as HTMLElement);
    expect(container.querySelectorAll('.inner-title-wrapperOpen-0-2-30').length).toBe(0);
  });
  test('content will show when there is value', async () => {
    const { container } = render(<Input.Password innerTitle='please input something' />);
    const input = container.querySelector('input');
    expect(container.querySelectorAll('.inner-title-wrapperOpen-0-2-30').length).toBe(0);
    await fireEvent.change(input as HTMLElement, { target: { value: 'value' } });
    expect(container.querySelectorAll('.inner-title-wrapperOpen-0-2-30').length).toBe(1);
    await fireEvent.blur(input as HTMLElement);
    expect(container.querySelectorAll('.inner-title-wrapperOpen-0-2-30').length).toBe(1);
  });
});
describe('Input[clearToUndefined]', () => {
  test('should clear value and set as undefined', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <Input
        clearable
        clearToUndefined
        onChange={onChange}
        defaultValue='Hello'
        placeholder='input something'
      />,
    );
    expect(container.querySelector('input')?.value).toBe('Hello');
    fireEvent.mouseDown(container.querySelector('svg') as SVGSVGElement);
    await waitFor(() => expect(onChange).toBeCalled());
    expect(onChange.mock.calls[0][0]).toBe(undefined);
  });
});
describe('Input[coin]', () => {
  test('should set coin when type is number', async () => {
    const { container } = render(<Input coin type='number' />);
    const input = container.querySelector('input');
    fireEvent.change(input as HTMLElement, { target: { value: 1000 } });
    fireEvent.blur(input as HTMLElement);
    expect(input?.value).toBe('1,000');
  });
});
describe('Input[defaultValue]', () => {
  test('should set defaultValue', () => {
    const { container } = render(<Input defaultValue='Hello' />);
    const input = container.querySelector('input');
    expect(input?.value).toBe('Hello');
  });
});
describe('Input[htmlName]', () => {
  test('should set htmlName', () => {
    const htmlName = 'shineout';
    const { container } = render(<Input htmlName={htmlName} />);
    expect(container.querySelector('input')?.name).toBe(htmlName);
  });
});
describe('Input[info]', () => {
  test('should set default info', () => {
    const infoText = '1234567890';
    const info = infoText.length;
    const { container } = render(<Input info={info} defaultValue={infoText} />);
    expect(container.querySelectorAll(`.${SO_PREFIX}-info-0-2-25`).length).toBe(1);
    expect(container.querySelector(`.${SO_PREFIX}-info-0-2-25`)?.textContent).toBe(
      `${infoText.length} / ${info}`,
    );
  });
  test('should set default info error', () => {
    const infoText = '1234567890';
    const info = infoText.length - 1;
    const { container } = render(<Input info={info} defaultValue={infoText} />);
    expect(container.querySelectorAll(`.${SO_PREFIX}-infoError-0-2-26`).length).toBe(1);
    expect(container.querySelector(`.${SO_PREFIX}-infoError-0-2-26`)?.textContent).toBe(
      `${infoText.length} / ${info}`,
    );
  });

  // test('should set custom info', () => {
  //   const infoText = 'shineout'
  //   const info = () => <div>{infoText}</div>
  //   const { container } = render(<Input info={info} />)
  //   expect(container.querySelectorAll(`.${SO_PREFIX}-input-tip`).length).toBe(1)
  //   expect(container.querySelector(`.${SO_PREFIX}-input-tip > div`).textContent).toBe(infoText)
  // })
});
describe('Input[onBlur]', () => {
  test('should trigger onBlur', () => {
    const onBlur = jest.fn();
    const { container } = render(<Input onBlur={onBlur} />);
    const input = container.querySelector('input');
    fireEvent.focus(input as HTMLElement);
    fireEvent.blur(input as HTMLElement);
    expect(onBlur).toBeCalled();
  });
});
describe('Input[onChange]', () => {
  test('should trigger onChange', () => {
    const value = 'shineout';
    const onChange = jest.fn();
    const { container } = render(<Input onChange={onChange} />);
    fireEvent.change(container.querySelector('input') as HTMLElement, { target: { value } });
    expect(onChange).toBeCalled();
    expect(onChange.mock.calls[0][0]).toBe(value);
  });
});
describe('Input[onEnterPress]', () => {
  test('should onEnterPress', () => {
    const onEnterPress = jest.fn();
    const { container } = render(<Input onEnterPress={onEnterPress} />);
    const input = container.querySelector('input') as HTMLElement;
    fireEvent.keyDown(input, { keyCode: 13, target: { value: '1' } });
    fireEvent.keyUp(input, { keyCode: 13, target: { value: '1' } });
    expect(onEnterPress).toBeCalled();
  });
});
describe('Input[onKeyDown]', () => {
  test('should onKeyDown', () => {
    const onKeyDown = jest.fn();
    const { container } = render(<Input onKeyDown={onKeyDown} />);
    fireEvent.keyDown(container.querySelector('input') as HTMLElement);
    expect(onKeyDown).toBeCalled();
  });
});
describe('Input[onKeyUp]', () => {
  test('should onKeyUp', () => {
    const onKeyUp = jest.fn();
    const { container } = render(<Input onKeyUp={onKeyUp} />);
    fireEvent.keyUp(container.querySelector('input') as HTMLElement);
    expect(onKeyUp).toBeCalled();
  });
});
// describe('Input[popover]', () => {
//   test('should set the position of popover', () => {
//       const { container } = render(<Input placeholder="email" tip="popover" popover />)
//       // expect(container.querySelectorAll(`.${SO_PREFIX}-input-tip`).length).toBe(0)
//       // const input = container.querySelector('input') as HTMLElement
//       // fireEvent.focus(input)
//       // fireEvent.blur(input)
//       // setTimeout(() => {
//       //   expect(container.querySelectorAll(`.${SO_PREFIX}-popover-${i}`).length).toBe(1)
//       // })
//   })
// })
describe('Input[trim]', () => {
  test('should set trim', async () => {
    const { container } = render(<Input trim />);
    const input = container.querySelector('input') as HTMLElement;
    fireEvent.change(input, { target: { value: 'shineout  ' } });
    fireEvent.blur(input);
    expect(input?.getAttribute('value')).toBe('shineout');
  });
});
describe('Input[type]', () => {
  test('should set type', () => {
    const type = ['text', 'password'];
    type.forEach((i) => {
      const { container } = render(<Input type={i} />);
      const input = container.querySelector('input') as HTMLElement;
      expect(input?.getAttribute('type')).toBe(i);
    });
  });
  test('should set type number', () => {
    const { container } = render(<Input type='number' />);
    const input = container.querySelector('input') as HTMLElement;
    expect(input?.getAttribute('type')).toBe('text');
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(input?.getAttribute('value')).toBe('');
    fireEvent.change(input, { target: { value: '123' } });
    expect(input?.getAttribute('value')).toBe('123');
  });
});
describe('Input[underline]', () => {
  test('should set underline', () => {
    const { container } = render(<Input underline />);
    expect(
      container
        .querySelector(`.${SO_PREFIX}-wrapper-0-2-1`)
        ?.classList.contains(`${SO_PREFIX}-wrapperUnderline-0-2-8`),
    ).toBeTruthy();
  });
});
describe('Input.Number[allowNull]', () => {
  test('should set allowNull', async () => {
    const { container } = render(<Input.Number allowNull />);
    const input = container.querySelector('input') as HTMLElement;
    fireEvent.focus(input);
    fireEvent.blur(input);
    await waitFor(() => expect(container.querySelector('input')?.value).toBe(''));
  });
});
// describe('Input.Number[coin]', () => {
//   test('should set coin', () => {
//     const { container } = render(<Input.Number />)
//     const input = container.querySelector('input') as HTMLElement
//     fireEvent.change(input, { target: { value: 1000 } })
//     fireEvent.blur(input as HTMLElement);
//     expect(container.querySelector('input')?.value).toBe('1,000')
//   })
// })
// describe('Input.Number[hideArrow]', () => {
//   test('should set hideArrow', () => {
//     const { container } = render(<Input.Number hideArrow />)
//     expect(container.querySelectorAll(`.${SO_PREFIX}-input-number-up`).length).toBe(0)
//     expect(container.querySelectorAll(`.${SO_PREFIX}-input-number-down`).length).toBe(0)
//   })
// })
describe('Input.Number[max/min]', () => {
  test('should set max/min', () => {
    const min = 100;
    const max = 200;
    const { container } = render(<Input.Number min={min} max={max} />);
    const input = container.querySelector('input') as HTMLElement;
    fireEvent.change(input, {
      target: {
        value: String(min - 1),
      },
    });
    fireEvent.blur(input);
    expect(container.querySelector('input')?.value).toBe(String(min));

    fireEvent.change(input, {
      target: {
        value: String(max + 1),
      },
    });
    fireEvent.blur(input);
    expect(container.querySelector('input')?.value).toBe(String(max));
  });
});

describe('Input.Password[point]', () => {
  test('should set point', () => {
    const point = '*';
    const password = '123456';
    const result = Array.from({ length: password.length })
      .map(() => point)
      .reduce((a, b) => a + b);

    const { container } = render(<Input.Password point={point} />);
    fireEvent.change(container.querySelector('input') as HTMLElement, {
      target: {
        value: password,
      },
    });
    expect(container.querySelector('input')?.value).toBe(result);
  });
});
describe('Input.Number[digits]', () => {
  test('should set Input.Number digits', () => {
    const digits = 2;
    const value = '1.234';
    const { container } = render(<Input.Number digits={digits} />);
    fireEvent.change(container.querySelector('input') as HTMLElement, {
      target: {
        value,
      },
    });
    expect(container.querySelector('input')?.value).toBe(Number(value).toFixed(digits));
  });

  test('should set Input.Number digits when numType is non-negative', () => {
    const digits = 2;
    const value = '1.234';
    const { container } = render(
      <Input.Number digits={digits} defaultValue='1' numType='non-negative' />,
    );
    fireEvent.change(container.querySelector('input') as HTMLElement, {
      target: {
        value,
      },
    });
    fireEvent.blur(container.querySelector('input') as HTMLElement);
    expect(container.querySelector('input')?.value).toBe(Number(value).toFixed(digits));
  });
});
describe('Input.Number[onKeyDown]', () => {
  test('onKeyDown should be simulated when keyCode equal 38 or 40', () => {
    const onKeyDown = jest.fn();
    const defaultValue = '2';
    const { container } = render(
      <Input.Number defaultValue={defaultValue} onKeyDown={onKeyDown} />,
    );
    const input = container.querySelector('input') as HTMLElement;
    fireEvent.keyDown(input, { keyCode: 38 });
    fireEvent.keyUp(input, { keyCode: 38 });
    expect(container.querySelector('input')?.value).toBe(String(Number(defaultValue) + 1));
  });

  test('onKeyDown should be simulated when keyCode equal 40', () => {
    const defaultValue = '2';
    const { container } = render(<Input.Number defaultValue={defaultValue} />);
    const input = container.querySelector('input') as HTMLElement;
    fireEvent.keyDown(input, { keyCode: 40 });
    fireEvent.keyUp(input, { keyCode: 40 });
    expect(container.querySelector('input')?.value).toBe(String(Number(defaultValue) - 1));
  });
});
describe('Input.Number[clearToUndefined]', () => {
  test('should clear value and set as undefined', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <Input.Number
        clearable
        clearToUndefined
        onChange={onChange}
        defaultValue={'NaN'}
        placeholder='input something'
      />,
    );
    fireEvent.mouseDown(container.querySelectorAll('svg')[0]);
    fireEvent.blur(container.querySelector('input') as HTMLElement);
    await waitFor(() => expect(onChange).toBeCalled());
    await waitFor(() => expect(onChange.mock.calls[0][0]).toBe(undefined));
  });
});
describe('Input.Number[unMount]', () => {
  test('should unMount', () => {
    const Component: React.FC = () => {
      const [show, setShow] = useState(true);
      return (
        <>
          {show && <Input.Number />}
          <div
            onClick={() => {
              setShow(false);
            }}
          >
            close
          </div>
        </>
      );
    };
    const { container } = render(<Component />);
    expect(container.querySelectorAll('input').length).toBe(1);
    fireEvent.click(screen.getByText('close'));
    expect(container.querySelectorAll('input').length).toBe(0);
  });
});
describe('Input.Number[step]', () => {
  test('should set step', async () => {
    const step = 10;
    const { container } = render(<Input.Number step={step} />);
    fireEvent.click(container.querySelectorAll('svg')[1]);
    setTimeout(() => {
      expect(container.querySelector('input')?.value).toBe(String(step));
    });
  });
});
describe('Input[no border]', () => {
  test('no border style', () => {
    const { container } = render(<Input placeholder='input something' border={false} />);
    expect(
      container
        .querySelector(`.${SO_PREFIX}-wrapper-0-2-1`)
        ?.classList.contains(`${SO_PREFIX}-wrapperNoBorder-0-2-9`),
    ).toBeTruthy();
  });
});
describe('Input[autoselect]', () => {
  test('render when autoselect', () => {
    const { container } = render(
      <Input defaultValue={'hello world'} placeholder='input something' autoSelect />,
    );
    expect(
      container
        .querySelector(`.${SO_PREFIX}-wrapper-0-2-1`)
        ?.classList.contains(`${SO_PREFIX}-wrapperFocus-0-2-5`),
    ).toBeFalsy();
    fireEvent.focus(container.querySelector('input') as HTMLInputElement);
    expect(
      container
        .querySelector(`.${SO_PREFIX}-wrapper-0-2-1`)
        ?.classList.contains(`${SO_PREFIX}-wrapperFocus-0-2-5`),
    ).toBeTruthy();
  });
});
