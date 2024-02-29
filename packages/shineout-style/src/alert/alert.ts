import Token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export interface AlertClasses {
  alert: string;
  title: string;
  close: string;
  widthTitle: string;
  wrapper: string;
  content: string;
  icon: string;
  info: string;
  success: string;
  warning: string;
  confirmwarning: string;
  danger: string;
  infoIcon: string;
  successIcon: string;
  warningIcon: string;
  confirmIcon: string;
  confirmwarningIcon: string;
  dangerIcon: string;
  pending: string;
  noBordered: string;
}

export type AlertClass = keyof AlertClasses;

const alertStyle: JsStyles<AlertClass> = {
  alert: {
    // display: 'table',
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
            top: -2,
            right: 0,
            bottom: 0,
            left: -5,
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: Token.alertMessageHoverColor,
          },
        },
      },
    },
    '&$widthTitle': {},
    '& $icon': {},
  },
  widthTitle: {
    '& $icon': {
      // marginBottom: Token.alertNearlyMargin,
      width: 20,
      height: 24,
    },
    '& $title': {
      lineHeight: '24px',
    },
    '& $close': {
      marginBottom: Token.alertNearlyMargin,
      marginTop: 2,
    },
  },
  title: {
    fontSize: Token.alertTitleFontSize,
    fontWeight: 500,
    marginBottom: 4,
    overflowWrap: 'anywhere',
    lineHeight: Token.alertTitleFontSize,
  },
  close: {
    cursor: 'pointer',
    width: Token.alertFontSize,
    color: Token.alertCloseFontColor,
    fontSize: Token.alertFontSize,
    height: Token.lineHeightDynamic,
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Token.alertNearlyMargin,
    '&:hover': {
      color: Token.alertCloseHoverColor,
    },
  },
  wrapper: {
    flex: '1 1 0',
  },
  content: {
    overflowWrap: 'anywhere',
    fontSize: Token.alertFontSize,
    lineHeight: Token.lineHeightDynamic,
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
  confirmwarningIcon: { color: Token.alertDangerFontColor },
  dangerIcon: { color: Token.alertDangerFontColor },
  confirmIcon: { color: Token.alertWarningFontColor },
  noBordered: {
    borderColor: 'transparent',
  },
  icon: {
    width: 16,
    display: 'inline-flex',
    fontSize: Token.alertFontSize,
    height: Token.lineHeightDynamic,
    flex: '0 0 auto',
    alignItems: 'center',
    marginRight: Token.alertNearlyMargin,
  },
};

export default alertStyle;
