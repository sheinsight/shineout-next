import { JsStyles } from '../jss-style';
import token from '@sheinx/theme';
import { TooltipClasses } from '@sheinx/base';

const arrowGap = 12;
const arrowHeight = 8;

const animation = {
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
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
      opacity: 0,
      marginRight: '0',
    },
    '100%': {
      opacity: 1,
      marginRight: '10px',
    },
  },
  '@keyframes moveTop': {
    '0%': {
      opacity: 0,
      marginTop: '0',
    },
    '100%': {
      opacity: 1,
      marginTop: -10,
    },
  },
  '@keyframes moveBottom': {
    '0%': {
      opacity: 0,
      marginTop: '0',
    },
    '100%': {
      opacity: 1,
      marginTop: 10,
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
    '--tooltip-background-color': token.tooltipBackgroundColor,
    '&[data-soui-type^="light"]': {
      backgroundColor: token.tooltipLightBackgroundColor,
      color: token.tooltipLightColor,
      border: `1px solid ${token.tooltipLightBorderColor}`,
      boxSizing: 'border-box',
      '--tooltip-background-color': token.tooltipLightBackgroundColor,
      '&[data-soui-position^="top"] $arrow': {
        transform: 'translate(0, -1px) rotate(-180deg)',
      },
      '&[data-soui-position^="bottom"] $arrow': {
        transform: 'translate(0, calc(-100% + 1px)) rotate(0deg)',
      },
      '& $arrow:before': {
        clipPath: 'none',
        borderTop: `1px solid ${token.tooltipLightBorderColor}`,
        borderLeft: `1px solid ${token.tooltipLightBorderColor}`,
        borderRight: 'transparent',
        borderBottom: 'transparent',
        width: 8.4,
        height: 8.4,
        transform: 'translate(50%, 27.5%) rotate(45deg)',
      },
    },
    '&[data-soui-type^="primary"]': {
      backgroundColor: token.tooltipPrimaryBackgroundColor,
      color: token.tooltipPrimaryColor,
      '--tooltip-background-color': token.tooltipPrimaryBackgroundColor,
    },
    '&[data-soui-type^="success"]': {
      backgroundColor: token.tooltipSuccessBackgroundColor,
      color: token.tooltipSuccessColor,
      '--tooltip-background-color': token.tooltipSuccessBackgroundColor,
    },
    '&[data-soui-type^="warning"]': {
      backgroundColor: token.tooltipWarningBackgroundColor,
      color: token.tooltipWarningColor,
      '--tooltip-background-color': token.tooltipWarningBackgroundColor,
    },
    '&[data-soui-type^="danger"]': {
      backgroundColor: token.tooltipDangerBackgroundColor,
      color: token.tooltipDangerColor,
      '--tooltip-background-color': token.tooltipDangerBackgroundColor,
    },
    '&[data-soui-position^="bottom"]': {
      marginTop: arrowGap - 2,
    },
    '&[data-soui-position="bottom"]': {
      '& $arrow': {
        left: '50%',
        transform: 'translate(-50%, calc(-100% + 1px)) rotate(0deg)',
      },
    },
    '&[data-soui-position="bottom-left"]': {
      '& $arrow': {
        left: 8,
        transform: 'translate(0, calc(-100% + 1px)) rotate(0deg)',
      },
    },
    '&[data-soui-position="bottom-right"]': {
      '& $arrow': {
        right: 8,
        transform: 'translate(0, calc(-100% + 1px)) rotate(0deg)',
      },
    },
    '&[data-soui-position^="top"]': {
      marginTop: (arrowGap - 2) * -1,
      '& $arrow': {
        top: '100%',
      },
    },
    '&[data-soui-position="top"]': {
      '& $arrow': {
        left: '50%',
        transform: 'translate(-50%, -1px) rotate(-180deg)',
      },
    },
    '&[data-soui-position="top-left"]': {
      '& $arrow': {
        left: 8,
        transform: 'translate(0, -1px) rotate(-180deg)',
      },
    },
    '&[data-soui-position="top-right"]': {
      '& $arrow': {
        right: 8,
        transform: 'translate(0, -1px) rotate(-180deg)',
      },
    },
    '&[data-soui-position^="left"]': {
      '&[dir=ltr]': {
        marginRight: (arrowGap - 2),
      },
      '&[dir=rtl]': {
        'margin-right': (arrowGap - 2),
      },
    },
    '&[data-soui-position="left"]': {
      '& $arrow': {
        right: 0,
        top: '50%',
        transform: 'translate(11px, -50%) rotate(90deg)',
        transformOrigin: 'center center',
      },
    },
    '&[data-soui-position="left-top"]': {
      '& $arrow': {
        right: 0,
        top: 8,
        transform: 'translate(11px, 0) rotate(90deg)',
        transformOrigin: 'center center',
      },
    },
    '&[data-soui-position="left-bottom"]': {
      '& $arrow': {
        right: 0,
        bottom: 8,
        transform: 'translate(11px, 0) rotate(90deg)',
        transformOrigin: 'center center',
      },
    },
    '&[data-soui-position^="right"]': {
      '&[dir=ltr]': {
        marginLeft: arrowGap - 2,
      },
      '&[dir=rtl]': {
        marginRight: arrowGap - 2,
      },
    },
    '&[data-soui-position="right"]': {
      '& $arrow': {
        top: '50%',
        left: 0,
        transform: 'translate(-11px, -50%) rotate(-90deg)',
      },
    },
    '&[data-soui-position="right-top"]': {
      '& $arrow': {
        top: 8,
        left: 0,
        transform: 'translate(-11px, 0) rotate(-90deg)',
      },
    },
    '&[data-soui-position="right-bottom"]': {
      '& $arrow': {
        bottom: 8,
        left: 0,
        transform: 'translate(-11px, 0) rotate(-90deg)',
      },
    },
  },
  wrapperOpen: {
    display: 'block',
    '&::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
    },
    '&[data-soui-position^="bottom"]': {
      animation: '$fadeIn .3s ease, $moveBottom .3s cubic-bezier(.71,1.7,.77,1.24);',
      '&::after': {
        width: '100%',
        height: arrowGap,
        top: 0,
        transform: 'translateY(-100%)',
    },
    },
    '&[data-soui-position^="top"]': {
      animation: '$fadeIn .3s ease, $moveTop .3s cubic-bezier(.71,1.7,.77,1.24);',
      '&::after': {
        width: '100%',
        height: arrowGap,
        bottom: 0,
        transform: 'translateY(100%)',
      },
    },
    '&[data-soui-position^="left"]': {
      animation: '$fadeIn .3s ease, $moveLeft .3s cubic-bezier(.71,1.7,.77,1.24);',
      '&::after': {
        width: arrowGap,
        height: '100%',
        top: 0,
        right: 0,
        transform: 'translateX(100%)',
      },
    },
    '&[data-soui-position^="right"]': {
      animation: '$fadeIn .3s ease, $moveRight .3s cubic-bezier(.71,1.7,.77,1.24);',
      '&::after': {
        width: arrowGap,
        height: '100%',
        top: 0,
        left: 0,
        transform: 'translateX(-100%)',
      },
    },
  },
  target: {
    display: 'inline-block',
  },
  arrow: {
    zIndex: 1,
    position: 'absolute',
    overflow: 'hidden',
    width: arrowHeight * 2,
    height: arrowHeight,
    pointerEvents: 'none',
    transformOrigin: 'center center',
    transform: 'translateY(calc(100% + 1px)) rotate(-180deg)',
    '&::before': {
      display: 'block',
      content: '""',
      bottom: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'var(--tooltip-background-color)',
      clipPath: "path('M 0 8 A 4 4 0 0 0 2.82842712474619 6.82842712474619 L 6.585786437626905 3.0710678118654755 A 2 2 0 0 1 9.414213562373096 3.0710678118654755 L 13.17157287525381 6.82842712474619 A 4 4 0 0 0 16 8 Z')",
    },
  },
  content: {
    padding: `${token.tooltipPaddingY} ${token.tooltipPaddingX}`,
    fontSize: token.tooltipFontSize,
  },
};

export default tooltipStyle;
