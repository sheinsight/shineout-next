import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';
import { hideScrollBar, customScrollBar } from '../mixin';

export type TableClasses = {
  wrapper: string;
  scrollY: string;
  floatLeft: string;
  floatRight: string;
  bordered: string;
  sticky: string;
  verticalAlignTop: string;
  verticalAlignMiddle: string;

  headWrapper: string;
  bodyWrapper: string;
  footWrapper: string;

  cellFixedLeft: string;
  cellFixedRight: string;
  cellFixedLast: string;

  hasSorter: string;
  sorterContainer: string;
  sorterActive: string;
  sorterAsc: string;
  sorterDesc: string;

  resizeSpanner: string;
  resizeSpannerActive: string;
  resizeSpannerInactive: string;

  cellIgnoreBorder: string;

  expandIcon: string;
  iconWrapper: string;

  expandWrapper: string;
};

const cellBaseIndex = 4;
const sorterIndex = 10;
const fixedIndex = 8;
const headerIndex = 12;

export type TableClassType = keyof TableClasses;

const tableStyle: JsStyles<TableClassType> = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    position: 'relative',
    zIndex: 0,
    fontSize: token.tableFontSize,
    '& table': {
      textAlign: 'left',
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
        padding: `${token.tableCellPaddingY} ${token.tableCellPaddingX}`,
        lineHeight: token.lineHeightDynamic,
        '&$cellFixedLeft, &$cellFixedRight': {
          zIndex: fixedIndex,
        },
        '$bordered&::after': {
          content: '""',
          position: 'absolute',
          zIndex: cellBaseIndex,
          top: 0,
          right: 0,
          bottom: 0,
          width: '1px',
          background: token.tableCellBorderColor,
        },
      },

      '& td': {
        verticalAlign: 'middle',
        background: token.tableTbodyBackgroundColor,
        color: token.tableTbodyFontColor,
      },
      '& th': {
        verticalAlign: 'middle',
        background: token.tableTheadBackgroundColor,
        color: token.tableTheadFontColor,
        fontWeight: 'bold',
        boxSizing: 'border-box',
      },
    },
  },
  bordered: {
    border: `1px solid ${token.tableCellBorderColor}`,
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
  },
  footWrapper: {
    '&  td': {
      width: '100%',
      boxSizing: 'border-box',
    },
    ...hideScrollBar(),
  },
  scrollY: {
    '& $bodyWrapper': {
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
  cellFixedLast: {},
  floatLeft: {
    '& $cellFixedLast$cellFixedLeft::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '5px',
      right: '-5px',
      background: 'linear-gradient(90deg,rgba(2,11,24,.1), transparent)',
    },
  },
  floatRight: {
    '& $cellFixedLast$cellFixedRight::before': {
      content: '""',
      width: '5px',
      left: '-5px',
      background: 'linear-gradient(270deg,rgba(2,11,24,.1),transparent)',
      top: 0,
      bottom: 0,
      position: 'absolute',
    },
  },

  hasSorter: {
    display: 'flex',
  },
  sorterContainer: {
    minWidth: '18px',
    width: '18px',
    position: 'relative',
    transform: 'translateX(6px)',
    '& $sorterAsc, & $sorterDesc': {
      position: 'absolute',
      right: 0,
      width: '100%',
      color: '#666c7c',
      display: 'flex',
      justifyContent: 'center',
      cursor: 'pointer',
      '& > svg': {
        width: '8px',
      },
      '&$sorterActive': {
        color: '#19718A',
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
  },

  sorterActive: {},
  resizeSpanner: {
    zIndex: sorterIndex,
    position: 'absolute',
    opacity: 0,
    right: '-1px',
    top: 0,
    bottom: 0,
    width: '3px',
    boxSizing: 'border-box',
    background: '#19718a',
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
      borderColor: 'transparent #19718a transparent transparent',
      right: '4px',
    },
    '&::before': {
      borderStyle: 'dashed dashed dashed solid',
      borderColor: 'transparent transparent transparent #19718a',
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
    display: 'inline-block',
    width: '15px',
    height: '15px',
    cursor: 'pointer',
    color: '#b3b7c1',
    '&>svg': {
      cursor: 'pointer',
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
    '& $iconWrapper': {
      marginRight: '8px',
    },
  },
  iconWrapper: {
    display: 'inline-block',
    verticalAlign: 'top',
    lineHeight: '1.85',
    height: '14px',
  },
};

export default tableStyle;
