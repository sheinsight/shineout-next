import { JsStyles } from '../jss-style';

import Default from './default';
import chasingDots from './chasing-dots';
import cubeGrid from './cube-grid';
import doubleBounce from './double-bounce';
import fadingCircle from './fading-circle';
import scaleCircle from './scale-circle';
import fourDots from './four-dots';
import plane from './plane';
import pulse from './pulse';
import ring from './ring';
import threeBounce from './tree-bounce';

import Animation from './animation';

export type SpinClass =
  | 'default'
  | 'chasingDots'
  | 'cubeGrid'
  | 'doubleBounce'
  | 'dots'
  | 'item'
  | 'fadingCircle'
  | 'scaleCircle'
  | 'fade'
  | 'fourDots'
  | 'plane'
  | 'pulse'
  | 'ring'
  | 'threeBounce'
  | '@keyframes keyframesFade';

const spinStyle: JsStyles<SpinClass> = {
  ...Animation,
  default: Default(12),
  chasingDots,
  cubeGrid,
  doubleBounce,
  dots: {},
  item: {},
  fadingCircle,
  scaleCircle,
  fourDots,
  plane,
  pulse,
  ring,
  threeBounce,
  fade: {},
};

export default spinStyle;
