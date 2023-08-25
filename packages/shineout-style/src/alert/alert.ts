import Token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type AlertClass =
  | 'alert'
  | 'noBordered'
  | 'content'
  | 'widthTitle'
  | 'title'
  | 'close'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'icon'
  | 'pending';

const alertStyle: JsStyles<AlertClass> = {
  alert: {
    display: 'table',
    width: '100%',
    boxSizing: 'border-box',
    position: 'relative',
    alignItems: 'center',
    color: Token.alertFontColor,
    padding: `${Token.alertPaddingY} ${Token.alertPaddingX}`,
    borderRadius: Token.alertBorderRadius,
    borderWidth: 1,
    borderStyle: 'solid',

    opacity: 1,
    transformOrigin: '0 0',
    transform: 'scaleY(1) translateZ(0)',

    '& [data-soui-layout="row"]': {
      display: 'table-row',
    },
    '& [data-soui-layout="cell"]': {
      display: 'table-cell',
      verticalAlign: 'top',
      height: 'auto',
    },
    '& [data-soui-children="true"]': {
      fontSize: Token.alertFontSize,
      lineHeight: Token.lineHeightDynamic,
    },
    '& [data-soui-icon="true"],[data-soui-close="true"]': {
      width: 0,
      verticalAlign: 'middle',
    },
    '&$widthTitle': {
      '& [data-soui-layout="cell"]': {
        verticalAlign: 'middle',
      },
    },
    '& $icon': {},
  },
  widthTitle: {
    '& $icon': {
      marginBottom: Token.alertNearlyMargin,
    },
    '& $close': {
      marginBottom: Token.alertNearlyMargin,
    },
  },
  title: {
    fontSize: Token.alertTitleFontSize,
    fontWeight: 500,
    marginBottom: Token.alertNearlyMargin,
    lineHeight: Token.lineHeightDynamic,
  },
  close: {
    cursor: 'pointer',
    width: Token.alertFontSize,
    color: Token.alertCloseFontColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    wordBreak: 'break-all',
  },
  pending: {
    opacity: 0,
    transformOrigin: '0 0',
    transform: 'scaleY(.8) translateZ(0)',
    transition: 'transform .3s cubic-bezier(.3,1.3,.3,1),opacity .3s cubic-bezier(.3,1.3,.3,1)',
  },
  info: {
    backgroundColor: Token.alertInfoBackgroundColor,
    borderColor: Token.alertInfoBorderColor,
    '& $icon': {
      color: Token.alertInfoFontColor,
    },
  },
  success: {
    backgroundColor: Token.alertSuccessBackgroundColor,
    borderColor: Token.alertSuccessBorderColor,
    '& $icon': {
      color: Token.alertSuccessFontColor,
    },
  },
  warning: {
    backgroundColor: Token.alertWarningBackgroundColor,
    borderColor: Token.alertWarningBorderColor,
    '& $icon': {
      color: Token.alertWarningFontColor,
    },
  },
  danger: {
    backgroundColor: Token.alertDangerBackgroundColor,
    borderColor: Token.alertDangerBorderColor,
    '& $icon': {
      color: Token.alertDangerFontColor,
    },
  },
  noBordered: {
    borderColor: 'transparent',
  },
  icon: {
    width: 16,
    display: 'flex',
    alignItems: 'center',
    marginRight: Token.alertNearlyMargin,
  },
};

export default alertStyle;
