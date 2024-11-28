import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type BadgeClasses = {
  rootClass: string;
  badge: string;
  count: string;
  dot: string;
  textDot: string;
  custom: string;
  number: string;
  singleWord: string;
  multipleWords: string;
  zoom: string;
  status: string;
  textBadge: string;
  text: string;

  warning: string;
  success: string;
  error: string;
  default: string;
  processing: string;

  small: string;

  '@keyframes animationZoom': string;
  '@keyframes animationProgressing': string;
};
export type BadgeClassType = keyof BadgeClasses;

const badgeStyle: JsStyles<BadgeClassType> = {
  rootClass: {},
  badge: {
    boxSizing: 'border-box',
    width: 'fit-content',
    margin: 0,
    padding: 0,
    lineHeight: 1,
    listStyle: 'none',
    position: 'relative',
    display: 'inline-block',
    '& $count,$custom,$dot': {
      position: 'absolute',
      top: 0,
      insetInlineEnd: 0,
      transform: 'translate(50%, -50%)',
      transformOrigin: '100% 0',
      boxShadow: `0 0 0 1px #fff`,
    },
  },
  textBadge: {
    display: 'block',
    lineHeight: 'inherit',
    verticalAlign: 'baseline',
  },
  count: {
    textAlign: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    minWidth: token.badgeCountHeight,
    height: token.badgeCountHeight,
    verticalAlign: 'super',
    lineHeight: token.lineHeightDynamic,
    background: token.badgeBadgeBackgroundColor,
    borderRadius: token.badgeBadgeBorderRadius,
    fontSize: token.badgeBadgeFontSize,
    color: token.badgeBadgeFontColor,
  },
  small: {
    lineHeight: 'initial',
    height: token.badgeSmallCountHeight,
    minWidth: token.badgeSmallCountHeight,
  },
  dot: {
    borderRadius: '50%',
    width: token.badgeDotWidth,
    height: token.badgeDotWidth,
    background: token.badgeBadgeBackgroundColor,
  },
  textDot: {
    position: 'relative',
    top: -1,
    display: 'inline-block',
    borderRadius: '50%',
    lineHeight: 'inherit',
    verticalAlign: 'middle',
    width: token.badgeDotWidth,
    height: token.badgeDotWidth,
    background: token.badgeBadgeBackgroundColor,
  },
  number: {},
  singleWord: {},
  multipleWords: {
    padding: `0 ${token.badgeCountPaddingX}`,
  },
  custom: {},
  zoom: {
    animationName: '$animationZoom',
    animationDirection: '0.3',
    animationFillMode: 'both',
    animationTimingFunction: 'cubic-bezier(0.12, 0.4, 0.29, 1.46)',
  },
  status: {},
  text: {
    lineHeight: 'inherit',
    color: token.badgeTextFontColor,
    marginLeft: token.badgeTextMarginLeft,
  },
  default: { background: token.badgeDefaultBackgroundColor },
  warning: { background: token.badgeWarningBackgroundColor },
  success: { background: token.badgeSuccessBackgroundColor },
  error: { background: token.badgeErrorBackgroundColor },
  processing: {
    borderColor: 'currentcolor',
    color: token.badgeProcessingBackgroundColor,
    background: token.badgeProcessingBackgroundColor,
    '&::after': {
      position: 'absolute',
      content: '""',
      top: 0,
      insetInlineStart: 0,
      width: '100%',
      height: '100%',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'inherit',
      borderRadius: '50%',
      animationName: '$animationProgressing',
      animationDuration: '1.2s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'ease-in-out',
    },
  },

  '@keyframes animationProgressing': {
    '0%': {
      transform: 'scale(0.8)',
      opacity: 0.5,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },

  '@keyframes animationZoom': {
    '0%': {
      transform: 'scale(0) translate(50%, -50%)',
      opacity: 0,
    },
    '100%': {
      transform: 'scale(1) translate(50%, -50%)',
      opacity: 1,
    },
  },
};

export default badgeStyle;
