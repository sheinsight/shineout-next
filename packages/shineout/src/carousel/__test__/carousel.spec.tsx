import { render, cleanup, fireEvent, screen } from '@testing-library/react';
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
  styleTest,
} from '../../tests/utils';

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
  'arrowHover',
  'arrowLeft',
  'arrowRight',
  'indicatorActive',
  'indicatorLeft',
  'indicatorRight',
  'animationSlideY',
  'animationFade',
  'indicatorTypeSlider',
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
  indicatorTypeSlider,
  indicator,
  arrowWrapper,
  arrowHover,
  arrowItem,
  arrowLeft,
  arrowRight,
  indicatorActive,
  indicatorLeft,
  indicatorRight,
  animationSlideY,
  animationFade,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

const images = [
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-02.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-03.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-04.png',
];

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.runAllTimers();
});
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
  });
  const positionClassNameMap: { [key: string]: string } = {
    left: indicatorLeft,
    right: indicatorRight,
  };
  test.each(['left', 'right'])('should render when set indicatorPosition is %s', (type) => {
    const { container } = render(<CarouselType indicatorPosition={type} />);
    classTest(container.querySelector(indicatorWrapper)!, positionClassNameMap[type]);
  });
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
    slider: indicatorTypeSlider,
  };
  test.each(['line', 'number', 'slider'])('should render when set indicatorType is %s', (type) => {
    const { container } = render(<CarouselType indicatorType={type} />);
    classTest(container.querySelector(indicatorWrapper)!, indicatorTypeClassNameMap[type]);
  });
  test('should render when set indicatorType is function', () => {
    // const { container } = render(
    //   <CarouselType indicatorType={(current: number) => (
    //     <>
    //       {
    //         images.map()
    //       }
    //     </>
    //   )} />
    // )
    screen.debug();
  });
});
