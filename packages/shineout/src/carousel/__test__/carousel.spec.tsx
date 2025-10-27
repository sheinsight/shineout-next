import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Carousel from '..';
import mountTest from '../../tests/mountTest';
import { classLengthTest } from '../../tests/structureTest';
import {
  baseTest,
  childrenTest,
  classTest,
  createClassName,
  displayTest,
  snapshotTest,
  styleTest,
} from '../../tests/utils';
import CaroselBase from '../__example__/01-base';
import CarouselIndicator from '../__example__/02-indicator';
import CarouselAnimation from '../__example__/03-animation';

const SO_PREFIX = 'carousel';
const originClasses = [
  'wrapper',
  'slider',
  'item',
  'indicatorWrapper',
  'indicator',
  'arrowWrapper',
  'arrowItem',
];
const originItemClasses = [
  'animationSlide',
  'directionStop',
  'itemCurrent',
  'indicatorCenter',
  'indicatorTypeCircle',
  'indicatorTypeNumber',
  'indicatorTypeLine',
  'indicatorTypeBar',
  'arrowHover',
  'arrowLeft',
  'arrowRight',
  'indicatorActive',
  'indicatorLeft',
  'indicatorRight',
  'indicatorOuter',
  'animationSlideY',
  'animationFade',
];
const {
  wrapper,
  animationSlide,
  directionStop,
  slider,
  item,
  itemCurrent,
  indicatorWrapper,
  indicatorCenter,
  indicatorTypeCircle,
  indicatorTypeNumber,
  indicatorTypeLine,
  indicatorTypeBar,
  indicator,
  arrowWrapper,
  arrowHover,
  arrowItem,
  arrowLeft,
  arrowRight,
  indicatorActive,
  indicatorLeft,
  indicatorRight,
  indicatorOuter,
  animationSlideY,
  animationFade,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

const images = [
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-02.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-03.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-04.png',
];

afterEach(cleanup);

const CarouselType = (props: any) => (
  <Carousel {...props}>
    {images.map((src) => (
      <img key={src} src={src} />
    ))}
  </Carousel>
);

mountTest(<CarouselType />);
describe('Carousel[Base]', () => {
  displayTest(Carousel, 'ShineoutCarousel');
  baseTest(Carousel, wrapper, { backgroundColor: 'red' }, 'background-color: red; height: auto;');
  childrenTest(Carousel, wrapper);
  snapshotTest(<CaroselBase />);
  snapshotTest(<CarouselIndicator />, 'about indicator');
  snapshotTest(<CarouselAnimation />, 'about animation');
  test('should render default', () => {
    const { container } = render(<CarouselType />);
    const carouselWrapper = container.querySelector(wrapper)!;
    classTest(carouselWrapper, animationSlide);
    classTest(carouselWrapper, directionStop);
    styleTest(carouselWrapper, 'height: auto;');
    const carouselSlider = carouselWrapper.querySelector(slider)!;
    const carouselItems = carouselSlider.querySelectorAll(item);
    classLengthTest(carouselSlider, item, images.length);
    carouselItems.forEach((item) => {
      classLengthTest(item, 'img', 1);
    });
    classTest(carouselItems[0], itemCurrent);
    const carouselIndicatorWrapper = carouselWrapper.querySelector(indicatorWrapper)!;
    classTest(carouselIndicatorWrapper, indicatorCenter);
    classTest(carouselIndicatorWrapper, indicatorTypeCircle);
    classLengthTest(carouselIndicatorWrapper, indicator, images.length);
    const indicators = carouselIndicatorWrapper.querySelectorAll(indicator);
    classTest(indicators[0], indicatorActive);
  });
  test('should render when click indicator', () => {
    const { container } = render(<CarouselType />);
    const indicators = container.querySelectorAll(indicator);
    const carouselItems = container.querySelectorAll(item);
    classTest(carouselItems[0], itemCurrent);
    classTest(indicators[0], indicatorActive);
    fireEvent.click(indicators[1]);
    classTest(carouselItems[1], itemCurrent);
    classTest(indicators[1], indicatorActive);
    fireEvent.click(indicators[1]);
    classTest(carouselItems[1], itemCurrent);
    classTest(indicators[1], indicatorActive);
  });
  test('should render when set onMove', () => {
    const moveFn = jest.fn();
    const { container } = render(<CarouselType onMove={moveFn} />);
    const indicators = container.querySelectorAll(indicator);
    fireEvent.click(indicators[1]);
    expect(moveFn.mock.calls.length).toBe(1);
  });
  test('should render when set interval > 0', async () => {
    jest.useFakeTimers();
    const { container } = render(
      <Carousel interval={5000}>
        <div />
        <div />
      </Carousel>,
    );
    const indicators = container.querySelectorAll(indicator);
    const carouselItems = container.querySelectorAll(item);
    classTest(carouselItems[0], itemCurrent);
    classTest(indicators[0], indicatorActive);
    await waitFor(
      () => {
        jest.advanceTimersByTime(5000);
      },
      { timeout: 6000 },
    );

    await waitFor(() => {
      classTest(carouselItems[1], itemCurrent);
      classTest(indicators[1], indicatorActive);
    });
    await waitFor(
      () => {
        jest.advanceTimersByTime(5000);
      },
      { timeout: 6000 },
    );
    await waitFor(() => {
      classTest(carouselItems[0], itemCurrent);
      classTest(indicators[0], indicatorActive);
    });
    fireEvent.mouseEnter(container.querySelector(wrapper)!);
    await waitFor(
      () => {
        jest.advanceTimersByTime(5000);
      },
      { timeout: 6000 },
    );
    await waitFor(() => {
      classTest(carouselItems[0], itemCurrent);
      classTest(indicators[0], indicatorActive);
    });
    fireEvent.mouseLeave(container.querySelector(wrapper)!);
    await waitFor(
      () => {
        jest.advanceTimersByTime(5000);
      },
      { timeout: 6000 },
    );
    await waitFor(() => {
      classTest(carouselItems[1], itemCurrent);
      classTest(indicators[1], indicatorActive);
    });
  });
});
describe('Carousel[Type]', () => {
  test.each(['hover', 'always'])('should render when set showArrow is %s', (type) => {
    const { container } = render(<CarouselType showArrow={type} />);
    const carouselArrowWrapper = container.querySelector(arrowWrapper)!;
    const arrowItems = carouselArrowWrapper.querySelectorAll(arrowItem);
    classLengthTest(carouselArrowWrapper, arrowItem, 2);
    arrowItems.forEach((item) => {
      classLengthTest(item, 'svg', 1);
    });
    classTest(arrowItems[0], arrowLeft);
    classTest(arrowItems[1], arrowRight);
    if (type === 'always') return;
    classTest(carouselArrowWrapper, arrowHover);
  });
  test('should render when set arrowClassName', () => {
    const { container } = render(<CarouselType showArrow='always' arrowClassName='demo' />);
    classTest(container.querySelector(arrowWrapper)!, 'demo');
  });
  test('should render when click arrow', () => {
    const { container } = render(<CarouselType showArrow='always' />);
    const arrowItems = container.querySelectorAll(arrowItem);
    const indicators = container.querySelectorAll(indicator);
    const carouselItems = container.querySelectorAll(item);
    classTest(carouselItems[0], itemCurrent);
    classTest(indicators[0], indicatorActive);
    fireEvent.click(arrowItems[1]);
    classTest(carouselItems[1], itemCurrent);
    classTest(indicators[1], indicatorActive);
    fireEvent.click(arrowItems[0]);
    classTest(carouselItems[0], itemCurrent);
    classTest(indicators[0], indicatorActive);
    fireEvent.click(arrowItems[0]);
    classTest(carouselItems[3], itemCurrent);
    classTest(indicators[3], indicatorActive);
    fireEvent.click(arrowItems[1]);
    classTest(carouselItems[0], itemCurrent);
    classTest(indicators[0], indicatorActive);
    fireEvent.click(arrowItems[1]);
    classTest(carouselItems[1], itemCurrent);
    classTest(indicators[1], indicatorActive);
  });
  const positionClassNameMap: { [key: string]: string } = {
    left: indicatorLeft,
    right: indicatorRight,
    outer: indicatorOuter,
  };
  test.each(['left', 'right', 'outer'])(
    'should render when set indicatorPosition is %s',
    (type) => {
      const { container } = render(<CarouselType indicatorPosition={type} />);
      classTest(container.querySelector(indicatorWrapper)!, positionClassNameMap[type]);
    },
  );
  const animationClassNameMap: { [key: string]: string } = {
    'slide-y': animationSlideY,
    fade: animationFade,
  };
  test.each(['slide-y', 'fade'])('should render when set animation is %s', (type) => {
    const { container } = render(<CarouselType animation={type} />);
    classTest(container.querySelector(wrapper)!, animationClassNameMap[type]);
  });
  const indicatorTypeClassNameMap: { [key: string]: string } = {
    line: indicatorTypeLine,
    number: indicatorTypeNumber,
    bar: indicatorTypeBar,
  };
  test.each(['line', 'number', 'bar'])('should render when set indicatorType is %s', (type) => {
    const { container } = render(<CarouselType indicatorType={type} />);
    classTest(container.querySelector(indicatorWrapper)!, indicatorTypeClassNameMap[type]);
  });
  test('should render when set indicatorType is function', () => {
    const { container } = render(
      <CarouselType
        indicatorType={() => (
          <>
            {images.map((item, index) => (
              <div className='demo' key={index}>
                {index}
              </div>
            ))}
          </>
        )}
      />,
    );
    classLengthTest(container.querySelector(indicatorWrapper)!, '.demo', 4);
  });
});
describe('Carousel[Controlled]', () => {
  test('should render with defaultValue', () => {
    const { container } = render(<CarouselType defaultValue={2} />);
    const carouselItems = container.querySelectorAll(item);
    const indicators = container.querySelectorAll(indicator);
    // 应该从第 3 张图片开始（索引 2）
    classTest(carouselItems[2], itemCurrent);
    classTest(indicators[2], indicatorActive);
  });
  test('should render with value and onChange', () => {
    const handleChange = jest.fn();
    const { container } = render(<CarouselType value={1} onChange={handleChange} />);
    const carouselItems = container.querySelectorAll(item);
    const indicators = container.querySelectorAll(indicator);
    // 应该显示第 2 张图片（索引 1）
    classTest(carouselItems[1], itemCurrent);
    classTest(indicators[1], indicatorActive);
    // 点击第 3 个指示器
    fireEvent.click(indicators[2]);
    // onChange 应该被调用，参数为 2
    expect(handleChange).toHaveBeenCalledWith(2);
  });
  test('should update when value prop changes', () => {
    const { container, rerender } = render(<CarouselType value={0} onChange={() => {}} />);
    const carouselItems = container.querySelectorAll(item);
    const indicators = container.querySelectorAll(indicator);
    // 初始显示第 1 张图片
    classTest(carouselItems[0], itemCurrent);
    classTest(indicators[0], indicatorActive);
    // 更新 value 为 2
    rerender(<CarouselType value={2} onChange={() => {}} />);
    // 应该显示第 3 张图片
    classTest(carouselItems[2], itemCurrent);
    classTest(indicators[2], indicatorActive);
  });
});
