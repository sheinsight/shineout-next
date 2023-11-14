import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';
import { hideScrollBar } from '../mixin';

export type TableClasses = {
  wrapper: string;
  scrollY: string;
  floatLeft: string;
  floatRight: string;
  bordered: string;

  thead: string;
  tbody: string;
  tfoot: string;

  cellFixedLeft: string;
  cellFixedRight: string;
  cellFixedLast: string;

  hasSorter: string;
  sorterContainer: string;
  sorterActive: string;
  sorterAsc: string;
  sorterDesc: string;
};

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
      textAlign: 'center',
      minWidth: '100%',
      boxSizing: 'border-box',
      tableLayout: 'fixed',
      borderCollapse: 'separate',
      borderSpacing: 0,
      '& th, & td': {
        position: 'relative',
        borderBottom: `1px solid ${token.tableCellBorderColor}`,
        boxSizing: 'border-box',
        padding: `${token.tableCellPaddingY} ${token.tableCellPaddingX}`,
        lineHeight: token.lineHeightDynamic,
        '&$cellFixedLeft, &$cellFixedRight': {
          position: 'sticky',
          zIndex: 2,
        },
        '$bordered&::after': {
          content: '""',
          position: 'absolute',
          zIndex: 1,
          top: 0,
          right: 0,
          bottom: 0,
          width: '1px',
          background: '#e8e8e8',
        },
      },
    },
  },
  bordered: {
    border: `1px solid ${token.tableCellBorderColor}`,
    borderRight: 'none',
    borderBottom: 'none',
  },
  thead: {
    flex: '0 0 auto',
    overflowX: 'auto',
    boxSizing: 'border-box',
    ...hideScrollBar(),
    '& th': {
      background: token.tableTheadBackgroundColor,
      color: token.tableTheadFontColor,
      fontWeight: 'bold',
      boxSizing: 'border-box',
    },
  },
  tbody: {
    overflow: 'auto',
    boxSizing: 'border-box',
    '& td': {
      backgroundColor: token.tableTbodyBackgroundColor,
      color: token.tableTbodyFontColor,
      boxSizing: 'border-box',
    },
  },
  tfoot: {
    '&  td': {
      width: '100%',
      boxSizing: 'border-box',
    },
    ...hideScrollBar(),
  },
  scrollY: {
    paddingRight: '15px',
  },
  cellFixedLeft: {
    position: 'sticky',
    zIndex: 2,
  },
  cellFixedRight: {
    position: 'sticky',
    zIndex: 2,
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
};

export default tableStyle;
