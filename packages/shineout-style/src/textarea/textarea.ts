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
  rootClass: {},
  ...inputBorder,
  wrapper: {
    display: 'inline-flex',
    flexDirection: 'column',
    width: '100%',
    boxSizing: 'border-box',
    position: 'relative',
    flexWrap: 'wrap',
    minHeight: `calc(${token.lineHeightDynamic} + ${token.inputPaddingY} * 2)`,
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
    // why: 为了让滚动条的轨道不遮盖右上角和右下角的圆角; 注: chrome >= 121才支持scrollbar-color
    scrollbarColor: `${token.inputBorderColor} transparent`,
    '&$resize': {
      resize: 'vertical',
    },

    '&:not($shadow)': {
      // 非 Safari 浏览器使用 -webkit-fill-available
      '@supports not ((-webkit-hyphens: none))': {
        minHeight: '-webkit-fill-available',
      },
      // Safari 使用 100%（Safari 支持 -webkit-hyphens）
      '@supports (-webkit-hyphens: none)': {
        minHeight: 'unset',
      },
    }
  },
  resize: {
    resize: 'vertical',
  },
  info: {
    background: token.textareaInfoBackgroundColor,
    color: token.textareaInfoFontColor,
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
  limit: {
    position: 'absolute',
    right: 12,
    bottom: 6,
    color: token.textareaLimitFontColor,
    fontSize: token.textareaLimitFontSize,
    '$resize + &': {
      right: 16,
    }
  },
  clear: {
    position: 'absolute',
    right: token.textareaPaddingX,
    top: token.textareaPaddingY,
    cursor: 'pointer',
    padding: 4,
    color: token.textareaClearColor,

    '&:hover': {
      color: token.textareaClearHoverColor,
    },

    '& > svg': {
      display: 'block',
      width: token.textareaClearSize,
      height: token.textareaClearSize,
    }
  },
  wrapperWithClear: {
    '&& $textarea': {
      paddingRight: `calc(${token.textareaPaddingX} * 4)`
    },
  }
};

export default input;
