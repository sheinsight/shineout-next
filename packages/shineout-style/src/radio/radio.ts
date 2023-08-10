import { JsStyles } from '../jss-style';
import token from '@sheinx/theme';

export type RadioClass =
  | 'wrapper'
  | 'wrapperDisabled'
  | 'wrapperChecked'
  | 'indicatorWrapper'
  | 'indicator'
  | 'desc'
  | 'group'
  | 'groupBlock'
  | 'groupButton';

const iconSize = '14px';
const circleSize = '5px';

const radioStyle: JsStyles<RadioClass> = {
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
    display: 'inline-block',
    position: 'relative',
    verticalAlign: 'middle',
    cursor: 'pointer',
    boxSizing: 'border-box',
    marginRight: token.radioGap,
  },
  wrapperChecked: {},
  wrapperDisabled: {
    cursor: 'not-allowed',
  },
  indicatorWrapper: {
    display: 'inline-block',
    position: 'relative',
    boxSizing: 'border-box',
    width: iconSize,
    height: iconSize,
    marginRight: token.radioIconGap,
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
        background: token.radioIconCircleFill,
      },
      '& $indicator': {
        borderColor: token.radioIconHoverBorderColor,
        backgroundColor: token.radioIconHoverBackgroundColor,
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
    borderStyle: 'solid',
    borderWidth: token.radioIconBorderWidth,
    borderColor: token.radioIconBorderColor,
    backgroundColor: token.radioIconBackgroundColor,
    color: 'transparent',
    display: 'inline-block',
    verticalAlign: 'middle',
    '$wrapperChecked &::after': {
      content: '" "',
      position: 'absolute',
      display: 'block',
      background: 'currentColor',
      left: '0px',
      right: '0px',
      top: '0px',
      bottom: '0px',
      margin: 'auto',
      width: '4px',
      height: '4px',
      borderRadius: '50%',
    },
    '$wrapperChecked &': {
      borderColor: token.radioIconActiveBorderColor,
      backgroundColor: token.radioIconActiveBackgroundColor,
      color: token.radioIconActiveColor,
    },
    '$wrapperDisabled &': {
      borderColor: token.radioIconDisabledBorderColor,
      backgroundColor: token.radioIconDisabledBackgroundColor,
    },
    '$wrapperDisabled$wrapperChecked &, $wrapperDisabled$wrapperIndeterminate &': {
      borderColor: token.radioIconActivedisabledBorderColor,
      backgroundColor: token.radioIconActivedisabledBackgroundColor,
      color: token.radioIconActivedisabledColor,
    },
  },
  desc: {
    verticalAlign: 'middle',
    boxSizing: 'border-box',
    fontSize: token.radioLabelFontSize,
  },
  group: {
    // padding: '5px 0',
  },
  groupBlock: {
    '& $wrapper': {
      display: 'block',
      marginBottom: token.radioBlockGap,
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
