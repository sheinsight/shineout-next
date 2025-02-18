import { JsStyles } from '../jss-style';
import token from '@sheinx/theme';
import { DropdownClasses } from '@sheinx/base';

const dropdown: JsStyles<keyof DropdownClasses> = {
  rootClass: {},
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
    fontWeight: token.dropdownListFontWeight,
    minWidth: '100%',
    zIndex: 1000,
    textAlign: 'left',
    fontSize: token.dropdownListFontSize,
    border: `${token.dropdownListBorderWidth} solid ${token.dropdownListBorderColor}`,
    borderRadius: token.dropdownListBorderRadius,
    padding: `${token.dropdownListPaddingY} ${token.dropdownListPaddingX}`,
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
    borderRadius: token.dropdownListBorderRadius,
    padding: `${token.dropdownListSmallPaddingY} ${token.dropdownListSmallPaddingX}`,
  },
  listLarge: {
    fontSize: token.dropdownListLargeFontSize,
    borderRadius: token.dropdownListBorderRadius,
    padding: `${token.dropdownListLargePaddingY} ${token.dropdownListLargePaddingX}`,
  },
  listHasChildren: {
    '$wrapper[data-position^="left"] > &': {
      '& > $itemWrapper > $item': {
        '&[dir=ltr]::before': {
          content: '""',
          width: '1em',
          marginLeft: token.dropdownCaretMarginLeft,
          display: 'inline-block',
        },
        '&[dir=rtl]::after': {
          content: '""',
          width: '1em',
          marginRight: token.dropdownCaretMarginLeft,
          display: 'inline-block',
        },
      },
    },
    '$wrapper[data-position^="right"] > &': {
      '& > $itemWrapper > $item': {
        '&[dir=rtl]::before': {
          content: '""',
          width: '1em',
          marginLeft: token.dropdownCaretMarginLeft,
          display: 'inline-block',
        },
        '&[dir=ltr]::after': {
          content: '""',
          width: '1em',
          marginRight: token.dropdownCaretMarginLeft,
          display: 'inline-block',
        },
      },
    },
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
    // marginLeft: token.dropdownCaretMarginLeft,
    '$wrapper[data-position^="right"] > $button & > svg': {
      transform: 'rotate(-90deg)',
    },
    '$wrapper[data-position^="left"] > $button &': {
      '& > svg': {
        transform: 'rotate(90deg)',
      },
    },
    '$wrapper[data-position^="left"] > $button &[dir=ltr]': {
      marginLeft: '0',
      marginRight: token.dropdownCaretMarginLeft,
      textAlign: 'right',
    },
    '$wrapper[data-position^="right"] > $button &[dir=rtl]': {
      marginLeft: '0',
      marginRight: token.dropdownCaretMarginLeft,
      textAlign: 'right',
    },
    '$wrapper[data-position^="left"] > $button & > svg': {},
    '$wrapper[data-position^="top"] > $button & > svg': {
      transform: 'rotate(180deg)',
    },
  },

  content: {
    flex: '1',
    minWidth: '0',
    '& + $caret': {
      marginLeft: token.dropdownCaretMarginLeft,
    },
    '& > svg': {
      display: 'block',
      margin: '0 auto'
    }
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
  itemWrapper: {
    marginBottom: 2,
    '&:last-child': {
      marginBottom: 0,
    },
  },
  item: {
    display: 'block',
    borderRadius: token.dropdownOptionBorderRadius,
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
    fontWeight: token.dropdownOptionGroupFontWeight,
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
