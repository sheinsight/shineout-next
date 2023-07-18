import { JsStyles } from '../jss-style';
import token from '@sheinx/theme';

// wrapper: string;
// boxList: string;
// list: string;
// caret: string;
// content: string;
// button: string;
// item: string;
// itemDisabled: string;
// itemActive: string;
// splitButton: string;

export type DropDownClass =
  | 'wrapper'
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
    '& *': {
      lineHeight: 'calc( 1em + 8px)',
    },
  },
  list: {
    position: 'absolute',
    fontWeight: 400,
    fontSize: token.dropdownListFontSize,
    border: `${token.dropdownListBorderWidth} solid ${token.dropdownListBorderColor}`,
    borderRadius: token.dropdownListBorderRadius,
    padding: `${token.dropdownListPaddingY} 0`,
    background: token.dropdownListBackgroundColor,
    boxShadow: token.dropdownListBoxShadow,
    width: 'max-content',
    boxSizing: 'border-box',
    lineHeight: 'calc( 1em + 8px)',
    '& $wrapper': {
      display: 'block',
    },
  },
  listSmall: {
    fontSize: token.dropdownListSmallFontSize,
    borderRadius: token.dropdownListSmallBorderRadius,
    padding: `${token.dropdownListSmallPaddingY} ${token.dropdownListSmallPaddingX}`,
  },
  listLarge: {
    fontSize: token.dropdownListLargeFontSize,
    borderRadius: token.dropdownListLargeBorderRadius,
    padding: `${token.dropdownListLargePaddingY} ${token.dropdownListLargePaddingX}`,
  },
  boxList: {},
  caret: {
    width: '1em',
    height: '1em',
    '& > svg': {
      width: '1em',
      height: '1em',
      verticalAlign: 'middle',
    },
  },
  content: {},
  button: {},
  item: {
    display: 'block',
    lineHeight: 'calc( 1em + 8px)',
    color: 'inherit',
    textDecoration: 'none',
    padding: `2px 8px`,
    cursor: 'pointer',
    '&:hover': {
      background: '#ccc',
    },
  },
  itemDisabled: {},
  itemActive: {},
  splitButton: {},
};

export default dropdown;
