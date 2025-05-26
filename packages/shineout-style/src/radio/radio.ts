import { JsStyles } from '../jss-style';
import token from '@sheinx/theme';
import { RadioClasses } from '@sheinx/base';

const radioStyle: JsStyles<keyof RadioClasses> = {
  rootClass: {},
  // '@keyframes so-checkinput-focus': {
  //   '0%': {
  //     boxShadow: `0 0 0 0 ${cssVars.primaryColorFade50}`,
  //   },
  //   '50%': {
  //     boxShadow: `0 0 0 4px ${cssVars.primaryColorFade0}`,
  //   },
  //   '100%': {
  //     boxShadow: `0 0 0 8px ${cssVars.primaryColorFade0}`,
  //   },
  // },
  wrapper: {
    display: 'inline-flex',
    position: 'relative',
    alignItems: 'center',
    cursor: 'pointer',
    boxSizing: 'border-box',
    marginRight: token.radioGap,
    '&:last-child': {
      marginRight: 0,
    },
  },
  wrapperSmall: {
    '[data-soui-role="form-control"] > $group > &': {
      marginTop: 1,
    },
  },
  wrapperLarge: {},
  wrapperChecked: {},
  wrapperDisabled: {
    cursor: 'not-allowed',
  },
  indicatorWrapper: {
    display: 'block',
    position: 'relative',
    boxSizing: 'border-box',
    width: token.radioIconWidth,
    height: token.radioIconWidth,
    '$wrapperSmall &': {
      width: token.radioSmallIconWidth,
      height: token.radioSmallIconWidth,
    },
    '$wrapperLarge &': {
      width: token.radioLargeIconWidth,
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
    '$wrapperChecked &': {
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
