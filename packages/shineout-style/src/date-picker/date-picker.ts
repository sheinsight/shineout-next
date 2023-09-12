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
  | 'result'
  | 'resultAlignRight'
  | 'resultAlignLeft'
  | 'resultAlignCenter'
  | 'resultText'
  | 'resultTextWrapper'
  | 'resultSeparator'
  | 'placeholder'
  | 'icon'
  | 'clear'
  | 'pickerWrapper'
  | 'pickerBox'
  | 'pickerWrapperOpen'
  | 'picker'
  | 'dayPicker'
  | 'pickerHeader'
  | 'pickerIcon'
  | 'pickerTitle'
  | 'pickerBody'
  | 'pickerRow'
  | 'pickerCell'
  | 'pickerCellContent'
  | 'pickerCellActive'
  | 'pickerCellDisabled'
  | 'pickerCellToday'
  | 'pickerCellCurrentMonth';

const inputBorderToken = {
  lineHeightDynamic: token.lineHeightDynamic,
  borderRadius: token.datePickerBorderRadius,

  fontSize: token.datePickerFontSize,
  smallFontSize: token.datePickerSmallFontSize,
  largeFontSize: token.datePickerLargeFontSize,

  paddingY: token.datePickerPaddingY,
  smallPaddingY: token.datePickerSmallPaddingY,
  largePaddingY: token.datePickerLargePaddingY,

  paddingX: token.datePickerPaddingX,
  smallPaddingX: token.datePickerSmallPaddingX,
  largePaddingX: token.datePickerLargePaddingX,

  borderColor: token.datePickerBorderColor,
  focusBorderColor: token.datePickerFocusBorderColor,
  hoverBorderColor: token.datePickerHoverBorderColor,
  disabledBorderColor: token.datePickerDisabledBorderColor,
  errorBorderColor: token.datePickerErrorBorderColor,

  fontColor: token.datePickerFontColor,
  disabledFontColor: token.datePickerDisabledFontColor,

  backgroundColor: token.datePickerBackgroundColor,
  disabledBackgroundColor: token.datePickerDisabledBackgroundColor,

  focusShadow: token.datePickerFocusShadow,
  errorFocusShadow: token.datePickerErrorFocusShadow,
};
const inputBorder = border('wrapper', inputBorderToken);
const { wrapper, ...resetWrapper } = inputBorder;

const datePickerStyle: JsStyles<DatePickerClass> = {
  wrapper: {
    display: 'inline-block',
    position: 'relative',
    width: token.datePickerDateWidth,
    '&[data-soui-type="datetime"]': {
      width: token.datePickerDatetimeWidth,
    },
    ...wrapper,
  },
  wrapperRange: {
    textAlign: 'center',
    width: token.datePickerDateRangeWidth,
    '&[data-soui-type="datetime"]': {
      width: token.datePickerDatetimeRangeWidth,
    },
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
  placeholder: {
    color: token.datePickerPlaceholderColor,
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
    color: token.datePickerIconColor,
    '& svg': {
      width: token.datePickerIconSize,
      height: token.datePickerIconSize,
    },
  },
  clear: {
    display: 'none',
    alignItems: 'center',
    color: token.datePickerClearColor,
    '&: hover': {
      color: token.datePickerHoverClearColor,
    },
    '& svg': {
      width: token.datePickerIconSize,
      height: token.datePickerIconSize,
    },
    cursor: 'pointer',
  },
  pickerWrapper: {
    position: 'absolute',
    backgroundColor: token.datePickerPickerBackgroundColor,
    boxShadow: token.datePickerPickerShadow,
    // boxShadow:
    //   '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
    borderRadius: token.datePickerPickerRadius,
  },
  pickerBox: {
    display: 'flex',
  },
  picker: {},
  pickerWrapperOpen: {},
  pickerHeader: {
    padding: '14px 18px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #eee',
  },
  pickerIcon: {
    display: 'flex',
    gap: '12px',
    '& > span': {
      display: 'inline-flex',
      alignItems: 'center',
      cursor: 'pointer',
      '& svg': {
        width: token.datePickerIconSize,
        height: token.datePickerIconSize,
      },
    },
  },

  pickerTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    '> span': {
      cursor: 'pointer',
    },
  },
  pickerBody: {
    fontSize: token.datePickerPickerBodyFontSize,
    padding: `${token.datePickerPickerBodyPaddingX} ${token.datePickerPickerBodyPaddingY}`,
    '& table': {
      textAlign: 'center',
      borderCollapse: 'collapse',
      border: 0,
      width: '100%',
      tableLayout: 'fixed',
      boxSizing: 'border-box',
    },
    '& th, & td': {
      boxSizing: 'border-box',
      padding: 0,
      fontWeight: 'normal',
    },
    '& th': { color: token.datePickerCellHeaderColor },
  },
  pickerRow: {},
  pickerCell: {
    color: token.datePickerCellColor,
    '&:not($pickerCellCurrentMonth)': {
      color: token.datePickerCellOtherColor,
    },
  },
  pickerCellContent: {
    marginTop: token.datePickerCellMarginY,
    cursor: 'pointer',
    position: 'relative',
  },
  pickerCellCurrentMonth: {},
  pickerCellToday: {
    '& $pickerCellContent::before': {
      content: '""',
      width: token.datePickerCellMarginY,
      height: token.datePickerCellMarginY,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto',
      borderRadius: '50%',
      position: 'absolute',
      transform: 'translateY(100%)',
      backgroundColor: token.datePickerCellActiveBackgroundColor,
    },
  },
  pickerCellActive: {
    color: token.datePickerCellActiveColor,
    '&  span': {
      backgroundColor: token.datePickerCellActiveBackgroundColor,
    },
  },
  pickerCellDisabled: {
    color: token.datePickerCellDisabledColor,
    '& > $pickerCellContent': {
      backgroundColor: '#eee',
    },
  },
  dayPicker: {
    '& th': {
      height: token.datePickerDayCellSize,
      width: token.datePickerDayCellSize,
    },
    '& $pickerCellContent': {
      height: token.datePickerDayCellSize,
      lineHeight: token.datePickerDayCellSize,
      '& span': {
        display: 'inline-block',
        minWidth: token.datePickerDayCellHotSize,
        height: token.datePickerDayCellHotSize,
        lineHeight: token.datePickerDayCellHotSize,
        borderRadius: token.datePickerDayCellHotSize,
      },
    },
  },
};

export default datePickerStyle;
