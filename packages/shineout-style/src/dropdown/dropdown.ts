import { JsStyles } from '../jss-style';
import token from '@sheinx/theme';

export type DropDownClass =
  | 'wrapper'
  | 'open'
  | 'list'
  | 'listSmall'
  | 'listLarge'
  | 'boxList'
  | 'caret'
  | 'content'
  | 'button'
  | 'item'
  | 'itemDisabled'
  | 'itemActive'
  | 'splitButton';

const dropdown: JsStyles<DropDownClass> = {
  wrapper: {
    display: 'inline-block',
    position: 'relative',
    '& button': {
      lineHeight: token.lineHeightDynamic,
      fontSize: token.dropdownListFontSize,
    },
  },
  open: {
    '& > $button $caret': {
      transform: 'rotate(180deg)',
    },
  },
  list: {
    position: 'absolute',
    fontWeight: 400,
    zIndex: 1000,
    fontSize: token.dropdownListFontSize,
    border: `${token.dropdownListBorderWidth} solid ${token.dropdownListBorderColor}`,
    borderRadius: token.dropdownListBorderRadius,
    padding: `${token.dropdownListPaddingY} 0`,
    background: token.dropdownListBackgroundColor,
    boxShadow: token.dropdownListBoxShadow,
    width: 'max-content',
    boxSizing: 'border-box',
    lineHeight: token.lineHeightDynamic,
    '& $wrapper': {
      display: 'block',
    },
  },
  listSmall: {
    fontSize: token.dropdownListSmallFontSize,
    borderRadius: token.dropdownListSmallBorderRadius,
    padding: `${token.dropdownListSmallPaddingY} 0`,
  },
  listLarge: {
    fontSize: token.dropdownListLargeFontSize,
    borderRadius: token.dropdownListLargeBorderRadius,
    padding: `${token.dropdownListLargePaddingY} 0`,
  },
  boxList: {},
  caret: {
    width: '1em',
    height: '1em',
    display: 'inline-block',
    verticalAlign: 'middle',
    lineHeight: '1',
    '$wrapper[data-position^="right"] > $button & > svg': {
      transform: 'rotate(-90deg)',
    },
    '$wrapper[data-position^="left"] > $button & > svg': {
      transform: 'rotate(90deg)',
    },
    '$wrapper[data-position^="top"] > $button & > svg': {
      transform: 'rotate(180deg)',
    },
  },

  content: {},
  button: {},
  item: {
    display: 'block',
    lineHeight: token.lineHeightDynamic,
    color: token.dropdownOptionFontColor,
    backgroundColor: token.dropdownOptionBackgroundColor,
    textDecoration: 'none',
    padding: `2px 8px`,
    cursor: 'pointer',
    '&:hover': {
      color: token.dropdownOptionHoverFontColor,
      backgroundColor: token.dropdownOptionHoverBackgroundColor,
    },
    '&:active': {
      color: token.dropdownOptionActiveFontColor,
      backgroundColor: token.dropdownOptionActiveBackgroundColor,
    },
    '$itemDisabled&, &[disabled]': {
      color: token.dropdownOptionDisabledFontColor,
      backgroundColor: token.dropdownOptionDisabledBackgroundColor,
      cursor: 'not-allowed',
    },
    '$itemActive&': {
      color: token.dropdownOptionSelectFontColor,
      backgroundColor: token.dropdownOptionSelectBackgroundColor,
    },
  },
  itemDisabled: {},
  itemActive: {},
  splitButton: {},
};

export default dropdown;
