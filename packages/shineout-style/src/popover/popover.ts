import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type PopoverClass =
  | 'wrapper'
  | 'wrapperOpen'
  | 'arrow'
  | 'content'
  | 'text'
  | 'confirm'
  | 'mention'
  | 'footer';

const arrowGap = 12;
const arrowMargin = '8px';

const popoverStyle: JsStyles<PopoverClass> = {
  wrapper: {
    display: 'none',
    cursor: 'pointer',
    position: 'absolute',
    boxShadow: token.popoverShadow,
    backgroundColor: token.popoverBackgroundColor,
    borderRadius: token.popoverRadius,
    border: `1px solid ${token.popoverBorderColor}`,
    '& $arrow': {
      'z-index': 1,
      position: 'absolute',
      content: '" "',
      display: 'block',
      border: `inherit`,
      width: '8.4px',
      height: '8.4px',
      boxSizing: 'content-box',
      background: 'inherit',
      borderLeft: 'none',
      borderBottom: 'none',
    },
    '&[data-soui-position^="bottom"]': {
      marginTop: arrowGap - 2,
      '& $arrow': {
        top: '0',
        transform: 'translate(0, -50%) rotate(-45deg)',
        left: '0',
        right: '0',
        margin: 'auto',
      },
      '&::after': {
        top: arrowGap * -1,
        left: '0',
        right: '0',
        content: '" "',
        display: 'block',
        height: arrowGap,
        position: 'absolute',
      },
    },
    '&[data-soui-position^="top"]': {
      marginTop: (arrowGap - 2) * -1,
      '& $arrow': {
        bottom: '0',
        transform: 'translate(0, 50%) rotate(135deg)',
        left: '0',
        right: '0',
        margin: 'auto',
      },
      '&::after': {
        bottom: arrowGap * -1,
        left: '0',
        right: '0',
        content: '" "',
        display: 'block',
        height: arrowGap,
        position: 'absolute',
      },
    },
    '&[data-soui-position^="left"]': {
      marginLeft: (arrowGap - 2) * -1,
      '& $arrow': {
        right: token.popoverBorderWidth,
        transform: 'translate(50%, 0) rotate(45deg)',
        top: '0',
        bottom: '0',
        margin: 'auto',
      },
      '&::after': {
        left: arrowGap * -1,
        top: '0',
        bottom: '0',
        content: '" "',
        display: 'block',
        width: arrowGap,
        position: 'absolute',
      },
    },
    '&[data-soui-position^="right"]': {
      marginLeft: arrowGap - 2,
      '& $arrow': {
        left: '0',
        transform: 'translate(-50%, 0) rotate(-135deg)',
        top: '0',
        bottom: '0',
        margin: 'auto',
      },
      '&::after': {
        left: arrowGap * -1,
        top: '0',
        bottom: '0',
        content: '" "',
        display: 'block',
        width: arrowGap,
        position: 'absolute',
      },
    },
    '&&[data-soui-position$="-left"] $arrow': { left: arrowMargin, right: 'auto' },
    '&&[data-soui-position$="-right"] $arrow': { right: arrowMargin, left: 'auto' },
    '&&[data-soui-position$="-top"] $arrow': { top: arrowMargin, bottom: 'auto' },
    '&&[data-soui-position$="-bottom"] $arrow': { bottom: arrowMargin, top: 'auto' },

    '&[data-soui-type="danger"]': {
      borderColor: token.popoverDangerBorderColor,
      backgroundColor: token.popoverDangerBackgroundColor,
    },
    '&[data-soui-type="info"]': {
      borderColor: token.popoverInfoBorderColor,
      backgroundColor: token.popoverInfoBackgroundColor,
    },
    '&[data-soui-type="warning"]': {
      borderColor: token.popoverWarningBorderColor,
      backgroundColor: token.popoverWarningBackgroundColor,
    },
    '&[data-soui-type="success"]': {
      borderColor: token.popoverSuccessBorderColor,
      backgroundColor: token.popoverSuccessBackgroundColor,
    },
    '&[data-soui-type="error"]': {
      borderColor: token.popoverErrorBorderColor,
      backgroundColor: token.popoverErrorBackgroundColor,
      '& $content': { color: token.popoverErrorFontColor },
    },
  },
  wrapperOpen: {
    display: 'block',
  },
  arrow: {},
  content: {
    position: 'relative',
    zIndex: 2,
    fontSize: token.popoverFontSize,
    color: token.popoverFontColor,
    background: 'inherit',
    borderRadius: 'inherit',
  },
  text: {
    display: 'inline-block',
    maxWidth: '320px',
    padding: `${token.popoverPaddingY} ${token.popoverPaddingX}`,
  },

  confirm: {
    padding: `${token.popoverConfirmPaddingY} ${token.popoverConfirmPaddingX}`,
  },
  mention: {
    '$confirm &': {
      backgroundColor: 'transparent',
      border: 0,
      padding: 0,
      marginBottom: token.popoverConfirmPaddingY,
    },
  },
  footer: {
    textAlign: 'right',
  },
};

export default popoverStyle;
