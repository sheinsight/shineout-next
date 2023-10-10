import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type MessageClass = 'wrapper' | 'item' | 'itemDismissed' | 'itemShow' | 'message';

const messageStyle: JsStyles<MessageClass> = {
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
      bottom: '20px',
      left: '20px',
    },
    '&[data-soui-position="bottom-right"]': {
      bottom: '20px',
      right: '20px',
    },
  },
  item: {
    display: 'flex',
    transition: 'all 200ms',
    zIndex: 1,
  },
  itemDismissed: {},
  itemShow: {},
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
