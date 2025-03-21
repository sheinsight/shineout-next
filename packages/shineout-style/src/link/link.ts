import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

import { LinkClasses } from '@sheinx/base'

export type LinkClassType = keyof LinkClasses;

const linkStyle: JsStyles<LinkClassType> = {
  rootClass: {},
  wrapper: {
    display: 'inline-flex',
    alignItems: 'center',
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
    textUnderlineOffset: '2px',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  underlineHover: {
    textDecoration: 'none',
    textUnderlineOffset: '2px',
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
    marginRight: 4,
    '& > svg': {
      fill: 'currentcolor',
      width: '1em',
      height: '1em',
      verticalAlign: '-2px',
    }
  }
};

export default linkStyle;
