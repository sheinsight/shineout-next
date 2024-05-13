import border from '../input/input-border';
import { TextareaClasses } from '@sheinx/base';
import { JsStyles } from '../jss-style';
import token from '@sheinx/theme';

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

const { wrapper, ...resetWrapper } = inputBorder;

const input: JsStyles<keyof TextareaClasses> = {
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
    '&[dir=ltr]': { right: '0' },
    '&[dir=rtl]': { left: '0' },
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

      bottom: '100%',
      transform: 'rotate(45deg) translateY(3px)',
      width: '6px',
      height: '6px',
      border: `1px solid ${token.textareaBorderColor}`,
      borderWidth: '1px 0 0 1px',
      background: 'inherit',
      content: "'  '",
    },
    '&[dir=ltr]::before': {
      right: '4px',
    },
    '&[dir=rtl]::before': {
      left: '8px',
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
