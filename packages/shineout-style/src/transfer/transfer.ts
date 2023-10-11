import { JsStyles } from '../jss-style';
import Token from '@sheinx/theme';

type TransferClass = 'transfer' | 'view' | 'source' | 'target' | 'operations' | 'left' | 'right';

const TransferStyle: JsStyles<TransferClass> = {
  transfer: {
    display: 'flex',
    alignItems: 'center',
    color: Token.transferFontColor,
    fontSize: Token.transferFontSize,
  },
  view: {
    minWidth: 200,
    minHeight: 280,
    boxSizing: 'border-box',
    borderRadius: Token.transferBorderRadius,
    border: `1px solid ${Token.transferBorderColor}`,
  },
  source: {},
  target: {},
  operations: {
    padding: '0 24px',
    textAlign: 'center',
  },
  left: {
    marginTop: 12,
  },
  right: {},
};

export default TransferStyle;
