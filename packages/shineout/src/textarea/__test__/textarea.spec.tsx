import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import React from 'react';
import Textarea from '..';
import { Form } from 'shineout';
import mountTest from '../../tests/mountTest';
import TextareaBase from '../__example__/s-001-base';
import TextareaAutosize from '../__example__/s-003-autosize';
import TextareaInfoFunction from '../__example__/s-005-custom';

const SO_PREFIX = 'textarea';
afterEach(cleanup);
describe('Textarea[Base]', () => {
  mountTest(Textarea);

  test('should render correctly', () => {
    const { container } = render(<Textarea className='customized' />);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render textarea element', () => {
    const { container } = render(<TextareaBase />);
    expect(
      container
        .querySelector(`.${SO_PREFIX}-wrapper-0-2-1`)
        ?.classList.contains(`${SO_PREFIX}-wrapperFocus-0-2-5`),
    ).toBeTruthy();
    expect(container.querySelectorAll('textarea').length).toBe(1);
  });
  test('should render default value', () => {
    const value = 'test';
    const { container } = render(<Textarea rows={6} defaultValue={value} />);
    const textarea = container.querySelector('textarea');
    expect(textarea?.textContent).toBe(value);
    expect(textarea?.getAttribute('rows')).toBe('6');
  });
  test('should render value', () => {
    const value = 'test';
    const { container } = render(<Textarea rows={6} value={value} />);
    const textarea = container.querySelector('textarea');
    expect(textarea?.textContent).toBe(value);
    expect(textarea?.getAttribute('rows')).toBe('6');
  });
  test('should render value when set value and defaultValue', () => {
    const value = 'test';
    const defaultValue = 'demo';
    const { container } = render(<Textarea defaultValue={defaultValue} value={value} />);
    const textarea = container.querySelector('textarea');
    expect(textarea?.textContent).toBe(value);
  });
  test('should render when set width', () => {
    const value = 'test';
    const { container } = render(<Textarea value={value} width={300} />);
    expect(container.querySelector(`.${SO_PREFIX}-wrapper-0-2-1`)?.getAttribute('style')).toBe(
      'width: 300px;',
    );
  });
  test('should call onChange', () => {
    jest.useFakeTimers();
    const changeFn = jest.fn();
    const { container } = render(<Textarea onChange={changeFn} />);
    fireEvent.change(container.querySelector('textarea') as HTMLTextAreaElement, {
      target: { value: 'test' },
    });
    jest.runAllTimers();
    expect(changeFn.mock.calls[0][0]).toBe('test');
    expect(changeFn).toBeCalled();
  });
  test('should render when set style', () => {
    const style: React.CSSProperties = { width: 120, marginInlineEnd: 12 };
    const { container } = render(<Textarea size='small' style={style} placeholder='small size' />);
    expect(container.querySelector(`.${SO_PREFIX}-wrapper-0-2-1`)?.getAttribute('style')).toBe(
      'width: 120px; margin-inline-end: 12px;',
    );
  });
});
describe('Textarea[Size]', () => {
  test('should render small size', () => {
    const { container } = render(<Textarea size='small' placeholder='small size' />);
    expect(
      container
        .querySelector(`.${SO_PREFIX}-wrapper-0-2-1`)
        ?.classList.contains(`${SO_PREFIX}-wrapperSmall-0-2-3`),
    ).toBeTruthy();
  });
});
describe('Textarea[Autosize]', () => {
  test('should render double textarea to autosize', () => {
    const { container } = render(<TextareaAutosize />);
    const textareas = container.querySelectorAll('textarea');
    expect(textareas.length).toBe(2);
    expect(textareas[1].classList.contains(`${SO_PREFIX}-shadow-0-2-15`)).toBeTruthy();
    expect(textareas[0].getAttribute('style')).toBe(
      'overflow: auto; max-height: 150px; height: 0px;',
    );
    fireEvent.change(textareas[0] as HTMLTextAreaElement, {
      target: { value: 'test' },
    });
    textareas.forEach((textarea) => {
      expect(textarea.textContent).toBe('test');
    });
  });
  test('should render with maxHeight', () => {
    const maxHeight = 200;
    const { container } = render(
      <Textarea autosize placeholder='input something' maxHeight={maxHeight} />,
    );
    expect(
      container
        .querySelectorAll('textarea')[0]
        .getAttribute('style')
        ?.split(';')
        .map((e) => e.trim())
        .includes(`max-height: ${maxHeight}px`),
    ).toBeTruthy();
  });
});
describe('Textarea[Info:function]', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.runAllTimers();
  });
  test('should render tip', () => {
    const { container } = render(<TextareaInfoFunction />);
    fireEvent.change(container.querySelector('textarea') as HTMLTextAreaElement, {
      target: { value: 'test' },
    });
    expect(container.querySelectorAll(`.${SO_PREFIX}-info-0-2-13`).length).toBe(1);
  });
  test('should render tip we want', () => {
    const { container } = render(<TextareaInfoFunction />);
    fireEvent.change(container.querySelector('textarea') as HTMLTextAreaElement, {
      target: { value: 'test' },
    });
    expect(container.querySelector(`.${SO_PREFIX}-info-0-2-13`)?.textContent).toBe('total is  4');
    fireEvent.change(container.querySelector('textarea') as HTMLTextAreaElement, {
      target: { value: 'testtesttesttesttesttest' },
    });
    expect(
      container
        .querySelector(`.${SO_PREFIX}-info-0-2-13`)
        ?.classList.contains(`${SO_PREFIX}-infoError-0-2-14`),
    ).toBeTruthy();
  });
});
describe('Textarea[Info:number]', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.runAllTimers();
  });
  test('should render when not set value', () => {
    const { container } = render(<Textarea info={20} />);
    expect(
      container.querySelectorAll(`.${SO_PREFIX}-info-0-2-13`).length ||
        container.querySelectorAll(`.${SO_PREFIX}-infoError-0-2-14`).length,
    ).toBe(0);
  });
  test('should render tip', () => {
    const { container } = render(<Textarea info={20} />);
    fireEvent.change(container.querySelector('textarea') as HTMLTextAreaElement, {
      target: { value: 'test' },
    });
    expect(container.querySelector(`.${SO_PREFIX}-info-0-2-13`)?.textContent).toBe('4 / 20');
  });
  test('should render error', () => {
    const { container } = render(<Textarea info={20} />);
    fireEvent.change(container.querySelector('textarea') as HTMLTextAreaElement, {
      target: { value: '1234456789012345678901' },
    });
    expect(container.querySelector(`.${SO_PREFIX}-infoError-0-2-14`)?.textContent).toBe('22 / 20');
  });
});
describe('Textarea[Trim]', () => {
  test('Textarea trim result', () => {
    jest.useFakeTimers();
    const changeFn = jest.fn();
    const { container } = render(<Textarea onChange={changeFn} trim />);
    fireEvent.blur(container.querySelector('textarea') as HTMLTextAreaElement, {
      target: { value: '   test    ' },
    });
    jest.runAllTimers();
    expect(changeFn.mock.calls[0][0].length).toBe(4);
  });
});
describe('Textarea[Disabled]', () => {
  test('Textarea disbled result', () => {
    const handleFn = jest.fn();
    const { container } = render(<Textarea defaultValue='default' disabled onChange={handleFn} />);
    expect(container.querySelector('textarea')?.getAttribute('disabled')).toBe('');
    fireEvent.focus(container.querySelector('textarea') as HTMLTextAreaElement, {
      target: { value: 'test' },
    });
    expect(container.querySelector('textarea')?.textContent).toBe('default');
    expect(handleFn.mock.calls.length).toBe(0);
  });
});
describe('Textarea[Form Disabled]', () => {
  test('should use form disabled status first', () => {
    const handleFn = jest.fn();
    const { container } = render(
      <Form disabled>
        <Textarea disabled={false} onChange={handleFn} />
      </Form>,
    );
    expect(container.querySelector('form')?.hasAttribute('disabled')).toBeTruthy();
    fireEvent.focus(container.querySelector('textarea') as HTMLTextAreaElement, {
      target: { value: 'test' },
    });
    expect(handleFn.mock.calls.length).toBe(0);
  });
});
describe('Textarea[onBlur onChange on delay]', () => {
  test('should trigger events', () => {
    const changeHandler = jest.fn();
    const blurHandler = jest.fn();
    const { container } = render(
      <Textarea defaultValue='default' onChange={changeHandler} onBlur={blurHandler} />,
    );
    fireEvent.change(container.querySelector('textarea') as HTMLTextAreaElement, {
      target: { value: 'aaa' },
    });
    expect(changeHandler.mock.calls.length).toBe(1);
    expect(changeHandler.mock.calls[0][0]).toBe('aaa');
    fireEvent.blur(container.querySelector('textarea') as HTMLTextAreaElement, {
      target: { value: 'aaa' },
    });
    expect(blurHandler.mock.calls.length).toBe(1);
  });
});
describe('Textarea[onEnterPress]', () => {
  test('should trigger events', () => {
    const onEnterPress = jest.fn();
    const { container } = render(
      <Textarea defaultValue='default' onEnterPress={onEnterPress} onBlur={onEnterPress} />,
    );
    fireEvent.keyUp(container.querySelector('textarea') as HTMLTextAreaElement, {
      target: { value: 'aaa' },
      keyCode: 13,
    });
    expect(onEnterPress.mock.calls.length).toBe(1);
    expect(onEnterPress.mock.calls[0][0]).toBe('aaa');
  });
});
describe('Textarea[placeholderm, rows, className, style, footer, underline]', () => {
  test('should render placeholder and rows', () => {
    const { container } = render(<Textarea placeholder='input something' rows={6} />);
    const textarea = container.querySelector('textarea');
    expect(textarea?.getAttribute('rows')).toBe('6');
    expect(textarea?.getAttribute('placeholder')).toBe('input something');
  });
  test('should render className and style', () => {
    const style = { color: 'blue' };
    const className = 'class-name-test';
    const { container } = render(<Textarea style={style} className={className} />);
    const textarea = container.querySelector(`.${SO_PREFIX}-wrapper-0-2-1`);
    expect(textarea).toBeTruthy();
    expect(textarea?.classList.contains(className)).toBe(true);
    expect(textarea?.getAttribute('style')).toBe('color: blue;');
  });
  test('should renderFooter', () => {
    const { container } = render(
      <Textarea placeholder='input something' renderFooter={() => <span>hello world</span>} />,
    );
    expect(container.querySelector(`.${SO_PREFIX}-footer-0-2-16`)?.textContent).toBe('hello world');
  });
});
describe('Textarea[underline]', () => {
  test('should render underline', () => {
    const { container } = render(<Textarea placeholder='input something' underline />);
    expect(
      container
        .querySelector(`.${SO_PREFIX}-wrapper-0-2-1`)
        ?.classList.contains(`${SO_PREFIX}-wrapperUnderline-0-2-8`),
    ).toBeTruthy();
  });
});
describe('Textarea[BeforeChange]', () => {
  test('should render when set beforeChange', () => {
    const hanldFn = jest.fn((e) => e + 1);
    const { container } = render(<Textarea placeholder='input something' beforeChange={hanldFn} />);
    fireEvent.change(container.querySelector('textarea') as HTMLTextAreaElement, {
      target: { value: '1' },
    });
    expect(container.querySelector('textarea')?.textContent).toBe('11');
  });
});
describe('Textarea[Border]', () => {
  test('should render when set border is false', () => {
    const { container } = render(<Textarea placeholder='input something' border={false} />);
    expect(
      container
        .querySelector(`.${SO_PREFIX}-wrapper-0-2-1`)
        ?.classList.contains(`${SO_PREFIX}-wrapperNoBorder-0-2-9`),
    ).toBeTruthy();
  });
});
describe('Textarea[Popover]', () => {
  test('should render when set popover', () => {
    const { container } = render(
      <Textarea autosize placeholder='input something' maxHeight={150} popover tip='121' />,
    );
    fireEvent.focus(container.querySelector('textarea') as HTMLTextAreaElement, {
      target: { value: 'test' },
    });
    expect(screen.getByText('121')).toBeTruthy();
  });
});
