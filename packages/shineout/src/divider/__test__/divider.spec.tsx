import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Divider from '..';
import mountTest from '../../tests/mountTest';
import { classLengthTest } from '../../tests/structureTest';
import {
  baseTest,
  childrenTest,
  classContentTest,
  createClassName,
  displayTest,
  snapshotTest,
  textContentTest,
} from '../../tests/utils';
import DividerBase from '../__example__/01-01-base-solid';
import DividerText from '../__example__/02-text';
import DividerVertical from '../__example__/03-vertical';

const SO_PREFIX = 'divider';
const originClasses = ['wrapper', 'innerText'];
const originItemClasses = [
  'vertical',
  'horizontal',
  'withText',
  'withTextCenter',
  'withTextLeft',
  'withTextRight',
];

const {
  wrapper,
  vertical,
  horizontal,
  withText,
  withTextCenter,
  withTextLeft,
  withTextRight,
  innerText,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

const classNamesByContextMaps = {
  Center: withTextCenter,
  Left: withTextLeft,
  Right: withTextRight,
};

afterEach(cleanup);
mountTest(<Divider />);
describe('Divider[Base]', () => {
  displayTest(Divider, 'ShineoutDivider');
  baseTest(Divider, wrapper);
  childrenTest(Divider, wrapper);
  snapshotTest(<DividerBase />);
  snapshotTest(<DividerText />, 'about text');
  snapshotTest(<DividerVertical />, 'about vertical');
  test('should render default', () => {
    const { container } = render(<Divider />);
    classContentTest(container.querySelector(wrapper)!, horizontal);
  });
  test('should render when set mode is vertical', () => {
    const { container } = render(<DividerVertical />);
    const dividers = container.querySelectorAll(wrapper)!;
    dividers.forEach((item) => {
      classContentTest(item, vertical);
    });
  });
  test('should render when set vertical and children', () => {
    const { container } = render(<Divider mode='vertical'>demo</Divider>);
    const divider = container.querySelector(wrapper)!;
    classContentTest(divider, vertical);
    expect(divider.textContent).toBe('');
  });
  test('should render default when set children', () => {
    const { container } = render(<Divider>Center</Divider>);
    const divider = container.querySelector(wrapper)!;
    classContentTest(divider, withText);
    classLengthTest(divider, innerText, 1);
    classContentTest(divider, withTextCenter);
    textContentTest(divider, 'Center');
  });
  test('should render when set orientation', () => {
    const { container } = render(<DividerText />);
    const dividers = container.querySelectorAll(wrapper)!;
    dividers.forEach((item) => {
      classContentTest(item, withText);
      classLengthTest(item, innerText, 1);
      classContentTest(
        item,
        classNamesByContextMaps[item.textContent as 'Center' | 'Left' | 'Right'],
      );
    });
  });
});
