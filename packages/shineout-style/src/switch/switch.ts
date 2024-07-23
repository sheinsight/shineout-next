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
    // '$wrapperChecked$wrapperLoading&': {
    //   backgroundColor: token.switchCheckedLoadingBackgroundColor,
    //   color: token.switchCheckedLoadingFontColor,
    // },
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
      fonSize: token.switchSmallFontSize,
    },
    '$wrapperLarge&': {
      height: `calc( ${token.switchLargeCircleSize} + ${token.switchLargePaddingY} * 2 )`,
      padding: `${token.switchLargePaddingY} ${token.switchLargePaddingX}`,
      minWidth: token.switchLargeWidth,
      borderRadius: `calc( ${token.switchLargeCircleSize} / 2 + ${token.switchLargePaddingY} )`,
      fonSize: token.switchLargeFontSize,
    },
  },
  wrapperChecked: {},
  textPadding: { display: 'inline-block', padding: `0 ${token.switchTextPaddingX}` },
  wrapperSmall: {
    fontSize: token.switchSmallFontSize,
  },
  wrapperLarge: {
    fontSize: token.switchLargeFontSize,
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
    color: 'red',
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

    '$wrapperDisabled:not($wrapperChecked) &': {
      backgroundColor: token.switchDisabledCircleFill,
    },
    '$wrapperDisabled &': {
      backgroundColor: token.switchCheckedDisabledCircleFill,
    },

    borderRadius: '50%',
    position: 'absolute',

    backgroundColor: token.switchCircleFill,
    boxShadow: token.switchCircleShadow,
    transition: `left ${transition}, right ${transition}`,
  },
  content: {
    display: 'inline',
    lineHeight: 1,
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
    top: '12%',
    left: '12%',
    right: '12%',
    bottom: '12%',
    borderRadius: '50%',
    border: '1px solid',
    borderColor: token.switchDisabledBackgroundColor,
    borderTopColor: 'transparent',
    animation: `$ring 1s ease-in-out infinite`,

    '$wrapperChecked &': {
      borderColor: token.switchCheckedDisabledBackgroundColor,
      borderTopColor: 'transparent',
    },
  },
};

export default switchStyle;
