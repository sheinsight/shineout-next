import { useState } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Spin from '..';
import { Button } from 'shineout';
import {
  snapshotTest,
  styleTest,
  classTest,
  textContentTest,
  displayTest,
  baseTest,
  childrenTest,
} from '../../tests/utils';
import mountTest from '../../tests/mountTest';
import { classLengthTest } from '../../tests/structureTest';
import SpinBase from '../__example__/01-base-1';
import SpinBaseAll from '../__example__/01-base-2';
import SpinMode from '../__example__/02-mode';
import SpinTip from '../__example__/04-tip';

const SO_PREFIX = 'spin';
const spinDefaultClassName = `${SO_PREFIX}-default-0-2-20`;
const spinClassName = `.${SO_PREFIX}-spin-0-2-36`;
const spinRingClassName = `.${SO_PREFIX}-ring-0-2-31`;
const spinItemClassName = `.${SO_PREFIX}-item-0-2-25`;
const spinChasingDotsClassName = `${SO_PREFIX}-chasingDots-0-2-21`;
const spinCubeGridClassName = `${SO_PREFIX}-cubeGrid-0-2-22`;
const spinDoubleBounceClassName = `${SO_PREFIX}-doubleBounce-0-2-23`;
const spinFadingCircleClassName = `${SO_PREFIX}-fadingCircle-0-2-26`;
const spinFadeClassName = `${SO_PREFIX}-fade-0-2-35`;
const spinFourDotsClassName = `${SO_PREFIX}-fourDots-0-2-28`;
const spinPlaneClassName = `.${SO_PREFIX}-plane-0-2-29`;
const spinPulseClassName = `.${SO_PREFIX}-pulse-0-2-30`;
const spinThreeBounceClassName = `${SO_PREFIX}-threeBounce-0-2-32`;
const spinWaveClassName = `${SO_PREFIX}-wave-0-2-33`;
const spinChasingRingClassName = `${SO_PREFIX}-chasingRing-0-2-34`;
const spinContentClassName = `.${SO_PREFIX}-content-0-2-37`;
const spinVerticalClassName = `${SO_PREFIX}-vertical-0-2-41`;
const spinTipClassName = `.${SO_PREFIX}-tip-0-2-40`;
const spinHorizontalClassName = `${SO_PREFIX}-horizontal-0-2-42`;
const spinContainerClassName = `.${SO_PREFIX}-container-0-2-38`;
const spinLoadingClassName = `.${SO_PREFIX}-loading-0-2-60`;
const spinLoadingOtherClassName = `.${SO_PREFIX}-loading-0-2-39`;
const spinRingOtherClassName = `.${SO_PREFIX}-ring-0-2-52`;

type SpinNameType =
  | 'default'
  | 'chasing-dots'
  | 'cube-grid'
  | 'double-bounce'
  | 'fading-circle'
  | 'four-dots'
  | 'plane'
  | 'pulse'
  | 'ring'
  | 'scale-circle'
  | 'three-bounce'
  | 'wave'
  | 'chasing-ring';

const spinObj: { [key: string]: (string | number)[] } = {
  default: [spinDefaultClassName, 12],
  'chasing-dots': [spinChasingDotsClassName, 2],
  'cube-grid': [spinCubeGridClassName, 9],
  'double-bounce': [spinDoubleBounceClassName, 2],
  'fading-circle': [spinFadingCircleClassName, 12],
  'four-dots': [spinFourDotsClassName, 4],
  'scale-circle': [spinFadingCircleClassName, 12],
  wave: [spinWaveClassName, 5],
  'chasing-ring': [spinChasingRingClassName, 4],
};
const spinObjWithoutItem: { [key: string]: string } = {
  plane: spinPlaneClassName,
  pulse: spinPulseClassName,
};
const size = 20;
const sizeFS = '30px';

// converted to number when set size is string
const toNumber = (size: number | string) =>
  typeof size === 'number' ? size : Number(size.slice(0, -2));
const styleRenderXY = (size: number | string) =>
  `width: ${toNumber(size)}px; height: ${toNumber(size)}px;`;
const styleRender = (size: number | string) =>
  `${styleRenderXY(size)} border-width: ${toNumber(size) / 10}px; font-size: ${
    toNumber(size) / 10
  }px;`;
const styleAuto = (size: number | string) => `width: ${toNumber(size) * 2}px; height: auto;`;
const style = styleRenderXY(40);

afterEach(cleanup);
mountTest(Spin);
describe('Spin[Base]', () => {
  displayTest(Spin, 'ShineoutSpin');
  baseTest(Spin, spinClassName, { backgroundColor: 'red' }, style + ' background-color: red;');
  childrenTest(Spin, spinContainerClassName);
  snapshotTest(<SpinBase />);
  snapshotTest(<SpinBaseAll />);
  test('should render when set color', () => {
    const color = 'red';
    const { container } = render(<Spin color={color} />);
    const items = container.querySelectorAll(spinItemClassName);
    items.forEach((item) => {
      expect(
        item.querySelector('div')?.getAttribute('style')?.includes(`background-color: ${color};`),
      ).toBeTruthy();
    });
  });
});
describe('Spin[Name/Size]', () => {
  Object.keys(spinObj).forEach((name) => {
    test(`should render when set name is ${name}`, () => {
      const { container, rerender } = render(<Spin name={name as SpinNameType} />);
      const spin = container.querySelector(spinClassName)!;
      classTest(spin, spinObj[name][0] as string);
      styleTest(spin, style);
      classLengthTest(spin, spinItemClassName, spinObj[name][1] as number);
      rerender(<Spin name={name as SpinNameType} size={size} />);
      styleTest(spin, styleRenderXY(size));
      rerender(<Spin name={name as SpinNameType} size={sizeFS} />);
      styleTest(spin, styleRenderXY(sizeFS));
      if (name !== 'fading-circle') return;
      container.querySelectorAll(spinItemClassName).forEach((item) => {
        classTest(item, spinFadeClassName);
      });
    });
  });
  Object.keys(spinObjWithoutItem).forEach((name) => {
    test(`should render when set name is ${name}`, () => {
      const { container, rerender } = render(<Spin name={name as SpinNameType} />);
      const spin = container.querySelector(spinObjWithoutItem[name])!;
      expect(spin).toBeTruthy();
      styleTest(spin, style);
      rerender(<Spin name={name as SpinNameType} size={size} />);
      styleTest(spin, styleRenderXY(size));
      rerender(<Spin name={name as SpinNameType} size={sizeFS} />);
      styleTest(spin, styleRenderXY(sizeFS));
    });
  });
  test('should render when set name is ring', () => {
    const { container, rerender } = render(<Spin name='ring' />);
    const spin = container.querySelector(spinRingClassName)!;
    expect(spin).toBeTruthy();
    styleTest(spin, styleRender(40));
    rerender(<Spin name='ring' size={size} />);
    styleTest(spin, styleRender(size));
    rerender(<Spin name='ring' size={sizeFS} />);
    styleTest(spin, styleRender(sizeFS));
  });
  test('should render when set name is three-bounce', () => {
    const { container, rerender } = render(<Spin name='three-bounce' />);
    const spin = container.querySelector(spinClassName)!;
    classTest(spin, spinThreeBounceClassName);
    styleTest(spin, 'width: 80px; height: auto;');
    classLengthTest(spin, spinItemClassName, 3);
    rerender(<Spin name='three-bounce' size={size} />);
    styleTest(spin, styleAuto(size));
    rerender(<Spin name='three-bounce' size={sizeFS} />);
    styleTest(spin, styleAuto(sizeFS));
  });
});
describe('Spin[Tip]', () => {
  snapshotTest(<SpinTip />);
  const tipTest = (container: Element, text: string) => {
    const spin = container.querySelector(spinContentClassName)!;
    classTest(spin, spinVerticalClassName);
    expect(spin.querySelector(spinTipClassName)).toBeTruthy();
    textContentTest(spin.querySelector(spinTipClassName)!, text);
  };
  test('should render when set tip is string', () => {
    const text = 'loading';
    const { container } = render(<Spin name={'ring' as SpinNameType} tip={text} />);
    tipTest(container, text);
  });
  test('should rende when set tip is function', () => {
    const { container } = render(<SpinTip />);
    tipTest(container, 'This may take a while...');
  });
});
describe('Spin[Mode]', () => {
  snapshotTest(<SpinMode />);
  test('should render when set mode', () => {
    const { container } = render(<SpinMode />);
    const spins = container.querySelectorAll(spinContentClassName);
    classTest(spins[0], spinVerticalClassName);
    classTest(spins[1], spinHorizontalClassName);
  });
});
describe('Spin[inexistence]', () => {
  test('should render when set name is inexistence', () => {
    const inexistenceName = 'hello';
    const { container } = render(<Spin name={inexistenceName as SpinNameType} />);
    classLengthTest(container, spinClassName, 0);
  });
  test('should render when set name is undefined', () => {
    const { container } = render(<Spin name={undefined} />);
    classLengthTest(container, spinClassName, 1);
    classTest(container.querySelector(spinClassName)!, spinDefaultClassName);
  });
});
describe('Spin[Loading]', () => {
  test('should render when set loading', () => {
    const Demo = () => {
      const [load, setLoad] = useState<boolean>(false);
      return (
        <div>
          <Button
            onClick={() => {
              setLoad(!load);
            }}
          >
            Click
          </Button>
          <Spin name='ring' loading={load}>
            <div>Demo</div>
          </Spin>
        </div>
      );
    };
    const { container } = render(<Demo />);
    const buttonCon = container.querySelector('button') as HTMLButtonElement;
    expect(
      container.querySelector(spinLoadingClassName) ||
        container.querySelector(spinLoadingOtherClassName),
    ).toBeFalsy();
    fireEvent.click(buttonCon);
    expect(
      container.querySelector(spinLoadingClassName) ||
        container.querySelector(spinLoadingOtherClassName),
    ).toBeTruthy();
  });
  test('should render when set loading without children', () => {
    const Demo = () => {
      const [load, setLoad] = useState<boolean>(false);
      return (
        <div>
          <Button
            onClick={() => {
              setLoad(!load);
            }}
          >
            Click
          </Button>
          <Spin name='ring' loading={load} />
        </div>
      );
    };
    const { container } = render(<Demo />);
    const buttonCon = container.querySelector('button') as HTMLButtonElement;
    expect(
      container.querySelector(spinRingOtherClassName) || container.querySelector(spinRingClassName),
    ).toBeTruthy();
    fireEvent.click(buttonCon);
    expect(
      container.querySelector(spinRingOtherClassName) || container.querySelector(spinRingClassName),
    ).toBeTruthy();
  });
});
