import { JsStyles } from '../jss-style';
import token from '@sheinx/theme';
import border from '../input/input-border';

export type DatePickerClass =
  | 'wrapper'
  | 'wrapperSmall'
  | 'wrapperLarge'
  | 'wrapperFocus'
  | 'wrapperDisabled'
  | 'wrapperError'
  | 'wrapperNoBorder'
  | 'wrapperRange'
  | 'paddingBox'
  | 'resultWrapper'
  | 'result'
  | 'resultAlignRight'
  | 'resultAlignLeft'
  | 'resultAlignCenter'
  | 'resultText'
  | 'resultTextDisabled'
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
  | 'pickerFooter'
  | 'pickerFooterBtn'
  | 'pickerFooterLeft'
  | 'pickerFooterRight'
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
  | 'quarterPicker'
  | 'timePicker'
  | 'timeList'
  | 'timeItem'
  | 'timeItemActive'
  | 'timeItemDisabled'
  | 'timeBase'
  | 'datetime'
  | 'timeBaseItem'
  | 'quickPicker'
  | 'quickPickerItem';

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
const { wrapper, wrapperDisabled, ...resetWrapper } = inputBorder;

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
  wrapperDisabled: {
    ...wrapperDisabled,
    '& $icon': {
      color: token.datePickerDisabledFontColor,
    },
  },
  wrapperRange: {
    width: token.datePickerDateRangeWidth,
    '&[data-soui-type="datetime"]': {
      width: token.datePickerDatetimeRangeWidth,
    },
  },
  ...resetWrapper,
  resultWrapper: {
    width: '100%',
    display: 'flex',
    position: 'relative',
    outline: 'none',
    '&:hover': {
      '& $clear': { display: 'inline-flex' },
      '& $clear + $icon': { display: 'none' },
    },
  },
  result: {
    display: 'flex',
    flex: '1',
    minWidth: 0,
    alignItems: 'center',
    lineHeight: token.lineHeightDynamic,
  },
  resultTextWrapper: {
    display: 'flex',
    flex: '1',
    minWidth: 0,
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
    border: 0,
    outline: '0',
    lineHeight: token.lineHeightDynamic,
    color: 'inherit',
    flex: '1',
    minWidth: 0,
    '&::before': {
      content: '""',
      display: 'inline-block',
    },
    '&::placeholder': {
      color: token.datePickerPlaceholderColor,
    },
  },
  resultTextDisabled: {
    color: token.datePickerDisabledFontColor,
    cursor: 'not-allowed',
  },
  placeholder: {
    color: token.datePickerPlaceholderColor,
  },
  resultSeparator: {
    display: 'inline-block',
    padding: '0 8px',
  },
  icon: {
    display: 'inline-flex',
    alignItems: 'center',
    color: token.datePickerIconColor,
    '& svg': {
      width: token.datePickerIconSize,
      height: token.datePickerIconSize,
    },
    // todo 放入renderInput 组件中
    marginRight: token.datePickerPaddingX,
  },
  clear: {
    display: 'none',
    color: token.datePickerClearColor,
    '&: hover': {
      color: token.datePickerHoverClearColor,
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
  picker: {
    '&:not(:first-child):last-child': {
      '& $pickerHeader,& $pickerBody,& $pickerFooter': {
        marginLeft: token.datePickerPickerMargin,
      },
      '& $pickerHeader': {
        position: 'relative',
        '&::before': {
          width: token.datePickerPickerMargin,
          content: '""',
          display: 'block',
          position: 'absolute',
          bottom: '-1px',
          left: '0',
          transform: 'translateX(-100%)',
          borderBottom: `1px solid ${token.datePickerPickerHeaderBorderColor}`,
        },
      },
      '& $pickerFooter': {
        position: 'relative',
        '&::before': {
          width: token.datePickerPickerMargin,
          content: '""',
          display: 'block',
          position: 'absolute',
          top: '-1px',
          left: '0',
          transform: 'translateX(-100%)',
          borderBottom: `1px solid ${token.datePickerPickerHeaderBorderColor}`,
        },
      },
    },
  },
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
    padding: `${token.datePickerPickerBodyPaddingY} ${token.datePickerPickerBodyPaddingX}`,
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
  pickerFooter: {
    borderTop: `1px solid ${token.datePickerPickerHeaderBorderColor}`,
    display: 'flex',
    justifyContent: 'space-between',
  },
  pickerFooterLeft: {
    padding: `${token.datePickerPickerFooterPaddingY} ${token.datePickerPickerFooterPaddingX}`,
  },
  pickerFooterRight: {
    padding: `${token.datePickerPickerFooterPaddingY} ${token.datePickerPickerFooterPaddingX}`,
    '&:only-child': {
      width: '100%',
      textAlign: 'center',
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

      '& :not($pickerCellDisabled)$pickerCellActive $pickerCellContent': {
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
    '&$pickerCellActive:not($pickerCellDisabled):hover $pickerCellContent': {
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
      backgroundColor: token.datePickerCellDisabledBackgroundColor,
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
  timePicker: {
    '& $pickerBody': {
      display: 'flex',
      width: token.datePickerTimePickerWidth,
      gap: token.datePickerTimeListGap,
      padding: `${token.datePickerTimePickerPaddingY} ${token.datePickerTimePickerPaddingX} `,
      boxSizing: 'border-box',
      position: 'relative',
    },
  },
  timeList: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    height: `calc(${token.datePickerTimeItemHeight} * 9)`,
    paddingTop: `calc(${token.datePickerTimeItemHeight} * 4)`,
    paddingBottom: `calc(${token.datePickerTimeItemHeight} * 4)`,
    overflow: 'auto',
    boxSizing: 'border-box',
    textAlign: 'center',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  timeItem: {
    position: 'relative',
    minHeight: token.datePickerTimeItemHeight,
    boxSizing: 'border-box',
    lineHeight: token.datePickerTimeItemHeight,
    cursor: 'pointer',
  },
  timeItemActive: { fontWeight: 'bold' },
  timeItemDisabled: {
    color: token.datePickerTimeItemDisabledColor,
    cursor: 'not-allowed',
  },
  timeBase: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: token.datePickerTimePickerPaddingX,
    right: token.datePickerTimePickerPaddingX,
    margin: 'auto',
    display: 'flex',
    height: token.datePickerTimeItemHeight,
    gap: token.datePickerTimeListGap,
  },
  timeBaseItem: {
    flex: '1',
    height: '100%',
    background: token.datePickerTimeItemActiveBackgroundColor,
    borderRadius: '4px',
  },
  datetime: {
    fontSize: token.datePickerPickerBodyFontSize,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    lineHeight: token.lineHeightDynamic,
    '& > span': {
      lineHeight: '0',
      marginRight: '8px',
      '& > svg': {
        width: token.datePickerIconSize,
        height: token.datePickerIconSize,
        color: token.datePickerIconColor,
      },
    },
    '& $timePicker': {
      position: 'absolute',
      top: 0,
      left: 0,
      transform: 'translateY(-100%)',
      backgroundColor: token.datePickerPickerBackgroundColor,
      boxShadow: token.datePickerPickerShadow,
      opacity: '0',
      zIndex: '-1',
      visibility: 'hidden',
    },
    '&:hover $timePicker': {
      zIndex: '1',
      opacity: '1',
      visibility: 'visible',
    },
  },
  quickPicker: {
    padding: `${token.datePickerQuickPickerPaddingY} ${token.datePickerQuickPickerPaddingX}`,
    display: 'flex',
    flexDirection: 'column',
    gap: token.datePickerQuickPickerGap,
    borderRight: `1px solid ${token.datePickerPickerHeaderBorderColor}`,
  },
  quickPickerItem: {
    whiteSpace: 'nowrap',
    textAlign: 'left',
    fontSize: token.datePickerQuickPickerItemFontSize,
    padding: `${token.datePickerQuickPickerItemPaddingY} ${token.datePickerQuickPickerItemPaddingX}`,
    lineHeight: token.lineHeightDynamic,
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: token.datePickerQuickPickerItemHoverBackgroundColor,
      cursor: 'pointer',
    },
  },
  pickerFooterBtn: {},
};

export default datePickerStyle;
