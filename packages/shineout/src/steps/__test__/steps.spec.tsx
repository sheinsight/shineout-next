import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
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
  'dot',
  'arrow',
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
  'error',
  'vertical',
  'horizontalLabel',
  'disabled',
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
  error: errorClassName,
  dot,
  arrow,
  vertical,
  horizontalLabel,
  disabled,
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
    const { container, rerender } = render(
      <StepsTest className={'demo'} style={{ color: 'red' }} />,
    );
    const wrapper = container.querySelector(steps)!;
    classTest(wrapper, 'demo');
    styleTest(wrapper, 'color: red;');
    rerender(
      <Steps>
        <Steps.Step title='Succeeded' className='demo' />
        <Steps.Step title='Processing' />
        <Steps.Step title='Pending' />
      </Steps>,
    );
    classTest(container.querySelectorAll(step)[0], 'demo');
  });
  test('should render default', () => {
    const { container } = render(<StepsTest />);
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
  test('should render when set status in steps', () => {
    const statusClassNameMap: { [key: string]: string } = {
      wait: wait,
      process: process,
      finish: finish,
      error: errorClassName,
    };
    Object.keys(statusClassNameMap).forEach((type) => {
      const { container } = render(<StepsTest status={type} />);
      const stepsWrapper = container.querySelector(steps)!;
      const stepWrapper = stepsWrapper.querySelectorAll(step)!;
      classTest(stepWrapper[0], statusClassNameMap[type]);
      classTest(stepWrapper[0].querySelector(icon)!, statusClassNameMap[type]);
    });
  });
  test('should render when set status in steps and step at the same time', () => {
    const { container } = render(
      <Steps current={1} status='finish'>
        <Steps.Step title='Succeeded' />
        <Steps.Step title='Processing' status='error' />
        <Steps.Step title='Pending' />
      </Steps>,
    );
    const stepsWrapper = container.querySelector(steps)!;
    const stepWrapper = stepsWrapper.querySelectorAll(step)!;
    classTest(stepWrapper[1], errorClassName);
    classTest(stepWrapper[1].querySelector(icon)!, errorClassName);
  });
  test('should render when set renderIcon', () => {
    const { container } = render(<StepsTest renderIcon={() => <div className='demo'>1</div>} />);
    const stepsWrapper = container.querySelector(steps)!;
    const stepWrapper = stepsWrapper.querySelectorAll(step)!;
    stepWrapper.forEach((item) => {
      classLengthTest(item.querySelector(iconWrapper)!, '.demo', 1);
    });
  });
  test('should render when set type is dot', () => {
    const { container } = render(<StepsTest type='dot' />);
    const stepsWrapper = container.querySelector(steps)!;
    const stepWrapper = stepsWrapper.querySelectorAll(step)!;
    stepWrapper.forEach((item) => {
      expect(item.querySelector(dot)).toBeInTheDocument();
    });
  });
  test('should render when set type is dot and renderIcon', () => {
    const { container } = render(
      <StepsTest type='dot' renderIcon={() => <div className='demo'>1</div>} />,
    );
    const stepsWrapper = container.querySelector(steps)!;
    const stepWrapper = stepsWrapper.querySelectorAll(step)!;
    stepWrapper.forEach((item) => {
      classLengthTest(item.querySelector(iconWrapper)!, '.demo', 0);
    });
  });
  test('should render when set type is arrow', () => {
    const { container } = render(<StepsTest type='arrow' />);
    const stepsWrapper = container.querySelector(steps)!;
    const stepWrapper = stepsWrapper.querySelectorAll(step)!;
    stepWrapper.forEach((item) => {
      expect(item.querySelector(arrow)).toBeInTheDocument();
    });
  });
});
describe('Steps[Direction/LabelPlacement]', () => {
  test('should render when set direction', () => {
    const { container } = render(<StepsTest direction={'vertical'} />);
    classTest(container.querySelector(steps)!, vertical);
  });
  test('should render when set direction and labelPlacement is vertical at the same', () => {
    const { container } = render(<StepsTest direction={'vertical'} labelPlacement={'vertical'} />);
    classTest(container.querySelector(steps)!, vertical);
    const stepsWrapper = container.querySelector(steps)!;
    const stepWrapper = stepsWrapper.querySelectorAll(step)!;
    stepWrapper.forEach((item) => {
      classTest(item, horizontalLabel);
    });
  });
  test('should render when set direction is vertical in arrow', () => {
    const { container } = render(<StepsTest direction={'vertical'} type='arrow' />);
    classTest(container.querySelector(steps)!, horizontal);
  });
  test('should render when set labelPlacement', () => {
    const { container } = render(<StepsTest labelPlacement={'horizontal'} />);
    const stepsWrapper = container.querySelector(steps)!;
    const stepWrapper = stepsWrapper.querySelectorAll(step)!;
    stepWrapper.forEach((item) => {
      classTest(item, horizontalLabel);
    });
  });
  test('should render when set direction and labelPlacement is horizontal or vertical at the same time in dot', () => {
    const { container, rerender } = render(
      <StepsTest direction={'horizontal'} type='dot' labelPlacement={'horizontal'} />,
    );
    classTest(container.querySelector(steps)!, horizontal);
    const stepsWrapper = container.querySelector(steps)!;
    const stepWrapper = stepsWrapper.querySelectorAll(step)!;
    stepWrapper.forEach((item) => {
      classTest(item, verticalLabel);
    });
    rerender(<StepsTest direction={'vertical'} type='dot' labelPlacement={'vertical'} />);
    classTest(container.querySelector(steps)!, vertical);
    stepWrapper.forEach((item) => {
      classTest(item, horizontalLabel);
    });
  });
});
describe('Steps[Disabled]', () => {
  test('should render when set disabled is boolean', () => {
    const { container } = render(
      <Steps current={1} status='finish'>
        <Steps.Step title='Succeeded' disabled />
        <Steps.Step title='Processing' status='error' />
        <Steps.Step title='Pending' />
      </Steps>,
    );
    const stepsWrapper = container.querySelector(steps)!;
    const stepWrapper = stepsWrapper.querySelectorAll(step)!;
    classTest(stepWrapper[0], disabled);
    stepWrapper.forEach((item, index) => {
      if (index === 0) return;
      classTest(item, disabled, false);
    });
  });
  test('should render when set disabled is function', () => {
    const { container } = render(
      <Steps current={1} status='finish'>
        <Steps.Step title='Succeeded' disabled={() => true} />
        <Steps.Step title='Processing' status='error' />
        <Steps.Step title='Pending' />
      </Steps>,
    );
    const stepsWrapper = container.querySelector(steps)!;
    const stepWrapper = stepsWrapper.querySelectorAll(step)!;
    classTest(stepWrapper[0], disabled);
    stepWrapper.forEach((item, index) => {
      if (index === 0) return;
      classTest(item, disabled, false);
    });
  });
});
describe('Steps[OnClick/OnChange]', () => {
  test('should render when set onClick', () => {
    const clickFn = jest.fn();
    const { container } = render(
      <Steps>
        <Steps.Step title='Succeeded' />
        <Steps.Step title='Processing' onClick={clickFn} />
        <Steps.Step title='Pending' />
      </Steps>,
    );
    const stepsWrapper = container.querySelector(steps)!;
    const stepWrapper = stepsWrapper.querySelectorAll(step)!;
    fireEvent.click(stepWrapper[1].querySelector(icon)!);
    expect(clickFn.mock.calls.length).toBe(1);
  });
  test('should render when set onChange', () => {
    const ChangeSteps = () => {
      const [current, setCurrent] = React.useState<number>(0);
      const changeFn = (index: number) => {
        setCurrent(index);
      };
      return (
        <Steps current={current} onChange={changeFn}>
          <Steps.Step title='Succeeded' />
          <Steps.Step title='Processing' />
          <Steps.Step title='Pending' />
        </Steps>
      );
    };
    const { container } = render(<ChangeSteps />);
    const stepsWrapper = container.querySelector(steps)!;
    const stepWrapper = stepsWrapper.querySelectorAll(step)!;
    classTest(stepWrapper[0], process);
    classTest(stepWrapper[1], wait);
    fireEvent.click(stepWrapper[1].querySelector(icon)!);
    classTest(stepWrapper[0], finish);
    classTest(stepWrapper[1], process);
  });
});
