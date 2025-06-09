import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import Tag from '..';
import {
  snapshotTest,
  classTest,
  textContentTest,
  classContentTest,
  styleTest,
  baseTest,
  childrenTest,
  inputValueTest,
  displayTest,
  createClassName,
} from '../../tests/utils';
import mountTest from '../../tests/mountTest';
import structureTest, {
  classLengthTest,
  structureTestInContainer,
} from '../../tests/structureTest';
import TagBase from '../__example__/s-001-base';
import TagSize from '../__example__/s-002-size';
import TagMode from '../__example__/s-003-mode';
import TagColor from '../__example__/s-004-color';
import TagDynamic from '../__example__/s-005-dynamic';
import TagEditable from '../__example__/s-006-editable';
import TagShape from '../__example__/s-007-shape';
import { useState } from 'react';

const SO_PREFIX = 'tag';
const originClasses = ['tag', 'inline', 'closeIcon', 'input'];
const originItemClasses = ['small', 'bright', 'default', 'disabled', 'rounded', 'info', 'danger', 'warning', 'success', 'large', 'fill', 'outline', 'brightOutline', 'tangerine', 'magenta', 'purple', 'indigo', 'cyan', 'neon', 'lemon', 'brown',];
const {
  tag: tagClassName,
  inline: tagInlineClassName,
  small: tagSmallClassName,
  large: tagLargeClassName,
  bright: tagBrightClassName,
  default: tagDefaultClassName,
  closeIcon: tagCloseClassName,
  disabled: tagDisabledClassName,
  rounded: tagRoundedClassName,
  input: tagInputClassName,
  info: tagInfoClassName,
  danger: tagDangerClassName,
  warning: tagWarningClassName,
  success: tagSuccessClassName,
  fill: tagFillClassName,
  outline: tagOutlineClassName,
  brightOutline: tagBrightOutlineClassName,
  tangerine: tagTangerineClassName,
  magenta: tagMagentaClassName,
  purple: tagPurpleClassName,
  indigo: tagIndigoClassName,
  cyan: tagCyanClassName,
  neon: tagNeonClassName,
  lemon: tagLemonClassName,
  brown: tagBrownClassName,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

const TagColorArray = ['default', 'info', 'danger', 'warning', 'success'];
const TagColorClasses = [tagDefaultClassName, tagInfoClassName, tagDangerClassName, tagWarningClassName, tagSuccessClassName];

const TagSizeArray = ['Small', 'Default', 'Large'];
const TagSizeClasses = [tagSmallClassName, '', tagLargeClassName];

const TagModeArray = ['bright', 'fill', 'outline', 'bright-outline'];
const TgaModeClasses = [tagBrightClassName, tagFillClassName, tagOutlineClassName, tagBrightOutlineClassName];

const TagColorMoreArray = [
  'tangerine',
  'magenta',
  'purple',
  'indigo',
  'cyan',
  'neon',
  'lemon',
  'brown',
];
const TagColorMoreClasses = [tagTangerineClassName, tagMagentaClassName, tagPurpleClassName, tagIndigoClassName, tagCyanClassName, tagNeonClassName, tagLemonClassName, tagBrownClassName];

const closeAttributes = [
  {
    attribute: tagInlineClassName,
    num: 0,
  },
  {
    attribute: tagCloseClassName,
    num: 1,
  },
  {
    attribute: 'svg',
    num: 1,
  },
];
const backgroundColor = 'rgb(0, 0, 0)';

afterEach(cleanup);
describe('Tag[Base]', () => {
  mountTest(Tag);
  displayTest(Tag, 'ShineoutTag');
  snapshotTest(<TagBase />);
  snapshotTest(<TagSize />, 'about size');
  snapshotTest(<TagMode />, 'about mode');
  snapshotTest(<TagColor />, 'about color');
  test('should render when set different color', () => {
    const { container } = render(<TagBase />);
    const tags = container.querySelectorAll(tagClassName)!;
    classLengthTest(container, tagClassName, TagColorArray.length);
    tags.forEach((tag, index) => {
      // classTest(tag, tagSmallClassName);
      classTest(tag, tagBrightClassName);
      classContentTest(tag, TagColorClasses[index]);
      // textContentTest(tag, TagColorArray[index]);
    });
  });
  test('should render when set different size', () => {
    const { container } = render(<TagSize />);
    const tags = container.querySelectorAll(tagClassName)!;
    classLengthTest(container, tagClassName, TagSizeArray.length * 2);
    tags.forEach((tag, index) => {
      classTest(tag, tagDefaultClassName);
      classTest(tag, tagBrightClassName);
      // textContentTest(tag, TagSizeArray[index]);
      if (tag.textContent === TagSizeArray[1]) return;
      classContentTest(tag, TagSizeClasses[Math.floor(index % 3)].toLowerCase());
    });
  });
  test('should render when set different mode', () => {
    const { container } = render(<TagMode />);
    const tags = container.querySelectorAll(tagClassName)!;
    classLengthTest(container, tagClassName, TagColorArray.length * TagModeArray.length);
    tags.forEach((tag, index) => {
      classContentTest(tag, TgaModeClasses[Math.floor(index / TagColorArray.length)]);
      classContentTest(tag, TagColorClasses[index % TagColorArray.length]);
    });
  });
  test('should render when set different more color', () => {
    const { container } = render(<TagColor />);
    const tags = container.querySelectorAll(tagClassName)!;

    classLengthTest(container, tagClassName, TagColorMoreArray.length * TagModeArray.length);
    tags.forEach((tag, index) => {
      classContentTest(tag, TgaModeClasses[Math.floor(index / TagColorMoreArray.length)]);
      classContentTest(tag, TagColorMoreClasses[index % TagColorMoreArray.length]);
    });
  });
  baseTest(Tag, tagClassName);
});
describe('Tag[onClose]', () => {
  structureTest(<Tag onClose>Hello</Tag>, closeAttributes);
  test('should render when set onClose is boolean', () => {
    const closeAttributesAfter = closeAttributes.map((v) => ({ attribute: v.attribute, num: 0 }));
    const { container } = render(<Tag onClose>Hello</Tag>);
    const tag = container.querySelector(tagClassName)!;
    fireEvent.click(tag.querySelector(tagCloseClassName)!);
    structureTestInContainer(container, closeAttributesAfter);
  });
  test('should not render close default', () => {
    const { container } = render(<Tag>Hello</Tag>);
    classLengthTest(container, tagCloseClassName, 0);
  });
  test('should render when set onClose is function', () => {
    const closeAttributesAfter = closeAttributes.map((v) => ({ attribute: v.attribute, num: 0 }));
    const closeFn = jest.fn();
    const { container } = render(<Tag onClose={closeFn}>Hello</Tag>);
    structureTestInContainer(container, closeAttributes);
    fireEvent.click(container.querySelector(tagCloseClassName)!);
    structureTestInContainer(container, closeAttributesAfter);
    expect(closeFn.mock.calls.length).toBe(1);
  });
  test('should render when click with defaultPrevented', () => {
    const closeAttributesAfter = closeAttributes.map((v) => ({ attribute: v.attribute, num: 0 }));
    const closeFn = jest.fn();
    const { container } = render(<Tag onClose={closeFn}>Hello</Tag>);
    fireEvent.click(container.querySelector(tagCloseClassName)!, { defaultPrevented: true });
    structureTestInContainer(container, closeAttributesAfter);
    expect(closeFn.mock.calls.length).toBe(1);
  });
  test('should render when set onClose is promise', async () => {
    jest.useFakeTimers();
    const closeFn = jest.fn();
    const { container } = render(
      <Tag
        onClose={() =>
          new Promise((resolve) => {
            setTimeout(() => {
              closeFn();
              resolve(true);
            }, 3000);
          })
        }
      >
        Hello
      </Tag>,
    );
    structureTestInContainer(container, closeAttributes);
    fireEvent.click(container.querySelector(tagCloseClassName)!);
    // TODO: 还没有spin
    jest.runAllTimers();
    await waitFor(() => {
      expect(closeFn.mock.calls.length).toBe(1);
    });
  });
  test('should render when set onClose is promise reject', async () => {
    jest.useFakeTimers();
    const closeFn = jest.fn();
    const { container } = render(
      <Tag
        onClose={() =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              closeFn();
              reject();
            }, 3000);
          })
        }
      >
        Hello
      </Tag>,
    );
    structureTestInContainer(container, closeAttributes);
    fireEvent.click(container.querySelector(tagCloseClassName)!);
    // TODO: 还没有spin
    jest.runAllTimers();
    await waitFor(() => {
      expect(closeFn.mock.calls.length).toBe(1);
    });
  });
});
describe('Tag[Disabled]', () => {
  test('should render when set disabled', () => {
    const { container } = render(<Tag disabled>Hello</Tag>);
    classTest(container.querySelector(tagClassName)!, tagDisabledClassName);
  });
  test('should not close when set disabled', () => {
    const { container } = render(
      <Tag disabled onClose>
        Hello
      </Tag>,
    );
    fireEvent.click(container.querySelector(tagCloseClassName)!);
    classLengthTest(container, tagClassName, 1);
  });
  //TODO: 可编辑disabled控制可以放在onCompleted中
});
describe('Tag[BackgroundColor]', () => {
  test('should render when set background color', () => {
    const { container } = render(<Tag backgroundColor={backgroundColor}>Hello</Tag>);
    styleTest(container.querySelector(tagClassName)!, 'background-color: rgb(0, 0, 0);');
  });
  test('should render when set background color and style', () => {
    const { container } = render(
      <Tag backgroundColor={backgroundColor} style={{ backgroundColor: 'red' }}>
        Hello
      </Tag>,
    );
    styleTest(container.querySelector(tagClassName)!, 'background-color: rgb(0, 0, 0);');
  });
});
describe('Tag[children]', () => {
  childrenTest(Tag, tagClassName);
});
describe('Tag[onClick]', () => {
  test('should onClick', () => {
    const clickFn = jest.fn();
    const { container } = render(<Tag onClick={clickFn} />);
    fireEvent.click(container.querySelector(tagClassName)!);
    expect(clickFn.mock.calls.length).toBe(1);
  });
});
describe('Tag[Shape]', () => {
  snapshotTest(<TagShape />, 'about shape');
  test('should render when set shape', () => {
    const { container } = render(<TagShape />);
    const tags = container.querySelectorAll(tagClassName);
    tags.forEach((tag) => {
      if (tag.textContent === 'Default') return;
      classTest(tag, tagRoundedClassName);
    });
  });
});
describe('Tag[Input]', () => {
  snapshotTest(<TagEditable />, 'about input');
  snapshotTest(<TagDynamic />, 'about dynamic');
  test('should render when set onCompleted', () => {
    const { container } = render(<TagEditable />);
    const tag = container.querySelector(tagClassName);
    // const inline = tag?.querySelector(tagInlineClassName) as Element;
    // textContentTest(inline, 'abc');
    classLengthTest(container, 'input', 0);
    fireEvent.click(tag!);
    classLengthTest(container, 'input', 1);
    const input = container.querySelector('input')!;
    inputValueTest(input, 'Abc');
    fireEvent.change(input, {
      target: { value: 'test' },
    });
    inputValueTest(input, 'test');
    fireEvent.blur(input);
    classLengthTest(container, 'input', 0);
    // textContentTest(inline, 'abc');
  });
  test('should render when set tag input', () => {
    const focusFn = jest.fn();
    const keyUpFn = jest.fn();
    const TestDemo = () => {
      const [value, setValue] = useState<string | undefined>('abc');
      return (
        <Tag.Input
          onChange={(e) => {
            setValue(e);
          }}
          value={value}
          onFocus={focusFn}
          onKeyUp={keyUpFn}
        />
      );
    };
    const { container } = render(<TestDemo />);
    const input = container.querySelector(tagInputClassName)!;
    const inputContent = input.querySelector('input')!;
    expect(input).toBeTruthy();
    classLengthTest(input, 'input', 1);
    inputValueTest(inputContent, 'abc');
    fireEvent.focus(inputContent);
    expect(focusFn.mock.calls.length).toBe(2);
    fireEvent.keyUp(inputContent, { key: 'Enter' });
    expect(keyUpFn.mock.calls.length).toBe(1);
    fireEvent.change(inputContent, {
      target: { value: 'test' },
    });
    inputValueTest(inputContent, 'test');
  });
  test('should render dynamic', () => {
    const { container } = render(<TagDynamic />);
    classLengthTest(container, tagClassName, 4);
    const tags = container.querySelectorAll(tagClassName)!;
    textContentTest(tags[3], 'Add Tag');
    classLengthTest(container, 'input', 0);
    fireEvent.click(tags[0].querySelector(tagCloseClassName)!);
    classLengthTest(container, tagClassName, 3);
    fireEvent.click(tags[3]);
    classLengthTest(container, 'input', 1);
    fireEvent.change(container.querySelector('input')!, {
      target: { value: 'test' },
    });
    fireEvent.blur(container.querySelector('input')!);
    classLengthTest(container, tagClassName, 4);
    const tagsNew = container.querySelectorAll(tagClassName)!;
    textContentTest(tagsNew[2], 'test');
  });
  test('should render when set value is fixed value', () => {
    const changeFn = jest.fn();
    const { container } = render(<Tag.Input onChange={changeFn} value='test' />);
    fireEvent.click(container.querySelector('input')!);
    expect(changeFn.mock.calls.length).toBe(0);
  });
});
describe('Tag[onKeyUp/onEnterPress]', () => {
  test('should onKeyUp', () => {
    const keyUpFn = jest.fn();
    const completedFn = jest.fn();
    const { container } = render(
      <Tag onCompleted={completedFn} onKeyUp={keyUpFn}>
        test
      </Tag>,
    );
    const tag = container.querySelector(tagClassName)!;
    fireEvent.click(tag);
    classLengthTest(container.querySelector(tagInputClassName)!, 'input', 1);
    fireEvent.keyUp(container.querySelector('input')!, { keyCode: 13, target: { value: 'Hello' } });
    expect(keyUpFn.mock.calls.length).toBe(1);
  });
  test('should onEnterPress', () => {
    const enterPressFn = jest.fn();
    const completedFn = jest.fn();
    const { container } = render(
      <Tag onCompleted={completedFn} onEnterPress={enterPressFn}>
        test
      </Tag>,
    );
    const tag = container.querySelector(tagClassName)!;
    fireEvent.click(tag);
    classLengthTest(container.querySelector(tagInputClassName)!, 'input', 1);
    fireEvent.keyUp(container.querySelector('input')!, { keyCode: 13, target: { value: 'Hello' } });
    expect(enterPressFn.mock.calls.length).toBe(1);
  });
});
