import { JsStyles } from '../jss-style';
import token from '@sheinx/theme';
import { IconClasses } from '@sheinx/base';

const form: JsStyles<keyof IconClasses> = {
  rootClass: {},
  wrapper: {
    display: 'inline-block',
    fontSize: 'inherit',
    lineHeight: '1',
    webkitFontSmoothing: 'antialiased',
    mozOsxFontSmoothing: 'grayscale',
    fontStyle: 'normal',
    textRendering: 'auto',
  },
  small: {
    fontSize: token.iconSmallFontSize,
  },
  large: {
    fontSize: token.iconLargeFontSize,
  },
  primary: {
    color: token.iconPrimaryFontColor,
  },
  success: {
    color: token.iconSuccessFontColor,
  },
  secondary: {
    color: token.iconSecondaryFontColor,
  },
  info: {
    color: token.iconInfoFontColor,
  },
  warning: {
    color: token.iconWarningFontColor,
  },
  danger: {
    color: token.iconDangerFontColor,
  },
  svg: {
    width: '1em',
    height: '1em',
    verticalAlign: '-0.15em',
    fill: 'currentColor',
    overflow: 'hidden',
  },
};

export default form;
