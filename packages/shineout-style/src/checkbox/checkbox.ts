import cssVars from '../cssvar';
import { JsStyles } from '../jss-style';

type CheckboxClass =
  | 'wrapper'
  | 'wrapperSmall'
  | 'wrapperLarge'
  | 'wrapperError'
  | 'wrapperDisabled'
  | 'wrapperChecked'
  | 'wrapperIndeterminate'
  | 'indicator'
  | '@keyframes so-checkinput-focus'
  | 'desc'
  | 'group'
  | 'groupBlock'
  | 'groupButton'
  | 'groupOutline'
  | 'groupSmall'
  | 'groupLarge';

const checkboxStyle: JsStyles<CheckboxClass> = {
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
    fontSize: cssVars.fontSize,
    lineHeight: cssVars.commonLineHeight,
    boxSizing: 'border-box',
  },
  wrapperChecked: {},
  wrapperIndeterminate: {},
  wrapperSmall: {},
  wrapperLarge: {},
  wrapperError: {},
  wrapperDisabled: {
    cursor: 'not-allowed',
  },
  indicator: {
    boxSizing: 'border-box',
    width: cssVars.checkboxWidth,
    height: cssVars.checkboxWidth,
    borderRadius: '50%',
    borderStyle: 'solid',
    borderWidth: cssVars.checkboxBorderUncheckWidth,
    borderColor: cssVars.checkboxBorderColor,
    backgroundColor: cssVars.white,
    display: 'inline-flex',
    verticalAlign: 'middle',
    '$wrapperChecked &': {
      borderColor: cssVars.primaryColor,
      borderWidth: cssVars.checkboxBorderWidth,
      boxShadow: `0 0 0 0 ${cssVars.primaryColorFade50}`,
      animation: '$so-checkinput-focus .6s ease-out',
    },
    '$wrapperDisabled &': {
      backgroundColor: cssVars.checkboxDisabledBgc,
    },
    '$wrapperDisabled$wrapperChecked &': {
      backgroundColor: cssVars.white,
      borderColor: cssVars.checkboxCheckedDisabledBgc,
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
    '& $indicator': {
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

export default checkboxStyle;
