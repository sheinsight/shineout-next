import { JsStyles } from '../jss-style';
import token from '@sheinx/theme';
import border from '../input/input-border';
import { DatePickerClasses } from '@sheinx/base';
import { animations } from '../common'

export type DatePickerClassType = keyof DatePickerClasses;

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
const { wrapper, wrapperDisabled, ...resetWrapper } = inputBorder;

const leftCircleBackground = `radial-gradient(circle closest-side, ${token.datePickerCellRangeBackgroundColor} 100%, transparent 0%),
linear-gradient(to right, transparent 0%,transparent 50%, ${token.datePickerCellRangeBackgroundColor} 50%, ${token.datePickerCellRangeBackgroundColor} 100%)
`;

const rightCircleBackground = `radial-gradient(circle closest-side, ${token.datePickerCellRangeBackgroundColor} 100%, transparent 0%),
linear-gradient(to left, transparent 0%,transparent 50%, ${token.datePickerCellRangeBackgroundColor} 50%, ${token.datePickerCellRangeBackgroundColor} 100%)
`;

const datePickerStyle: JsStyles<DatePickerClassType> = {
  rootClass: {},
  ...animations,
  wrapper: {
    display: 'inline-block',
    position: 'relative',
    // width: token.datePickerDateWidth,
    width: 240,
    cursor: 'pointer',
    '&[data-soui-type="datetime"]': {
      // width: token.datePickerDatetimeWidth,
      width: 240,
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
    // width: token.datePickerDateRangeWidth,
    width: 280,
    '&[data-soui-type="datetime"]': {
      // width: token.datePickerDatetimeRangeWidth,
      width: 420,
    },
  },
  ...resetWrapper,
  resultWrapper: {
    display: 'flex',
    flex: 1,
    minWidth: 0,
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
    '& $resultTextWrapper input': {
      textAlign: 'left',
    },
  },
  resultAlignRight: {
    '& $resultTextWrapper input': {
      textAlign: 'right',
    },
  },
  resultAlignCenter: {
    '& $resultTextWrapper input': {
      textAlign: 'center',
    },
  },
  resultText: {
    lineHeight: token.lineHeightDynamic,
    position: 'relative',
    zIndex: 0,
    flex: '1',
    minWidth: 0,
    '&::before': {
      content: '""',
      display: 'inline-block',
    },
  },
  resultTextPadding: {
    position: 'relative',
    zIndex: 2,
    '& > input': {
      color: 'inherit',
      padding: '0',
      border: '0',
      outline: '0',
      fontSize: 'inherit',
      lineHeight: token.lineHeightDynamic,
      backgroundColor: 'transparent',
      width: '100%',
      '&::placeholder': {
        color: token.datePickerPlaceholderColor,
      },
    },
  },
  resultTextBg: {
    position: 'absolute',
    zIndex: 1,
    padding: `0 ${token.datePickerResultTextPaddingX}`,
    left: `calc(-1 * ${token.datePickerResultTextPaddingX})`,
    right: `calc(-1 * ${token.datePickerResultTextPaddingX})`,
    top: '0',
    bottom: '0',
    borderRadius: token.datePickerResultTextBorderRadius,
    '& > input': {
      color: 'inherit',
      padding: '0',
      border: '0',
      outline: '0',
      fontSize: 'inherit',
      lineHeight: token.lineHeightDynamic,
      backgroundColor: 'transparent',
      width: '100%',
      '&::placeholder': {
        color: token.datePickerPlaceholderColor,
      },
    },
  },
  resultTextActive: {
    '& $resultTextBg': {
      backgroundColor: token.datePickerResultTextActiveBackgroundColor,
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
    // todo 暂时写死
    marginLeft: '8px',
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
    backgroundColor: token.datePickerPanelBackgroundColor,
    boxShadow: token.datePickerPanelShadow,
    borderRadius: token.datePickerPanelRadius,
    border: `1px solid ${token.datePickerPanelBorder}`,
    cursor: 'initial',
  },
  pickerBox: {
    display: 'flex',
  },
  picker: {
    '&:not(:first-child):not(:nth-child(2)):last-child': {
      '& $pickerHeader,& $pickerBody,& $pickerFooter, & $pickerTitle': {
        marginLeft: token.datePickerPanelMargin,
      },
      '& $pickerHeader': {
        position: 'relative',
        '&::before': {
          width: token.datePickerPanelMargin,
          content: '""',
          display: 'block',
          position: 'absolute',
          bottom: '-1px',
          borderBottom: `1px solid ${token.datePickerPanelHeaderBorderColor}`,
        },
        '&[dir=ltr]::before': {
          left: '0',
          transform: 'translateX(-100%)',
        },
        '&[dir=rtl]::before': {
          right: '0',
          transform: 'translateX(100%)',
        },
      },
      '& $pickerFooter': {
        position: 'relative',
        '&::before': {
          width: token.datePickerPanelMargin,
          content: '""',
          display: 'block',
          position: 'absolute',
          top: '-1px',
          borderBottom: `1px solid ${token.datePickerPanelHeaderBorderColor}`,
        },
        '&[dir=ltr]::before': {
          left: '0',
          transform: 'translateX(-100%)',
        },
        '&[dir=rtl]::before': {
          right: '0',
          transform: 'translateX(100%)',
        },
      },
    },
  },
  pickerWrapperOpen: {},
  pickerTitle: {
    lineHeight: token.lineHeightDynamic,
    fontSize: token.datePickerPanelTitleFontSize,
    paddingTop: token.datePickerPanelTitlePaddingTop,
    textAlign: 'center',
  },
  pickerHeader: {
    padding: `${token.datePickerPanelHeaderPaddingY} ${token.datePickerPanelHeaderPaddingX}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${token.datePickerPanelHeaderBorderColor}`,
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
    width: token.datePickerPanelHeaderIconHotWidth,
    height: token.datePickerPanelHeaderIconHotWidth,
    color: token.datePickerPanelHeaderIconColor,
    borderRadius: '50%',
    '&[dir=rtl]': {
      transform: 'rotate(180deg)',
    },
    '& svg': {
      width: token.datePickerPanelHeaderIconWidth,
      height: token.datePickerPanelHeaderIconWidth,
    },
    '&:hover': {
      backgroundColor: token.datePickerPanelHeaderIconHoverBackgroundColor,
    },
  },
  pickerHeaderMid: {
    display: 'flex',
    alignItems: 'center',
    '& > span': {
      padding: `0 ${token.datePickerPanelHeaderTitlePaddingX}`,
      fontSize: token.datePickerPanelHeaderFontSize,
    },
  },
  pickerHeaderInfo: {
    cursor: 'pointer',
    borderRadius: '2px',
    color: token.datePickerPanelHeaderFontColor,
    fontWeight: token.datePickerPanelHeaderFontWeight,
    '&:hover': {
      backgroundColor: token.datePickerPanelHeaderIconHoverBackgroundColor,
    },
  },
  pickerBody: {
    fontSize: token.datePickerPanelBodyFontSize,
    padding: `${token.datePickerPanelBodyPaddingY} ${token.datePickerPanelBodyPaddingX}`,
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
      fontWeight: token.datePickerPanelFontWeight,
    },
    '& th': {
      color: token.datePickerCellHeaderColor,
      height: token.datePickerCellHeight,
    },
  },
  pickerFooter: {
    borderTop: `1px solid ${token.datePickerPanelHeaderBorderColor}`,
    display: 'flex',
    justifyContent: 'space-between',
    '&[dir=rtl] $pickerFooterConfirm': {
      'margin-right': 'auto',
    },
    '&[dir=ltr] $pickerFooterConfirm': {
      'margin-left': 'auto',
    },
  },
  pickerFooterTime: {
    padding: `${token.datePickerPanelFooterPaddingY} ${token.datePickerPanelFooterPaddingX}`,
  },
  wrapperSmall: {
    '& $pickerFooterNow': {
      padding: `${token.datePickerSmallPanelFooterNowPaddingY} ${token.datePickerSmallPanelFooterNowPaddingX}`,
    },
  },
  pickerFooterNow: {
    padding: `${token.datePickerPanelFooterPaddingY} ${token.datePickerPanelFooterPaddingX}`,
    '&:only-child': {
      width: '100%',
      textAlign: 'center',
    },
  },
  pickerFooterConfirm: {
    textAlign: 'right',
    padding: `${token.datePickerPanelFooterPaddingY} ${token.datePickerPanelFooterPaddingX}`,
  },
  pickerRange: {},
  pickerRangeBody: {
    display: 'flex',
  },
  pickerRangeFooter: {
    borderTop: `1px solid ${token.datePickerPanelHeaderBorderColor}`,
    display: 'flex',
    justifyContent: 'flex-end',
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
    '& $pickerCell[dir=ltr]:not(:nth-child(2))': {
      '& $pickerCellContent >span': {
        borderTopLeftRadius: '0',
        borderBottomLeftRadius: '0',
      },
    },
    '& $pickerCell[dir=rtl]:not(:nth-child(2))': {
      '& $pickerCellContent >span': {
        borderTopRightRadius: '0',
        borderBottomRightRadius: '0',
      },
    },
    '& $pickerCell[dir=ltr]:not(:nth-child(8))': {
      '& $pickerCellContent >span': {
        borderTopRightRadius: '0',
        borderBottomRightRadius: '0',
      },
    },
    '& $pickerCell[dir=rtl]:not(:nth-child(8))': {
      '& $pickerCellContent >span': {
        borderTopLeftRadius: '0',
        borderBottomLeftRadius: '0',
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
        // backgroundColor: token.datePickerCellActiveHoverBackgroundColor,
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
    '&$pickerCellActive$pickerCellInRange:not($pickerCellDisabled):not($pickerCellInRangeStart):not($pickerCellInRangeEnd):hover $pickerCellContent':
      {
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
    '&[dir=ltr] > $pickerCellContent': {
      borderTopLeftRadius: token.datePickerCellHeight,
      borderBottomLeftRadius: token.datePickerCellHeight,
      background: leftCircleBackground,
    },
    '&[dir=rtl] > $pickerCellContent': {
      borderTopRightRadius: token.datePickerCellHeight,
      borderBottomRightRadius: token.datePickerCellHeight,
      background: rightCircleBackground,
    },
  },
  pickerCellInRangeEnd: {
    '&[dir=ltr] > $pickerCellContent': {
      borderTopRightRadius: token.datePickerCellHeight,
      borderBottomRightRadius: token.datePickerCellHeight,
      background: rightCircleBackground,
    },
    '&[dir=rtl] > $pickerCellContent': {
      borderTopLeftRadius: token.datePickerCellHeight,
      borderBottomLeftRadius: token.datePickerCellHeight,
      background: leftCircleBackground,
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
      // width: token.datePickerDayPanelWidth,
      width: 248,
    },
  },
  yearPicker: {
    '& table': {
      // width: token.datePickerYearPanelWidth,
      width: 248,
    },
    '& $pickerCellContent span': {
      // minWidth: token.datePickerYearCellHotWidth,
      minWidth: 64,
    },
  },
  monthPicker: {
    '& table': {
      // width: token.datePickerMonthPanelWidth,
      width: 248,
    },
    '& $pickerCellContent span': {
      // minWidth: token.datePickerMonthCellHotWidth,
      minWidth: 64,
    },
  },
  quarterPicker: {
    '& table': {
      // width: token.datePickerQuarterPanelWidth,
      width: 248,
    },
    '& $pickerCellContent span': {
      // minWidth: token.datePickerQuarterCellHotWidth,
      minWidth: 56,
    },
    '& $pickerCellContent': {
      marginTop: 0,
    },
  },
  weekPicker: {
    '& table': {
      // width: token.datePickerWeekPanelWidth,
      width: 284,
    },
  },
  timePicker: {
    '& $pickerBody': {
      display: 'flex',
      // width: token.datePickerTimePanelWidth,
      width: 230,
      padding: `${token.datePickerTimePanelPaddingY} ${token.datePickerTimePanelPaddingX} `,
      boxSizing: 'border-box',
      position: 'relative',
    },
  },
  timeList: {
    '&:not(:first-child)': {
      marginLeft: token.datePickerTimeListGap,
    },
    userSelect: 'none',
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    height: `calc(${token.datePickerTimeItemHeight} * 9)`,
    // paddingTop: `calc(${token.datePickerTimeItemHeight} * 4)`,
    paddingBottom: `calc(${token.datePickerTimeItemHeight} * 8)`,
    overflow: 'auto',
    boxSizing: 'border-box',
    textAlign: 'center',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  timeItemBox: {
    padding: `${token.datePickerTimeItemPaddingY} 0`,
    boxSizing: 'border-box',
    height: token.datePickerTimeItemHeight,
    display: 'flex',
    flexShrink: 0,
  },
  timeItem: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flex: '1',
    position: 'relative',
    borderRadius: token.datePickerTimeItemBorderRadius,
    '&:not($timeItemDisabled):hover': {
      backgroundColor: token.datePickerTimeItemHoverBackgroundColor,
    },
    '$timeItemDisabled&': {
      color: token.datePickerTimeItemDisabledColor,
      cursor: 'not-allowed',
    },
    '$timeItemActive&': {
      color: token.datePickerTimeItemActiveColor,
      backgroundColor: token.datePickerTimeItemActiveBackgroundColor,
    },
  },

  timeItemDisabled: {},
  timeItemActive: {},
  // timeBase: {
  //   position: 'absolute',
  //   top: 0,
  //   bottom: 0,
  //   left: token.datePickerTimePanelPaddingX,
  //   right: token.datePickerTimePanelPaddingX,
  //   margin: 'auto',
  //   display: 'flex',
  //   height: token.datePickerTimeItemHeight,
  // },
  // timeBaseItem: {
  //   '&:not(:first-child)': {
  //     marginLeft: token.datePickerTimeListGap,
  //   },
  //   flex: '1',
  //   height: '100%',
  //   background: token.datePickerTimeItemActiveBackgroundColor,
  //   borderRadius: '4px',
  // },
  datetime: {
    fontSize: token.datePickerPanelBodyFontSize,
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
      '&[dir=ltr]': { left: 0 },
      '&[dir=rtl]': { right: 0 },
      transformOrigin: 'bottom',
      animation: '$scale-y-top 0.2s ease-in-out forwards',
      backgroundColor: token.datePickerPanelBackgroundColor,
      boxShadow: token.datePickerPanelShadow,
      display: 'none',
    },
    '&:hover $timePicker': {
      zIndex: '1',
      display: 'block',
    },
  },
  datetimeHide: {
    opacity: '0',
    pointerEvents: 'none',

    '& > span': {
      display: 'none',
    },
  },
  quickPicker: {
    padding: `${token.datePickerQuickPanelPaddingY} ${token.datePickerQuickPanelPaddingX}`,
    display: 'flex',
    flexDirection: 'column',
    borderRight: `1px solid ${token.datePickerPanelHeaderBorderColor}`,
  },
  quickPickerItem: {
    '&:not(:first-child)': {
      marginTop: token.datePickerQuickPanelGap,
    },
    whiteSpace: 'nowrap',
    textAlign: 'left',
    fontSize: token.datePickerQuickPanelItemFontSize,
    padding: `${token.datePickerQuickPanelItemPaddingY} ${token.datePickerQuickPanelItemPaddingX}`,
    lineHeight: token.lineHeightDynamic,
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: token.datePickerQuickPanelItemHoverBackgroundColor,
      cursor: 'pointer',
    },
  },
  quickPickerActiveItem: {
    color: token.datePickerQuickPanelItemActiveFontColor,
    background: token.datePickerQuickPanelItemActiveBackgroundColor,
  },
  pickerFooterBtn: {},
};

export default datePickerStyle;
