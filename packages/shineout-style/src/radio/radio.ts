import { colorVar } from '../themes/default';
import { JsStyles } from '../jss-style';
import RadioVar from './radio.var';

type RadioClass =
  | 'wrapper'
  | 'wrapperSmall'
  | 'wrapperLarge'
  | 'wrapperError'
  | 'wrapperDisabled'
  | 'wrapperChecked'
  | 'indicator'
  | '@keyframes so-checkinput-focus'
  | 'desc';

const radioStyle: JsStyles<RadioClass> = {
  '@keyframes so-checkinput-focus': {
    '0%': {
      boxShadow: `0 0 0 0 ${colorVar.primaryFade50}`,
    },
    '50%': {
      boxShadow: `0 0 0 4px ${colorVar.primaryFade0}`,
    },
    '100%': {
      boxShadow: `0 0 0 8px ${colorVar.primaryFade0}`,
    },
  },
  wrapper: {
    color: RadioVar.color,
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
    width: RadioVar.size,
    height: RadioVar.size,
    borderRadius: '50%',
    borderStyle: 'solid',
    borderWidth: RadioVar.borderWidthUnChecked,
    borderColor: RadioVar.borderColor,
    backgroundColor: RadioVar.backgroundColor,
    display: 'inline-flex',
    verticalAlign: 'middle',
    '$wrapperChecked &': {
      borderColor: colorVar.primary,
      borderWidth: RadioVar.borderWidthChecked,
      boxShadow: `0 0 0 0 ${colorVar.primaryFade50}`,
      animation: '$so-checkinput-focus .6s ease-out',
    },
    '$wrapperDisabled &': {
      borderColor: RadioVar.borderColor,
      backgroundColor: RadioVar.backgroundColorDisabled,
    },
    '$wrapperDisabled$wrapperChecked &': {
      borderColor: RadioVar.borderColor,
      backgroundColor: '#fff',
    },
  },
  desc: {
    verticalAlign: 'middle',
    padding: '0 8px',
  },
};

export default radioStyle;
