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
    padding: `${token.inputInnerPaddingY} ${token.inputInnerPaddingX}`,
    position: 'relative',
  },
  wrapperSmall: {
    padding: `${token.inputInnerSmallPaddingY} ${token.inputInnerSmallPaddingX}`,
  },
  wrapperLarge: {
    padding: `${token.inputInnerLargePaddingY} ${token.inputInnerLargePaddingX}`,
  },
  wrapperOpen: {
    display: 'block',
  },
  title: {
    visibility: 'hidden',
    height: 'initial',
    lineHeight: token.lineHeightDynamic,
    fontSize: token.inputInnerFontSize,
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
    transition: 'all 150ms ease-in-out',
    top: `50%`,
    transform: 'translateY(-50%)',
    left: '0',
    right: '0',
    padding: 'inherit',
    '$wrapperOpen &': {
      top: '0',
      transform: 'translateY(0%)',
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
    '&& > input, && > div': {
      padding: '0',
    },
  },
};

export default innerTitle;
