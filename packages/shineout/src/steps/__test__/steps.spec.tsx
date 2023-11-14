import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Steps from '..';
import { classLengthTest } from '../../tests/structureTest';
import {
  childrenTest,
  classTest,
  createClassName,
  snapshotTest,
  styleTest,
  textContentTest,
} from '../../tests/utils';
import mountTest from '../../tests/mountTest';
import StepsBase from '../__example__/01-base';
import StepsSize from '../__example__/02-size';
import StepsDescription from '../__example__/03-description';
import StepsStatus from '../__example__/04-status';
import StepsIcon from '../__example__/05-icon';
import StepsType from '../__example__/06-type';
import StepsDirection from '../__example__/07-direction';
import StepsLabelPlacement from '../__example__/08-label-placement';

const SO_PREFIX = 'steps';
const originClasses = [
  'steps',
  'step',
  'tail',
  'icon',
  'iconWrapper',
  'content',
  'title',
  'description',
];
const originItemClasses = [
  'default',
  'horizontal',
  'process',
  'verticalLabel',
  'wait',
  'small',
  'large',
  'finish',
];
const {
  steps,
  step,
  tail,
  icon,
  iconWrapper,
  content,
  title,
  default: defaultClassName,
  horizontal,
  process,
  verticalLabel,
  wait,
  small,
  large,
  description,
  finish,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

const StepsTest = (props: any) => (
  <Steps {...props}>
    <Steps.Step title='Succeeded' />
    <Steps.Step title='Processing' />
    <Steps.Step title='Pending' />
  </Steps>
);

afterEach(cleanup);
mountTest(<StepsTest />);

describe('Steps[Base]', () => {
  childrenTest(Steps as any, steps);
  snapshotTest(<StepsBase />);
  snapshotTest(<StepsSize />, 'about size');
  snapshotTest(<StepsDescription />, 'about description');
  snapshotTest(<StepsStatus />, 'about status');
  snapshotTest(<StepsIcon />, 'about icon');
  snapshotTest(<StepsType />, 'about type');
  snapshotTest(<StepsDirection />, 'about direction');
  snapshotTest(<StepsLabelPlacement />, 'about labelPlacement');
  test('should start with Shineout display', () => {
    expect(Steps.displayName).toBe('ShineoutSteps');
    expect(Steps.Step.displayName).toBe('ShineoutStep');
  });
  test('should render when set style and className', () => {
    const { container } = render(<StepsTest className={'demo'} style={{ color: 'red' }} />);
    const wrapper = container.querySelector(steps)!;
    classTest(wrapper, 'demo');
    styleTest(wrapper, 'color: red;');
  });
  test('should render default', () => {
    const { container } = render(<StepsTest />);
    screen.debug();
    const stepsWrapper = container.querySelector(steps)!;
    classTest(stepsWrapper, defaultClassName);
    classTest(stepsWrapper, horizontal);
    const stepWrapper = stepsWrapper.querySelectorAll(step)!;
    expect(stepWrapper.length).toBe(3);
    classTest(stepWrapper[0], process);
    stepWrapper.forEach((item, index) => {
      if (index === 0) return;
      classTest(item, wait);
    });
    stepWrapper.forEach((item, index) => {
      classTest(item, verticalLabel);
      classLengthTest(item, tail, 1);
      const iconsWrapper = item.querySelector(icon)!;
      textContentTest(iconsWrapper.querySelector(iconWrapper)!, `${index + 1}`);
      expect(item.querySelector(content)?.querySelector(title)).toBeInTheDocument();
    });
  });
  const sizeClassNameMap: { [key: string]: string } = {
    small: small,
    large: large,
  };
  test.each(['small', 'large'])('should render when set size is %s', (type) => {
    const { container } = render(<StepsTest size={type} />);
    classTest(container.querySelector(steps)!, sizeClassNameMap[type]);
  });
  test('should render when set description', () => {
    const { container } = render(
      <Steps>
        <Steps.Step title='Succeeded' description={'1'} />
        <Steps.Step title='Processing' description={'2'} />
        <Steps.Step title='Pending' description={'3'} />
      </Steps>,
    );
    const stepsWrapper = container.querySelector(steps)!;
    const stepWrapper = stepsWrapper.querySelectorAll(step)!;
    stepWrapper.forEach((item, index) => {
      textContentTest(item.querySelector(description)!, `${index + 1}`);
    });
  });
  test('should render when set current', () => {
    const { container } = render(<StepsTest current={1} />);
    const stepsWrapper = container.querySelector(steps)!;
    const stepWrapper = stepsWrapper.querySelectorAll(step)!;
    classTest(stepWrapper[0], finish);
    classTest(stepWrapper[1], process);
    classTest(stepWrapper[2], wait);
  });
});
