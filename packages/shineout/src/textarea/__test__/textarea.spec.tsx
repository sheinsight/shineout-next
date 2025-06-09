import { render, fireEvent, cleanup, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Textarea from '..';
import { Form } from 'shineout';
import mountTest from '../../tests/mountTest';
import {
  attributesTest,
  classTest,
  hasAttributesTest,
  snapshotTest,
  styleTest,
  textContentTest,
  displayTest,
  createClassName,
  delay,
} from '../../tests/utils';
import { classLengthTest } from '../../tests/structureTest';
import TextareaBase from '../__example__/01-01-base';
import TextareaSize from '../__example__/02-size';
import TextareaAutosize from '../__example__/03-autosize';
import TextareaInfo from '../__example__/04-info';
import TextareaInfoFunction from '../__example__/05-custom';
import TextareaFooter from '../__example__/07-footer';

const SO_PREFIX = 'textarea';
const {
  wrapper: textareaClassName,
  wrapperFocus: textareaFocusClassName,
  wrapperSmall: textareaSmallClassName,
  shadow: textareaShadowClassName,
  info: textareaInfoClassName,
  footer: textareaFooterClassName,
  wrapperUnderline: textareaUnderlineClassName,
  wrapperNoBorder: textareaNoBorderClassName,
} = createClassName(
  SO_PREFIX,
  ['wrapper', 'info', 'footer'],
  ['wrapperFocus', 'wrapperSmall', 'shadow', 'infoError', 'wrapperUnderline', 'wrapperNoBorder'],
);

afterEach(cleanup);
describe('Textarea[Base]', () => {
  mountTest(Textarea);
  displayTest(Textarea, 'ShineoutTextarea');
  snapshotTest(<TextareaBase />);
  snapshotTest(<TextareaSize />, 'about size');
  snapshotTest(<TextareaAutosize />, 'about autosize');
  snapshotTest(<TextareaInfo />, 'about info');
  snapshotTest(<TextareaInfoFunction />, 'about info by function');
  snapshotTest(<TextareaFooter />, 'about footer');
  test('should render textarea element', () => {
    const { container } = render(<TextareaBase />);
    classTest(container.querySelector(textareaClassName)!, textareaFocusClassName);
    classLengthTest(container, 'textarea', 1);
  });
  test('should render default value', () => {
    const value = 'test';
    const { container } = render(<Textarea rows={6} defaultValue={value} />);
    const textarea = container.querySelector('textarea')!;
    textContentTest(textarea, value);
    attributesTest(textarea, 'rows', '6');
  });
  test('should render value', () => {
    const value = 'test';
    const { container } = render(<Textarea rows={6} value={value} />);
    const textarea = container.querySelector('textarea')!;
    textContentTest(textarea, value);
    attributesTest(textarea, 'rows', '6');
  });
  test('should render value when set value and defaultValue', () => {
    const value = 'test';
    const defaultValue = 'demo';
    const { container } = render(<Textarea defaultValue={defaultValue} value={value} />);
    const textarea = container.querySelector('textarea')!;
    textContentTest(textarea, value);
  });
  test('should render when set width', () => {
    const value = 'test';
    const { container } = render(<Textarea value={value} width={300} />);
    styleTest(container.querySelector(textareaClassName)!, 'width: 300px;');
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
    styleTest(
      container.querySelector(textareaClassName)!,
      'width: 120px; margin-inline-end: 12px;',
    );
  });
});
describe('Textarea[Size]', () => {
  test('should render small size', () => {
    const { container } = render(<Textarea size='small' placeholder='small size' />);
    classTest(container.querySelector(textareaClassName)!, textareaSmallClassName);
  });
});
describe('Textarea[Autosize]', () => {
  test('should render double textarea to autosize', () => {
    const { container } = render(<TextareaAutosize />);
    const textareas = container.querySelectorAll('textarea');
    expect(textareas.length).toBe(2);
    classTest(textareas[1], textareaShadowClassName);
    styleTest(textareas[0], 'overflow: auto; max-height: 150px;');
    fireEvent.change(textareas[0] as HTMLTextAreaElement, {
      target: { value: 'test' },
    });
    textareas.forEach((textarea) => {
      textContentTest(textarea, 'test');
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
  test('should render tip', async () => {
    const { container } = render(<TextareaInfoFunction />);
    const textareaWrapper = container.querySelector('textarea')!;
    fireEvent.click(textareaWrapper);
    fireEvent.change(textareaWrapper, {
      target: { value: 'test' },
    });
    await waitFor(async () => {
      await delay(200);
    });
    expect(document.querySelectorAll(textareaInfoClassName).length).toBe(1);
  });
  test('should render tip we want', () => {
    const { container } = render(<TextareaInfoFunction />);
    const textareaWrapper = container.querySelector('textarea')!;
    fireEvent.click(textareaWrapper);
    fireEvent.change(textareaWrapper, {
      target: { value: 'test' },
    });
    // 示例中把提示信息render到body上了，所以这里需要document.querySelector
    textContentTest(document.querySelector(textareaInfoClassName)!, 'total is  4');
    fireEvent.change(textareaWrapper, {
      target: { value: 'testtesttesttesttesttest' },
    });
    // 错误信息时，期望container下没有textareaInfoClassName的元素
    expect(document.querySelectorAll(textareaInfoClassName).length).toBe(0);
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
      container.querySelectorAll(textareaInfoClassName).length
    ).toBe(0);
  });
  test('should render tip', () => {
    const { container } = render(<Textarea info={20} />);
    const textareaWrapper = container.querySelector('textarea')!;
    fireEvent.click(textareaWrapper);
    fireEvent.change(textareaWrapper, {
      target: { value: 'test' },
    });
    textContentTest(container.querySelector(textareaInfoClassName)!, '4 / 20');
  });
  test('should render error', () => {
    const { container } = render(<Textarea info={20} />);
    fireEvent.change(container.querySelector('textarea') as HTMLTextAreaElement, {
      target: { value: '1234456789012345678901' },
    });
    const selector = `.soui-popover-wrapper[data-soui-type="error"] .soui-popover-text`
    textContentTest(container.querySelector(selector)!, '22 / 20');
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
    textContentTest(container.querySelector('textarea')!, 'default');
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
    hasAttributesTest(container.querySelector('form')!, 'disabled');
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
    const textarea = container.querySelector('textarea')!;
    attributesTest(textarea, 'rows', '6');
    attributesTest(textarea, 'placeholder', 'input something');
  });
  test('should render className and style', () => {
    const style = { color: 'blue' };
    const className = 'class-name-test';
    const { container } = render(<Textarea style={style} className={className} />);
    const textarea = container.querySelector(textareaClassName)!;
    expect(textarea).toBeTruthy();
    classTest(textarea, className);
    styleTest(textarea, 'color: blue;');
  });
  test('should renderFooter', () => {
    const { container } = render(
      <Textarea placeholder='input something' renderFooter={() => <span>hello world</span>} />,
    );
    textContentTest(container.querySelector(textareaFooterClassName)!, 'hello world');
  });
});
describe('Textarea[underline]', () => {
  test('should render underline', () => {
    const { container } = render(<Textarea placeholder='input something' underline />);
    classTest(container.querySelector(textareaClassName)!, textareaUnderlineClassName);
  });
});
describe('Textarea[BeforeChange]', () => {
  test('should render when set beforeChange', () => {
    const hanldFn = jest.fn((e) => e + 1);
    const { container } = render(<Textarea placeholder='input something' beforeChange={hanldFn} />);
    fireEvent.change(container.querySelector('textarea') as HTMLTextAreaElement, {
      target: { value: '1' },
    });
    textContentTest(container.querySelector('textarea')!, '11');
    expect(hanldFn.mock.calls.length).toBe(1);
  });
});
describe('Textarea[Border]', () => {
  test('should render when set border is false', () => {
    const { container } = render(<Textarea placeholder='input something' border={false} />);
    classTest(container.querySelector(textareaClassName)!, textareaNoBorderClassName);
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
