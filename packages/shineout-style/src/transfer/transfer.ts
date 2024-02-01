import { JsStyles } from '../jss-style';
import Token from '@sheinx/theme';

type TransferClass =
  | 'transfer'
  | 'small'
  | 'large'
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
  | 'count'
  | 'list'
  | 'item'
  | 'disabled'
  | 'checkbox'
  | 'itemWrapper'
  | 'footer'
  | 'empty'
  | 'emptyDescription';

const TransferStyle: JsStyles<TransferClass> = {
  transfer: {
    display: 'flex',
    alignItems: 'stretch',
    color: Token.transferFontColor,
    fontSize: Token.transferFontSize,
  },
  small: {
    '& $operations': { '& svg': { width: 12 } },
    '& $header': {
      height: Token.transferSmallHeaderHeight,
    },
    '& $title,$count,$simpleTarget,$removeAll': { fontSize: Token.transferSmallFontSize },
    '& $close': { width: 20 },
  },
  large: {
    '& $operations': { '& svg': { width: 16 } },
    '& $header': {
      height: Token.transferLargeHeaderHeight,
    },
    '& $title,$count,$simpleTarget,$removeAll': { fontSize: Token.transferLargeFontSize },
    '& $close': { width: 24 },
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
    padding: '5px 3px',
    paddingLeft: 8,
    fontSize: Token.transferFontSize,
    justifyContent: 'space-between',
    lineHeight: Token.lineHeightDynamic,
  },
  removeAll: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    minWidth: 24,
    fontSize: Token.transfer,
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
    width: 24,
    borderRadius: '50%',
    minWidth: 12,
    fontSize: 12,
    cursor: 'pointer',
    color: Token.transferIconColor,
    lineHeight: `calc(${Token.lineHeightDynamic} + 2px)`,
    marginLeft: Token.transferIconNearlyMargin,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      width: 12,
    },
    '&:hover': {
      background: Token.transferIconBackgroundColor,
    },
  },
  operations: {
    padding: '0 24px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    '& svg': {
      width: 14,
    },
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
    height: Token.transferHeaderHeight,
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
  count: {
    fontSize: Token.transferFontSize,
  },
  list: {},
  footer: {
    height: 48,
    boxSizing: 'border-box',
    borderTop: `1px solid ${Token.transferBorderColor}`,
  },
  item: {
    padding: '1px 4px',
    '&:not($disabled):hover': {
      '& $itemWrapper': {
        background: Token.transferItemHoverBackgroundColor,
      },
    },
  },
  disabled: {
    cursor: 'not-allowed',
    color: Token.transferDisabledFontColor,
    '& $close': {
      cursor: 'not-allowed',
      color: Token.transferDisabledFontColor,
      '&:hover': {
        background: 'transparent',
      },
    },
  },
  itemWrapper: {
    borderRadius: Token.transferBorderRadius,
    cursor: 'pointer',
    '& $checkbox': {
      width: '100%',
      padding: '5px 8px',
      marginRight: 0,
    },
  },
  checkbox: {},
  empty: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyDescription: {
    color: Token.transferEmptyFontColor,
  },
};

export default TransferStyle;
