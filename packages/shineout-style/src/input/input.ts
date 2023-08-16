import border from './input-border';

import { JsStyles } from '../jss-style';
import token from '@sheinx/theme';

const inputBorderToken = {
  lineHeightDynamic: token.lineHeightDynamic,
  borderRadius: token.inputBorderRadius,

  fontSize: token.inputFontSize,
  smallFontSize: token.inputSmallFontSize,
  largeFontSize: token.inputLargeFontSize,

  paddingY: token.inputPaddingY,
  smallPaddingY: token.inputSmallPaddingY,
  largePaddingY: token.inputLargePaddingY,

  paddingX: token.inputPaddingX,
  smallPaddingX: token.inputSmallPaddingX,
  largePaddingX: token.inputLargePaddingX,

  borderColor: token.inputBorderColor,
  focusBorderColor: token.inputFocusBorderColor,
  hoverBorderColor: token.inputHoverBorderColor,
  disabledBorderColor: token.inputDisabledBorderColor,
  errorBorderColor: token.inputErrorBorderColor,

  fontColor: token.inputFontColor,
  disabledFontColor: token.inputDisabledFontColor,

  backgroundColor: token.inputBackgroundColor,
  disabledBackgroundColor: token.inputDisabledBackgroundColor,

  focusShadow: `#bde2ff`,
  errorFocusShadow: `${token.inputErrorBorderColor}`,
};
const inputBorder = border('wrapper', inputBorderToken);
const groupBorder = border('group', inputBorderToken);
const { wrapper, ...resetWrapper } = inputBorder;

const { group, groupSmall, groupLarge, ...resetGroup } = groupBorder;

export type InputClass =
  | 'wrapper'
  | 'wrapperSmall'
  | 'wrapperLarge'
  | 'wrapperFocus'
  | 'wrapperError'
  | 'wrapperDisabled'
  | 'wrapperUnderline'
  | 'wrapperInGroup'
  | 'wrapperNoBorder'
  | 'paddingBox'
  | 'clearWrapper'
  | 'input'
  | 'clear'
  | 'group'
  | 'groupSmall'
  | 'groupLarge'
  | 'groupFocus'
  | 'groupError'
  | 'groupDisabled'
  | 'groupUnderline'
  | 'wrapperNumber'
  | 'numberStep'
  | 'info'
  | 'infoError';

const groupSpace = (gap: string) => ({
  '& > i:first-child, & > span:first-child': {
    paddingLeft: gap,
  },
  '& > i:last-child, & > span:last-child': {
    paddingRight: gap,
  },
  '& > b': {
    padding: `0 ${gap}`,
    display: 'flex',
    alignItems: 'center',
    border: `1px solid ${token.inputBorderColor}`,
    borderWidth: '0 1px',
    background: token.inputDisabledBackgroundColor,
    fontWeight: 'normal',
    '&:first-child': {
      borderTopLeftRadius: token.inputBorderRadius,
      borderBottomLeftRadius: token.inputBorderRadius,
      borderLeftColor: 'inherit',
      marginLeft: '-1px',
    },
    '&:last-child': {
      borderTopRightRadius: token.inputBorderRadius,
      borderBottomRightRadius: token.inputBorderRadius,
      borderRightColor: 'inherit',
      marginRight: '-1px',
    },
  },
});

const input: JsStyles<InputClass> = {
  ...inputBorder,
  wrapper: {
    display: 'inline-flex',
    width: '100%',
    boxSizing: 'border-box',
    alignItems: 'center',
    position: 'relative',
    ...wrapper,
  },
  ...resetWrapper,
  wrapperNumber: {},
  input: {
    width: '100%',
    background: 'transparent',
    border: '0',
    margin: '0',
    lineHeight: 'inherit',
    color: 'inherit',
    fontSize: 'inherit',
    outline: 'none',
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    '&::placeholder': {
      color: token.inputPlaceholderColor,
      fontSize: 'inherit',
    },
  },
  clearWrapper: {
    position: 'relative',
    flexBasis: `calc(${token.inputIconSize} + 2px)`,
    flexShrink: 0,
    display: 'none',
    '$wrapper:hover &, $wrapperFocus &': {
      display: 'flex',
    },
  },

  clear: {
    position: 'absolute',
    right: token.inputPaddingX,
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
    '$wrapperSmall &': {
      right: token.inputSmallPaddingX,
    },
    '$wrapperLarge &': {
      right: token.inputLargePaddingX,
    },
  },
  // todo button select cascader datepicker 等组件的样式覆盖问题
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
      display: 'block',
      minHeight: '0',
      flexGrow: '1',
      boxSizing: 'border-box',
      cursor: 'pointer',
      width: '18px',
      padding: '0 4px',
      borderLeft: `1px solid ${token.inputDisabledBorderColor}`,
      lineHeight: '1',
      color: token.inputDisabledFontColor,
      '&:hover': {
        '$wrapper:not($wrapperDisabled) &': {
          color: token.inputHoverBorderColor,
        },
      },
      '&:first-child': {
        borderBottom: `1px solid ${token.inputDisabledBorderColor}`,
      },
      '& svg': {
        transform: 'rotate(-90deg)',
      },
    },
  },
  info: {
    position: 'absolute',
    right: '0',
    top: '100%',
    transformOrigin: '100% 0',
    marginTop: '10px',
    animation: 'so-input-fade .16s ease-in',
    maxWidth: '400px',
    padding: '5px 8px',
    background: token.inputInfoBackgroundColor,
    borderRadius: token.inputBorderRadius,
    boxShadow: `0 0 0 1px ${token.inputBorderColor}`,
    fontSize: '12px',
    color: token.inputInfoFontColor,
    '&::before': {
      display: 'block',
      position: 'absolute',
      right: '4px',
      bottom: '100%',
      transform: 'rotate(45deg) translateY(3px)',
      width: '6px',
      height: '6px',
      border: `1px solid ${token.inputBorderColor}`,
      borderWidth: '1px 0 0 1px',
      background: 'inherit',
      content: "'  '",
    },
  },
  infoError: {
    boxShadow: `0 0 0 1px ${token.inputInfoErrorBorderColor}`,
    color: token.inputInfoErrorFontColor,
    background: token.inputInfoErrorBackgroundColor,
    '&::before': {
      borderColor: token.inputInfoErrorBorderColor,
    },
  },
};

export default input;
