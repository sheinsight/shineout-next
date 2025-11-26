import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Rate from '..';
import mountTest from '../../tests/mountTest';
import {
  attributesTest,
  classTest,
  createClassName,
  snapshotTest,
  styleTest,
  textContentTest,
} from '../../tests/utils';
import { classLengthTest } from '../../tests/structureTest';
import RateBase from '../__example__/01-base';
import Ratehalf from '../__example__/02-half';
import RateSize from '../__example__/03-size';
import RateText from '../__example__/04-text';
import RateDisable from '../__example__/05-disable';
import RateLevel from '../__example__/06-level';
import RateRepeat from '../__example__/07-repeat';
import RateMax from '../__example__/08-max';
import RateColor from '../__example__/09-color';
import RateClear from '../__example__/10-clear';

const SO_PREFIX = 'rate';
const originClasses = ['wrapper', 'inner', 'item', 'itemBg', 'itemFront', 'itemHalf', 'text'];
const originItemClasses = ['itemChecked', 'itemCheckedHalf', 'itemDisabled'];
const {
  wrapper,
  inner,
  item,
  itemBg,
  itemFront,
  itemChecked,
  itemCheckedHalf,
  itemHalf,
  text,
  itemDisabled,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

const star = (
  <svg viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path d='M8.276 7.825L1.85649 8.7559L1.74278 8.77878C1.00761 8.96968 0.736859 9.90915 1.30093 10.4606L5.953 15.008L4.84231 21.3268L4.82911 21.4327C4.77288 22.2003 5.59415 22.7575 6.29763 22.3824L11.999 19.343L17.7023 22.3825L17.7988 22.4279C18.5105 22.7194 19.2948 22.1128 19.1578 21.3281L18.054 15.008L22.6997 10.46L22.7779 10.3745C23.2586 9.78723 22.9242 8.86973 22.1443 8.75601L15.758 7.825L12.895 2.05544C12.5264 1.31273 11.4661 1.31545 11.1013 2.06004L8.276 7.825Z' />
  </svg>
);
const StarRate = Rate(star, star);

afterEach(cleanup);
mountTest(<StarRate />);
describe('Rate[Base]', () => {
  snapshotTest(<RateBase />);
  snapshotTest(<Ratehalf />, 'about half');
  snapshotTest(<RateSize />, 'about size');
  snapshotTest(<RateText />, 'about text');
  snapshotTest(<RateDisable />, 'about disable');
  snapshotTest(<RateLevel />, 'about level');
  snapshotTest(<RateRepeat />, 'about repeat');
  snapshotTest(<RateMax />, 'about max');
  snapshotTest(<RateColor />, 'about color');
  snapshotTest(<RateClear />, 'bout clear');
  test('should start with Shineout display', () => {
    expect(Rate.displayName).toBe('ShineoutRate');
  });
  test('should render when set style and className', () => {
    const { container } = render(<StarRate className='demo' style={{ backgroundColor: 'red' }} />);
    const rateWrapper = container.querySelector(wrapper)!;
    classTest(rateWrapper, 'demo');
    styleTest(rateWrapper, 'background-color: red;');
  });
  test('should render default', () => {
    const { container } = render(<StarRate />);
    const rateWrapper = container.querySelector(wrapper)!;
    const rateInner = rateWrapper.querySelector(inner)!;
    const rateItems = rateInner.querySelectorAll(item);
    expect(rateItems.length).toBe(5);
    rateItems.forEach((item) => {
      classLengthTest(item.querySelector(itemBg)!, 'svg', 1);
      classLengthTest(item.querySelector(itemFront)!, 'svg', 1);
    });
    fireEvent.mouseEnter(rateItems[2].querySelector(itemFront)!);
    rateItems.forEach((item, index) => {
      if (index > 2) return;
      classTest(item, itemChecked);
    });
    fireEvent.mouseEnter(rateItems[4].querySelector(itemFront)!);
    rateItems.forEach((item) => {
      classTest(item, itemChecked);
    });
    fireEvent.mouseEnter(rateItems[1].querySelector(itemFront)!);
    rateItems.forEach((item, index) => {
      if (index > 1) return;
      classTest(item, itemChecked);
    });
  });
  test('should render when click', () => {
    const { container } = render(<StarRate />);
    const rateItems = container.querySelectorAll(item);
    fireEvent.click(rateItems[2].querySelector(itemFront)!);
    rateItems.forEach((item, index) => {
      if (index > 2) return;
      classTest(item, itemChecked);
    });
  });
  test('should render when set allowHalf', () => {
    const { container } = render(<StarRate allowHalf />);
    const rateItems = container.querySelectorAll(item);
    rateItems.forEach((item) => {
      classLengthTest(item.querySelector(itemBg)!, 'svg', 1);
      classLengthTest(item.querySelector(itemFront)!, 'svg', 1);
      classLengthTest(item.querySelector(itemHalf)!, 'svg', 1);
    });
    fireEvent.mouseEnter(rateItems[2].querySelector(itemHalf)!);
    rateItems.forEach((item, index) => {
      if (index > 1) return;
      classTest(item, itemChecked);
    });
    classTest(rateItems[2], itemCheckedHalf);
    fireEvent.mouseEnter(rateItems[2].querySelector(itemFront)!);
    classTest(rateItems[2], itemChecked);
    fireEvent.mouseEnter(rateItems[3].querySelector(itemHalf)!);
    classTest(rateItems[3], itemCheckedHalf);
  });
  test('should render when set size', () => {
    const size = 50;
    const { container } = render(<StarRate size={size} />);
    const rateItems = container.querySelectorAll(item);
    rateItems.forEach((item) => {
      styleTest(item, `font-size: ${size}px; width: ${size}px;`);
    });
  });
  test('should render when set text', () => {
    const texts = ['poor', 'fair', 'good', 'very good', 'excellent'];
    const { container } = render(<StarRate text={texts} />);
    const rateItems = container.querySelectorAll(item);
    classLengthTest(container, text, 0);
    fireEvent.click(rateItems[2].querySelector(itemFront)!);
    classLengthTest(container, text, 1);
    textContentTest(container.querySelector(text)!, texts[2]);
    fireEvent.click(rateItems[3].querySelector(itemFront)!);
    textContentTest(container.querySelector(text)!, texts[3]);
  });
  test('should render when set value', () => {
    const { container } = render(<StarRate value={3} />);
    const rateItems = container.querySelectorAll(item);
    rateItems.forEach((item, index) => {
      if (index > 2) return;
      classTest(item, itemChecked);
    });
  });
  test('should render when set defaultValue', () => {
    const { container } = render(<StarRate defaultValue={3} />);
    const rateItems = container.querySelectorAll(item);
    rateItems.forEach((item, index) => {
      if (index > 2) return;
      classTest(item, itemChecked);
    });
  });
  test('should render when set defaultValue and value', () => {
    const { container } = render(<StarRate defaultValue={3} value={4} />);
    const rateItems = container.querySelectorAll(item);
    rateItems.forEach((item, index) => {
      if (index > 3) return;
      classTest(item, itemChecked);
    });
  });
  test('should render when set disabled', () => {
    const { container } = render(<StarRate disabled />);
    const rateItems = container.querySelectorAll(item);
    fireEvent.mouseEnter(rateItems[2].querySelector(itemFront)!);
    rateItems.forEach((item) => {
      classTest(item, itemChecked, false);
      classTest(item, itemDisabled);
    });
  });
  test('should render when set disabled and set value is decimal', () => {
    const { container } = render(<StarRate value={3.6} disabled />);
    const rateItems = container.querySelectorAll(item);
    rateItems.forEach((item, index) => {
      if (index >= 3) return;
      classTest(item, itemChecked);
    });
  });
  test('should render when set different background and icon', () => {
    const { container } = render(<RateLevel />);
    const wrappers = container.querySelectorAll(wrapper);
    const rateItems = wrappers[0].querySelectorAll(item);
    fireEvent.mouseEnter(rateItems[2].querySelector(itemFront)!);
    rateItems.forEach((item, index) => {
      if (index > 2) classTest(item, itemChecked, false);
      else classTest(item, itemChecked);
    });
    fireEvent.mouseEnter(rateItems[3].querySelector(itemFront)!);
    rateItems.forEach((item, index) => {
      if (index > 3) classTest(item, itemChecked, false);
      else classTest(item, itemChecked);
    });
  });
  test('should render when set repeat is false', () => {
    const diffIcon = ['A', 'B', 'C', 'D', 'E'];
    const { container } = render(<RateRepeat />);
    const rateItems = container.querySelectorAll(wrapper)[0].querySelectorAll(item);
    rateItems.forEach((item, index) => {
      textContentTest(item.querySelector(itemBg)!, diffIcon[index]);
      textContentTest(item.querySelector(itemFront)!, diffIcon[index]);
    });
  });
  test('should render when set max', () => {
    const { container } = render(<StarRate max={10} />);
    const rateItems = container.querySelectorAll(item);
    expect(rateItems.length).toBe(10);
  });
  test('should render when set color', () => {
    const bgColor = 'currentColor';
    const frontColor = '#ff4d4f';
    const { container } = render(<RateColor />);
    const rateItems = container.querySelectorAll(item);
    rateItems.forEach((item) => {
      attributesTest(item.querySelector(itemBg)?.querySelector('svg') as Element, 'fill', bgColor);
      attributesTest(
        item.querySelector(itemFront)?.querySelector('svg') as Element,
        'fill',
        frontColor,
      );
    });
  });
  test('should render when set clearable', () => {
    const { container } = render(<StarRate clearable />);
    const rateItems = container.querySelectorAll(item);
    fireEvent.click(rateItems[3].querySelector(itemFront)!);
    rateItems.forEach((item, index) => {
      if (index > 3) return;
      classTest(item, itemChecked);
    });
    fireEvent.click(rateItems[3].querySelector(itemFront)!);
    rateItems.forEach((item) => {
      classTest(item, itemChecked, false);
    });
  });
  test('should render when set onChange', () => {
    const changeFn = jest.fn();
    const { container } = render(<StarRate onChange={changeFn} />);
    const rateItems = container.querySelectorAll(item);
    fireEvent.click(rateItems[3].querySelector(itemFront)!);
    expect(changeFn.mock.calls.length).toBe(1);
  });
  test('should render when set beforeChange', () => {
    const beforeChangeFn = jest.fn();
    const { container } = render(<StarRate beforeChange={beforeChangeFn} />);
    const rateItems = container.querySelectorAll(item);
    fireEvent.click(rateItems[3].querySelector(itemFront)!);
    expect(beforeChangeFn.mock.calls.length).toBe(1);
  });
});
