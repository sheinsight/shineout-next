import { JsStyles } from '../jss-style';
import token from '@sheinx/theme';
import { InnerTitleClasses } from '@sheinx/base';

const moveOffset = '-10px';
const moveTime = '120ms';

const animation = {
  '@keyframes movein': {
    from: {
      top: 0,
      fontSize: token.inputInnerFontSize,
    },
    to: {
      top: moveOffset,
      fontSize: token.inputInnerTopFontSize,
    },
  },
  '@keyframes moveout': {
    from: {
      top: moveOffset,
      fontSize: token.inputInnerTopFontSize,
    },
    to: {
      top: 0,
      fontSize: token.inputInnerFontSize,
    },
  },

  '@keyframes moveinSmall': {
    from: {
      top: 0,
      fontSize: token.inputInnerSmallFontSize,
    },
    to: {
      top: moveOffset,
      fontSize: token.inputInnerTopSmallFontSize,
    },
  },
  '@keyframes moveoutSmall': {
    from: {
      top: moveOffset,
      fontSize: token.inputInnerTopSmallFontSize,
    },
    to: {
      top: 0,
      fontSize: token.inputInnerSmallFontSize,
    },
  },

  '@keyframes moveinLarge': {
    from: {
      top: 0,
      fontSize: token.inputInnerLargeFontSize,
    },
    to: {
      top: moveOffset,
      fontSize: token.inputInnerTopLargeFontSize,
    },
  },
  '@keyframes moveoutLarge': {
    from: {
      top: moveOffset,
      fontSize: token.inputInnerTopLargeFontSize,
    },
    to: {
      top: 0,
      fontSize: token.inputInnerLargeFontSize,
    },
  },
};

const innerTitle: JsStyles<keyof InnerTitleClasses> = {
  rootClass: {},
  ...animation,
  wrapper: {
    width: '100%',
    boxSizing: 'border-box',
    position: 'relative',
    minWidth: '0',
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
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '$wrapperSmall:not($wrapperOpen) $place &': {
      fontSize: token.inputInnerSmallFontSize,
    },
    '$wrapperLarge:not($wrapperOpen) $place &': {
      fontSize: token.inputInnerLargeFontSize,
    },
  },
  top: {
    opacity: '0',
    fontSize: token.inputInnerTopFontSize,
    '$wrapperSmall &': {
      fontSize: token.inputInnerTopSmallFontSize,
    },
    '$wrapperLarge &': {
      fontSize: token.inputInnerTopLargeFontSize,
    },
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
      color: token.inputInnerPlaceFontColor,
    },
    '$animation$wrapperOpen & $title': {
      animation: `$movein ${moveTime} ease-in`,
    },
    '$animation:not($wrapperOpen) & $title': {
      animation: `$moveout ${moveTime} ease-in`,
    },

    '$wrapperLarge$animation$wrapperOpen & $title': {
      animation: `$moveinLarge ${moveTime} ease-in`,
    },
    '$wrapperLarge$animation:not($wrapperOpen) & $title': {
      animation: `$moveoutLarge ${moveTime} ease-in`,
    },

    '$wrapperSmall$animation$wrapperOpen & $title': {
      animation: `$moveinSmall ${moveTime} ease-in`,
    },
    '$wrapperSmall$animation:not($wrapperOpen) & $title': {
      animation: `$moveoutSmall ${moveTime} ease-in`,
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
