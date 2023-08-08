import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type CheckboxClass =
  | 'wrapper'
  | 'wrapperDisabled'
  | 'wrapperChecked'
  | 'wrapperIndeterminate'
  | 'indicator'
  | 'indicatorWrapper'
  | 'desc'
  | 'input'
  | 'group'
  | 'groupBlock';

const iconSize = '14px';
const circleSize = '5px';
const checkboxStyle: JsStyles<CheckboxClass> = {
  wrapper: {
    display: 'inline-block',
    position: 'relative',
    verticalAlign: 'middle',
    cursor: 'pointer',
    boxSizing: 'border-box',
    marginRight: token.checkboxGap,
    '& $input': {
      width: 'auto',
      marginLeft: token.checkboxIconGap,
    },
  },
  input: {},
  wrapperChecked: {},
  wrapperIndeterminate: {},
  wrapperDisabled: {
    cursor: 'not-allowed',
  },
  indicatorWrapper: {
    display: 'inline-block',
    position: 'relative',
    boxSizing: 'border-box',
    width: iconSize,
    height: iconSize,
    marginRight: token.checkboxIconGap,
    verticalAlign: 'middle',
    '&::before': {
      content: '" "',
      display: 'block',
      width: '100%',
      height: '100%',
      padding: circleSize,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      boxSizing: 'content-box',
      background: 'transparent',
      borderRadius: '50%',
    },
    '$wrapper:not($wrapperChecked):not($wrapperIndeterminate):not($wrapperDisabled):hover &': {
      '&::before': {
        background: token.checkboxIconCircleFill,
      },
      '& $indicator': {
        borderColor: token.checkboxIconHoverBorderColor,
        backgroundColor: token.checkboxIconHoverBackgroundColor,
        color: token.checkboxIconHoverColor,
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
    display: 'inline-block',
    verticalAlign: 'middle',
    '$wrapperChecked &::after': {
      content: '" "',
      position: 'relative',
      display: 'block',
      border: '2px solid transparent',
      borderWidth: '0 0 2px 2px',
      transform: 'translate(-50%, -65%) rotate(-45deg)',
      borderColor: 'currentColor',
      top: '50%',
      left: '50%',
      width: '9px',
      height: '5px',
      boxSizing: 'border-box',
    },
    '$wrapperIndeterminate &::after': {
      content: '" "',
      position: 'relative',
      display: 'block',
      border: '2px solid transparent',
      height: '0px',
      width: '10px',
      borderWidth: '0 0 2px 0px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderColor: 'currentColor',
    },
    '$wrapperChecked &, $wrapperIndeterminate &': {
      borderColor: token.checkboxIconActiveBorderColor,
      backgroundColor: token.checkboxIconActiveBackgroundColor,
      color: token.checkboxIconActiveColor,
    },

    '$wrapperDisabled &': {
      borderColor: token.checkboxIconDisabledBorderColor,
      backgroundColor: token.checkboxIconDisabledBackgroundColor,
      color: token.checkboxIconDisabledColor,
    },
    '$wrapperDisabled$wrapperChecked &, $wrapperDisabled$wrapperIndeterminate &': {
      borderColor: token.checkboxIconActivedisabledBorderColor,
      backgroundColor: token.checkboxIconActivedisabledBackgroundColor,
      color: token.checkboxIconActivedisabledColor,
    },
  },
  desc: {
    verticalAlign: 'middle',
    boxSizing: 'border-box',
    fontSize: token.checkboxLabelFontSize,
  },
  group: {
    padding: '5px 0',
  },
  groupBlock: {
    '& $wrapper': {
      display: 'block',
      marginBottom: token.checkboxBlockGap,
    },
  },
};

export default checkboxStyle;
