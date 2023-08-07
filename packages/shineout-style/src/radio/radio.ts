import cssVars from '../cssvar';
import { JsStyles } from '../jss-style';
import token from '@sheinx/theme';

export type RadioClass =
  | 'wrapper'
  | 'wrapperSmall'
  | 'wrapperLarge'
  | 'wrapperError'
  | 'wrapperDisabled'
  | 'wrapperChecked'
  | 'indicatorWrapper'
  | 'indicator'
  // | '@keyframes so-checkinput-focus'
  | 'desc'
  | 'group'
  | 'groupBlock'
  | 'groupButton'
  | 'groupOutline'
  | 'groupSmall'
  | 'groupLarge';

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
    marginRight: token.radioLabelGap,
  },
  wrapperChecked: {},
  wrapperSmall: {},
  wrapperLarge: {},
  wrapperError: {},
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
      zIndex: '10',
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
    padding: '0 8px',
    boxSizing: 'border-box',
  },
  group: {
    padding: '5px 0',
  },
  groupBlock: {
    '& $wrapper': {
      display: 'block',
      marginBottom: '8px',
    },
  },
  groupButton: {
    '& $indicatorWrapper': {
      display: 'none',
    },
    '& $wrapper': {
      position: 'relative',
      backgroundColor: cssVars.white,
      marginRight: 0,
      border: `1px solid ${cssVars.buttonDefaultBorder}`,
      fontWeight: 'normal',
      outline: 'none',
      touchAction: 'manipulation',
      verticalAlign: 'middle',
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      userSelect: 'none',
      padding: `${cssVars.buttonPaddingBaseVertical} ${cssVars.buttonPaddingBaseHorizontal}`,
      lineHeight: cssVars.commonLineHeight,
      background: cssVars.white,
      color: cssVars.buttonDefaultTextColor,
      fill: cssVars.buttonDefaultTextColor,
      transition: 'all .15s ease-in-out',
      borderRadius: 0,
      '&:first-child': {
        borderTopLeftRadius: cssVars.buttonBorderRadius,
        borderBottomLeftRadius: cssVars.buttonBorderRadius,
      },
      '&:last-child': {
        borderTopRightRadius: cssVars.buttonBorderRadius,
        borderBottomRightRadius: cssVars.buttonBorderRadius,
      },
      '&:not(:first-child)': {
        borderLeftWidth: 0,
      },
      '&:not(:first-child)::before': {
        position: 'absolute',
        top: '-1px',
        left: '-1px',
        display: 'block',
        boxSizing: 'content-box',
        width: '1px',
        height: '100%',
        padding: '1px 0',
        backgroundColor: cssVars.grey300,
        content: '""',
        transition: 'background-color .15s ease-in-out',
      },
      '&:not(:last-child)::after': {
        position: 'absolute',
        top: '-1px',
        right: '-1px',
        display: 'block',
        boxSizing: 'content-box',
        width: '1px',
        height: '100%',
        padding: '1px 0',
        backgroundColor: 'transparent',
        content: '""',
        zIndex: '100',
        transition: 'background-color .15s ease-in-out',
      },
      '&:focus, &:hover, &:active': {
        '&:not($wrapperChecked):not($wrapperDisabled)': {
          borderColor: cssVars.primaryColor,
          color: cssVars.primaryColor,
          $desc: {
            color: 'inherit',
          },
          '&::before, &::after': {
            backgroundColor: cssVars.primaryColor,
          },
        },
      },
    },
    '& $wrapper$wrapperChecked': {
      borderColor: 'transparent',
      backgroundColor: cssVars.primaryColor,
      color: cssVars.white,
      fill: cssVars.white,
      '&:not($wrapperDisabled)': {
        zIndex: 1,
      },
      '&:not(:first-child)::before': {
        backgroundColor: cssVars.primaryColor,
      },
    },
    '& $wrapper$wrapperDisabled': {
      '&:not($wrapperChecked)': {
        backgroundColor: cssVars.buttonDisabledBg,
        color: cssVars.buttonDisabledColor,
        '&::before': {
          backgroundColor: cssVars.buttonDisabledDelimiter,
        },
      },
      '&$wrapperChecked': {
        opacity: 0.4,
      },
    },
  },
  groupOutline: {
    '&$groupButton $wrapper$wrapperChecked': {
      borderColor: cssVars.primaryColor,
      backgroundColor: cssVars.white,
      color: cssVars.primaryColor,
    },
  },
  groupSmall: {
    '& $wrapper': {
      padding: `${cssVars.buttonPaddingSmallVertical} ${cssVars.buttonPaddingSmallHorizontal}`,
    },
    '& $desc': {
      lineHeight: cssVars.buttonLineHeightSmall,
      fontSize: cssVars.fontSizeSmall,
    },
  },
  groupLarge: {
    '& $wrapper': {
      padding: `${cssVars.buttonPaddingLargeVertical} ${cssVars.buttonPaddingLargeHorizontal}`,
    },
    '& $desc': {
      lineHeight: cssVars.commonLineHeight,
      fontSize: cssVars.fontSizeLarge,
    },
  },
};

export default radioStyle;
