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
  | 'itemWrapper'
  | 'item'
  | 'itemDisabled'
  | 'itemActive'
  | 'splitButton'
  | 'optionGroup'
  | 'optionDivider';

const dropdown: JsStyles<DropDownClass> = {
  wrapper: {
    display: 'inline-block',
    position: 'relative',
    '$list &': {
      display: 'block',
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
    minWidth: '100%',
    zIndex: 1000,
    textAlign: 'left',
    fontSize: token.dropdownListFontSize,
    border: `${token.dropdownListBorderWidth} solid ${token.dropdownListBorderColor}`,
    borderRadius: token.dropdownListBorderRadius,
    padding: `${token.dropdownListPaddingY}`,
    background: token.dropdownListBackgroundColor,
    boxShadow: token.dropdownListBoxShadow,
    width: 'max-content',
    boxSizing: 'border-box',
    lineHeight: token.lineHeightDynamic,
    '$wrapper $wrapper &': {
      minWidth: 'auto',
    },
  },
  listSmall: {
    fontSize: token.dropdownListSmallFontSize,
    borderRadius: token.dropdownListSmallBorderRadius,
    padding: `${token.dropdownListSmallPaddingY}`,
  },
  listLarge: {
    fontSize: token.dropdownListLargeFontSize,
    borderRadius: token.dropdownListLargeBorderRadius,
    padding: `${token.dropdownListLargePaddingY}`,
  },
  boxList: {
    padding: `${token.dropdownColumnPaddingY} ${token.dropdownColumnPaddingX}`,
    '& $item': {
      textAlign: 'center',
    },
  },
  caret: {
    width: '1em',
    height: '1em',
    display: 'inline-block',
    lineHeight: '1',
    marginLeft: token.dropdownCaretMarginLeft,
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

  content: {
    flex: '1',
    minWidth: '0',
  },
  button: {
    '$wrapper &': {
      display: 'inline-flex',
      alignItems: 'center',
    },
    '$list &': {
      display: 'flex',
    },
  },
  itemWrapper: {},
  item: {
    display: 'block',
    borderRadius: 4,
    lineHeight: token.lineHeightDynamic,
    color: token.dropdownOptionFontColor,
    backgroundColor: token.dropdownOptionBackgroundColor,
    textDecoration: 'none',
    padding: `${token.dropdownOptionPaddingY} ${token.dropdownOptionPaddingX}`,
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
    '$listSmall &': {
      padding: `${token.dropdownOptionSmallPaddingY} ${token.dropdownOptionSmallPaddingX}`,
    },
    '$listLarge &': {
      padding: `${token.dropdownOptionLargePaddingY} ${token.dropdownOptionLargePaddingX}`,
    },
  },
  itemDisabled: {},
  optionGroup: {
    padding: `${token.dropdownOptionGroupPaddingTop} ${token.dropdownOptionGroupPaddingX} ${token.dropdownOptionGroupPaddingBottom} ${token.dropdownOptionGroupPaddingX}`,
    fontSize: token.dropdownOptionGroupFontSize,
    color: token.dropdownOptionGroupFontColor,
    '$listSmall &': {
      padding: `${token.dropdownOptionGroupSmallTop} ${token.dropdownOptionGroupSmallX} 0 ${token.dropdownOptionGroupSmallX}`,
    },
    '$listLarge &': {
      padding: `${token.dropdownOptionGroupLargeTop} ${token.dropdownOptionGroupLargeX} ${token.dropdownOptionGroupLargeBottom} ${token.dropdownOptionGroupLargeX}`,
    },
  },
  optionDivider: {
    padding: `${token.dropdownOptionDividerPaddingY} ${token.dropdownOptionDividerPaddingX}`,
    '&::before': {
      content: '" "',
      height: token.dropdownOptionDividerHeight,
      display: 'block',
      background: token.dropdownOptionDividerBackgroundColor,
    },
  },
  itemActive: {},
  splitButton: {},
};

export default dropdown;
