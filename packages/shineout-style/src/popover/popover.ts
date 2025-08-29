import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';
import { PopoverClasses } from '@sheinx/base';
import { tooltipAnimation } from '../tooltip/tooltip';

export type PopoverClassType = keyof PopoverClasses;

const cssvar = '--popover-arrow-gap';
const hideArrowGap = `var(${cssvar}, 10px)`;
const extraArrowGap = 'var(--popover-arrow-gap-extra, 0px)';
const arrowMargin = '8px';

const poyfillPos = `calc((${hideArrowGap} + ${extraArrowGap}) * -1)`;
const poyfillHeight = `calc((${hideArrowGap} + ${extraArrowGap}))`;

const popoverStyle: JsStyles<PopoverClassType> = {
  ...tooltipAnimation,
  rootClass: {},
  wrapper: {
    display: 'none',
    position: 'absolute',
    boxShadow: token.popoverShadow,
    backgroundColor: token.popoverBackgroundColor,
    borderRadius: token.popoverRadius,
    border: `1px solid ${token.popoverBorderColor}`,
    wordWrap: 'break-word',
    '& > $arrow': {
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
      '& > $arrow': {
        top: '0',
        transform: 'translate(0, -50%) rotate(-45deg)',
        left: '0',
        right: '0',
        margin: 'auto',
      },
      '&::after': {
        top: poyfillPos,
        left: '0',
        right: '0',
        content: '" "',
        display: 'block',
        height: poyfillHeight,
        position: 'absolute',
      },
    },
    '&[data-soui-position^="top"]': {
      // marginTop: (arrowGap - 2) * -1,
      marginTop: `calc((${hideArrowGap} - 2px) * -1)`,

      '& > $arrow': {
        bottom: '0',
        transform: 'translate(0, 50%) rotate(135deg)',
        left: '0',
        right: '0',
        margin: 'auto',
      },
      '&::after': {
        // bottom: arrowGap * -1,
        bottom: poyfillPos,
        left: '0',
        right: '0',
        content: '" "',
        display: 'block',
        // height: arrowGap,
        height: poyfillHeight,
        position: 'absolute',
      },
    },
    '&[data-soui-position^="left"]': {
      '&[dir=ltr]': { marginRight: `calc((${hideArrowGap} - 2px))` },
      '&[dir=rtl]': { marginLeft: `calc((${hideArrowGap} - 2px))` },
      '& > $arrow': {
        right: token.popoverBorderWidth,
        transform: 'translate(50%, 0) rotate(45deg)',
        top: '0',
        bottom: '0',
        margin: 'auto',
      },
      '&::after': {
        right: poyfillPos,
        top: '0',
        bottom: '0',
        content: '" "',
        display: 'block',
        width: poyfillHeight,
        position: 'absolute',
      },
    },
    '&[data-soui-position^="right"]': {
      '&[dir=ltr]': { marginLeft: `calc(${hideArrowGap} - 2px)` },
      '&[dir=rtl]': { marginRight: `calc(${hideArrowGap} - 2px)` },
      '& > $arrow': {
        left: '0',
        transform: 'translate(-50%, 0) rotate(-135deg)',
        top: '0',
        bottom: '0',
        margin: 'auto',
      },
      '&::after': {
        // left: arrowGap * -1,
        left: poyfillPos,
        top: '0',
        bottom: '0',
        content: '" "',
        display: 'block',
        // width: arrowGap,
        width: poyfillHeight,
        position: 'absolute',
      },
    },
    '&&[data-soui-position$="-left"] > $arrow': { left: arrowMargin, right: 'auto' },
    '&&[data-soui-position$="-right"] > $arrow': { right: arrowMargin, left: 'auto' },
    '&&[data-soui-position$="-top"] > $arrow': { top: arrowMargin, bottom: 'auto' },
    '&&[data-soui-position$="-bottom"] > $arrow': { bottom: arrowMargin, top: 'auto' },

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
    '&[data-soui-position^="bottom"]': {
      animation: '$fadeIn 200ms ease, $moveBottom 200ms cubic-bezier(0.22, 0.61, 0.36, 1)',
    },
    '&[data-soui-position^="bottom-left"]': {
      animation: '$fadeIn 200ms ease, $moveBottomLeft 200ms cubic-bezier(0.22, 0.61, 0.36, 1)',
    },
    '&[data-soui-position^="bottom-right"]': {
      animation: '$fadeIn 200ms ease, $moveBottomRight 200ms cubic-bezier(0.22, 0.61, 0.36, 1)',
    },
    '&[data-soui-position^="top"]': {
      animation: '$fadeIn 200ms ease, $moveTop 200ms cubic-bezier(0.22, 0.61, 0.36, 1);',
    },
    '&[data-soui-position^="top-left"]': {
      animation: '$fadeIn 200ms ease, $moveTopLeft 200ms cubic-bezier(0.22, 0.61, 0.36, 1)',
    },
    '&[data-soui-position^="top-right"]': {
      animation: '$fadeIn 200ms ease, $moveTopRight 200ms cubic-bezier(0.22, 0.61, 0.36, 1)',
    },
    '&[data-soui-position^="left"]': {
      animation: '$fadeIn 200ms ease, $moveLeft 200ms cubic-bezier(0.22, 0.61, 0.36, 1);',
    },
    '&[data-soui-position^="left-top"]': {
      animation: '$fadeIn 200ms ease, $moveLeftTop 200ms cubic-bezier(0.22, 0.61, 0.36, 1);',
    },
    '&[data-soui-position^="left-bottom"]': {
      animation: '$fadeIn 200ms ease, $moveLeftBottom 200ms cubic-bezier(0.22, 0.61, 0.36, 1);',
    },
    '&[data-soui-position^="right"]': {
      animation: '$fadeIn 200ms ease, $moveRight 200ms cubic-bezier(0.22, 0.61, 0.36, 1);',
    },
    '&[data-soui-position^="right-top"]': {
      animation: '$fadeIn 200ms ease, $moveRightTop 200ms cubic-bezier(0.22, 0.61, 0.36, 1);',
    },
    '&[data-soui-position^="right-bottom"]': {
      animation: '$fadeIn 200ms ease, $moveRightBottom 200ms cubic-bezier(0.22, 0.61, 0.36, 1);',
    },
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
