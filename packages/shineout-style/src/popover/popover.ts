import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type PopoverClass = 'wrapper' | 'wrapperOpen' | 'arrow' | 'content' | 'text';

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
    border: '1px solid #e8ebf0',
    '&::before': {
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
      '&::before': {
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
      '&::before': {
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
      '&::before': {
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
      '&::before': {
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
    '&&[data-soui-position$="-left"]::before': { left: arrowMargin, right: 'auto' },
    '&&[data-soui-position$="-right"]::before': { right: arrowMargin, left: 'auto' },
    '&&[data-soui-position$="-top"]::before': { top: arrowMargin, bottom: 'auto' },
    '&&[data-soui-position$="-bottom"]::before': { bottom: arrowMargin, top: 'auto' },

    '&[data-soui-type="danger"],  &[data-soui-type="error"]': {
      borderColor: 'rgba(255, 77, 80, 0.1)',
      backgroundColor: '#ffeded',
    },
    '&[data-soui-type="info"]': {
      borderColor: 'rgba(25, 122, 250, 0.1)',
      backgroundColor: '#e8f1fe',
    },
    '&[data-soui-type="warning"]': {
      borderColor: 'rgba(255, 140, 0, 0.1)',
      backgroundColor: '#fff3e5',
    },
    '&[data-soui-type="success"]': {
      borderColor: 'rgba(82, 196, 26, 0.1)',
      backgroundColor: '#edf9e8',
    },
    '&[data-soui-type="error"] $content': {
      color: '#cc3d3a',
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
};

export default popoverStyle;
