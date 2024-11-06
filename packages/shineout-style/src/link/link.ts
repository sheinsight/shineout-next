import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

import { LinkClasses } from '@sheinx/base'

export type LinkClassType = keyof LinkClasses;

const linkStyle: JsStyles<LinkClassType> = {
  rootClass: {},
  wrapper: {
    fontSize: token.linkDefaultFontSize,
  },
  sizeSmall: {
    fontSize: token.linkSmallFontSize,
  },
  sizeLarge: {
    fontSize: token.linkLargeFontSize,
  },
  underline: {
    textDecoration: 'underline',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  underlineHover: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  disabled: {
    color: token.linkPrimaryDisabledFontColor,
    cursor: 'not-allowed',
    '&:hover': {
      color: token.linkPrimaryDisabledFontColor,
    },
  },
  primary: {
    color: token.linkPrimaryFontColor,
    '&:hover': {
      color: token.linkPrimaryHoverFontColor,
    },
    '&:active': {
      color: token.linkPrimaryActiveFontColor,
    },
    '&$disabled': {
      color: token.linkPrimaryDisabledFontColor,
    }
  },
  secondary: {
    color: token.linkSecondaryFontColor,
    '&:hover': {
      color: token.linkSecondaryHoverFontColor,
    },
    '&:active': {
      color: token.linkSecondaryActiveFontColor,
    },
    '&$disabled': {
      color: token.linkSecondaryDisabledFontColor,
    }
  },
  danger: {
    color: token.linkDangerFontColor,
    '&:hover': {
      color: token.linkDangerHoverFontColor,
    },
    '&:active': {
      color: token.linkDangerActiveFontColor,
    },
    '&$disabled': {
      color: token.linkDangerDisabledFontColor,
    }
  },
  warning: {
    color: token.linkWarningFontColor,
    '&:hover': {
      color: token.linkWarningHoverFontColor,
    },
    '&:active': {
      color: token.linkWarningActiveFontColor,
    },
    '&$disabled': {
      color: token.linkWarningDisabledFontColor,
    }
  },
  success: {
    color: token.linkSuccessFontColor,
    '&:hover': {
      color: token.linkSuccessHoverFontColor,
    },
    '&:active': {
      color: token.linkSuccessActiveFontColor,
    },
    '&$disabled': {
      color: token.linkSuccessDisabledFontColor,
    }
  },
  icon: {
    display: 'inline-block',
    width: '1em',
    verticalAlign: 'middle',
    marginRight: 6,
    '& > svg': {
      fill: 'currentcolor',
    }
  }
};

export default linkStyle;
