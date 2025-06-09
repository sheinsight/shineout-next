import { JsStyles } from '../jss-style';
import Token from '@sheinx/theme';
import { SpinClasses } from '@sheinx/base';

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

const spinStyle: JsStyles<keyof SpinClasses> = {
  rootClass: {},
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

  spin: {
    margin: 'auto',
  },
  content: {
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    zIndex: 1,
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
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      height: '100%',
      width: '100%',
      background: Token.spinBackgroundColor,
      opacity: 0.5,
    },
  },
  tip: {
    color: Token.spinTipFontColor,
  },
  vertical: {},
  horizontal: {},
};

export default spinStyle;
