import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Tag from '..';
import {
  snapshotTest,
  classTest,
  textContentTest,
  classContentTest,
  styleTest,
  baseTest,
  childrenTest,
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
import TagShape from '../__example__/s-007-shape';

const SO_PREFIX = 'tag';
const tagClassName = `.${SO_PREFIX}-tag-0-2-1`;
const tagSmallClassName = `${SO_PREFIX}-small-0-2-5`;
const tagBrightClassName = `${SO_PREFIX}-bright-0-2-23`;
const tagDefaultClassName = `${SO_PREFIX}-default-0-2-10`;
const tagInlineClassName = `.${SO_PREFIX}-inline-0-2-3`;
const tagCloseClassName = `.${SO_PREFIX}-closeIcon-0-2-7`;
const tagDisabledClassName = `${SO_PREFIX}-disabled-0-2-6`;
const tagRoundedClassName = `${SO_PREFIX}-rounded-0-2-26`;

const TagColorArray = ['default', 'info', 'danger', 'warning', 'success'];
const TagSizeArray = ['Small', 'Default', 'Large'];
const TageModeArray = ['bright', 'fill', 'outline', 'brightOutline'];
const TagColorMoreArray = [
  'tangerine',
  'magenta',
  'purple',
  'indigo',
  'cyan',
  'neon',
  'lemon',
  'orange',
];
const closeAttributes = [
  {
    attribute: tagInlineClassName,
    num: 1,
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
  snapshotTest(<TagBase />);
  snapshotTest(<TagSize />, 'about size');
  snapshotTest(<TagMode />, 'about mode');
  snapshotTest(<TagColor />, 'about color');
  test('should render when set different color', () => {
    const { container } = render(<TagBase />);
    const tags = container.querySelectorAll(tagClassName)!;
    classLengthTest(container, tagClassName, TagColorArray.length);
    tags.forEach((tag, index) => {
      classTest(tag, tagSmallClassName);
      classTest(tag, tagBrightClassName);
      classContentTest(tag, TagColorArray[index]);
      textContentTest(tag, TagColorArray[index]);
    });
  });
  test('should render when set different size', () => {
    const { container } = render(<TagSize />);
    const tags = container.querySelectorAll(tagClassName)!;
    classLengthTest(container, tagClassName, TagSizeArray.length);
    tags.forEach((tag, index) => {
      classTest(tag, tagDefaultClassName);
      classTest(tag, tagBrightClassName);
      textContentTest(tag, TagSizeArray[index]);
      if (tag.textContent === TagSizeArray[1]) return;
      classContentTest(tag, TagSizeArray[index].toLowerCase());
    });
  });
  test('should render when set different mode', () => {
    const { container } = render(<TagMode />);
    const tags = container.querySelectorAll(tagClassName)!;
    classLengthTest(container, tagClassName, TagColorArray.length * TageModeArray.length);
    tags.forEach((tag, index) => {
      classContentTest(tag, TageModeArray[Math.floor(index / TagColorArray.length)]);
      classContentTest(tag, TagColorArray[index % TagColorArray.length]);
    });
  });
  test('should render when set different more color', () => {
    const { container } = render(<TagColor />);
    const tags = container.querySelectorAll(tagClassName)!;
    classLengthTest(container, tagClassName, TagColorMoreArray.length * TageModeArray.length);
    tags.forEach((tag, index) => {
      classContentTest(tag, TageModeArray[Math.floor(index / TagColorMoreArray.length)]);
      classContentTest(tag, TagColorMoreArray[index % TagColorMoreArray.length]);
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
  test('should render when set onClose is promise', () => {
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
    expect(closeFn.mock.calls.length).toBe(1);
  });
  test('should render when set onClose is promise reject', () => {
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
    expect(closeFn.mock.calls.length).toBe(1);
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
    screen.debug();
  });
});
