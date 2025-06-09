import token from '@sheinx/theme';
import { SwitchClasses } from '@sheinx/base';
import { JsStyles } from '../jss-style';

const animation = {
  '@keyframes ring': {
    '0%': {
      transform: 'rotateZ(0deg)',
    },
    '100%': {
      transform: 'rotateZ(359deg)',
    },
  },
};
const transition = '.2s cubic-bezier(.34,.69,.1,1)';
const switchStyle: JsStyles<keyof SwitchClasses> = {
  rootClass: {},
  ...animation,
  wrapper: {
    '[data-soui-role="form-control"] >  &': {
      margin: '5px 0',
    },
    transition: `background-color ${transition}`,
    border: '0',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    backgroundColor: token.switchBackgroundColor,
    color: token.switchFontColor,
    verticalAlign: 'middle',
    outline: 'none',
    '$wrapperDisabled&': {
      backgroundColor: token.switchDisabledBackgroundColor,
      color: token.switchDisabledFontColor,
    },

    '$wrapperChecked&': {
      backgroundColor: token.switchCheckedBackgroundColor,
      color: token.switchCheckedFontColor,
    },
    '$wrapperChecked$wrapperDisabled&': {
      backgroundColor: token.switchCheckedDisabledBackgroundColor,
      color: token.switchCheckedDisabledFontColor,
    },
    height: `calc( ${token.switchCircleSize} + ${token.switchPaddingY} * 2 )`,
    padding: `${token.switchPaddingY} ${token.switchPaddingX}`,
    minWidth: token.switchWidth,
    borderRadius: `calc( ${token.switchCircleSize} / 2 + ${token.switchPaddingY} )`,
    fontSize: token.switchFontSize,
    '$wrapperSmall&': {
      height: `calc( ${token.switchSmallCircleSize} + ${token.switchSmallPaddingY} * 2 )`,
      padding: `${token.switchSmallPaddingY} ${token.switchSmallPaddingX}`,
      minWidth: token.switchSmallWidth,
      borderRadius: `calc( ${token.switchSmallCircleSize} / 2 + ${token.switchSmallPaddingY} )`,
      fontSize: token.switchSmallFontSize,
      '[data-soui-role="form-control"] > &': {
        marginTop: 8,
      }
    },
    '$wrapperLarge&': {
      height: `calc( ${token.switchLargeCircleSize} + ${token.switchLargePaddingY} * 2 )`,
      padding: `${token.switchLargePaddingY} ${token.switchLargePaddingX}`,
      minWidth: token.switchLargeWidth,
      borderRadius: `calc( ${token.switchLargeCircleSize} / 2 + ${token.switchLargePaddingY} )`,
      fontSize: token.switchLargeFontSize,
    },
  },
  wrapperChecked: {},
  textPadding: {
    paddingLeft: token.switchTextPaddingRight,
    paddingRight: token.switchTextPaddingLeft,
    '$wrapperChecked &': {
      paddingLeft: token.switchTextPaddingLeft,
      paddingRight: token.switchTextPaddingRight,
    },
    '$wrapperSmall &': {
      paddingLeft: token.switchSmallTextPaddingRight,
      paddingRight: token.switchSmallTextPaddingLeft,
    },
    '$wrapperSmall$wrapperChecked &': {
      paddingLeft: token.switchSmallTextPaddingLeft,
      paddingRight: token.switchSmallTextPaddingRight,
    }
  },
  wrapperSmall: {
  },
  wrapperLarge: {
  },
  indicator: {
    width: token.switchCircleSize,
    height: token.switchCircleSize,
    '&[dir=ltr]': { left: token.switchPaddingX },
    '&[dir=rtl]': { right: token.switchPaddingX },
    top: token.switchPaddingY,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '$wrapperChecked &': {
      backgroundColor: token.switchCheckedCircleFill,
      '&[dir=ltr]': {
        right: token.switchPaddingX,
        left: `calc(100% - ${token.switchCircleSize} - ${token.switchPaddingX})`,
      },
      '&[dir=rtl]': {
        left: token.switchPaddingX,
        right: `calc(100% - ${token.switchCircleSize} - ${token.switchPaddingX})`,
      },
      '$wrapperSmall&': {
        '&[dir=ltr]': {
          right: token.switchSmallPaddingX,
          left: `calc(100% - ${token.switchSmallCircleSize} - ${token.switchSmallPaddingX})`,
        },
        '&[dir=rtl]': {
          left: token.switchSmallPaddingX,
          right: `calc(100% - ${token.switchSmallCircleSize} - ${token.switchSmallPaddingX})`,
        },
      },
      '$wrapperLarge&': {
        '&[dir=ltr]': {
          right: token.switchLargePaddingX,
          left: `calc(100% - ${token.switchLargeCircleSize} - ${token.switchLargePaddingX})`,
        },
        '&[dir=rtl]': {
          left: token.switchLargePaddingX,
          right: `calc(100% - ${token.switchLargeCircleSize} - ${token.switchLargePaddingX})`,
        },
      },
    },
    '$wrapperSmall &': {
      width: token.switchSmallCircleSize,
      height: token.switchSmallCircleSize,
      left: token.switchSmallPaddingX,
      top: token.switchSmallPaddingY,
    },
    '$wrapperLarge &': {
      width: token.switchLargeCircleSize,
      height: token.switchLargeCircleSize,
      left: token.switchLargePaddingX,
      top: token.switchLargePaddingY,
    },

    '$wrapperDisabled$wrapperChecked &': {
      backgroundColor: token.switchDisabledCircleCheckedFill,
    },
    '$wrapperDisabled &': {
      backgroundColor: token.switchCheckedDisabledCircleFill,
    },

    borderRadius: '50%',
    position: 'absolute',

    backgroundColor: token.switchCircleFill,
    // boxShadow: token.switchCircleShadow,
    transition: `left ${transition}, right ${transition}`,
  },
  content: {
    paddingLeft: token.switchCircleSize,
    transition: `padding ${transition}`,
    '$wrapperSmall &': {
      paddingLeft: token.switchSmallCircleSize,
    },
    '$wrapperLarge &': {
      paddingLeft: token.switchLargeCircleSize,
    },
    '$wrapperChecked &': {
      paddingLeft: 0,
      paddingRight: token.switchCircleSize,
      '$wrapperSmall&': {
        paddingLeft: 0,
        paddingRight: token.switchSmallCircleSize,
      },
      '$wrapperLarge&': {
        paddingLeft: 0,
        paddingRight: token.switchLargeCircleSize,
      },
    },
  },
  wrapperDisabled: {
    cursor: 'not-allowed',
  },
  loading: {
    position: 'absolute',
    color: token.switchLoadingCircleFill,
    inset: '2px',
    animation: `$ring 1s ease-in-out infinite`,
    '$wrapperLarge &': {
      inset: '3px',
    },

    '$wrapperSmall &': {
      inset: '1px',
    },

    '& > svg': {
      display: 'block',
    },

    '$wrapperChecked &': {
      color: token.switchCheckedLoadingCircleFill,
    },
  },
};

export default switchStyle;
