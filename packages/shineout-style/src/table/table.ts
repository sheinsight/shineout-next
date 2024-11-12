import token from '@sheinx/theme';
import { TableClasses } from '@sheinx/base';
import { JsStyles } from '../jss-style';
import { customScrollBar } from '../mixin';

const cellBaseIndex = 4;
const fixedIndex = 6;
const resizeIndex = 8;
const fixedFixedIndex = 10;
const headerIndex = 12;
const loadingIndex = 16;

export type TableClassType = keyof TableClasses;

const globalStyle = {
  '@global': {
    'body[data-soui-table-selection] *::selection': {
      backgroundColor: 'transparent',
    },
  },
};

const tableStyle: JsStyles<TableClassType> = {
  ...globalStyle,
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    position: 'relative',
    zIndex: 0,
    minHeight: 0,
    minWidth: 0,
    fontSize: token.tableFontSize,
    '& table': {
      minWidth: '100%',
      boxSizing: 'border-box',
      tableLayout: 'fixed',
      borderCollapse: 'separate',
      borderSpacing: 0,
      '& th, & td': {
        wordBreak: 'break-all',
        position: 'relative',
        borderBottom: `1px solid ${token.tableCellBorderColor}`,
        boxSizing: 'border-box',
        lineHeight: token.lineHeightDynamic,
        '&$cellFixedLeft, &$cellFixedRight': {
          zIndex: fixedIndex,
        },
        '$bordered&': {
          '&::after': {
            content: '""',
            position: 'absolute',
            zIndex: cellBaseIndex,
            top: 0,
            bottom: 0,
            background: token.tableCellBorderColor,
            borderLeft: `1px solid ${token.tableCellBorderColor}`,
          },
          '[dir=ltr]&::after': {
            right: 0,
          },
          '[dir=rtl]&::after': {
            left: 0,
          },
        },
      },

      '& td': {
        background: token.tableTbodyBackgroundColor,
        color: token.tableTbodyFontColor,
        fontSize: token.tableCellFontSize,
        fontWeight: token.tableCellFontWeight,
        '&[data-soui-table-selection]::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: `1px solid ${token.tableSelectionBorderColor}`,
          boxSizing: 'border-box',
        },
      },
      '& th': {
        verticalAlign: 'middle',
        background: token.tableTheadBackgroundColor,
        color: token.tableTheadFontColor,
        boxSizing: 'border-box',
        fontWeight: token.tableTheadFontWeight,
        fontSize: token.tableTheadFontSize,
      },
      '& tfoot td': {
        background: token.tableTfootBackgroundColor,
        color: token.tableTfootFontColor,
        fontWeight: token.tableTfootFontWeight,
      },
    },
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    zIndex: loadingIndex,
    backgroundColor: 'hsla(0,0%,100%,.4)',
  },
  default: {
    '& th, & td': {
      padding: `${token.tableCellPaddingY} ${token.tableCellPaddingX}`,
    },
  },
  small: {
    '& th, & td': {
      padding: `${token.tableSmallCellPaddingY} ${token.tableSmallCellPaddingX}`,
    },
    '& table th': {
      fontSize: token.tableSmallTheadFontSize,
      fontWeight: token.tableSmallTheadFontWeight,
    },
    '& table td': {
      fontSize: token.tableSmallCellFontSize,
      fontWeight: token.tableSmallCellFontWeight,
    },
  },
  large: {
    '& th, & td': {
      padding: `${token.tableLargeCellPaddingY} ${token.tableLargeCellPaddingX}`,
    },
    '& table th': {
      fontSize: token.tableLargeTheadFontSize,
      fontWeight: token.tableLargeTheadFontWeight,
    },
    '& table td': {
      fontSize: token.tableLargeCellFontSize,
      fontWeight: token.tableLargeCellFontWeight,
    },
  },
  bordered: {
    borderLeft: `1px solid ${token.tableCellBorderColor}`,
    borderRight: `1px solid ${token.tableCellBorderColor}`,
    borderBottom: 'none',
    borderTop: 'none',
    '&::before': {
      position: 'absolute',
      zIndex: fixedFixedIndex + 3,
      content: '""',
      display: 'block',
      top: 0,
      left: 0,
      right: 0,
      borderTop: `1px solid ${token.tableCellBorderColor}`,
    },
    '&::after': {
      position: 'absolute',
      content: '""',
      display: 'block',
      bottom: 0,
      left: 0,
      right: 0,
      borderTop: `1px solid ${token.tableCellBorderColor}`,
    },
  },
  headMirrorScroller: {
    overflow: 'scroll hidden',
  },
  headWrapper: {
    flex: '0 0 auto',
    overflow: 'hidden',
    boxSizing: 'border-box',
    background: token.tableTheadBackgroundColor,
    '$sticky > &': {
      zIndex: headerIndex,
    },
  },
  bodyWrapper: {
    overflow: 'auto',
    boxSizing: 'border-box',
    flexGrow: 1,
    minHeight: '0',
    '$wrapper & table': {
      '& th': {
        zIndex: fixedFixedIndex + 1,
        '&$cellFixedLeft': {
          position: 'sticky',
          top: 'auto',
          zIndex: fixedFixedIndex + 2,
        },
      },
      '& td': {
        zIndex: fixedIndex,
        '&$cellFixedLeft': {
          position: 'sticky',
          top: 'auto',
          zIndex: fixedIndex + 1,
        },
      }
    }
  },
  footWrapper: {
    flex: '0 0 auto',
    overflow: 'hidden',
    boxSizing: 'border-box',
    background: token.tableTfootBackgroundColor,
  },
  emptyWrapper: {
    minHeight: '150px',
    width: '100%',
    height: '100%',
    position: 'sticky',
    left: 0,
    top: 0,
    right: 0,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  scrollY: {
    '&$headWrapper, &$footWrapper': {
      overflowY: 'scroll',
      ...customScrollBar({ background: 'transparent' }),
    },
  },
  cellFixedLeft: {
    position: 'sticky',
  },
  cellFixedRight: {
    position: 'sticky',
  },
  cellAlignLeft: { textAlign: 'left' },
  cellAlignCenter: { textAlign: 'center' },
  cellAlignRight: { textAlign: 'right' },
  cellFixedLast: {},
  cellCheckbox: {
    width: '42px',
    textAlign: 'center',
  },
  cellGroup: {
    textAlign: 'center',
    '$wrapper &': {
      borderBottomWidth: 0,
    },
    '$wrapper$bordered &': {
      borderBottomWidth: 1,
    },
  },
  cellHover: {
    'table tbody td&&': {
      background: `${token.tableTbodyHoverBackgroundColor}`,
    },
  },
  rowHover: {
    '& td': {
      transition: 'background-color 0.2s',
    },
    '&&:hover td': {
      background: `${token.tableTbodyHoverBackgroundColor}`,
    },
  },
  floatLeft: {
    '& $cellFixedLast$cellFixedLeft': {
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: -1,
        width: '5px',
      },
      '&[dir=ltr]::after': {
        right: '-5px',
        background: `linear-gradient(90deg, ${token.tableFixedShadow}, transparent)`,
      },
      '&[dir=rtl]::after': {
        left: '-5px',
        background: `linear-gradient(270deg, ${token.tableFixedShadow},transparent)`,
      },
    },
    '& table': {
      '& th' :{
        '&$cellFixedLeft': {
          zIndex: fixedFixedIndex + 2,
        },
      },
      '& td': {
        '&$cellFixedLeft': {
          zIndex: fixedFixedIndex,
          top: 'auto',
        },
      },
    },
  },

  floatRight: {
    '& $cellFixedLast$cellFixedRight': {
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '5px',
      },
      '&[dir=rtl]::before': {
        right: '-5px',
        background: `linear-gradient(90deg, ${token.tableFixedShadow}, transparent)`,
      },
      '&[dir=ltr]::before': {
        left: '-5px',
        background: `linear-gradient(270deg, ${token.tableFixedShadow},transparent)`,
      },
    },
    '& table': {
      '& th': {
        '&$cellFixedRight': {
          zIndex: fixedFixedIndex + 2,
        },
      },
      '& td': {
        '&$cellFixedRight': {
          zIndex: fixedFixedIndex,
          top: 'auto',
        },
      },
    },
  },

  hasSorter: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  sorterContainer: {
    minWidth: '14px',
    width: '14px',
    position: 'relative',
    '&[dir=rtl]': { transform: 'translateX(-6px)' },
    '&[dir=ltr]': { transform: 'translateX(6px)' },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexDirection: 'column',
    '& $sorterAsc, & $sorterDesc': {
      right: 0,
      width: '7px',
      height: '5px',
      color: token.tableSorterColor,
      display: 'flex',
      justifyContent: 'center',
      cursor: 'pointer',
      '&:hover': {
        color: token.tableSorterHoverColor,
      },
      '&$sorterActive': {
        color: token.tableSorterActiveColor,
      },
    },
  },
  sorterAsc: {
    top: 0,
    bottom: '50%',
  },

  sorterDesc: {
    top: '50%',
    bottom: 0,
    marginTop: '4px',
  },

  sorterActive: {},
  resizeSpanner: {
    zIndex: resizeIndex,
    position: 'absolute',
    opacity: 0,
    '&[dir=rtl]': { left: '-1px' },
    '&[dir=ltr]': { right: '-1px' },
    top: 0,
    bottom: 0,
    width: '3px',
    boxSizing: 'border-box',
    background: token.tableResizeColor,
    transition: 'opacity 0.3s',
    cursor: 'ew-resize',
    '$wrapper th:hover &': {
      opacity: 1,
    },
    '$cellIgnoreBorder &': {
      display: 'none',
    },
    '&::before, &::after': {
      borderWidth: '3px',
      content: '""',
      position: 'absolute',
      width: 0,
      height: 0,
      margin: 'auto',
      bottom: 0,
      top: 0,
    },

    '&::after': {
      borderStyle: 'dashed solid dashed dashed',
      borderColor: `transparent ${token.tableResizeColor} transparent transparent`,
      right: '4px',
    },
    '&::before': {
      borderStyle: 'dashed dashed dashed solid',
      borderColor: `transparent transparent transparent ${token.tableResizeColor}`,
      left: '4px',
    },
  },
  resizeSpannerActive: {
    opacity: 1,
  },
  resizeSpannerInactive: {
    opacity: 0,
    '$wrapper th:hover &': {
      opacity: 0,
    },
  },
  cellIgnoreBorder: {
    '&::after': {
      display: 'none',
    },
  },
  sticky: {},
  expandIcon: {
    position: 'relative',
    display: 'block',
    width: token.tableExpandIconSize,
    height: token.tableExpandIconSize,
    cursor: 'pointer',
    color: token.tableExpandIconColor,
    zIndex: 1,
    '&>svg': {
      cursor: 'pointer',
      display: 'block',
    },
  },

  expandIconWrapper: {
    position: 'relative',
    '&:hover': {
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: -4,
        width: 22,
        height: 22,
        borderRadius: '50%',
        background: token.tableExpandIconHoverBackgroundColor,
      },
    },
  },
  verticalAlignTop: {
    '& td': {
      verticalAlign: 'top',
    },
  },
  verticalAlignMiddle: {
    '& td': {
      verticalAlign: 'middle',
    },
  },

  expandWrapper: {
    display: 'inline-block',
    '& $iconWrapper': {
      marginRight: '8px',
    },
  },
  iconWrapper: {
    display: 'inline-flex',
    verticalAlign: 'top',
    height: token.lineHeightDynamic,
    alignItems: 'center',
  },
  rowStriped: {
    '&& td': {
      background: token.tableTbodyStripedBackgroundColor,
    },
  },
  rowChecked: {
    '&& td': {
      background: token.tableTbodyActiveBackgroundColor,
    },
  },
  rowExpand: {
    '&& td': {
      background: token.tableExpandBackgroundColor,
    },
  },
  pagination: {
    margin: `${token.tablePaginationMarginY} 0`,
  },
  striped: {
    '& table tr:nth-child(even) td': {
      background: `${token.tableTbodyStripedBackgroundColor}`,
    },
  },
  simple: {
    '& th, & td': {
      textAlign: 'left',
    },
    '& table tr:hover td': {
      background: `${token.tableTbodyHoverBackgroundColor}`,
    },
  },
};

export default tableStyle;
