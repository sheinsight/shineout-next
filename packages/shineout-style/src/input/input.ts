import border from './input-border';

import { JsStyles } from '../jss-style';
import token from '@sheinx/theme';
import { InputClasses } from '@sheinx/base';

const inputBorderToken = {
  lineHeight: token.lineHeightDynamic,
  borderRadius: token.inputBorderRadius,

  fontSize: token.inputFontSize,
  fontWeight: token.inputFontWeight,
  smallFontSize: token.inputSmallFontSize,
  largeFontSize: token.inputLargeFontSize,

  paddingY: token.inputPaddingY,
  smallPaddingY: token.inputSmallPaddingY,
  largePaddingY: token.inputLargePaddingY,

  paddingX: token.inputPaddingX,
  smallPaddingX: token.inputSmallPaddingX,
  largePaddingX: token.inputLargePaddingX,

  borderColor: token.inputBorderColor,
  borderWidth: token.inputBorderWidth,
  focusBorderColor: token.inputFocusBorderColor,
  hoverBorderColor: token.inputHoverBorderColor,
  disabledBorderColor: token.inputDisabledBorderColor,
  errorBorderColor: token.inputErrorBorderColor,
  errorHoverBorderColor: token.inputErrorHoverBorderColor,
  errorFocusBorderColor: token.inputErrorFocusBorderColor,

  fontColor: token.inputFontColor,
  disabledFontColor: token.inputDisabledFontColor,

  backgroundColor: token.inputBackgroundColor,
  hoverBackgroundColor: token.inputHoverBackgroundColor,
  focusBackgroundColor: token.inputFocusBackgroundColor,
  disabledBackgroundColor: token.inputDisabledBackgroundColor,
  errorBackgroundColor: token.inputErrorBackgroundColor,
  errorFocusBackgroundColor: token.inputErrorFocusBackgroundColor,
  errorHoverBackgroundColor: token.inputErrorHoverBackgroundColor,

  focusShadow: token.inputFocusShadow,
  errorFocusShadow: token.inputErrorFocusShadow,

  innerTitlePaddingY: token.inputInnerPaddingY,
  innerTitlePaddingX: token.inputInnerPaddingX,

  smallInnerTitlePaddingY: token.inputInnerSmallPaddingY,
  smallInnerTitlePaddingX: token.inputInnerSmallPaddingX,

  largeInnerTitlePaddingY: token.inputInnerLargePaddingY,
  largeInnerTitlePaddingX: token.inputInnerLargePaddingX,
};
const inputBorder = border('wrapper', inputBorderToken);
const groupBorder = border('group', inputBorderToken);
const { wrapper, ...resetWrapper } = inputBorder;

const { group, groupSmall, groupLarge, ...resetGroup } = groupBorder;

const groupSpace = (gap: string) => ({
  '& > i:first-child, & > span:first-child': {
    paddingLeft: gap,
  },
  '& > i:last-child, & > span:last-child': {
    paddingRight: gap,
  },
  '[data-soui-role="input-group-separate"]&, [data-soui-role="input-group-seperate"]&': {
    '& > b:first-child': {
      marginLeft: 0,
      borderLeft: `1px solid ${token.inputBorderColor}`,
    },
    '& > b:last-child': {
      marginRight: 0,
      borderRight: `1px solid ${token.inputBorderColor}`,
    }
  },
  '& > b': {
    padding: `0 ${gap}`,
    display: 'flex',
    alignItems: 'center',
    borderLeft: `1px solid ${token.inputBorderColor}`,
    borderRight: `1px solid ${token.inputBorderColor}`,
    background: token.inputGroupFontBackgroundColor,
    fontWeight: 'normal',
    color: token.inputGroupFontColor,
    '&:first-child': {
      borderLeft: 'none',
    },
    '&:last-child': {
      borderRight: 'none',
    },
  },
  '&[dir=ltr] > b': {
    '&:first-child': {
      borderTopLeftRadius: token.inputBorderRadius,
      borderBottomLeftRadius: token.inputBorderRadius,
    },
    '&:last-child': {
      borderTopRightRadius: token.inputBorderRadius,
      borderBottomRightRadius: token.inputBorderRadius,
    },
  },
  '&[dir=rtl] > b': {
    '&:first-child': {
      borderTopRightRadius: token.inputBorderRadius,
      borderBottomRightRadius: token.inputBorderRadius,
    },
    '&:last-child': {
      borderTopLeftRadius: token.inputBorderRadius,
      borderBottomLeftRadius: token.inputBorderRadius,
    },
  },
});

const input: JsStyles<keyof InputClasses> = {
  rootClass: {},
  wrapper: {
    display: 'inline-flex',
    width: '100%',
    boxSizing: 'border-box',
    alignItems: 'center',
    position: 'relative',
    ...wrapper,

    '[data-soui-role="input-group-separate"] &, [data-soui-role="input-group-seperate"] &': {
      flex: 1,
      minWidth: 0,
    },
  },
  ...resetWrapper,
  wrapperNumber: {},
  content: {
    display: 'flex',
    flex: 1,
    minWidth: '0',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    background: 'transparent',
    fontFamily: 'inherit',
    padding: '0',
    border: '0',
    margin: '0',
    lineHeight: 'inherit',
    color: 'inherit',
    fontSize: 'inherit',
    outline: 'none',
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    fontWeight: 'inherit',
    '$wrapper:not($wrapperDisabled) &::placeholder': {
      color: token.inputPlaceholderColor,
    },
    '$wrapperDisabled &::placeholder': {
      color: token.inputDisabledPlaceholderColor,
    },
    '&::placeholder': {
      fontWeight: token.inputPlaceholderFontWeight,
      fontSize: 'inherit',
    },
  },
  clearWrapper: {
    position: 'relative',
    flexBasis: `calc(${token.inputIconSize} + 8px)`,
    flexShrink: 0,
    display: 'none',
    '$wrapper:hover &, $wrapperFocus &': {
      display: 'flex',
    },
  },

  password: {
    '& $clearWrapper': {
      flexBasis: `calc(${token.inputIconSize} + 12px)`,
    },
    '& $clear': {
      marginRight: 8,
      color: token.inputClearColor,
      '&:hover svg': {
        color: token.inputHoverClearColor,
      },
    },
  },

  clear: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    margin: 'auto',
    width: token.inputIconSize,
    height: token.inputIconSize,
    boxSizing: 'border-box',
    display: 'flex',
    cursor: 'pointer',
    color: token.inputClearColor,
    '&:hover svg': {
      color: token.inputHoverClearColor,
    },
    '&[dir=ltr]': {
      right: '0',
    },
    '&[dir=rtl]': {
      left: '0',
    },
  },

  group: {
    ...group,
    display: 'flex',
    boxSizing: 'border-box',
    alignItems: 'stretch',
    padding: '0',
    '& > i, & > span': {
      display: 'block',
      margin: 'auto 0',
      background: 'transparent',
    },
    ...groupSpace(token.inputPaddingX),
  },
  groupSeparate: {
    border: 'none',

    '& > b': {
      border: `1px solid ${token.inputBorderColor}`,
      'margin-left': '-1px',
    }
  },
  groupSmall: {
    ...groupSmall,
    ...groupSpace(token.inputSmallPaddingX),
  },
  groupLarge: {
    ...groupLarge,
    ...groupSpace(token.inputLargePaddingX),
  },
  ...resetGroup,
  numberStep: {
    display: 'flex',
    alignSelf: 'stretch',
    boxSizing: 'border-box',
    flexFlow: 'column noWrap',
    '& > span': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '0',
      flexGrow: '1',
      boxSizing: 'border-box',
      cursor: 'pointer',
      width: '18px',
      borderLeft: `1px solid ${token.inputBorderColor}`,
      lineHeight: '1',
      color: token.inputIconColor,
      '&:hover': {
        '$wrapper:not($wrapperDisabled) &': {
          color: token.inputHoverIconColor,
        },
      },
      '&:first-child': {
        borderBottom: `1px solid ${token.inputBorderColor}`,
      },
      '& svg': {
        width: 14,
        transform: 'rotate(-90deg)',
      },
    },

    '$wrapperDisabled & > span': {
      color: token.inputDisabledFontColor,
      borderColor: token.inputDisabledBorderColor,
      '&:first-child': {
        borderColor: token.inputDisabledBorderColor,
      },
    },
  },
  passwordToggle: {
    display: 'flex',
    alignItems: 'center',
    width: token.inputIconSize,
    height: token.inputIconSize,
    color: token.inputToggleColor,
    cursor: 'pointer',
    '& > svg': {
      width: token.inputIconSize,
      height: token.inputIconSize,
      cursor: 'pointer',
      pointerEvents: 'none',
    },
    '&:hover svg': {
      color: token.inputHoverToggleColor,
    },
  },
  info: {
    background: token.inputInfoBackgroundColor,
    color: token.inputInfoFontColor,
  },
};

export default input;
