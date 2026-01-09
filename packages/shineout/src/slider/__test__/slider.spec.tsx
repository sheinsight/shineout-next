import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Slider, Input } from 'shineout';
import { classLengthTest } from '../../tests/structureTest';
import {
  baseTest,
  classTest,
  createClassName,
  displayTest,
  snapshotTest,
  styleTest,
  textContentTest,
} from '../../tests/utils';
import mountTest from '../../tests/mountTest';
import SliderBase from '../__example__/01-base';
import SliderRange from '../__example__/02-range';
import SliderScale from '../__example__/03-scale';
import SliderInput from '../__example__/04-01-input';
import SliderFormat from '../__example__/05-format';
import SliderStep from '../__example__/06-1-step';
import SliderStepZero from '../__example__/06-2-step-0';
import SliderHiderAuto from '../__example__/07-1-hide-auto';
import SliderHiderAll from '../__example__/07-2-hide-all';
import SliderDisabled from '../__example__/08-disabled';
import SliderDisabledFunc from '../__example__/09-disabled-func';
import SliderVirtual from '../__example__/09-virtual';
import SliderIncrease from '../__example__/10-increase';
import SliderValueHover from '../__example__/11-value-hover';
import SliderDiscrete from '../__example__/12-discrete';

const SO_PREFIX = 'slider';
const originClasses = [
  'wrapper',
  'track',
  'scaleWrapper',
  'trackInner',
  'indicator',
  'value',
  'scale',
  'label',
];
const originItemClasses = [
  'indicatorEnd',
  'endValue',
  'indicatorHover',
  'valueHover',
  'indicatorStart',
  'startValue',
  'autoHide',
  'disabled',
];
const {
  wrapper,
  track,
  scaleWrapper,
  trackInner,
  indicator,
  value,
  indicatorEnd,
  endValue,
  scale,
  label,
  indicatorHover,
  valueHover,
  indicatorStart,
  startValue,
  autoHide,
  disabled,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

const innerStyle = (left: number, right: number) => `left: ${left}%; right: ${right}%;`;
const innerStyleVertical = (top: number, bottom: number) => `bottom: ${bottom}%; top: ${top}%;`;
const defaultInnerStyle = innerStyle(0, 100);
const sliderWidth = 200;

afterEach(cleanup);
mountTest(<Slider />);

describe('Slider[Base]', () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      value: sliderWidth,
    });
  });
  displayTest(Slider, 'ShineoutSlider');
  baseTest(Slider, wrapper);
  snapshotTest(<SliderBase />);
  snapshotTest(<SliderRange />, 'about range');
  snapshotTest(<SliderScale />, 'about scale');
  snapshotTest(<SliderInput />, 'about input');
  snapshotTest(<SliderFormat />, 'about format');
  snapshotTest(<SliderStep />, 'about step');
  snapshotTest(<SliderStepZero />, 'about step zero');
  snapshotTest(<SliderHiderAuto />, 'about hider auto');
  snapshotTest(<SliderHiderAll />, 'about hider all');
  snapshotTest(<SliderDisabled />, 'about disabled');
  snapshotTest(<SliderDisabledFunc />, 'about disabled function');
  snapshotTest(<SliderVirtual />, 'about virtual');
  snapshotTest(<SliderIncrease />, 'about increase');
  snapshotTest(<SliderValueHover />, 'about value hover');
  snapshotTest(<SliderDiscrete />, 'about discrete');
  test('should render default', () => {
    const clientX = 100;
    const { container } = render(<Slider />);
    const sliderWrapper = container.querySelector(wrapper);
    const sliderTrack = sliderWrapper?.querySelector(track);
    const sliderScaleWrapper = sliderWrapper?.querySelector(scaleWrapper);
    const sliderTrackInner = sliderTrack?.querySelector(trackInner) as Element;
    styleTest(sliderTrackInner, defaultInnerStyle);
    const sliderIndicator = sliderTrackInner?.querySelector(indicator) as Element;
    classTest(sliderIndicator, indicatorEnd);
    const sliderValue = sliderTrackInner?.querySelector(value) as Element;
    classTest(sliderValue, endValue);
    textContentTest(sliderValue, '0');
    const sliderLabels = sliderScaleWrapper?.querySelectorAll(scale) as NodeListOf<Element>;
    textContentTest(sliderLabels[0].querySelector(label)!, '0');
    textContentTest(sliderLabels[1].querySelector(label)!, '100');
    fireEvent.mouseDown(sliderIndicator);
    fireEvent.mouseMove(sliderIndicator, { clientX });
    fireEvent.mouseUp(sliderIndicator);
    styleTest(sliderTrackInner, innerStyle(0, 50));
    textContentTest(sliderValue, `${(clientX / sliderWidth) * 100}`);
  });
  test('should render when set defaultValue', () => {
    const defaultValue = 50;
    const { container } = render(<Slider defaultValue={defaultValue} />);
    const sliderWrapper = container.querySelector(wrapper);
    textContentTest(sliderWrapper?.querySelector(value) as Element, `${defaultValue}`);
  });
  test('should render when set value and onChange', () => {
    const defaultValue = 50;
    const inputValue = 75;
    const App = () => {
      const [value, setValue] = React.useState(defaultValue);
      const handleChange = (v: number) => {
        setValue(v);
      };
      return (
        <div>
          <Input.Number digits={0} max={100} value={value} onChange={(v: any) => setValue(v)} />
          <Slider value={value} onChange={handleChange} />
        </div>
      );
    };
    const { container } = render(<App />);
    const sliderWrapper = container.querySelector(wrapper);
    const sliderTrack = sliderWrapper?.querySelector(track);
    const sliderTrackInner = sliderTrack?.querySelector(trackInner) as Element;
    const sliderValue = sliderTrackInner?.querySelector(value) as Element;
    textContentTest(sliderValue, `${defaultValue}`);
    fireEvent.change(container.querySelector('input')!, { target: { value: inputValue } });
    styleTest(sliderTrackInner, innerStyle(0, 100 - inputValue));
    textContentTest(sliderValue, `${inputValue}`);
  });
  test('should render when set range', () => {
    const defaultValue = [25, 75];
    const leftValue = -20;
    const rightValue = 20;
    const { container } = render(<Slider defaultValue={defaultValue} range />);
    const sliderWrapper = container.querySelector(wrapper);
    const sliderTrackInner = sliderWrapper?.querySelector(trackInner) as Element;
    styleTest(sliderTrackInner, innerStyle(defaultValue[0], 100 - defaultValue[1]));
    const indicators = sliderTrackInner?.querySelectorAll(indicator) as NodeListOf<Element>;
    const values = sliderTrackInner?.querySelectorAll(value) as NodeListOf<Element>;
    classTest(indicators[0], indicatorStart);
    classTest(indicators[1], indicatorEnd);
    classTest(values[0], startValue);
    classTest(values[1], endValue);
    textContentTest(values[0], `${defaultValue[0]}`);
    textContentTest(values[1], `${defaultValue[1]}`);
    fireEvent.mouseDown(indicators[0]);
    fireEvent.mouseMove(indicators[0], { clientX: leftValue });
    fireEvent.mouseUp(indicators[0]);
    fireEvent.mouseDown(indicators[1]);
    fireEvent.mouseMove(indicators[1], { clientX: rightValue });
    fireEvent.mouseUp(indicators[1]);
    textContentTest(values[0], `${defaultValue[0] + (leftValue / sliderWidth) * 100}`);
    textContentTest(values[1], `${defaultValue[1] + (rightValue / sliderWidth) * 100}`);
  });
  test('should render when right < left in range', () => {
    const defaultValue = [25, 35];
    const rightValue = -40;
    const { container } = render(<Slider defaultValue={defaultValue} range />);
    const indicators = container?.querySelectorAll(indicator) as NodeListOf<Element>;
    fireEvent.mouseDown(indicators[1]);
    fireEvent.mouseMove(indicators[1], { clientX: rightValue });
    fireEvent.mouseUp(indicators[1]);
    const values = container?.querySelectorAll(value) as NodeListOf<Element>;
    textContentTest(values[0], `${defaultValue[1] + (rightValue / sliderWidth) * 100}`);
    textContentTest(values[1], `${defaultValue[0]}`);
  });
  test('should render when set valueTipType is hover', () => {
    const defaultValue = 50;
    const { container } = render(<Slider defaultValue={defaultValue} valueTipType='hover' />);
    const sliderWrapper = container.querySelector(wrapper);
    classTest(sliderWrapper?.querySelector(indicator) as Element, indicatorHover);
    classTest(sliderWrapper?.querySelector(value) as Element, valueHover);
  });
  test('should render when set scale', () => {
    const scaleValues = [0, 10, 100, 250, 500, 1000];
    const { container } = render(<Slider scale={scaleValues} />);
    const sliderScale = container.querySelector(scaleWrapper);
    const scales = sliderScale?.querySelectorAll(scale) as NodeListOf<Element>;
    expect(scales.length).toBe(scaleValues.length);
    scales.forEach((scale, index) => {
      textContentTest(scale.querySelector(label)!, `${scaleValues[index]}`);
    });
  });
  test('should render when set autoHide', () => {
    const { container } = render(<Slider autoHide />);
    const sliderWrapper = container.querySelector(wrapper)!;
    classTest(sliderWrapper, autoHide);
  });
  test('should render when set formatScale and FormatValue', () => {
    const scaleValues = [0, 60, 120, 180, 240, 300, 360, 420, 480, 540];
    const defaultValue = [33, 216];
    const pad = (i: number) => (i < 10 ? `0${i}` : i);

    const format: any = (v: number) => {
      const value = v + 540;
      const hours = Math.floor(value / 60);
      return `${pad(hours)}:${pad(value - hours * 60)}`;
    };

    const { container } = render(
      <Slider
        range
        formatScale={format}
        formatValue={format}
        defaultValue={defaultValue}
        scale={scaleValues}
      />,
    );
    const sliderScale = container.querySelector(scaleWrapper);
    const scales = sliderScale?.querySelectorAll(scale) as NodeListOf<Element>;
    scales.forEach((scale, index) => {
      textContentTest(scale.querySelector(label)!, `${format(scaleValues[index])}`);
    });
    const values = container.querySelectorAll(value) as NodeListOf<Element>;
    values.forEach((value, index) => {
      textContentTest(value, `${format(defaultValue[index])}`);
    });
  });
  test('should render when set step is not 0', () => {
    const sliderStep = 10;
    const sliderScale = [0, 100];
    const defaultValue = [10, 20];
    const clientX = 15;
    const { container } = render(
      <Slider step={sliderStep} scale={sliderScale} defaultValue={defaultValue} range />,
    );
    const indicators = container.querySelectorAll(indicator) as NodeListOf<Element>;
    const values = container.querySelectorAll(value) as NodeListOf<Element>;
    fireEvent.mouseDown(indicators[1]);
    fireEvent.mouseMove(indicators[1], { clientX });
    fireEvent.mouseUp(indicators[1]);
    textContentTest(
      values[1],
      `${Math.floor((defaultValue[1] + clientX) / sliderStep) * sliderStep}`,
    );
  });
  test('should render when set step is 0', () => {
    const sliderScales = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const clientX = 36;
    const { container } = render(<Slider step={0} scale={sliderScales} />);
    const sliderIndicator = container.querySelector(indicator)!;
    const sliderValue = container.querySelector(value)!;
    fireEvent.mouseDown(sliderIndicator);
    fireEvent.mouseMove(sliderIndicator, { clientX });
    fireEvent.mouseUp(sliderIndicator);
    textContentTest(sliderValue, `${Math.ceil(((clientX / sliderWidth) * 100) / 10) * 10}`);
  });
  test('should render when set formatValue and formatScale is false', () => {
    const { container } = render(
      <Slider defaultValue={4} step={1} formatValue={false} formatScale={false} />,
    );
    classLengthTest(container, value, 0);
    classLengthTest(container, scaleWrapper, 0);
  });
  test('should render when set disable', () => {
    const clientX = 100;
    const { container } = render(<Slider disabled />);
    const sliderWrapper = container.querySelector(wrapper)!;
    const sliderIndicator = sliderWrapper?.querySelector(indicator) as Element;
    classTest(sliderWrapper, disabled);
    fireEvent.mouseDown(sliderIndicator);
    fireEvent.mouseMove(sliderIndicator, { clientX });
    fireEvent.mouseUp(sliderIndicator);
    textContentTest(sliderWrapper.querySelector(value)!, '0');
  });
  test('should render when set disabled function', () => {
    const threshold = 30;
    const disabledFunc = (v: number) => v > threshold;
    const { container } = render(<Slider disabled={disabledFunc} />);
    const sliderWrapper = container.querySelector(wrapper)!;
    const sliderTrack = sliderWrapper?.querySelector(track) as Element;
    const sliderValue = sliderWrapper?.querySelector(value) as Element;

    // Mock getBoundingClientRect for track
    sliderTrack.getBoundingClientRect = jest.fn(() => ({
      left: 0,
      width: sliderWidth,
      bottom: 50,
      height: 200,
      top: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));

    // Click at position that would result in value = 25 (allowed)
    const allowedClientX = 50; // 50/200 * 100 = 25
    fireEvent.click(sliderTrack, { clientX: allowedClientX });
    textContentTest(sliderValue, '25');

    // Try to click at position that would result in value = 40 (disabled)
    const disabledClientX = 80; // 80/200 * 100 = 40
    fireEvent.click(sliderTrack, { clientX: disabledClientX });
    // Value should still be 25 because 40 > 30 is disabled
    textContentTest(sliderValue, '25');
  });
  test('should render when set discrete', () => {
    const sliderStep = 10;
    const { container } = render(<Slider step={sliderStep} discrete />);
    const sliderWrapper = container.querySelector(wrapper)!;
    const sliderIndicator = sliderWrapper?.querySelector(indicator) as Element;
    const sliderValue = sliderWrapper?.querySelector(value) as Element;

    // In discrete mode, the indicator should snap to step values during dragging
    fireEvent.mouseDown(sliderIndicator);
    // Move to position that would be 23 without discrete mode
    const clientX = 46; // 46/200 * 100 = 23
    fireEvent.mouseMove(sliderIndicator, { clientX });
    // With discrete mode and step=10, it should snap to 20
    const sliderTrackInner = sliderWrapper?.querySelector(trackInner) as Element;
    // The position should reflect the snapped value during dragging
    styleTest(sliderTrackInner, innerStyle(0, 80)); // 100 - 20 = 80
    fireEvent.mouseUp(sliderIndicator);
    textContentTest(sliderValue, '20');
  });
  test('should render when set onIncrease', () => {
    const clientX = 100;
    const defaultValue = 100;
    const deltaStep = 10;
    const App = () => {
      const [scale, setScale] = React.useState([0, 100]);
      const handleIncrease = () => {
        setScale([0, scale[1] + deltaStep]);
      };
      return <Slider scale={scale} defaultValue={defaultValue} onIncrease={handleIncrease} />;
    };
    const { container } = render(<App />);
    const sliderWrapper = container.querySelector(wrapper)!;
    const sliderIndicator = sliderWrapper?.querySelector(indicator) as Element;
    const sliderValue = sliderWrapper.querySelector(value)!;
    textContentTest(sliderValue, `${defaultValue}`);
    fireEvent.mouseDown(sliderIndicator);
    fireEvent.mouseMove(sliderIndicator, { clientX });
    fireEvent.mouseUp(sliderIndicator);
    textContentTest(sliderValue, `${defaultValue + deltaStep}`);
  });
});
describe('Slider[Click]', () => {
  test('should render when click', () => {
    const clientX = 50;
    const { container } = render(<Slider />);
    const sliderWrapper = container.querySelector(wrapper);
    const sliderTrack = sliderWrapper?.querySelector(track) as Element;
    const sliderTrackInner = sliderTrack?.querySelector(trackInner) as Element;
    const sliderValue = sliderTrackInner?.querySelector(value) as Element;
    sliderTrack.getBoundingClientRect = jest.fn(() => ({
      left: 0,
      width: sliderWidth,
      bottom: 50,
      height: 200,
      top: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));
    fireEvent.click(sliderTrack!, { clientX });
    styleTest(sliderTrackInner, innerStyle(0, 75));
    textContentTest(sliderValue, `${(clientX / sliderWidth) * 100}`);
  });
  test('should render when click in range', () => {
    const clientX = 50;
    const { container } = render(<Slider range />);
    const sliderWrapper = container.querySelector(wrapper);
    const sliderTrack = sliderWrapper?.querySelector(track) as Element;
    const sliderTrackInner = sliderTrack?.querySelector(trackInner) as Element;
    const sliderValues = sliderTrackInner?.querySelectorAll(value);
    sliderTrack.getBoundingClientRect = jest.fn(() => ({
      left: 0,
      width: sliderWidth,
      bottom: 50,
      height: 200,
      top: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));
    fireEvent.click(sliderTrack!, { clientX });
    styleTest(sliderTrackInner, innerStyle(0, 75));
    textContentTest(sliderValues[1], `${(clientX / sliderWidth) * 100}`);
  });
});
describe('Slider[Vertical]', () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      value: sliderWidth,
    });
  });
  test('should render when set vertical', () => {
    const clientY = 20;
    const defaultValue = 50;
    const { container } = render(<Slider vertical defaultValue={defaultValue} />);
    const sliderWrapper = container.querySelector(wrapper)!;
    const sliderIndicator = sliderWrapper?.querySelector(indicator) as Element;
    fireEvent.mouseDown(sliderIndicator);
    fireEvent.mouseMove(sliderIndicator, { clientY });
    fireEvent.mouseUp(sliderIndicator);
    textContentTest(
      sliderWrapper.querySelector(value)!,
      `${defaultValue - (clientY / sliderWidth) * 100}`,
    );
    styleTest(
      sliderWrapper.querySelector(trackInner)!,
      innerStyleVertical(100 - (defaultValue - (clientY / sliderWidth) * 100), 0),
    );
  });
});
