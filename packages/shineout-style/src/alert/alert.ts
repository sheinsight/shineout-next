import Token from '@sheinx/theme';
import { JsStyles } from '../jss-style';
import { AlertClasses } from '@sheinx/base';

const alertStyle: JsStyles<keyof AlertClasses> = {
  rootClass: {},
  alert: {
    display: 'flex',
    width: '100%',
    lineHeight: '1em',
    boxSizing: 'border-box',
    position: 'relative',
    alignItems: 'flex-start',
    color: Token.alertFontColor,
    padding: `${Token.alertPaddingY} ${Token.alertPaddingX}`,
    borderRadius: Token.alertBorderRadius,
    borderWidth: 1,
    borderStyle: 'solid',
    fontWeight: Token.alertFontWeight,
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
    '&[data-soui-type="message"]': {
      '& $close': {
        position: 'relative',
        zIndex: 0,
        '& svg': {
          zIndex: 1,
          position: 'relative',
        },
        '&:hover': {
          '&:after': {
            content: '""',
            position: 'absolute',
            top: -4,
            right: -4,
            bottom: -4,
            left: -4,
            borderRadius: '50%',
            background: Token.alertMessageHoverColor,
          },
        },
      },
    },
    '&$withTitle': {},
    '& $icon': {},
  },
  withTitle: {
    '& $icon': {
      fontSize: Token.alertTitleFontSize,
      // marginBottom: Token.alertNearlyMargin,
      width: `calc(${Token.alertTitleIconWidth} + 2px)`,
      height: Token.lineHeightDynamic,
    },
    '& $title': {
      lineHeight: Token.lineHeightDynamic,
    },
    '& $closeWrapper': {
      fontSize: Token.alertTitleFontSize,
    },
  },
  title: {
    fontSize: Token.alertTitleFontSize,
    fontWeight: Token.alertTitleFontWeight,
    marginBottom: Token.alertTitleMarginY,
    overflowWrap: 'anywhere',
    lineHeight: Token.alertTitleFontSize,
  },
  text: {
    overflowWrap: 'anywhere',
    fontSize: Token.alertFontSize,
    lineHeight: Token.lineHeightDynamic,
  },
  close: {
    cursor: 'pointer',
    color: Token.alertCloseFontColor,
    fontSize: Token.alertFontSize,
    height: Token.alertCloseSize,
    width: Token.alertCloseSize,
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: Token.alertNearlyMargin,
    '&:hover': {
      color: Token.alertCloseHoverColor,
    },
    '& svg': {
      width: '100%',
    },
  },
  closeWrapper: {
    fontSize: Token.alertFontSize,
    width: Token.alertCloseSize,
    height: Token.lineHeightDynamic,
    display: 'flex',
    alignItems: 'center',
    marginLeft: Token.alertNearlyMargin,
  },
  content: {
    flex: '1 1 0',
    minWidth: 0,
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
  },
  success: {
    backgroundColor: Token.alertSuccessBackgroundColor,
    borderColor: Token.alertSuccessBorderColor,
  },
  warning: {
    backgroundColor: Token.alertWarningBackgroundColor,
    borderColor: Token.alertWarningBorderColor,
  },
  confirmwarning: {
    backgroundColor: Token.alertDangerBackgroundColor,
    borderColor: Token.alertDangerBorderColor,
  },
  danger: {
    backgroundColor: Token.alertDangerBackgroundColor,
    borderColor: Token.alertDangerBorderColor,
  },
  infoIcon: { color: Token.alertInfoFontColor },
  successIcon: { color: Token.alertSuccessFontColor },
  warningIcon: { color: Token.alertWarningFontColor },
  confirmwarningIcon: { color: Token.alertWarningFontColor },
  dangerIcon: { color: Token.alertDangerFontColor },
  confirmIcon: { color: Token.alertWarningFontColor },
  noBordered: {
    borderColor: 'transparent',
  },
  noChildren: {
    '&&$confirmwarning': {
      marginBottom: 0,
    }
  },
  icon: {
    width: Token.alertIconSize,
    display: 'inline-flex',
    fontSize: Token.alertFontSize,
    height: Token.lineHeightDynamic,
    flex: '0 0 auto',
    alignItems: 'center',
    marginRight: Token.alertNearlyMargin,
    '& svg': {
      width: '100%',
    },
  },
};

export default alertStyle;
