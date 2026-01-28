import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';
import { CheckboxClasses } from '@sheinx/base';
import { animations } from '../common';

const checkboxStyle: JsStyles<keyof CheckboxClasses> = {
  ...animations,
  rootClass: {},
  wrapper: {
    display: 'inline-flex',
    position: 'relative',
    alignItems: 'flex-start',
    cursor: 'pointer',
    boxSizing: 'border-box',
    marginRight: token.checkboxGap,
    '& $input': {
      width: 'auto',
      marginLeft: token.checkboxIconGap,
    },
  },
  wrapperSmall: {},
  wrapperLarge: {},
  input: {},
  wrapperChecked: {},
  wrapperIndeterminate: {},
  wrapperDisabled: {
    cursor: 'not-allowed',
  },
  indicatorWrapper: {
    display: 'block',
    position: 'relative',
    boxSizing: 'border-box',
    width: token.checkboxIconSize,
    height: token.checkboxIconSize,
    marginTop: 4,
    flexShrink: 0,
    '$wrapperSmall &': {
      width: token.checkboxSmallIconSize,
      height: token.checkboxSmallIconSize,
    },
    '$wrapperLarge &': {
      width: token.checkboxLargeIconSize,
      height: token.checkboxLargeIconSize,
    },
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
    '$wrapper:not($wrapperChecked):not($wrapperIndeterminate):not($wrapperDisabled):hover &:not($darkIndicatorWrapper)':
      {
        '&::before': {
          background: token.checkboxIconCircleFill,
        },
        '& $indicator': {
          backgroundColor: token.checkboxIconHoverBackgroundColor,
          color: token.checkboxIconHoverColor,
        },
      },
  },
  darkIndicatorWrapper: {
    '$wrapper:not($wrapperChecked):not($wrapperIndeterminate):not($wrapperDisabled):hover &&': {
      '&::before': {
        background: token.checkboxIconCircleDark,
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
    borderRadius: token.checkboxIconBorderRadius,
    borderStyle: 'solid',
    borderWidth: token.checkboxIconBorderWidth,
    borderColor: token.checkboxIconBorderColor,
    backgroundColor: token.checkboxIconBackgroundColor,
    color: token.checkboxIconColor,
    display: 'block',
    verticalAlign: 'middle',
    '& > svg': {
      position: 'absolute',
      width: '80%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      animation: '$bounce-in-center 0.2s cubic-bezier(0.22, 0.61, 0.36, 1)',
    },
    '$wrapperChecked &, $wrapperIndeterminate &': {
      borderColor: token.checkboxIconCheckedBorderColor,
      borderWidth: 0,
      backgroundColor: token.checkboxIconCheckedBackgroundColor,
      color: token.checkboxIconCheckedColor,
    },

    '$wrapperDisabled &': {
      borderColor: token.checkboxIconDisabledBorderColor,
      backgroundColor: token.checkboxIconDisabledBackgroundColor,
      color: token.checkboxIconDisabledColor,
    },
    '$wrapperDisabled$wrapperChecked &, $wrapperDisabled$wrapperIndeterminate &': {
      borderColor: token.checkboxIconCheckedDisabledBorderColor,
      backgroundColor: token.checkboxIconCheckedDisabledBackgroundColor,
      color: token.checkboxIconCheckedDisabledColor,
    },
  },
  desc: {
    verticalAlign: 'middle',
    boxSizing: 'border-box',
    marginLeft: token.checkboxIconGap,
    fontSize: token.checkboxLabelFontSize,
    fontWeight: token.checkboxFontWeight,
    '$wrapperSmall &': {
      fontSize: token.checkboxSmallLabelFontSize,
    },
    '$wrapperLarge &': {
      fontSize: token.checkboxLargeLabelFontSize,
    },
    lineHeight: token.lineHeightDynamic,
    color: token.checkboxLabelFontColor,
    '$wrapperDisabled &': {
      color: token.checkboxLabelDisabledFontColor,
    },
  },
  group: {
    '[data-soui-role="form-control"] >  &': {
      padding: '5px 0',
    },
    lineHeight: 1,
  },
  groupBlock: {
    '& $wrapper': {
      display: 'flex',
      marginBottom: token.checkboxBlockGap,
      marginRight: 0,
    },
  },
};

export default checkboxStyle;
