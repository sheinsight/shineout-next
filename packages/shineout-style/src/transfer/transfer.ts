import { JsStyles } from '../jss-style';
import Token from '@sheinx/theme';

type TransferClass =
  | 'transfer'
  | 'simple'
  | 'view'
  | 'source'
  | 'target'
  | 'close'
  | 'removeAll'
  | 'simpleTarget'
  | 'operations'
  | 'input'
  | 'left'
  | 'right'
  | 'header'
  | 'title'
  | 'list'
  | 'item'
  | 'checkbox'
  | 'itemWrapper'
  | 'footer'
  | 'empty';

const TransferStyle: JsStyles<TransferClass> = {
  transfer: {
    display: 'flex',
    alignItems: 'center',
    color: Token.transferFontColor,
    fontSize: Token.transferFontSize,
  },
  simple: {
    '& $source': {
      borderRadius: `${Token.transferBorderRadius} 0 0 ${Token.transferBorderRadius}`,
      borderRight: 0,
    },
    '& $target': {
      borderRadius: `0 ${Token.transferBorderRadius} ${Token.transferBorderRadius} 0`,
      '& $header': {
        paddingRight: 6,
      },
    },
  },
  view: {
    minWidth: 200,
    boxSizing: 'border-box',
    borderRadius: Token.transferBorderRadius,
    border: `1px solid ${Token.transferBorderColor}`,

    display: 'flex',
    flexDirection: 'column',
  },
  source: {},
  target: {},
  simpleTarget: {
    display: 'flex',
    justifyContent: 'space-between',
    lineHeight: Token.lineHeightDynamic,
  },
  removeAll: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    minWidth: 24,
    fontSize: 14,
    lineHeight: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 3,
    '& svg': {
      width: 14,
      color: Token.transferIconColor,
    },
    '&:hover': {
      background: Token.transferIconBackgroundColor,
    },
  },
  close: {
    width: 12,
    minWidth: 12,
    fontSize: 12,
    cursor: 'pointer',
    color: Token.transferIconColor,
    lineHeight: `calc(${Token.lineHeightDynamic} + 2px)`,
    marginLeft: Token.transferIconNearlyMargin,
  },
  operations: {
    padding: '0 24px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '6px 12px',
    '& svg': {
      width: 14,
      minWidth: 14,
      color: Token.transferIconColor,
    },
  },
  left: {
    marginTop: 12,
  },
  right: {},
  header: {
    height: 46,
    padding: 12,
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    background: Token.transferHeaderBackgroundColor,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
  },
  list: {},
  footer: {
    height: 48,
    boxSizing: 'border-box',
    borderTop: `1px solid ${Token.transferBorderColor}`,
  },
  item: {
    // height: 32,
    padding: '1px 4px',
  },
  itemWrapper: {
    padding: '5px 8px',
    borderRadius: Token.transferBorderRadius,
    cursor: 'pointer',
    '&:hover': {
      background: Token.transferItemHoverBackgroundColor,
    },
    '& $checkbox': {
      width: '100%',
      marginRight: 0,
      '&:hover': {
        '& :before': {
          background: 'red',
        },
      },
    },
  },
  checkbox: {},
  empty: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default TransferStyle;
