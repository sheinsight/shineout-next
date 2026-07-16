import { useState } from 'react';
import '@testing-library/jest-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Spin from '..';
import { Button, setConfig } from 'shineout';
import {
  snapshotTest,
  styleTest,
  classTest,
  textContentTest,
  displayTest,
  baseTest,
  childrenTest,
  createClassName,
  styleContentTest,
} from '../../tests/utils';
import mountTest from '../../tests/mountTest';
import { classLengthTest } from '../../tests/structureTest';
import SpinBase from '../__example__/01-base-1';
import SpinBaseAll from '../__example__/01-base-2';
import SpinMode from '../__example__/02-mode';
import SpinTip from '../__example__/04-tip';

const SO_PREFIX = 'spin';

const {
  default: spinDefaultClassName,
  spin: spinClassName,
  ring: spinRingClassName,
  item: spinItemClassName,
  plane: spinPlaneClassName,
  pulse: spinPulseClassName,
  chasingDots: spinChasingDotsClassName,
  cubeGrid: spinCubeGridClassName,
  doubleBounce: spinDoubleBounceClassName,
  fadingCircle: spinFadingCircleClassName,
  fade: spinFadeClassName,
  fourDots: spinFourDotsClassName,
  threeBounce: spinThreeBounceClassName,
  vertical: spinVerticalClassName,
  horizontal: spinHorizontalClassName,
  wave: spinWaveClassName,
  chasingRing: spinChasingRingClassName,
  content: spinContentClassName,
  tip: spinTipClassName,
  container: spinContainerClassName,
  loading: spinLoadingClassName,
  ringOther: spinRingOtherClassName,
} = createClassName(SO_PREFIX, ['spin', 'ring', 'item', 'plane', 'pulse', 'content', 'tip', 'container', 'loading', 'ring', 'default', 'chasingDots', 'cubeGrid', 'doubleBounce', 'fadingCircle', 'fourDots', 'wave', 'chasingRing', 'threeBounce'], ['fade', 'vertical', 'horizontal'])

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
  `${styleRenderXY(size)} border-width: ${toNumber(size) / 10}px;`;
const styleAuto = (size: number | string) => `width: ${toNumber(size) * 2}px; height: auto;`;
const style = styleRenderXY(40);

afterEach(cleanup);
mountTest(Spin);
describe('Spin[Base]', () => {
  displayTest(Spin, 'ShineoutSpin');
  test('should render when set style and className', () => {
    const { container } = render(<Spin style={{ backgroundColor: 'red' }} className='demo' />);
    const spin = container.querySelector(spinClassName)!;
    // [TODO] 需要调整测试用例
    // classTest(spin, 'demo');
    styleContentTest(spin, 'background-color: red;');
  })
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
      const spin = container.querySelector(spinObj[name][0] as string)!;
      expect(spin).toBeInTheDocument()
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
    const spin = container.querySelector(spinThreeBounceClassName)!;
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
    expect(container.querySelector(spinClassName)!).toBeInTheDocument();
  });
});
describe('Spin[Loading]', () => {
  test('should render when set loading', () => {
    const Demo = () => {
      return (
        <Spin name='ring' loading>
            <div>Demo</div>
          </Spin>
      );
    };
    const { container } = render(<Demo />);
    expect(
      container.querySelector(spinLoadingClassName)
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

describe('Spin[Semantic styles]', () => {
  test('styles prop applies to root in standalone mode with tip', () => {
    const { container } = render(
      <Spin name='ring' tip='Loading' styles={{ root: { border: '1px solid red' } }} />,
    );
    const root = container.querySelector(spinContentClassName)! as HTMLElement;
    expect(root.style.border).toBe('1px solid red');
  });

  test('styles prop applies to indicator', () => {
    const { container } = render(
      <Spin name='ring' styles={{ indicator: { transform: 'scale(1.5)' } }} />,
    );
    const indicator = container.querySelector(spinClassName)! as HTMLElement;
    expect(indicator.style.transform).toBe('scale(1.5)');
  });

  test('styles prop applies to description', () => {
    const { container } = render(
      <Spin name='ring' tip='Loading' styles={{ description: { fontSize: '14px' } }} />,
    );
    const desc = container.querySelector(spinTipClassName)! as HTMLElement;
    expect(desc.style.fontSize).toBe('14px');
  });

  test('styles prop applies to root and section in container mode', () => {
    const { container } = render(
      <Spin
        name='ring'
        loading
        styles={{ root: { border: '2px solid blue' }, section: { backdropFilter: 'blur(2px)' } }}
      >
        <div>Content</div>
      </Spin>,
    );
    const root = container.querySelector(spinContainerClassName)! as HTMLElement;
    expect(root.style.border).toBe('2px solid blue');
    const section = root.querySelector(spinLoadingClassName)! as HTMLElement;
    expect(section.style.backdropFilter).toBe('blur(2px)');
  });
});

describe('Spin[Semantic classNames]', () => {
  test('static classNames applies to all keys', () => {
    const { container } = render(
      <Spin
        name='ring'
        tip='Loading'
        loading
        classNames={{
          root: 'my-root',
          section: 'my-section',
          indicator: 'my-indicator',
          description: 'my-desc',
        }}
      >
        <div>Content</div>
      </Spin>,
    );
    expect(container.querySelector('.my-root')).toBeInTheDocument();
    expect(container.querySelector('.my-section')).toBeInTheDocument();
    expect(container.querySelector('.my-indicator')).toBeInTheDocument();
    expect(container.querySelector('.my-desc')).toBeInTheDocument();
  });

  test('functional classNames receives loading=true in container mode', () => {
    const rootFn = jest.fn(({ loading }: { loading: boolean }) =>
      loading ? 'fn-loading' : 'fn-idle',
    );
    const { container } = render(
      <Spin name='ring' loading classNames={{ root: rootFn }}>
        <div>Content</div>
      </Spin>,
    );
    expect(container.querySelector('.fn-loading')).toBeInTheDocument();
    const lastCall = rootFn.mock.calls[rootFn.mock.calls.length - 1][0];
    expect(lastCall.loading).toBe(true);
  });

  test('functional classNames receives loading=true in standalone mode', () => {
    const rootFn = jest.fn(({ loading }: { loading: boolean }) =>
      loading ? 'fn-loading' : 'fn-idle',
    );
    const { container } = render(
      <Spin name='ring' tip='hi' classNames={{ root: rootFn }} />,
    );
    expect(container.querySelector('.fn-loading')).toBeInTheDocument();
  });
});

describe('Spin[Semantic setConfig]', () => {
  afterEach(() => {
    setConfig({ spin: 'ring' });
  });

  test('setConfig classNames applies globally', () => {
    setConfig({
      spin: {
        name: 'ring',
        classNames: { indicator: 'global-indicator', description: 'global-desc' },
      },
    });
    const { container } = render(<Spin tip='hi' />);
    expect(container.querySelector('.global-indicator')).toBeInTheDocument();
    expect(container.querySelector('.global-desc')).toBeInTheDocument();
  });

  test('setConfig styles applies globally', () => {
    setConfig({
      spin: {
        name: 'ring',
        styles: { description: { padding: '8px' } },
      },
    });
    const { container } = render(<Spin tip='hi' />);
    const desc = container.querySelector(spinTipClassName)! as HTMLElement;
    expect(desc.style.padding).toBe('8px');
  });

  test('component-level classNames takes priority over setConfig', () => {
    setConfig({
      spin: {
        name: 'ring',
        classNames: { indicator: 'global-indicator' },
      },
    });
    const { container } = render(
      <Spin classNames={{ indicator: 'local-indicator' }} />,
    );
    expect(container.querySelector('.local-indicator')).toBeInTheDocument();
    expect(container.querySelector('.global-indicator')).toBeInTheDocument();
  });
});
