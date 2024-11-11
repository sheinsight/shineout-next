import { JsStyles } from '../jss-style';
import token from '@sheinx/theme';
import { TooltipClasses } from '@sheinx/base';

const arrowGap = 12;
const arrowMargin = '8px';

const animation = {
  '@keyframes fadeIn': {
    '0%': {
      opacity: '0',
    },
    '100%': {
      opacity: '1',
    },
  },
  '@keyframes moveRight': {
    '0%': {
      marginLeft: '0',
    },
    '100%': {
      marginLeft: '9px',
    },
  },
  '@keyframes moveLeft': {
    '0%': {
      marginLeft: '0',
    },
    '100%': {
      marginLeft: '-9px',
    },
  },
  '@keyframes moveTop': {
    '0%': {
      marginTop: '0',
    },
    '100%': {
      marginTop: '-9px',
    },
  },
  '@keyframes moveBottom': {
    '0%': {
      marginTop: '0',
    },
    '100%': {
      marginTop: '9px',
    },
  },
};
const tooltipStyle: JsStyles<keyof TooltipClasses> = {
  rootClass: {},
  ...animation,
  wrapper: {
    display: 'none',
    cursor: 'pointer',
    position: 'absolute',
    backgroundColor: token.tooltipBackgroundColor,
    borderRadius: token.tooltipBorderRadius,
    boxShadow: token.tooltipShadow,
    color: token.tooltipColor,
    wordWrap: 'break-word',
    pointerEvents: 'none',
    '&[data-soui-type^="light"]': {
      backgroundColor: token.tooltipLightBackgroundColor,
      color: token.tooltipLightColor,
      border: `1px solid ${token.tooltipLightBorderColor}`,
      boxSizing: 'border-box',
    },
    '&[data-soui-type^="primary"]': {
      backgroundColor: token.tooltipPrimaryBackgroundColor,
      color: token.tooltipPrimaryColor,
    },
    '&[data-soui-type^="success"]': {
      backgroundColor: token.tooltipSuccessBackgroundColor,
      color: token.tooltipSuccessColor,
    },
    '&[data-soui-type^="warning"]': {
      backgroundColor: token.tooltipWarningBackgroundColor,
      color: token.tooltipWarningColor,
    },
    '&[data-soui-type^="danger"]': {
      backgroundColor: token.tooltipDangerBackgroundColor,
      color: token.tooltipDangerColor,
    },
    // '&::before': {
    '& $arrow': {
      'z-index': 1,
      position: 'absolute',
      content: '" "',
      display: 'block',
      border: `inherit`,
      borderLeftColor: 'transparent',
      width: '8.4px',
      height: '8.4px',
      boxSizing: 'content-box',
      background: 'inherit',
      borderBottomColor: 'transparent',
    },
    '&[data-soui-position^="bottom"]': {
      marginTop: arrowGap - 2,
      '&[dir=ltr] $arrow': {
        transform: 'translate(0, -50%) rotate(-45deg)',
      },
      '&[dir=rtl] $arrow': {
        transform: 'translate(0, -50%) rotate(45deg)',
      },
      '& $arrow::after': {
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
      '&[dir=ltr] $arrow': {
        transform: 'translate(0, 50%) rotate(135deg)',
      },
      '&[dir=rtl] $arrow': {
        transform: 'translate(0, 50%) rotate(-135deg)',
      },
      // '&::before': {
      //   bottom: '0',
      //   transform: 'translate(0, 50%) rotate(135deg)',
      //   left: '0',
      //   right: '0',
      //   margin: 'auto',
      // },
      // '&[dir=ltr]::before': {
      //   transform: 'translate(0, 50%) rotate(135deg)',
      // },
      // '&[dir=rtl]::before': {
      //   transform: 'translate(0, 50%) rotate(-135deg)',
      // },
      // '&::after': {
      //   bottom: arrowGap * -1,
      //   left: '0',
      //   right: '0',
      //   content: '" "',
      //   display: 'block',
      //   height: arrowGap,
      //   position: 'absolute',
      // },
    },
    '&[data-soui-position^="left"]': {
      marginLeft: (arrowGap - 2) * -1,
      '&[dir=ltr] $arrow': {
        transform: 'translate(50%, 0) rotate(45deg)',
      },
      '&[dir=rtl] $arrow': {
        transform: 'translate(50%, 0) rotate(135deg)',
      },

      // '&[dir=ltr]': { marginLeft: (arrowGap - 2) * -1 },
      // '&[dir=rtl]': { marginRight: (arrowGap - 2) * -1 },
      // '&::before': {
      //   right: 0,
      //   top: '0',
      //   bottom: '0',
      //   margin: 'auto',
      // },
      // '&[dir=ltr]::before': {
      //   transform: 'translate(50%, 0) rotate(45deg)',
      // },
      // '&[dir=rtl]::before': {
      //   transform: 'translate(50%, 0) rotate(135deg)',
      // },
      // '&::after': {
      //   left: arrowGap * -1,
      //   top: '0',
      //   bottom: '0',
      //   content: '" "',
      //   display: 'block',
      //   width: arrowGap,
      //   position: 'absolute',
      // },
    },
    '&[data-soui-position^="right"]': {
      marginLeft: arrowGap - 2,
      '&[dir=ltr] $arrow': {
        transform: 'translate(-50%, 0) rotate(-135deg)',
      },
      '&[dir=rtl] $arrow': {
        transform: 'translate(-50%, 0) rotate(-45deg)',
      },

      // '&[dir=ltr]': { marginLeft: arrowGap - 2 },
      // '&[dir=rtl]': { marginRight: arrowGap - 2 },
      // '&::before': {
      //   left: '0',
      //   top: '0',
      //   bottom: '0',
      //   margin: 'auto',
      // },
      // '&[dir=ltr]::before': {
      //   transform: 'translate(-50%, 0) rotate(-135deg)',
      // },
      // '&[dir=rtl]::before': {
      //   transform: 'translate(-50%, 0) rotate(-45deg)',
      // },
      // '&::after': {
      //   left: arrowGap * -1,
      //   top: '0',
      //   bottom: '0',
      //   content: '" "',
      //   display: 'block',
      //   width: arrowGap,
      //   position: 'absolute',
      // },
    },
    // '&&[data-soui-position$="-left"]::before': { left: arrowMargin, right: 'auto' },
    // '&&[data-soui-position$="-right"]::before': { right: arrowMargin, left: 'auto' },
    // '&&[data-soui-position$="-top"]::before': { top: arrowMargin, bottom: 'auto' },
    // '&&[data-soui-position$="-bottom"]::before': { bottom: arrowMargin, top: 'auto' },
  },
  wrapperOpen: {
    display: 'block',
    '&[data-soui-position^="bottom"]': {
      animation: '$fadeIn .3s ease, $moveBottom .3s cubic-bezier(.71,1.7,.77,1.24);',
    },
    '&[data-soui-position^="top"]': {
      animation: '$fadeIn .3s ease, $moveTop .3s cubic-bezier(.71,1.7,.77,1.24);',
    },
    '&[data-soui-position^="left"]': {
      animation: '$fadeIn .3s ease, $moveLeft .3s cubic-bezier(.71,1.7,.77,1.24);',
    },
    '&[data-soui-position^="right"]': {
      animation: '$fadeIn .3s ease, $moveRight .3s cubic-bezier(.71,1.7,.77,1.24);',
    },
  },
  target: {
    display: 'inline-block',
  },
  arrow: {
    // before
    '&::before': {
      content: "''",
    },
  },
  content: {
    padding: `${token.tooltipPaddingY} ${token.tooltipPaddingX}`,
    fontSize: token.tooltipFontSize,
  },
};

export default tooltipStyle;
