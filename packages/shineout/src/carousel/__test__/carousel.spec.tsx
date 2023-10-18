import { render, cleanup, fireEvent } from '@testing-library/react';
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
  'arrowHover',
  'arrowLeft',
  'arrowRight',
  'indicatorActive',
  'indicatorLeft',
  'indicatorRight',
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
  indicator,
  arrowWrapper,
  arrowHover,
  arrowItem,
  arrowLeft,
  arrowRight,
  indicatorActive,
  indicatorLeft,
  indicatorRight,
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
  test('should render when set indicatorPosition is left', () => {
    const { container } = render(<CarouselType indicatorPosition='left' />);
    classTest(container.querySelector(indicatorWrapper)!, indicatorLeft);
  });
  test('should render when set indicatorPosition is right', () => {
    const { container } = render(<CarouselType indicatorPosition='right' />);
    classTest(container.querySelector(indicatorWrapper)!, indicatorRight);
  });
});
