import { JsStyles } from '../jss-style';
import Token from '@sheinx/theme';

type TransferClass =
  | 'transfer'
  | 'view'
  | 'source'
  | 'target'
  | 'operations'
  | 'input'
  | 'left'
  | 'right'
  | 'header'
  | 'list'
  | 'item'
  | 'footer'
  | 'empty';

const TransferStyle: JsStyles<TransferClass> = {
  transfer: {
    display: 'flex',
    alignItems: 'center',
    color: Token.transferFontColor,
    fontSize: Token.transferFontSize,
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
  operations: {
    padding: '0 24px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '6px 12px',
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
    background: Token.transferHeaderBackgroundColor,
  },
  list: {},
  footer: {
    height: 45,
    borderTop: `1px solid ${Token.transferBorderColor}`,
  },
  item: {
    // height: 32,
    padding: '6px 12px',
    borderRadius: Token.transferBorderRadius,
  },
  empty: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default TransferStyle;
