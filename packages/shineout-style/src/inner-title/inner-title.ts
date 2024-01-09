import { JsStyles } from '../jss-style';
import token from '@sheinx/theme';

export type Class =
  | 'wrapper'
  | 'wrapperSmall'
  | 'wrapperLarge'
  | 'wrapperOpen'
  | 'title'
  | 'content'
  | 'place';

const innerTitle: JsStyles<Class> = {
  wrapper: {
    width: '100%',
    boxSizing: 'border-box',
    position: 'relative',
  },
  wrapperSmall: {},
  wrapperLarge: {},
  wrapperOpen: {
    display: 'block',
  },
  title: {
    visibility: 'hidden',
    height: 'initial',
    lineHeight: token.lineHeightDynamic,
    fontSize: token.inputInnerFontSize,
    color: token.inputInnerFontColor,
    '$wrapperSmall &': {
      fontSize: token.inputInnerSmallFontSize,
    },
    '$wrapperLarge &': {
      fontSize: token.inputInnerLargeFontSize,
    },
  },
  place: {
    pointerEvents: 'none',
    position: 'absolute',
    visibility: 'visible',
    transition: 'top 150ms linear 50ms, transform 150ms linear 50ms, font-size 150ms linear 50ms',
    '$wrapperLarge &': {
      transition: 'top 120ms linear 50ms, transform 120ms linear 50ms, font-size 120ms linear 50ms',
    },
    top: `50%`,
    transform: 'translate3d(0, -50%, 0)',
    left: '0',
    right: '0',
    padding: 'inherit',
    '$wrapperOpen &': {
      top: '0',
      transform: 'translate3d(0, 0%, 0)',
    },
    '$wrapper:not($wrapperOpen) &': {
      fontSize: 'inherit',
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
