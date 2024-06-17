import { JsStyles } from '../jss-style';
import Token from '@sheinx/theme';
import { TransferClasses } from '@sheinx/base';

export type TransferClass = keyof TransferClasses;

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
    '& $left, & $right': {
      padding: 0,
    },
  },
  large: {
    '& $operations': { '& svg': { width: 16 } },
    '& $header': {
      height: Token.transferLargeHeaderHeight,
    },
    '& $title,$count,$simpleTarget,$removeAll': { fontSize: Token.transferLargeFontSize },
    '& $close': { width: 24 },
    '& $left, & $right': {
      padding: 0,
    },
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
    fontSize: Token.transferFontSize,
    lineHeight: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 3,
    '& svg': {
      width: 14,
      color: Token.transferRemoveIconColor,
    },
    '&:hover': {
      background: Token.transferIconBackgroundColor,
    },
  },
  close: {
    width: 22,
    height: 22,
    flexShrink: 0,
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
  inputWrapper: {
    padding: '6px 12px',
  },
  input: {
    '& > div > svg': {
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
    borderRadius: `${Token.transferBorderRadius} ${Token.transferBorderRadius} 0 0`,
    borderBottom: `1px solid ${Token.transferHeaderBorderColor}`,
  },
  spinContainer: {},
  title: {
    display: 'flex',
    alignItems: 'center',
  },
  count: {
    fontSize: Token.transferFontSize,
  },
  list: {
    background: Token.transferBackgroundColor,
  },
  footer: {
    height: 48,
    boxSizing: 'border-box',
    borderTop: `1px solid ${Token.transferFooterBorderColor}`,
    background: Token.transferFooterBackgroundColor,
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
    borderRadius: Token.transferItemBorderRadius,
    cursor: 'pointer',
    height: '100%',
    '& $checkbox': {
      width: '100%',
      height: '100%',
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
};

export default TransferStyle;
