import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '..';
import {
  baseTest,
  classTest,
  createClassName,
  delay,
  displayTest,
  snapshotTest,
  textContentTest,
} from '../../tests/utils';
import mountTest from '../../tests/mountTest';
import { classLengthTest } from '../../tests/structureTest';
import PaginationBase from '../__example__/001-base';
import PaginationTotal from '../__example__/002-total';
import PaginationJumper from '../__example__/003-jumper';
import PaginationMode from '../__example__/004-mode';
import PaginationSize from '../__example__/005-size';
import PaginationDisabled from '../__example__/006-disabled';
import PaginationSpan from '../__example__/007-span';
import PaginationAlign from '../__example__/008-align';
import PaginationText from '../__example__/009-text';
import PaginationControl from '../__example__/010-control';
import PaginationSimple from '../__example__/011-simple';

const SO_PREFIX = 'tag';
const originClasses = ['pagination', 'section', 'jumper'];
const originItemClasses = ['small', 'large', 'center', 'right'];
const { pagination, section, jumper, small, large, center, right } = createClassName(
  SO_PREFIX,
  originClasses,
  originItemClasses,
);

const {
  disabled: disabledClassName,
  primary,
  outline: outlineClassName,
  small: smallClassName,
  large: largeClassName,
} = createClassName('button', [''], ['disabled', 'primary', 'outline', 'small', 'large']);

const PaginationTest = (props: any) => (
  <Pagination total={100} defaultCurrent={1} span={3} {...props} />
);

afterEach(cleanup);
mountTest(<Pagination />);

describe('Pagination[Base]', () => {
  displayTest(Pagination, 'ShineoutPagination');
  baseTest(Pagination, pagination);
  snapshotTest(<PaginationBase />);
  snapshotTest(<PaginationTotal />, 'about total');
  snapshotTest(<PaginationJumper />, 'about jumper');
  snapshotTest(<PaginationMode />, 'about mode');
  snapshotTest(<PaginationSize />, 'about size');
  snapshotTest(<PaginationDisabled />, 'about disabled');
  snapshotTest(<PaginationSpan />, 'about span');
  snapshotTest(<PaginationAlign />, 'about align');
  snapshotTest(<PaginationText />, 'about text');
  snapshotTest(<PaginationControl />, 'about control');
  snapshotTest(<PaginationSimple />, 'about simple');
  test('should render default', () => {
    const { container } = render(<PaginationTest />);
    const paginationWrapper = container.querySelector(pagination)!;
    const buttons = paginationWrapper.querySelectorAll('button');
    expect(buttons.length).toBe(9);
    buttons.forEach((item, index) => {
      if (index === 0 || index === 6 || index === 8) {
        classLengthTest(item, 'svg', 1);
        return;
      }
      if (index === 7) {
        textContentTest(item, '10');
        return;
      }
      textContentTest(item, `${index}`);
    });
    classTest(buttons[0], disabledClassName);
    classTest(buttons[1], primary);
    fireEvent.click(buttons[2]);
    classTest(buttons[1], primary, false);
    classTest(buttons[2], primary);
    classTest(buttons[0], disabledClassName, false);
    fireEvent.click(buttons[8]);
    classTest(buttons[3], primary);
    fireEvent.click(buttons[0]);
    classTest(buttons[2], primary);
    fireEvent.click(buttons[6]);
    classTest(buttons[5], primary);
  });
  test('should render when layout have total', () => {
    const total = 500;
    const renderTotal = () => `total: ${total}`;
    const layout = [renderTotal, 'links'];
    const { container } = render(<PaginationTest layout={layout} />);
    const paginationWrapper = container.querySelector(pagination)!;
    const sections = paginationWrapper.querySelectorAll(section);
    expect(sections.length).toBe(4);
    textContentTest(sections[0], renderTotal());
  });
  test('should render when layout have jumper', () => {
    const layout = ['links', 'jumper'];
    const text = {
      jumper: 'Go to {input} Page',
    };
    const { container } = render(<PaginationTest layout={layout} text={text} />);
    const paginationWrapper = container.querySelector(pagination)!;
    const jumperWrapper = paginationWrapper.querySelector(jumper)!;
    classLengthTest(jumperWrapper, 'input', 1);
    const inputWrapper = jumperWrapper.querySelector('input')!;
    fireEvent.change(inputWrapper, { target: { value: 2 } });
    fireEvent.keyDown(inputWrapper, { keyCode: 13 });
    const buttons = paginationWrapper.querySelectorAll('button');
    classTest(buttons[2], primary);
    fireEvent.change(inputWrapper, { target: { value: 3 } });
    fireEvent.blur(inputWrapper);
  });
  test('should render when set mode is outline', () => {
    const { container } = render(<PaginationTest mode='outline' />);
    const paginationWrapper = container.querySelector(pagination)!;
    const buttons = paginationWrapper.querySelectorAll('button');
    buttons.forEach((item, index) => {
      if (index === 1) return;
      classTest(item, outlineClassName);
    });
  });
  test('should render when set disabled', () => {
    const { container } = render(<PaginationTest disabled />);
    const paginationWrapper = container.querySelector(pagination)!;
    const buttons = paginationWrapper.querySelectorAll('button');
    buttons.forEach((item) => {
      classTest(item, disabledClassName);
    });
  });
  test('should render when set size is small', () => {
    const { container } = render(<PaginationTest size='small' />);
    const paginationWrapper = container.querySelector(pagination)!;
    const buttons = paginationWrapper.querySelectorAll('button');
    classTest(paginationWrapper, small);
    buttons.forEach((item) => {
      classTest(item, smallClassName);
    });
  });
  test('should render when set size is large', () => {
    const { container } = render(<PaginationTest size='large' />);
    const paginationWrapper = container.querySelector(pagination)!;
    const buttons = paginationWrapper.querySelectorAll('button');
    classTest(paginationWrapper, large);
    buttons.forEach((item) => {
      classTest(item, largeClassName);
    });
  });
  test('should render when set span is 0', () => {
    const { container } = render(<PaginationTest span={0} />);
    const paginationWrapper = container.querySelector(pagination)!;
    const buttons = paginationWrapper.querySelectorAll('button');
    expect(buttons.length).toBe(6);
  });
  test('should render when set align is center', () => {
    const { container, rerender } = render(<PaginationTest align='center' />);
    const paginationWrapper = container.querySelector(pagination)!;
    classTest(paginationWrapper, center);
    rerender(<PaginationTest align='right' />);
    classTest(paginationWrapper, right);
  });
  test('should render when set simple', () => {
    const { container } = render(<PaginationTest simple />);
    const paginationWrapper = container.querySelector(pagination)!;
    const buttons = paginationWrapper.querySelectorAll('button');
    expect(buttons.length).toBe(2);
    classLengthTest(paginationWrapper, 'input', 1);
  });
  test('should render when set simple in layout', () => {
    const { container } = render(<PaginationTest layout={['simple']} />);
    const paginationWrapper = container.querySelector(pagination)!;
    const buttons = paginationWrapper.querySelectorAll('button');
    expect(buttons.length).toBe(2);
    classLengthTest(paginationWrapper, 'input', 1);
  });
  test('should render when set pageSize', () => {
    const { container } = render(<PaginationTest pageSize={20} />);
    const paginationWrapper = container.querySelector(pagination)!;
    const buttons = paginationWrapper.querySelectorAll('button');
    expect(buttons.length).toBe(7);
  });
  test('should render when set current and onChange', () => {
    const { container } = render(<PaginationControl />);
    fireEvent.change(container.querySelector('input')!, { target: { value: 2 } });
    const paginationWrapper = container.querySelector(pagination)!;
    const buttons = paginationWrapper.querySelectorAll('button');
    classTest(buttons[2], primary);
  });
  test('should render when set onChange', () => {
    const onChange = jest.fn();
    const { container } = render(<PaginationTest onChange={onChange} />);
    const paginationWrapper = container.querySelector(pagination)!;
    const buttons = paginationWrapper.querySelectorAll('button');
    fireEvent.click(buttons[2]);
    expect(onChange.mock.calls.length).toBe(1);
  });
  test('should render when set list in layout', async () => {
    const layout = ['list', 'links'];
    const { container } = render(<PaginationTest layout={layout} />);
    const paginationWrapper = container.querySelector(pagination)!;
    const buttons = paginationWrapper.querySelectorAll('button');
    expect(buttons.length).toBe(9);
    fireEvent.click(document.querySelectorAll('li')[1]);
    await waitFor(async () => {
      await delay(200);
    });
    expect(paginationWrapper.querySelectorAll('button').length).toBe(7);
  });
});
