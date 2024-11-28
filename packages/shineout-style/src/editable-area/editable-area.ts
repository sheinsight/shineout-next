import { JsStyles } from '../jss-style';
import border from '../input/input-border';
import token from '@sheinx/theme';
import { EditableAreaClasses } from '@sheinx/base';

export type EditableAreaClassType = keyof EditableAreaClasses;
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

const { wrapper, wrapperNoBorder, wrapperFocus: _noFocus, ...resetWrapper } = inputBorder;

const editableAreaStyle: JsStyles<EditableAreaClassType> = {
  rootClass: {},
  wrapper: {
    display: 'block',
    position: 'relative',
    ...wrapper,
    whiteSpace: 'nowrap',
  },
  content: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  ...resetWrapper,
  wrapperNoBorder: {
    '&:not(:hover)': {
      ...wrapperNoBorder,
    },
  },
  place: {},
  clear: {
    position: 'absolute',
    display: 'flex',
    width: token.inputIconSize,
    height: token.inputIconSize,
    top: 0,
    bottom: 0,
    margin: 'auto',
    right: token.textareaPaddingX,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: token.inputClearColor,
    '&:hover': {
      color: token.inputHoverClearColor,
    },
    // '$wrapperSmall &': {
    //   right: token.inputSmallPaddingX,
    // },
    // '$wrapperLarge &': {
    //   right: token.inputLargePaddingX,
    // },
  },
  placeholder: {
    display: 'inline-block',
    color: token.textareaPlaceholderColor,
  },
  popup: {
    opacity: 0,
    pointerEvents: 'none',
    width: '1px',
  },
  popupShow: {
    '&&': {
      opacity: 1,
      pointerEvents: 'auto',
    },
  },
};

export default editableAreaStyle;
