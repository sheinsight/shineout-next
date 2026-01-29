import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';
import { PopoverClasses } from '@sheinx/base';
import { tooltipAnimation, arrowClipPath } from '../tooltip/tooltip';

export type PopoverClassType = keyof PopoverClasses;

const arrowGap = 12;
const arrowHeight = 8;

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
      zIndex: 1,
      position: 'absolute',
      overflow: 'visible',
      width: arrowHeight * 2,
      height: arrowHeight,
      pointerEvents: 'none',
      transformOrigin: 'center center',
      filter: `drop-shadow(0 1px 0 ${token.popoverBorderColor}) drop-shadow(0 -1px 0 ${token.popoverBorderColor}) drop-shadow(1px 0 0 ${token.popoverBorderColor}) drop-shadow(-1px 0 0 ${token.popoverBorderColor})`,
      '&::before': {
        display: 'block',
        content: '""',
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: token.popoverBackgroundColor,
        clipPath: `path('${arrowClipPath}')`,
      },
    },
    '&$hideArrow': {
      [cssvar]: '4px',
    },
    '&[data-soui-position^="bottom"]': {
      marginTop: arrowGap - 2,
      '& > $arrow': {
        left: '50%',
        transform: 'translate(-50%, calc(-100% + 1px)) rotate(0deg)',
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
      marginTop: (arrowGap - 2) * -1,
      '& > $arrow': {
        top: '100%',
        left: '50%',
        transform: 'translate(-50%, -1px) rotate(-180deg)',
      },
      '&::after': {
        bottom: poyfillPos,
        left: '0',
        right: '0',
        content: '" "',
        display: 'block',
        height: poyfillHeight,
        position: 'absolute',
      },
    },
    '&[data-soui-position^="left"]': {
      '&[dir=ltr]': { marginRight: arrowGap - 2 },
      '&[dir=rtl]': { marginLeft: arrowGap - 2 },
      '& > $arrow': {
        right: 0,
        top: '50%',
        transform: 'translate(11px, -50%) rotate(90deg)',
        transformOrigin: 'center center',
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
      '&[dir=ltr]': { marginLeft: arrowGap - 2 },
      '&[dir=rtl]': { marginRight: arrowGap - 2 },
      '& > $arrow': {
        top: '50%',
        left: 0,
        transform: 'translate(-11px, -50%) rotate(-90deg)',
      },
      '&::after': {
        left: poyfillPos,
        top: '0',
        bottom: '0',
        content: '" "',
        display: 'block',
        width: poyfillHeight,
        position: 'absolute',
      },
    },
    '&&[data-soui-position="bottom-left"] > $arrow': {
      left: 8,
      transform: 'translate(0, calc(-100% + 1px)) rotate(0deg)'
    },
    '&&[data-soui-position="bottom-right"] > $arrow': {
      right: 8,
      left: 'auto',
      transform: 'translate(0, calc(-100% + 1px)) rotate(0deg)'
    },
    '&&[data-soui-position="top-left"] > $arrow': {
      left: 8,
      transform: 'translate(0, -1px) rotate(-180deg)'
    },
    '&&[data-soui-position="top-right"] > $arrow': {
      right: 8,
      left: 'auto',
      transform: 'translate(0, -1px) rotate(-180deg)'
    },
    '&&[data-soui-position="left-top"] > $arrow': {
      top: 8,
      transform: 'translate(11px, 0) rotate(90deg)'
    },
    '&&[data-soui-position="left-bottom"] > $arrow': {
      bottom: 8,
      top: 'auto',
      transform: 'translate(11px, 0) rotate(90deg)'
    },
    '&&[data-soui-position="right-top"] > $arrow': {
      top: 8,
      transform: 'translate(-11px, 0) rotate(-90deg)'
    },
    '&&[data-soui-position="right-bottom"] > $arrow': {
      bottom: 8,
      top: 'auto',
      transform: 'translate(-11px, 0) rotate(-90deg)'
    },

    '&[data-soui-type="danger"]': {
      borderColor: token.popoverDangerBorderColor,
      backgroundColor: token.popoverDangerBackgroundColor,
      '& > $arrow': {
        filter: `drop-shadow(0 1px 0 ${token.popoverDangerBorderColor}) drop-shadow(0 -1px 0 ${token.popoverDangerBorderColor}) drop-shadow(1px 0 0 ${token.popoverDangerBorderColor}) drop-shadow(-1px 0 0 ${token.popoverDangerBorderColor})`,
      },
      '& > $arrow::before': {
        backgroundColor: token.popoverDangerBackgroundColor,
      },
    },
    '&[data-soui-type="info"]': {
      borderColor: token.popoverInfoBorderColor,
      backgroundColor: token.popoverInfoBackgroundColor,
      '& > $arrow': {
        filter: `drop-shadow(0 1px 0 ${token.popoverInfoBorderColor}) drop-shadow(0 -1px 0 ${token.popoverInfoBorderColor}) drop-shadow(1px 0 0 ${token.popoverInfoBorderColor}) drop-shadow(-1px 0 0 ${token.popoverInfoBorderColor})`,
      },
      '& > $arrow::before': {
        backgroundColor: token.popoverInfoBackgroundColor,
      },
    },
    '&[data-soui-type="warning"]': {
      borderColor: token.popoverWarningBorderColor,
      backgroundColor: token.popoverWarningBackgroundColor,
      '& > $arrow': {
        filter: `drop-shadow(0 1px 0 ${token.popoverWarningBorderColor}) drop-shadow(0 -1px 0 ${token.popoverWarningBorderColor}) drop-shadow(1px 0 0 ${token.popoverWarningBorderColor}) drop-shadow(-1px 0 0 ${token.popoverWarningBorderColor})`,
      },
      '& > $arrow::before': {
        backgroundColor: token.popoverWarningBackgroundColor,
      },
    },
    '&[data-soui-type="success"]': {
      borderColor: token.popoverSuccessBorderColor,
      backgroundColor: token.popoverSuccessBackgroundColor,
      '& > $arrow': {
        filter: `drop-shadow(0 1px 0 ${token.popoverSuccessBorderColor}) drop-shadow(0 -1px 0 ${token.popoverSuccessBorderColor}) drop-shadow(1px 0 0 ${token.popoverSuccessBorderColor}) drop-shadow(-1px 0 0 ${token.popoverSuccessBorderColor})`,
      },
      '& > $arrow::before': {
        backgroundColor: token.popoverSuccessBackgroundColor,
      },
    },
    '&[data-soui-type="error"]': {
      borderColor: token.popoverErrorBorderColor,
      backgroundColor: token.popoverErrorBackgroundColor,
      '& $content': { color: token.popoverErrorFontColor },
      '& > $arrow': {
        filter: `drop-shadow(0 1px 0 ${token.popoverErrorBorderColor}) drop-shadow(0 -1px 0 ${token.popoverErrorBorderColor}) drop-shadow(1px 0 0 ${token.popoverErrorBorderColor}) drop-shadow(-1px 0 0 ${token.popoverErrorBorderColor})`,
      },
      '& > $arrow::before': {
        backgroundColor: token.popoverErrorBackgroundColor,
      },
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
  wrapperNoAnimation: {
    '&[data-soui-position]': {
      animation: 'none',
    }
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
  mentionTitle: {
    fontSize: token.popoverConfirmTitleFontSize,
  },
  mentionIcon: {
    '&&':{
     fontSize: token.popoverConfirmTitleFontSize,
     width: `calc(${token.popoverConfirmTitleFontSize} + 2px)`,
  }
  },
  footer: {
    textAlign: 'right',
  },
};

export default popoverStyle;
