import { JsStyles } from '../jss-style';
import Token from '@sheinx/theme';
import { TransferClasses } from '@sheinx/base';

export type TransferClass = keyof TransferClasses;

const TransferStyle: JsStyles<TransferClass> = {
  rootClass: {},
  transfer: {
    display: 'flex',
    alignItems: 'stretch',
    color: Token.transferFontColor,
    fontSize: Token.transferFontSize,
  },
  equalPanelWidth: {
    '& $view': {
      flex: 1,
    },
  },
  small: {
    '& $operations': { '& svg': { width: Token.transferSmallFontSize } },
    '& $header': {
      height: Token.transferSmallHeaderHeight,
    },
    '& $title,$count,$simpleTarget,$removeAll': { fontSize: Token.transferSmallFontSize },
    '& $close': { width: `calc(${Token.transferSmallFontSize} + 8px)` },
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
      '& $header': {
        borderRadius: `${Token.transferBorderRadius} 0 0 0`,
      },
    },
    '& $target': {
      borderRadius: `0 ${Token.transferBorderRadius} ${Token.transferBorderRadius} 0`,
      '& $header': {
        paddingRight: 6,
        borderRadius: `0 ${Token.transferBorderRadius} 0 0`,
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
    width: `calc(${Token.transferFontSize} + 8px)`,
    height: `calc(${Token.transferFontSize} + 8px)`,
    borderRadius: '50%',
    minWidth: `calc(${Token.transferFontSize} + 8px)`,
    fontSize: Token.transferFontSize,
    lineHeight: `calc(${Token.transferFontSize} + 8px)`,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 3,
    '& svg': {
      width: Token.transferFontSize,
      color: Token.transferRemoveIconColor,
    },
    '&:hover': {
      background: Token.transferIconBackgroundColor,
    },
  },
  close: {
    width: `calc(${Token.transferFontSize} + 8px)`,
    height: `calc(${Token.transferFontSize} + 8px)`,
    flexShrink: 0,
    borderRadius: '50%',
    minWidth: `calc(${Token.transferFontSize} + 8px)`,
    fontSize: Token.transferFontSize,
    cursor: 'pointer',
    color: Token.transferIconColor,
    lineHeight: `calc(${Token.lineHeightDynamic} + 2px)`,
    marginLeft: Token.transferIconNearlyMargin,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      width: Token.transferFontSize,
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
      width: Token.transferFontSize,
    },
  },
  inputWrapper: {
    padding: '8px 12px 4px 12px',
  },
  input: {
    '& > div > svg': {
      width: Token.transferFontSize,
      minWidth: Token.transferFontSize,
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
    borderRadius: Token.transferBorderRadius,
    background: Token.transferBackgroundColor,
    // scrollbarColor: `${Token.transferBorderColor} transparent`,
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
  checkbox: {
    '&>[data-soui-role="desc"]': {
      flex: 1,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  },
  empty: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default TransferStyle;
