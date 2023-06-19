import cssVars from '../cssvar';
import { JsStyles } from '../jss-style';

/*
groupBlock]: block,
    [jssStyle.groupButton]: button,
    [jssStyle.groupOutline]: button === 'outline',
    [jssStyle.groupSmall]: button && size === 'small',
    [jssStyle.groupLarge]: button && size === 'large',
 */
type RadioClass =
  | 'wrapper'
  | 'wrapperSmall'
  | 'wrapperLarge'
  | 'wrapperError'
  | 'wrapperDisabled'
  | 'wrapperChecked'
  | 'indicator'
  | '@keyframes so-checkinput-focus'
  | 'desc'
  | 'group'
  | 'groupBlock'
  | 'groupButton'
  | 'groupOutline'
  | 'groupSmall'
  | 'groupLarge';

const radioStyle: JsStyles<RadioClass> = {
  '@keyframes so-checkinput-focus': {
    '0%': {
      boxShadow: `0 0 0 0 ${cssVars.primaryColorFade50}`,
    },
    '50%': {
      boxShadow: `0 0 0 4px ${cssVars.primaryColorFade0}`,
    },
    '100%': {
      boxShadow: `0 0 0 8px ${cssVars.primaryColorFade0}`,
    },
  },
  wrapper: {
    color: cssVars.checkinputColor,
    display: 'inline-block',
    position: 'relative',
    marginRight: '10px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  },
  wrapperChecked: {},
  wrapperSmall: {},
  wrapperLarge: {},
  wrapperError: {},
  wrapperDisabled: {
    cursor: 'not-allowed',
  },
  indicator: {
    boxSizing: 'border-box',
    width: cssVars.radioWidth,
    height: cssVars.radioWidth,
    borderRadius: '50%',
    borderStyle: 'solid',
    borderWidth: cssVars.radioBorderUncheckWidth,
    borderColor: cssVars.checkboxBorderColor,
    backgroundColor: cssVars.white,
    display: 'inline-flex',
    verticalAlign: 'middle',
    '$wrapperChecked &': {
      borderColor: cssVars.primaryColor,
      borderWidth: cssVars.radioBorderWidth,
      boxShadow: `0 0 0 0 ${cssVars.primaryColorFade50}`,
      animation: '$so-checkinput-focus .6s ease-out',
    },
    '$wrapperDisabled &': {
      backgroundColor: cssVars.checkboxDisabledBgc,
    },
    '$wrapperDisabled$wrapperChecked &': {
      backgroundColor: cssVars.white,
    },
  },
  desc: {
    verticalAlign: 'middle',
    padding: '0 8px',
  },
  group: {
    padding: '5px 0',
  },
  groupBlock: {},
  groupButton: {},
  groupOutline: {},
  groupSmall: {},
  groupLarge: {},
};

export default radioStyle;
