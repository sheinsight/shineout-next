import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type MessageClass = 'wrapper' | 'item' | 'itemDismissed' | 'itemShow' | 'message';
const animationDuration = '0.2s';
const animations = {
  '@keyframes left-in': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(0)' },
  },
  '@keyframes right-in': {
    '0%': { transform: 'translateX(100%)' },
    '100%': { transform: 'translateX(0)' },
  },
  '@keyframes left-out': {
    '0%': { transform: 'translateX(0%)', opacity: 1 },
    '100%': { transform: 'translateX(-100%)', opacity: 0 },
  },
  '@keyframes right-out': {
    '0%': { transform: 'translateX(0%)', opacity: 1 },
    '100%': { transform: 'translateX(100%)', opacity: 0 },
  },
  '@keyframes middle-in': {
    '0%': { transform: ' translateY(-25px)', opacity: 0 },
    '100%': { transform: 'translateY(0)', opacity: 1 },
  },
};
const messageStyle: JsStyles<MessageClass> = {
  ...animations,
  wrapper: {
    position: 'fixed',
    zIndex: 1060,
    maxWidth: '50%',
    '@media screen and (max-width: 992px) &': {
      'max-width': 'none',
    },
    margin: 'auto',
    '&[data-soui-position="top"]': {
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    '&[data-soui-position="middle"]': {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    '&[data-soui-position="top-left"]': {
      top: '20px',
      left: '20px',
    },
    '&[data-soui-position="top-right"]': {
      top: '20px',
      right: '20px',
    },
    '&[data-soui-position="bottom-left"]': {
      bottom: '0',
      left: '20px',
    },
    '&[data-soui-position="bottom-right"]': {
      bottom: '0',
      right: '20px',
    },
  },
  item: {
    display: 'flex',
    transition: 'all 200ms',
    zIndex: 1,
  },
  itemDismissed: {
    ' [data-soui-position="bottom-left"] &': {
      animation: `$left-out ${animationDuration} ease-in-out`,
    },
    ' [data-soui-position="bottom-right"] &': {
      animation: `$right-out ${animationDuration} ease-in-out`,
    },
  },
  itemShow: {
    '[data-soui-position="top-left"] &, [data-soui-position="bottom-left"] &': {
      animation: `$left-in ${animationDuration} ease-in-out`,
    },
    '[data-soui-position="top-right"] &, [data-soui-position="bottom-right"] &': {
      animation: `$right-in ${animationDuration} ease-in-out`,
    },
    '[data-soui-position="middle"] &, [data-soui-position="top"] &': {
      animation: `$middle-in ${animationDuration} ease-in-out`,
    },
  },
  message: {
    '&&': {
      width: 'auto',
      margin: `0 auto ${token.messageMarginBottom}`,
      borderColor: token.messageBorderColor,
      background: token.messageBackgroundColor,
      boxShadow: token.messageShadow,
      color: token.messageFontColor,
    },
  },
};

export default messageStyle;
