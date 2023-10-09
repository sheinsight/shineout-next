// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type MessageClass = 'wrapper' | 'item' | 'itemDismissed' | 'itemShow' | 'message';

const messageStyle: JsStyles<MessageClass> = {
  wrapper: {
    display: 'block',
    position: 'fixed',
    backgroundColor: '#fff',
    top: 10,
    zIndex: 1060,
    left: '50%',
    maxWidth: '50%',
    '@media screen and (max-width: 992px) &': {
      'max-width': 'none',
    },
    right: 0,
    margin: 'auto',
    '&': {
      top: '20px',
      transform: 'translateX(-50%)',
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
    margin: '0 auto 20px',
    borderColor: '#e9ecef',
    background: '#fff',
    boxShadow: '@message-box-shadow',
    color: '@message-text-color',
    fontWeight: '@message-font-weight',
  },
};

export default messageStyle;
