import border from '../input/input-border';
import { JsStyles } from '../jss-style';
import token from '@sheinx/theme';

const inputBorder = border('wrapper', {
  lineHeight: token.lineHeightDynamic,
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

  innerTitlePaddingY: token.inputInnerPaddingY,
  innerTitlePaddingX: token.inputInnerPaddingX,

  smallInnerTitlePaddingY: token.inputInnerSmallPaddingY,
  smallInnerTitlePaddingX: token.inputInnerSmallPaddingX,

  largeInnerTitlePaddingY: token.inputInnerLargePaddingY,
  largeInnerTitlePaddingX: token.inputInnerLargePaddingX,
});
const { wrapper, ...resetWrapper } = inputBorder;

export type InputClass =
  | 'wrapper'
  | 'wrapperSmall'
  | 'wrapperLarge'
  | 'wrapperFocus'
  | 'wrapperError'
  | 'wrapperDisabled'
  | 'wrapperUnderline'
  | 'wrapperNoBorder'
  | 'wrapperPaddingBox'
  | 'wrapperInnerTitle'
  | 'wrapperInnerTitleTop'
  | 'wrapperInnerTitleBottom'
  | 'textarea'
  | 'resize'
  | 'shadow'
  | 'info'
  | 'infoError'
  | 'footer';

const input: JsStyles<InputClass> = {
  ...inputBorder,
  wrapper: {
    display: 'inline-flex',
    flexDirection: 'column',
    width: '100%',
    boxSizing: 'border-box',
    position: 'relative',
    flexWrap: 'wrap',
    ...wrapper,
  },
  ...resetWrapper,
  textarea: {
    padding: 0,
    '&::placeholder': {
      color: token.textareaPlaceholderColor,
    },
    width: '100%',
    background: 'transparent',
    border: '0',
    margin: '0',
    lineHeight: 'inherit',
    color: 'inherit',
    fontSize: 'inherit',
    fontFamily: 'inherit',
    outline: 'none',
    backgroundColor: 'transparent',
    resize: 'none',
    boxSizing: 'border-box',
    '&$resize': {
      resize: 'vertical',
    },
  },
  resize: {
    resize: 'vertical',
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
    background: token.textareaInfoBackgroundColor,
    borderRadius: token.textareaBorderRadius,
    boxShadow: `0 0 0 1px ${token.textareaBorderColor}`,
    fontSize: '12px',
    color: token.textareaInfoFontColor,
    '&::before': {
      display: 'block',
      position: 'absolute',
      right: '4px',
      bottom: '100%',
      transform: 'rotate(45deg) translateY(3px)',
      width: '6px',
      height: '6px',
      border: `1px solid ${token.textareaBorderColor}`,
      borderWidth: '1px 0 0 1px',
      background: 'inherit',
      content: "'  '",
    },
  },
  infoError: {
    boxShadow: `0 0 0 1px ${token.textareaInfoErrorBorderColor}`,
    color: token.textareaInfoErrorFontColor,
    background: token.textareaInfoErrorBackgroundColor,
    '&::before': {
      borderColor: token.textareaInfoErrorBorderColor,
    },
  },
  shadow: {
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: 0,
    visibility: 'hidden',
  },
  footer: {
    borderTop: `1px solid ${token.textareaBorderColor}`,
    borderRadius: 0,
    width: '100%',
    boxSizing: 'border-box',
  },
};

export default input;
