import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Progress from '..';
import mountTest from '../../tests/mountTest';
import {
  attributesTest,
  baseTest,
  childrenTest,
  classTest,
  createClassName,
  delay,
  displayTest,
  snapshotTest,
  styleTest,
  textContentTest,
} from '../../tests/utils';
import ProgressBase from '../__example__/01-base';
import ProgressLinePop from '../__example__/02-line-pop';
import ProgressType from '../__example__/03-type';
import ProgressCircle from '../__example__/04-circle';
import ProgressLineInner from '../__example__/05-line-inner';
import ProgressColor from '../__example__/06-color';
import ProgressSize from '../__example__/07-size';
import ProgressAnimation from '../__example__/08-animation';

const SO_PREFIX = 'progress';
const originClasses = [
  'wrapper',
  'lineBg',
  'lineFront',
  'linePopWrapper',
  'linePopValue',
  'linePopArrow',
  'content',
  'icon',
];
const originItemClasses = [
  'wrapperSuccess',
  'wrapperInfo',
  'wrapperWarning',
  'wrapperDanger',
  'line',
  'lineDefault',
  'linePop',
  'lineInner',
  'circle',
  'circleBg',
  'circleFront',
];
const {
  wrapper,
  wrapperSuccess,
  wrapperInfo,
  wrapperWarning,
  wrapperDanger,
  line,
  lineDefault,
  lineBg,
  lineFront,
  linePop,
  linePopWrapper,
  linePopValue,
  linePopArrow,
  lineInner,
  content,
  circle,
  circleBg,
  circleFront,
  icon,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

const {
  wrapper: radioClassName,
} = createClassName('radio', ['wrapper'], ['']);

type typeType = 'success' | 'info' | 'warning' | 'danger' | undefined;
const typeClassNameMap: { [key: string]: string } = {
  success: wrapperSuccess,
  info: wrapperInfo,
  warning: wrapperWarning,
  danger: wrapperDanger,
};
type strokeLinecapType = 'round' | 'butt' | 'square' | 'inherit' | undefined;

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.runAllTimers();
});
afterEach(cleanup);
mountTest(<Progress />);

describe('Progress[Base]', () => {
  displayTest(Progress, 'ShineoutProgress');
  baseTest(Progress, wrapper);
  childrenTest(Progress, wrapper);
  snapshotTest(<ProgressBase />);
  snapshotTest(<ProgressLinePop />, 'about linePop');
  snapshotTest(<ProgressType />, 'about type');
  snapshotTest(<ProgressCircle />, 'about circle');
  snapshotTest(<ProgressLineInner />, 'about lineInner');
  snapshotTest(<ProgressColor />, 'about color');
  snapshotTest(<ProgressAnimation />, 'about animation');
  test('should render correctly about linepop', () => {
    const { container } = render(<ProgressLinePop />);
    fireEvent.click(container.querySelector('button')!);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render correctly about animation', () => {
    const { container } = render(<ProgressAnimation />);
    fireEvent.click(container.querySelector('button')!);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render correctly about size', async () => {
    const { container } = render(<ProgressSize />);
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(container.querySelectorAll(radioClassName)[0]);
    await waitFor(async () => {
      await delay(200);
    });
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(container.querySelectorAll(radioClassName)[2]);
    await waitFor(async () => {
      await delay(200);
    });
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render default', () => {
    const { container } = render(<Progress />);
    const progressWrapper = container.querySelector(wrapper)!;
    classTest(progressWrapper, line);
    classTest(progressWrapper, wrapperInfo);
    classTest(progressWrapper, lineDefault);
    const progressLineBg = progressWrapper.querySelector(lineBg)!;
    const progressLineFront = progressLineBg.querySelector(lineFront)!;
    styleTest(progressLineFront, 'width: 0%;');
  });
  test('should render when set value', () => {
    const value = 20;
    const { container } = render(<Progress value={value} />);
    const progressLineFront = container.querySelector(lineFront)!;
    styleTest(progressLineFront, `width: ${value}%;`);
  });
  test.each(['success', 'info', 'warning', 'danger'])(
    'should render when set type is %s',
    (type) => {
      const { container } = render(<Progress value={20} type={type as typeType} />);
      const progressWrapper = container.querySelector(wrapper)!;
      classTest(progressWrapper, typeClassNameMap[type]);
    },
  );
  test('should render when set color is string', () => {
    const { container } = render(<Progress value={20} color={'#531dab'} />);
    const progressLineFront = container.querySelector(lineFront)!;
    styleTest(
      progressLineFront,
      `width: 20%; background: rgb(83, 29, 171); background-size: 1em 1em;`,
    );
  });
  test('should render when set shape is line-pop', () => {
    const { container } = render(
      <Progress shape='line-pop' value={20}>
        children
      </Progress>,
    );
    const progressWrapper = container.querySelector(wrapper)!;
    classTest(progressWrapper, linePop);
    const progressLinePopWrapper = progressWrapper.querySelector(linePopWrapper)!;
    styleTest(progressLinePopWrapper, 'left: 20%; transform: translateX(-50%) rotate(5deg);');
    textContentTest(progressLinePopWrapper.querySelector(linePopValue)!, 'children');
    expect(progressLinePopWrapper.querySelector(linePopArrow)).toBeInTheDocument();
  });
  test('should render when set shape is linner-inner', () => {
    const { container } = render(
      <Progress value={20} shape='line-inner'>
        children
      </Progress>,
    );
    const progressWrapper = container.querySelector(wrapper)!;
    classTest(progressWrapper, lineInner);
    textContentTest(progressWrapper.querySelector(content)!, 'children');
  });
  test('should render when set shape is circle', () => {
    const defaultSize = 64;
    const { container } = render(
      <Progress value={20} shape='circle'>
        children
      </Progress>,
    );
    const progressWrapper = container.querySelector(wrapper)!;
    classTest(progressWrapper, circle);
    styleTest(progressWrapper, `width: ${defaultSize}px; height: ${defaultSize}px;`);
    const progressSvg = progressWrapper.querySelector('svg');
    const progressCircles = progressSvg?.querySelectorAll('circle') as NodeListOf<SVGCircleElement>;
    classTest(progressCircles[0], circleBg);
    classTest(progressCircles[1], circleFront);
    progressCircles.forEach((item) => {
      attributesTest(item, 'cx', `${defaultSize / 2}`);
      attributesTest(item, 'cy', `${defaultSize / 2}`);
      attributesTest(item, 'stroke-width', '4');
      attributesTest(item, 'fill', 'transparent');
      attributesTest(item, 'r', `${(defaultSize - 4) / 2}`);
    });
    textContentTest(progressWrapper.querySelector(content)!, 'children');
  });
  test('should render when set size in circle', () => {
    const { container } = render(
      <Progress value={20} shape='circle' size={50}>
        children
      </Progress>,
    );
    const progressWrapper = container.querySelector(wrapper)!;
    styleTest(progressWrapper, 'width: 50px; height: 50px;');
  });
  test('should render when set strokeWidth in circle', () => {
    const { container } = render(
      <Progress value={20} shape='circle' strokeWidth={6}>
        children
      </Progress>,
    );
    const progressCircles = container?.querySelectorAll('circle') as NodeListOf<SVGCircleElement>;
    progressCircles.forEach((item) => {
      attributesTest(item, 'stroke-width', '6');
    });
  });
  test('should render when set icon', () => {
    const { container } = render(<Progress value={20} shape='circle' icon />);
    expect(container.querySelector(icon)).toBeInTheDocument();
  });
  test.each(['round', 'butt', 'square', 'inherit'])(
    'should render when set strokeLinecap is %s',
    (type) => {
      const { container } = render(
        <Progress value={20} strokeLinecap={type as strokeLinecapType} shape='circle' />,
      );
      const progressCircles = container?.querySelectorAll('circle') as NodeListOf<SVGCircleElement>;
      attributesTest(progressCircles[1], 'stroke-linecap', type);
    },
  );
  test('should render when set background', () => {
    const { container } = render(<Progress background='#531dab' value={20} />);
    styleTest(container.querySelector(lineBg)!, 'background: rgb(83, 29, 171);');
  });
  test('should render when set popup', () => {
    const { container } = render(
      <Progress popup value={20}>
        children
      </Progress>,
    );
    const progressWrapper = container.querySelector(wrapper)!;
    classTest(progressWrapper, linePop);
    const progressLinePopWrapper = progressWrapper.querySelector(linePopWrapper)!;
    styleTest(progressLinePopWrapper, 'left: 20%; transform: translateX(-50%) rotate(5deg);');
    textContentTest(progressLinePopWrapper.querySelector(linePopValue)!, 'children');
    expect(progressLinePopWrapper.querySelector(linePopArrow)).toBeInTheDocument();
  });
});
