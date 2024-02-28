import { JsStyles } from '../jss-style';
import token from '@sheinx/theme';

const moveOffset = '-10px';
const moveTime = '120ms';

export type Class =
  | 'wrapper'
  | 'wrapperSmall'
  | 'wrapperLarge'
  | 'wrapperOpen'
  | 'title'
  | 'top'
  | 'content'
  | 'place'
  | 'animation';

const animation = {
  '@keyframes movein': {
    from: {
      top: 0,
    },
    to: {
      top: moveOffset,
    },
  },
  '@keyframes moveout': {
    from: {
      top: moveOffset,
    },
    to: {
      top: 0,
    },
  },
};

const innerTitle: JsStyles<Class> = {
  ...animation,
  wrapper: {
    width: '100%',
    boxSizing: 'border-box',
    position: 'relative',
  },
  wrapperSmall: {},
  wrapperLarge: {},
  animation: {},
  wrapperOpen: {
    display: 'block',
  },
  title: {
    height: 'initial',
    lineHeight: token.lineHeightDynamic,
    fontSize: token.inputInnerFontSize,
    color: token.inputInnerFontColor,
    transition: `font-size ${moveTime} ease-in`,
    '$wrapperSmall:not($wrapperOpen) $place &': {
      fontSize: token.inputInnerSmallFontSize,
    },
    '$wrapperLarge:not($wrapperOpen) $place &': {
      fontSize: token.inputInnerLargeFontSize,
    },
  },
  top: {
    opacity: '0',
    '$wrapperOpen &': {
      opacity: '1',
      transition: `opacity 0s ease-in ${moveTime}`,
    },
  },
  place: {
    pointerEvents: 'none',
    '& $title': {
      position: 'relative',
      top: 0,
    },
    '$animation$wrapperOpen & $title': {
      animation: `$movein ${moveTime} ease-in`,
    },
    '$animation:not($wrapperOpen) & $title': {
      animation: `$moveout ${moveTime} ease-in`,
    },
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    display: 'flex',
    alignItems: 'center',
    opacity: '1',
    '$wrapperOpen &': {
      opacity: '0',
      transition: `opacity 0s ease-in ${moveTime}`,
    },
  },
  content: {
    opacity: '0',
    '$wrapperOpen &': {
      opacity: '1',
    },
    display: 'flex',
  },
};

export default innerTitle;
