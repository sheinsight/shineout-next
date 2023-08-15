import { JsStyles } from '../jss-style';
import Token from '@sheinx/theme';

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
import wave from './wave';
import chasingRing from './chasing-ring';

import Animation from './animation';

export type SpinClass =
  | 'spin'
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
  | 'wave'
  | 'chasingRing'
  | 'content'
  | 'container'
  | 'loading'
  | 'tip'
  | 'vertical'
  | 'horizontal';

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
  wave,
  chasingRing,
  fade: {},

  spin: {},
  content: {
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',

    '&$vertical': {
      flexDirection: 'column',

      '& $tip': {
        marginTop: Token.spinVerticalMargin,
      },
    },
    '&$horizontal': {
      flexDirection: 'row',
      '& $spin': {
        margin: 0,
      },

      '& $tip': {
        marginLeft: Token.spinHorizontalMargin,
      },
    },
  },
  container: {
    position: 'relative',

    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      height: '100%',
      width: '100%',
      background: '#FFFFFF',
      opacity: 0.5,
    },
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tip: {
    color: Token.spinTipFontColor,
  },
  vertical: {},
  horizontal: {},
};

export default spinStyle;
