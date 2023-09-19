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
  | 'pickerHeaderLeft'
  | 'pickerHeaderRight'
  | 'pickerHeaderMid'
  | 'pickerHeaderIcon'
  | 'pickerHeaderInfo'
  | 'pickerBody'
  | 'pickerRow'
  | 'pickerRowWeek'
  | 'pickerCell'
  | 'pickerCellContent'
  | 'pickerCellActive'
  | 'pickerCellDisabled'
  | 'pickerCellToday'
  | 'pickerCellInRange'
  | 'pickerCellInRangeStart'
  | 'pickerCellInRangeEnd'
  | 'pickerCellBound'
  | 'yearPicker'
  | 'weekPicker'
  | 'monthPicker'
  | 'quarterPicker';
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
    padding: '0 4px',
    flex: '1',
    '&::before': {
      content: '""',
      display: 'inline-block',
    },
  },
  resultSeparator: {
    display: 'inline-block',
    padding: '0 4px',
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
    borderRadius: token.datePickerPickerRadius,
  },
  pickerBox: {
    display: 'flex',
  },
  picker: {},
  pickerWrapperOpen: {},
  pickerHeader: {
    padding: `${token.datePickerPickerHeaderPaddingY} ${token.datePickerPickerHeaderPaddingX}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${token.datePickerPickerHeaderBorderColor}`,
  },
  pickerHeaderRight: {},
  pickerHeaderLeft: {
    '&, $pickerHeaderRight': {
      display: 'flex',
    },
  },
  pickerHeaderIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    width: token.datePickerPickerHeaderIconHotWidth,
    height: token.datePickerPickerHeaderIconHotWidth,
    borderRadius: '50%',
    '& svg': {
      width: token.datePickerPickerHeaderIconWidth,
      height: token.datePickerPickerHeaderIconWidth,
    },
    '&:hover': {
      backgroundColor: token.datePickerPickerHeaderIconHoverBackgroundColor,
    },
  },
  pickerHeaderMid: {
    display: 'flex',
    alignItems: 'center',
    '& > span': {
      padding: `0 ${token.datePickerPickerHeaderTitlePaddingX}`,
    },
  },
  pickerHeaderInfo: {
    cursor: 'pointer',
    borderRadius: '2px',
    '&:hover': {
      backgroundColor: token.datePickerPickerHeaderIconHoverBackgroundColor,
    },
  },
  pickerBody: {
    fontSize: token.datePickerPickerBodyFontSize,
    padding: `${token.datePickerPickerBodyPaddingX} ${token.datePickerPickerBodyPaddingY}`,
    '& table': {
      textAlign: 'center',
      borderCollapse: 'collapse',
      border: '0',
      tableLayout: 'fixed',
      boxSizing: 'border-box',
    },
    '& th, & td': {
      boxSizing: 'border-box',
      padding: '0',
      fontWeight: 'normal',
    },
    '& th': {
      color: token.datePickerCellHeaderColor,
      height: token.datePickerCellHeight,
    },
  },
  pickerRow: {},
  pickerRowWeek: {
    '& $pickerCell:nth-child(2)': {
      '& $pickerCellContent': {
        paddingLeft: token.datePickerCellMarginY,
      },
    },
    '& $pickerCell:nth-child(8)': {
      '& $pickerCellContent': {
        paddingRight: token.datePickerCellMarginY,
      },
    },
    '& $pickerCell:not(:nth-child(2))': {
      '& $pickerCellContent >span': {
        borderTopLeftRadius: '0',
        borderBottomLeftRadius: '0',
      },
    },
    '& $pickerCell:not(:nth-child(8))': {
      '& $pickerCellContent >span': {
        borderTopRightRadius: '0',
        borderBottomRightRadius: '0',
      },
    },
    '& $pickerCellContent > span': { width: '100%' },
    '&:hover': {
      '& :not($pickerCellActive):not($pickerCellDisabled) $pickerCellContent > span': {
        backgroundColor: token.datePickerCellHoverBackgroundColor,
        color: token.datePickerCellHoverColor,
      },
      '& $pickerCellInRange:not($pickerCellActive):not($pickerCellDisabled) $pickerCellContent > span':
        {
          backgroundColor: token.datePickerCellActiveHoverBackgroundColor,
        },

      '& $pickerCellActive $pickerCellContent': {
        backgroundColor: token.datePickerCellActiveHoverBackgroundColor,
      },
    },
  },
  pickerCell: {
    color: token.datePickerCellColor,
    '&$pickerCellBound': {
      color: token.datePickerCellOtherColor,
    },

    '&:not($pickerCellDisabled):not($pickerCellActive):hover': {
      '&  span': {
        backgroundColor: token.datePickerCellHoverBackgroundColor,
        color: token.datePickerCellHoverColor,
      },
    },
    '&$pickerCellInRange:not($pickerCellActive):not($pickerCellDisabled):hover': {
      '&  span': {
        backgroundColor: token.datePickerCellActiveHoverBackgroundColor,
      },
    },
    '&$pickerCellActive:hover $pickerCellContent': {
      backgroundColor: token.datePickerCellActiveHoverBackgroundColor,
    },
  },
  pickerCellContent: {
    marginTop: token.datePickerCellMarginY,
    cursor: 'pointer',
    position: 'relative',
    height: token.datePickerCellHeight,
    lineHeight: token.datePickerCellHeight,
    '& span': {
      display: 'inline-block',
      minWidth: token.datePickerCellHotHeight,
      height: token.datePickerCellHotHeight,
      lineHeight: token.datePickerCellHotHeight,
      borderRadius: token.datePickerCellHotHeight,
    },
  },
  pickerCellBound: {},
  pickerCellToday: {
    '& $pickerCellContent::before': {
      content: '""',
      width: token.datePickerCellMarginY,
      height: token.datePickerCellMarginY,
      bottom: '0',
      left: '0',
      right: '0',
      margin: 'auto',
      borderRadius: '50%',
      position: 'absolute',
      transform: 'translateY(100%)',
      backgroundColor: token.datePickerCellActiveBackgroundColor,
    },
  },
  pickerCellActive: {
    '& $pickerCellContent > span': {
      color: token.datePickerCellActiveColor,
      backgroundColor: token.datePickerCellActiveBackgroundColor,
    },
  },
  pickerCellInRange: {
    '& > $pickerCellContent': {
      backgroundColor: token.datePickerCellRangeBackgroundColor,
    },
  },
  pickerCellInRangeStart: {
    '& > $pickerCellContent': {
      borderTopLeftRadius: token.datePickerCellHeight,
      borderBottomLeftRadius: token.datePickerCellHeight,
    },
  },
  pickerCellInRangeEnd: {
    '& > $pickerCellContent': {
      borderTopRightRadius: token.datePickerCellHeight,
      borderBottomRightRadius: token.datePickerCellHeight,
    },
  },
  pickerCellDisabled: {
    color: token.datePickerCellDisabledColor,
    '& > $pickerCellContent': {
      backgroundColor: '#eee',
      cursor: 'not-allowed',
    },
  },
  dayPicker: {
    '& table': {
      width: token.datePickerDayPickerWidth,
    },
  },
  yearPicker: {
    '& table': {
      width: token.datePickerYearPickerWidth,
    },
    '& $pickerCellContent span': {
      minWidth: token.datePickerYearCellHotWidth,
    },
  },
  monthPicker: {
    '& table': {
      width: token.datePickerMonthPickerWidth,
    },
    '& $pickerCellContent span': {
      minWidth: token.datePickerMonthCellHotWidth,
    },
  },
  quarterPicker: {
    '& table': {
      width: token.datePickerQuarterPickerWidth,
    },
    '& $pickerCellContent span': {
      minWidth: token.datePickerQuarterCellHotWidth,
    },
  },
  weekPicker: {
    '& table': {
      width: token.datePickerWeekPickerWidth,
    },
  },
};

export default datePickerStyle;
