import { JsStyles } from '../jss-style';
import token from '@sheinx/theme';

export type RadioClass =
  | 'wrapper'
  | 'wrapperSmall'
  | 'wrapperLarge'
  | 'wrapperDisabled'
  | 'wrapperChecked'
  | 'indicatorWrapper'
  | 'indicator'
  | 'desc'
  | 'group'
  | 'groupBlock'
  | 'groupButton';

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
  wrapperSmall: {},
  wrapperLarge: {},
  wrapperChecked: {},
  wrapperDisabled: {
    cursor: 'not-allowed',
  },
  indicatorWrapper: {
    display: 'inline-block',
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
      padding: token.radioIconWrapperPadding,
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
        background: token.radioIconWrapperFill,
      },
      '& $indicator': {
        backgroundColor: token.radioIconWrapperFill,
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
    display: 'inline-flex',
    alignItems: 'center',
    '& > svg': {
      width: '100%',
      height: '100%',
    },
    color: token.radioIconColor,
    backgroundColor: token.radioIconBackgroundColor,

    '$wrapperChecked &': {
      backgroundColor: token.radioIconCheckedBackgroundColor,
      color: token.radioIconCheckedColor,
    },
    '$wrapperDisabled &': {
      backgroundColor: token.radioIconDisabledBackgroundColor,
      color: token.radioIconDisabledColor,
    },
    '$wrapperDisabled$wrapperChecked &, $wrapperDisabled$wrapperIndeterminate &': {
      backgroundColor: token.radioIconCheckedDisabledBackgroundColor,
      color: token.radioIconCheckedDisabledColor,
    },
  },
  desc: {
    verticalAlign: 'middle',
    boxSizing: 'border-box',
    fontSize: token.radioLabelFontSize,
    '$wrapperSmall &': {
      fontSize: token.radioSmallLabelFontSize,
    },
    '$wrapperLarge &': {
      fontSize: token.radioLargeLabelFontSize,
    },
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
