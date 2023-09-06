import { JsStyles } from '../jss-style';
import token from '@sheinx/theme';
import border from '../input/input-border';

export type DatePickerClass =
  | 'wrapper'
  | 'wrapperDisabled'
  | 'wrapperFocus'
  | 'picker'
  | 'pickerOpen'
  | 'result';

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

  focusShadow: token.inputFocusShadow,
  errorFocusShadow: token.inputErrorFocusShadow,
};
const inputBorder = border('wrapper', inputBorderToken);
const { wrapper, ...resetWrapper } = inputBorder;

const datePickerStyle: JsStyles<DatePickerClass> = {
  wrapper: {
    display: 'inline-block',
    position: 'relative',
    width: '150px',
    ...wrapper,
  },
  ...resetWrapper,
  result: {
    outline: 'none',
  },
  picker: {
    position: 'absolute',
    backgroundColor: '#000',
    color: '#fff',
  },
  pickerOpen: {},
};

export default datePickerStyle;
