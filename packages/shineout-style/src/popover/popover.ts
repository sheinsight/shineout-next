import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';
import { PopoverClasses } from '@sheinx/base';

export type PopoverClassType = keyof PopoverClasses;

const cssvar = '--popover-arrow-gap';
const hideArrowGap = `var(${cssvar}, 10px)`;
const arrowMargin = '8px';

const popoverStyle: JsStyles<PopoverClassType> = {
  wrapper: {
    display: 'none',
    cursor: 'pointer',
    position: 'absolute',
    boxShadow: token.popoverShadow,
    backgroundColor: token.popoverBackgroundColor,
    borderRadius: token.popoverRadius,
    border: `1px solid ${token.popoverBorderColor}`,
    wordWrap: 'break-word',
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
      borderBottom: 'none',
      '&[dir=ltr]': { borderLeftColor: 'transparent' },
      '&[dir=rtl]': { borderRight: 'transparent' },
    },
    '&$hideArrow': {
      [cssvar]: '4px',
    },
    '&[data-soui-position^="bottom"]': {
      marginTop: `calc(${hideArrowGap} - 2px)`,
      '& $arrow': {
        top: '0',
        transform: 'translate(0, -50%) rotate(-45deg)',
        left: '0',
        right: '0',
        margin: 'auto',
      },
      '&::after': {
        top: `calc(${hideArrowGap} * -1)`,
        left: '0',
        right: '0',
        content: '" "',
        display: 'block',
        height: hideArrowGap,
        position: 'absolute',
      },
    },
    '&[data-soui-position^="top"]': {
      // marginTop: (arrowGap - 2) * -1,
      marginTop: `calc((${hideArrowGap} - 2px) * -1)`,

      '& $arrow': {
        bottom: '0',
        transform: 'translate(0, 50%) rotate(135deg)',
        left: '0',
        right: '0',
        margin: 'auto',
      },
      '&::after': {
        // bottom: arrowGap * -1,
        bottom: `calc(${hideArrowGap} * -1)`,
        left: '0',
        right: '0',
        content: '" "',
        display: 'block',
        // height: arrowGap,
        height: hideArrowGap,
        position: 'absolute',
      },
    },
    '&[data-soui-position^="left"]': {
      // '&[dir=ltr]': { marginLeft: (arrowGap - 2) * -1 },
      '&[dir=ltr]': { marginLeft: `calc((${hideArrowGap} - 2px) * -1)` },
      // '&[dir=rtl]': { marginRight: (arrowGap - 2) * -1 },
      '&[dir=rtl]': { marginRight: `calc((${hideArrowGap} - 2px) * -1)` },
      '& $arrow': {
        right: token.popoverBorderWidth,
        transform: 'translate(50%, 0) rotate(45deg)',
        top: '0',
        bottom: '0',
        margin: 'auto',
      },
      '&::after': {
        // left: arrowGap * -1,
        left: `calc(${hideArrowGap} * -1)`,
        top: '0',
        bottom: '0',
        content: '" "',
        display: 'block',
        width: hideArrowGap,
        position: 'absolute',
      },
    },
    '&[data-soui-position^="right"]': {
      // '&[dir=ltr]': { marginLeft: arrowGap - 2 },
      '&[dir=ltr]': { marginLeft: `calc(${hideArrowGap} - 2px)` },
      // '&[dir=rtl]': { marginRight: arrowGap - 2 },
      '&[dir=rtl]': { marginRight: `calc(${hideArrowGap} - 2px)` },
      '& $arrow': {
        left: '0',
        transform: 'translate(-50%, 0) rotate(-135deg)',
        top: '0',
        bottom: '0',
        margin: 'auto',
      },
      '&::after': {
        // left: arrowGap * -1,
        left: `calc(${hideArrowGap} * -1)`,
        top: '0',
        bottom: '0',
        content: '" "',
        display: 'block',
        // width: arrowGap,
        width: hideArrowGap,
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
  hideArrow: {},
  content: {
    position: 'relative',
    zIndex: 2,
    fontSize: token.popoverFontSize,
    fontWeight: token.popoverFontWeight,
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
      marginBottom: token.popoverConfirmMarginY,
    },
  },
  footer: {
    textAlign: 'right',
  },
};

export default popoverStyle;
