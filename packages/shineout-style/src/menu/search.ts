import token, { getTokenName } from '@sheinx/theme';
import { MenuSearchClasses } from '@sheinx/base';
import { JsStyles } from '../jss-style';
export type MenuSearchClassType = keyof MenuSearchClasses;

const menuSearchStyle: JsStyles<MenuSearchClassType> = {
  wrapper: {
    [getTokenName('inputBorderRadius')]: token.menuSearchBorderRadius,
  },
  wrapperDark: {
    [getTokenName('inputClearColor')]: token.menuSearchDarkClearColor,
    [getTokenName('inputHoverClearColor')]: token.menuSearchDarkHoverClearColor,
    [getTokenName('inputBorderColor')]: token.menuSearchDarkBackgroundColor,
    [getTokenName('inputBackgroundColor')]: token.menuSearchDarkBackgroundColor,
    [getTokenName('inputFontColor')]: token.menuSearchDarkFontColor,
    [getTokenName('inputPlaceholderFontColor')]: token.menuSearchDarkPlaceholderFontColor,
    [getTokenName('inputHoverBorderColor')]: token.menuSearchDarkHoverBorderColor,
    [getTokenName('inputHoverBackgroundColor')]: token.menuSearchDarkHoverBackgroundColor,
    [getTokenName('inputFocusBorderColor')]: token.menuSearchDarkFocusBorderColor,
    [getTokenName('inputFocusBackgroundColor')]: token.menuSearchDarkFocusBackgroundColor,
    [getTokenName('inputFocusShadow')]: token.menuSearchDarkFocusShadow,
    [getTokenName('inputDisabledBorderColor')]: token.menuSearchDarkBackgroundColor,
    [getTokenName('inputDisabledBackgroundColor')]: token.menuSearchDarkBackgroundColor,
    [getTokenName('inputDisabledFontColor')]: token.menuSearchDarkFontColor,
    [getTokenName('inputDisabledPlaceholderFontColor')]: token.menuSearchDarkPlaceholderFontColor,
  },
  wrapperLight: {
    [getTokenName('inputBorderColor')]: token.menuSearchBackgroundColor,
    [getTokenName('inputBackgroundColor')]: token.menuSearchBackgroundColor,
    [getTokenName('inputHoverBorderColor')]: token.menuSearchHoverBorderColor,
    [getTokenName('inputHoverBackgroundColor')]: token.menuSearchHoverBackgroundColor,
    [getTokenName('inputDisabledBorderColor')]: token.menuSearchDisabledBackgroundColor,
    [getTokenName('inputDisabledBackgroundColor')]: token.menuSearchDisabledBackgroundColor,
    [getTokenName('inputClearColor')]: token.menuSearchClearColor,
    [getTokenName('inputHoverClearColor')]: token.menuSearchHoverClearColor,
  },
  wrapperCollapsed: {
    cursor: 'pointer',
    width: token.menuSearchCollpaseSize,
    height: token.menuSearchCollpaseSize,
    lineHeight: 1,
    '& input': {
      opacity: 0,
    }
  },
  wrapperDisabled: {
    cursor: 'not-allowed',
    '&$wrapperDark': {
      opacity: 0.3,
    },
  },
  input: {
    width: '100%',
  },
  search: {
    width: token.menuSearchIconSize,
    height: token.menuSearchIconSize,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    marginRight: token.menuSearchIconMarginX,
    color: token.menuSearchIconColor,
    '$wrapperDisabled &': {
      color: token.inputDisabledFontColor,
      cursor: 'not-allowed',
    },
    '$wrapperDark &': {
      color: token.menuSearchDarkIconColor,
    },
    '$wrapperCollapsed &': {
      marginRight: 0,
    },
  },
};

export default menuSearchStyle;
