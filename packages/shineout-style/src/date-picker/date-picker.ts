import { JsStyles } from '../jss-style';
import token from '@sheinx/theme';
import border from '../input/input-border';

export type DatePickerClass =
  | 'wrapper'
  | 'wrapperFocus'
  | 'wrapperDisabled'
  | 'wrapperError'
  | 'wrapperNoBorder'
  | 'wrapperRange'
  | 'paddingBox'
  | 'pickerBox'
  | 'picker'
  | 'pickerOpen'
  | 'result'
  | 'resultAlignRight'
  | 'resultAlignLeft'
  | 'resultAlignCenter'
  | 'resultText'
  | 'resultTextWrapper'
  | 'resultSeparator'
  | 'icon'
  | 'clear'
  | 'dayPicker'
  | 'dayPickerHeader'
  | 'dayPickerIcon'
  | 'dayPickerTitle'
  | 'dayPickerBody'
  | 'dayPickerRow'
  | 'dayPickerCell'
  | 'dayPickerCellActive'
  | 'dayPickerCellDisabled'
  | 'dayPickerCellToday'
  | 'dayPickerCellCurrentMonth';

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
  wrapperRange: {
    width: '300px',
    textAlign: 'center',
  },
  ...resetWrapper,
  result: {
    outline: 'none',
    display: 'flex',
    alignItems: 'center',
    lineHeight: token.lineHeightDynamic,
    '&:hover': {
      '& $clear': { display: 'inline-flex' },
      '& $clear + $icon': { display: 'none' },
    },
  },
  resultTextWrapper: {
    display: 'flex',
    flex: '1',
    textAlign: 'left',
  },
  resultAlignLeft: {
    '& $resultTextWrapper': {
      textAlign: 'left',
    },
  },
  resultAlignRight: {
    '& $resultTextWrapper': {
      textAlign: 'right',
    },
  },
  resultAlignCenter: {
    '& $resultTextWrapper': {
      textAlign: 'center',
    },
  },
  resultText: {
    display: 'inline-block',
    flex: '1',
    '&::before': {
      content: '""',
      display: 'inline-block',
    },
  },
  resultSeparator: {
    display: 'inline-block',
    padding: '0 10px',
  },
  icon: {
    display: 'inline-flex',
    alignItems: 'center',
    '& svg': {
      width: '14px',
      height: '14px',
    },
  },
  clear: {
    display: 'none',
    alignItems: 'center',
    '& svg': {
      width: '14px',
      height: '14px',
    },
    cursor: 'pointer',
  },
  picker: {
    position: 'absolute',
    backgroundColor: '#fff',
    boxShadow:
      '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
    borderRadius: '4px',
  },
  pickerBox: {
    display: 'flex',
    padding: '10px 10px',
    '$wrapperRange &': {},
  },
  pickerOpen: {},
  dayPicker: {},
  dayPickerHeader: {
    padding: '14px 18px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #eee',
  },
  dayPickerIcon: {
    display: 'flex',
    gap: '12px',
    '&> span': {
      display: 'inline-flex',
      alignItems: 'center',
      cursor: 'pointer',
      '& svg': {
        width: '14px',
        height: '14px',
      },
    },
  },

  dayPickerTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    '> span': {
      cursor: 'pointer',
    },
  },
  dayPickerBody: {
    padding: '16px',
    textAlign: 'center',
    '& thead td': {
      color: '#989898',
    },
  },
  dayPickerRow: {},
  dayPickerCell: {
    padding: '5px 8px',
    fontSize: '14px',
    cursor: 'pointer',
    color: '#ccc',
  },
  dayPickerCellCurrentMonth: {
    color: '#000',
  },
  dayPickerCellToday: {
    color: 'blue',
  },
  dayPickerCellActive: {
    color: 'green',
  },
  dayPickerCellDisabled: {
    backgroundColor: '#eee',
  },
};

export default datePickerStyle;
