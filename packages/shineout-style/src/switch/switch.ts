import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type SwitchClass =
  | 'wrapper'
  | 'wrapperDisabled'
  | 'wrapperChecked'
  // | 'wrapperLoading'
  | 'wrapperSmall'
  | 'wrapperLarge'
  | 'indicator'
  | 'content';

const transition = '0.36s cubic-bezier(.78, .14, .15, .86)';
const switchStyle: JsStyles<SwitchClass> = {
  wrapper: {
    transition: `background-color ${transition}`,
    border: '0',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    backgroundColor: token.switchBackgroundColor,
    color: token.switchFontColor,
    verticalAlign: 'middle',
    '$wrapperDisabled&': {
      backgroundColor: token.switchDisabledBackgroundColor,
      color: token.switchDisabledFontColor,
    },
    // '$wrapperLoading&': {
    //   backgroundColor: token.switchLoadingBackgroundColor,
    //   color: token.switchLoadingFontColor,
    // },
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
  // wrapperLoading: {},
  wrapperSmall: {},
  wrapperLarge: {},
  indicator: {
    width: token.switchCircleSize,
    height: token.switchCircleSize,
    left: token.switchPaddingX,
    top: token.switchPaddingY,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red',
    '$wrapperChecked &': {
      right: token.switchPaddingX,
      left: `calc(100% - ${token.switchCircleSize} - ${token.switchPaddingX})`,
      '$wrapperSmall&': {
        right: token.switchSmallPaddingX,
        left: `calc(100% - ${token.switchSmallCircleSize} - ${token.switchSmallPaddingX})`,
      },
      '$wrapperLarge&': {
        right: token.switchLargePaddingX,
        left: `calc(100% - ${token.switchLargeCircleSize} - ${token.switchLargePaddingX})`,
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
    '$wrapperChecked &': {
      paddingLeft: 0,
      paddingRight: token.switchCircleSize,
    },
  },
  wrapperDisabled: {
    cursor: 'not-allowed',
  },
  // wrapperLoading: {
  //   cursor: 'not-allowed',
  // },
};

export default switchStyle;
