import { JsStyles } from '../jss-style';

import Default from './default';
import chasingDots from './chasing-dots';
import cubeGrid from './cube-grid';
import doubleBounce from './double-bounce';
import Animation from './animation';

export type SpinClass =
  | 'default'
  | 'chasingDots'
  | 'cubeGrid'
  | 'doubleBounce'
  | 'dots'
  | 'item'
  | '@keyframes keyframesFade';

const spinStyle: JsStyles<SpinClass> = {
  ...Animation,
  default: Default(12),
  chasingDots,
  cubeGrid,
  doubleBounce,
  dots: {},
  item: {},
};

export default spinStyle;
