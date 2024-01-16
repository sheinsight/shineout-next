import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Slider from '..';
import { baseTest, createClassName, displayTest, snapshotTest } from '../../tests/utils';
import mountTest from '../../tests/mountTest';
import SliderBase from '../__example__/01-base';
import SliderRange from '../__example__/02-range';
import SliderScale from '../__example__/03-scale';
import SliderInput from '../__example__/04-input';
import SliderFormat from '../__example__/05-format';
import SliderStep from '../__example__/06-1-step';
import SliderStepZero from '../__example__/06-2-step-0';
import SliderHiderAuto from '../__example__/07-1-hide-auto';
import SliderHiderAll from '../__example__/07-2-hide-all';
import SliderDisabled from '../__example__/08-disabled';
import SliderVirtual from '../__example__/09-virtual';
import SliderIncrease from '../__example__/10-increase';
import SliderValueHover from '../__example__/11-value-hover';

const SO_PREFIX = 'slider';
const originClasses = ['wrapper'];
const originItemClasses = [''];
const { wrapper } = createClassName(SO_PREFIX, originClasses, originItemClasses);

afterEach(cleanup);
mountTest(<Slider />);

describe('Slider[Base]', () => {
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
  snapshotTest(<SliderVirtual />, 'about virtual');
  snapshotTest(<SliderIncrease />, 'about increase');
  snapshotTest(<SliderValueHover />, 'about value hover');
  test('should render default', () => {
    render(<Slider />);
    screen.debug();
  });
});
