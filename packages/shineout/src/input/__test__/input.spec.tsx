import React, { ReactElement, useState } from 'react';
import { render, fireEvent, screen, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from '..';
import { Form } from 'shineout';
import { attributesTest, classTest, createClassName, delay, styleTest, textContentTest, displayTest, snapshotTest } from '../../tests/utils';
import { classLengthTest } from '../../tests/structureTest';
import InputBase from '../__example__/01-base'
import InputSize from '../__example__/02-size'
import InputNumber from '../__example__/03-number-0'
import InputNumberOther from '../__example__/03-number-1'
import InputGroup from '../__example__/04-01-group'
import InputTip from '../__example__/05-01-tip'
import InputValidate from '../__example__/06-validate'
import InputDisabled from '../__example__/07-disabled'
import InputPassword from '../__example__/08-password'
import InputInnerTitle from '../__example__/09-inner-title'
import InputUnderline from '../__example__/10-underline'
import InputAutoSelect from '../__example__/11-autoselect'
import InputTrim from '../__example__/12-trim'
import InputEnter from '../__example__/13-enter'
import InputLimit from '../__example__/14-limit'


const SO_PREFIX = 'input';
const originClasses = ['wrapper', 'content', 'input', 'clearWrapper', 'clear', 'group', 'info', 'numberStep', 'passwordToggle']
const originItemClasses = ['wrapperInnerTitleTop', 'wrapperInnerTitleBottom', 'wrapperPaddingBox', 'wrapperSmall', 'wrapperLarge', 'groupSmall', 'groupLarge', 'wrapperDisabled', 'infoError', 'wrapperUnderline', 'wrapperNoBorder', 'wrapperFocus']
const { wrapper, content, input, wrapperInnerTitleTop, wrapperInnerTitleBottom, wrapperPaddingBox, clearWrapper, clear, wrapperSmall, wrapperLarge, group, groupSmall, groupLarge, wrapperDisabled, info: infoWrapper, infoError, wrapperUnderline, numberStep, wrapperNoBorder, wrapperFocus, passwordToggle } = createClassName(SO_PREFIX, originClasses, originItemClasses);

const itemError = '.soui-form-item-error'

const {
  wrapper: popoverWrapper,
  content: popoverContent
} = createClassName('popover', ['wrapper', 'content'], [''])

const titleWrapper = '.soui-inner-title-wrapper'
const titleTitle = '.soui-inner-title-title'
const titlePlace = '.soui-inner-title-place'
const titleContent = '.soui-inner-title-content'
const titleTop = 'soui-inner-title-top'
const titleWrapperOpen = 'soui-inner-title-wrapper-open'
const titleAnimation = 'soui-inner-title-animation'


beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.runAllTimers();
});
afterEach(cleanup);

describe('Input[Base]', () => {
  displayTest(Input, 'ShineoutInput');
  displayTest(Input.Group, 'ShineoutInputGroup');
  displayTest(Input.Password, 'ShineoutInputPassword');
  displayTest(Input.Number, 'ShineoutInputNumber');
  snapshotTest(<InputBase />)
  snapshotTest(<InputSize />, 'about size')
  snapshotTest(<InputNumber />, 'about number')
  snapshotTest(<InputNumberOther />, 'about number')
  snapshotTest(<InputGroup />, 'about group')
  snapshotTest(<InputTip />, 'about tip')
  snapshotTest(<InputValidate />, 'about validate')
  snapshotTest(<InputDisabled />, 'about disabled')
  snapshotTest(<InputPassword />, 'about password')
  snapshotTest(<InputInnerTitle />, 'about innerTitle')
  snapshotTest(<InputUnderline />, 'about underline')
  snapshotTest(<InputAutoSelect />, 'about autoSelect')
  snapshotTest(<InputTrim />, 'about trim')
  snapshotTest(<InputEnter />, 'about enter')
  snapshotTest(<InputLimit />, 'about limit')

  test('should render default', () => {
    const inputValue = 'hello'
    const { container } = render(<Input />);
    const inputWrapper = container.querySelector(wrapper)!
    attributesTest(inputWrapper, 'data-soui-input-border', 'true')
    const inputContent = inputWrapper.querySelector(content)!
    classTest(inputContent, wrapperInnerTitleTop)
    classTest(inputContent, wrapperInnerTitleBottom)
    classTest(inputContent, wrapperPaddingBox)
    const inputMain = inputContent.querySelector('input')!
    expect(inputMain).toBeInTheDocument()
    attributesTest(inputMain, 'value', '')
    fireEvent.change(inputMain, { target: { value: inputValue } })
    attributesTest(inputMain, 'value', inputValue)
  });

  test('should clear the value', async () => {
    const { container } = render(<Input clearable />);
    const input = container.querySelector('input');
    fireEvent.change(input as HTMLInputElement, { target: { value: 'value' } });
    await waitFor(() => expect(input?.getAttribute('value')).toBe('value'));
    const inputClear = container.querySelector(clearWrapper);
    fireEvent.mouseDown(inputClear?.querySelector(clear)!);
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

    container.querySelectorAll(wrapper).forEach((input: Element) => {
      const size = (input?.querySelector('input') as HTMLElement)?.getAttribute('placeholder')?.split(' ')[0];
      if (size === 'default') return;
      if (size === 'small') {
        classTest(input, wrapperSmall)
        return
      }
      if (size === 'large') {
        classTest(input, wrapperLarge)
        return
      }
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
      container.querySelector(wrapper)?.querySelector('input') as HTMLElement
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
          ? `${v.split('.')[0].substring(0, integerLimit)}.${v.split('.')[1]}`
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
    const inputWrapper = container.querySelector(wrapper)!;
    classTest(inputWrapper, className);
    styleTest(inputWrapper, 'color: blue;');
  });
});
describe('Input.Number', () => {
  test('should have up/down button', () => {
    const width = 120
    const { container } = render(<Input.Number width={width} min={23} max={100} digits={0} />);
    const inputMain = container.querySelector(wrapper)!;
    styleTest(inputMain, `width: ${width}px;`)
    expect(inputMain?.querySelectorAll('svg').length).toBe(2);
  });

  test('should change value while up/down value click', () => {
    const { container } = render(<Input.Number width={120} min={23} max={100} digits={0} />);
    function getValue() {
      return container.querySelector('input')?.getAttribute('value');
    }
    const inputMain = container.querySelector(wrapper);
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
      <Input.Group>
        <Input placeholder='email' />
        .com
      </Input.Group>,
    );
    const inputGroup = container.querySelector(group)!;
    attributesTest(inputGroup, 'data-soui-role', 'input-group')
    classLengthTest(inputGroup, wrapper, 1)
    textContentTest(inputGroup.querySelector('span')!, '.com')
  });
  test('should render when set different size', () => {
    const { container } = render(
      <>
        <Input.Group size='small'></Input.Group>
        <Input.Group size='large'></Input.Group>
      </>
    )

    const inputGroups = container.querySelectorAll(group)
    classTest(inputGroups[0], groupSmall)
    classTest(inputGroups[1], groupLarge)
  })
  test('should render when set child size and group size', () => {
    const { container } = render(
      <Input.Group size='small'>
        <Input size='large' />
      </Input.Group>
    )
    classTest(container.querySelector(wrapper)!, wrapperLarge)
  })
});
describe('Input[Rule]', () => {
  jest.useRealTimers();
  const errorText = '必填';
  test('should render error when get error & set popover in Form', async () => {
    const { container } = render(
      <Form.Item label={'哈哈哈'}>
        <Input
          rules={[
            // @ts-ignore
            (value, formValue, callback) => {
              if (!value) {
                callback(new Error(errorText));
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
    await waitFor(async () =>
      await delay(200)
    );
    textContentTest(container.querySelector(itemError)!, errorText)
  });
  test('should render error when get error & set popover without Form', async () => {
    const { container } = render(
      <Input
        popover
        rules={[
          // @ts-ignore
          (value, formValue, callback) => {
            if (!value) {
              callback(new Error(errorText));
            }
            callback(true);
          },
        ]}
      />,
    );
    const input = container.querySelector('input') as HTMLElement;
    fireEvent.change(input, { target: { value: '11' } });
    fireEvent.change(input, { target: { value: '' } });
    await waitFor(async () => {
      await delay(200)
    })
    textContentTest(container.querySelector(popoverWrapper)?.querySelector(popoverContent)!, errorText)
  });
});
describe('Input[Disabled]', () => {
  test('should have disabled attr', () => {
    const { container } = render(<Input disabled placeholder='disabled input' />);
    expect(container.querySelector('input')?.hasAttribute('disabled')).toBeTruthy();
  });
  test('should have disabled class', () => {
    const { container } = render(<Input disabled placeholder='disabled input' />);
    classTest(container.querySelector(wrapper)!, wrapperDisabled)
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
    expect(input?.getAttribute('value')).toBe('•••••');
  });
  test('should render when set visibilityToggle', async () => {
    const text = 'hello';
    const { container } = render(<Input.Password visibilityToggle />);
    const input = container.querySelector('input')!;
    await fireEvent.change(input as HTMLElement, { target: { value: text } });
    attributesTest(input, 'value', '•••••')
    const passwordToggleWrapper = container.querySelector(passwordToggle)!;
    fireEvent.click(passwordToggleWrapper);
    attributesTest(input, 'value', text)
    fireEvent.click(passwordToggleWrapper);
    attributesTest(input, 'value', '•••••')
    fireEvent.mouseDown(passwordToggleWrapper);
  })
});
describe('Input[innerTitle]', () => {
  test('content will show when focus', () => {
    const text = 'please input something';
    const { container } = render(<Input.Password innerTitle={text} />);
    const inputInnerTitle = container.querySelector(titleWrapper)!;

    const childInnerTitle = inputInnerTitle.querySelector(titleTitle)!;

    classTest(childInnerTitle, titleTop)
    textContentTest(childInnerTitle, text)
    const innerTitlePlace = inputInnerTitle.querySelector(titlePlace)!;
    textContentTest(innerTitlePlace.querySelector(titleTitle)!, text)
    const innerTitleContent = inputInnerTitle.querySelector(titleContent)!;
    const input = innerTitleContent.querySelector('input');

    classTest(inputInnerTitle, titleWrapperOpen, false)
    fireEvent.focus(input as HTMLElement);

    classTest(inputInnerTitle, titleWrapperOpen)
    classTest(inputInnerTitle, titleAnimation)
    fireEvent.blur(input as HTMLElement);

    classTest(inputInnerTitle, titleWrapperOpen, false)
  });
  test('content will show when there is value', async () => {
    const { container } = render(<Input.Password innerTitle='please input something' />);
    const inputInnerTitle = container.querySelector(titleWrapper)!;
    const input = container.querySelector('input');
    classTest(inputInnerTitle, titleWrapperOpen, false)
    await fireEvent.change(input as HTMLElement, { target: { value: 'value' } });
    classTest(inputInnerTitle, titleWrapperOpen)
    await fireEvent.blur(input as HTMLElement);
    classTest(inputInnerTitle, titleWrapperOpen)
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
  test('should set default info', async () => {
    const infoText = '1234567890';
    const info = infoText.length;
    const { container } = render(<Input info={info} />);
    const input = container.querySelector('input')!
    fireEvent.click(input)
    fireEvent.change(input, { target: { value: infoText } })
    await waitFor(async () => {
      await delay(200)
    })

    textContentTest(container.querySelector(infoWrapper)!, `${infoText.length} / ${info}`)
  });
  test('should set default info error', () => {
    const infoText = '1234567890';
    const info = infoText.length - 1;
    const { container } = render(<Input info={info} defaultValue={infoText} />);
    const inputInfoWrapper = container.querySelector('[data-soui-type="error"]')!
    textContentTest(inputInfoWrapper, `${infoText.length} / ${info}`)
  });

  test('should set custom info', async () => {
    const infoText = 'error'
    const info = () => infoText
    const { container } = render(<Input info={info} />)
    const input = container.querySelector('input')!
    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'shineout' } })
    await waitFor(async () => {
      await delay(200)
    })

    textContentTest(container.querySelector(infoWrapper)!, infoText)
  })
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
    classTest(container.querySelector(wrapper)!, wrapperUnderline)
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
describe('Input.Number[hideArrow]', () => {
  test('should set hideArrow', async () => {
    const { container, rerender } = render(<Input.Number />)
    classLengthTest(container.querySelector(numberStep)!, 'svg', 2)
    rerender(<Input.Number hideArrow />)
    await waitFor(() => expect(container.querySelector(numberStep)).not.toBeInTheDocument())
  })
})
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
    fireEvent.mouseDown(container.querySelectorAll('svg')[0]);
    await waitFor(async () => {
      await delay(200)
    })
    expect(container.querySelector('input')?.value).toBe(String(step));
  });
});
describe('Input[no border]', () => {
  test('no border style', () => {
    const { container } = render(<Input placeholder='input something' border={false} />);
    classTest(container.querySelector(wrapper)!, wrapperNoBorder)
  });
});
describe('Input[autoselect]', () => {
  test('render when autoselect', () => {
    const { container } = render(
      <Input defaultValue={'hello world'} placeholder='input something' autoSelect />,
    );

    classTest(container.querySelector(wrapper)!, wrapperFocus, false)
    fireEvent.focus(container.querySelector('input') as HTMLInputElement);
    classTest(container.querySelector(wrapper)!, wrapperFocus)
  });
});
