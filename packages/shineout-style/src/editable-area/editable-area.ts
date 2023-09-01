// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';
import border from '../input/input-border';
import token from '@sheinx/theme';

export type EditableAreaClass =
  | 'wrapper'
  | 'wrapperDisabled'
  | 'wrapperError'
  | 'wrapperNoBorder'
  | 'wrapperSmall'
  | 'wrapperLarge'
  | 'paddingBox'
  | 'clear'
  | 'place'
  | 'placeholder'
  | 'popup'
  | 'popupShow';
const inputBorder = border('wrapper', {
  lineHeightDynamic: token.lineHeightDynamic,
  borderRadius: token.textareaBorderRadius,

  fontSize: token.textareaFontSize,
  smallFontSize: token.textareaSmallFontSize,
  largeFontSize: token.textareaLargeFontSize,

  paddingY: token.textareaPaddingY,
  smallPaddingY: token.textareaSmallPaddingY,
  largePaddingY: token.textareaLargePaddingY,

  paddingX: token.textareaPaddingX,
  smallPaddingX: token.textareaSmallPaddingX,
  largePaddingX: token.textareaLargePaddingX,

  borderColor: token.textareaBorderColor,
  focusBorderColor: token.textareaFocusBorderColor,
  hoverBorderColor: token.textareaHoverBorderColor,
  disabledBorderColor: token.textareaDisabledBorderColor,
  errorBorderColor: token.textareaErrorBorderColor,

  fontColor: token.textareaFontColor,
  disabledFontColor: token.textareaDisabledFontColor,

  backgroundColor: token.textareaBackgroundColor,
  disabledBackgroundColor: token.textareaDisabledBackgroundColor,

  focusShadow: token.textareaFocusShadow,
  errorFocusShadow: token.textareaErrorFocusShadow,
});

const {
  wrapper,
  wrapperNoBorder,
  wrapperFocus: _noFocus,
  paddingBox,
  ...resetWrapper
} = inputBorder;

const editableAreaStyle: JsStyles<EditableAreaClass> = {
  wrapper: {
    display: 'block',
    position: 'relative',
    ...wrapper,
    whiteSpace: 'nowrap',
  },
  paddingBox: {
    ...paddingBox,
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
  },
  popupShow: {
    '&&': {
      opacity: 1,
      pointerEvents: 'auto',
    },
  },
};

export default editableAreaStyle;
