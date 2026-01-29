import { JsStyles } from '../jss-style';
import token from '@sheinx/theme';
import { RadioClasses } from '@sheinx/base';
import { animations } from '../common';

const radioStyle: JsStyles<keyof RadioClasses> = {
  ...animations,
  rootClass: {},
  wrapper: {
    display: 'inline-flex',
    position: 'relative',
    alignItems: 'flex-start',
    cursor: 'pointer',
    boxSizing: 'border-box',
    marginRight: token.radioGap,
    '&:last-child': {
      marginRight: 0,
    },
    'button&':{
      padding: `${token.radioButtonPaddingY} ${token.radioButtonPaddingX}`,
    },
    'button[data-soui-outline]&:not($wrapperChecked):not($wrapperDisabled):not(:hover)':{
      borderColor: token.radioButtonBorderColor,
    },
  },
  wrapperSmall: {
    '[data-soui-role="form-control"] > $group > &': {
      marginTop: 1,
    },
    'button&':{
      padding: `${token.radioSmallButtonPaddingY} ${token.radioSmallButtonPaddingX}`,
    }
  },
  wrapperLarge: {
    'button&':{
      padding: `${token.radioLargeButtonPaddingY} ${token.radioLargeButtonPaddingX}`,
    }
  },
  wrapperChecked: {},
  wrapperDisabled: {
    cursor: 'not-allowed',
  },
  indicatorWrapper: {
    display: 'block',
    position: 'relative',
    boxSizing: 'border-box',
    width: token.radioIconWidth,
    minWidth: token.radioIconWidth,
    height: token.radioIconWidth,
    marginTop: 4,
    '$wrapperSmall &': {
      width: token.radioSmallIconWidth,
      minWidth: token.radioSmallIconWidth,
      height: token.radioSmallIconWidth,
    },
    '$wrapperLarge &': {
      width: token.radioLargeIconWidth,
      minWidth: token.radioLargeIconWidth,
      height: token.radioLargeIconWidth,
    },
    marginRight: token.radioIconGap,
    verticalAlign: 'middle',
    '&::before': {
      content: '" "',
      display: 'block',
      width: '100%',
      height: '100%',
      padding: token.iconCirclePadding,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      boxSizing: 'content-box',
      background: 'transparent',
      borderRadius: '50%',
    },
    '$wrapper:not($wrapperChecked):not($wrapperDisabled):hover &': {
      '&::before': {
        background: token.radioIconWrapperFill,
      },
      '& $indicator': {
        backgroundColor: token.radioIconWrapperFill,
      },
    },
  },
  darkIndicatorWrapper: {
    '$wrapper:not($wrapperChecked):not($wrapperDisabled):hover &': {
      '&::before': {
        background: token.radioIconWrapperDark,
      },
    },
  },
  indicator: {
    position: 'absolute',
    boxSizing: 'border-box',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    display: 'inline-block',
    '& > svg': {
      width: '100%',
      height: '100%',
    },
    color: token.radioIconColor,
    backgroundColor: token.radioIconBackgroundColor,
    border: '1px solid currentColor',
    '$wrapperChecked > $indicatorWrapper > &': {
      backgroundColor: token.radioIconCheckedBackgroundColor,
      color: token.radioIconCheckedColor,
      '&::after': {
        content: '" "',
        display: 'block',
        width: '50%',
        height: '50%',
        borderRadius: '50%',
        backgroundColor: 'currentcolor',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        animation: '$bounce-in-center 0.2s cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
    },
    '$wrapperDisabled:not($wrapperChecked) &': {
      backgroundColor: token.radioIconDisabledBackgroundColor,
      color: token.radioIconDisabledColor,
    },
    '$wrapperDisabled$wrapperChecked &, $wrapperDisabled &': {
      backgroundColor: token.radioIconCheckedDisabledBackgroundColor,
      color: token.radioIconCheckedDisabledColor,
    },
  },
  desc: {
    verticalAlign: 'middle',
    boxSizing: 'border-box',
    fontSize: token.radioLabelFontSize,
    lineHeight: token.lineHeightDynamic,
    color: token.radioLabelFontColor,
    '$wrapperDisabled &': {
      color: token.radioLabelDisabledFontColor,
    },
    '$wrapperSmall &': {
      fontSize: token.radioSmallLabelFontSize,
    },
    '$wrapperLarge &': {
      fontSize: token.radioLargeLabelFontSize,
    },
  },
  group: {
    lineHeight: 1,
    '[data-soui-role="form-control"] >  &': {
      padding: '5px 0',
    },
  },
  groupBlock: {
    '& $wrapper': {
      display: 'flex',
      marginBottom: token.radioBlockGap,
      marginRight: 0,
      '&:last-child': {
        marginBottom: 0,
      }
    },
  },
  groupButton: {
    '& $indicatorWrapper': {
      display: 'none',
    },
    '& $desc': {
      padding: 0,
      display: 'inline-block',
    },
    '& $wrapper': {
      margin: 0,
    },
  },
};

export default radioStyle;
