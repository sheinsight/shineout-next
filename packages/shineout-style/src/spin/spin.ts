import { JsStyles } from '../jss-style';

import Default from './default';
import ChasingDots from './chasing-dots';
import Animation from './animation';

export type SpinClass = 'default' | 'chasingDots' | 'dots' | 'item' | '@keyframes keyframesFade';

const spinStyle: JsStyles<SpinClass> = {
  ...Animation,
  default: {
    ...Default(12),
  },
  chasingDots: {
    ...ChasingDots,
  },
  dots: {},
  item: {},
};

export default spinStyle;
