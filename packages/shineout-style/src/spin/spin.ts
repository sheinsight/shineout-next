import { JsStyles } from '../jss-style';

import Default from './default';
import ChasingDots from './chasing-dots';
import CubeGrid from './cube-grid';
import Animation from './animation';

export type SpinClass =
  | 'default'
  | 'chasingDots'
  | 'cubeGrid'
  | 'dots'
  | 'item'
  | '@keyframes keyframesFade';

const spinStyle: JsStyles<SpinClass> = {
  ...Animation,
  default: {
    ...Default(12),
  },
  chasingDots: {
    ...ChasingDots,
  },
  cubeGrid: {
    ...CubeGrid,
  },
  dots: {},
  item: {},
};

export default spinStyle;
