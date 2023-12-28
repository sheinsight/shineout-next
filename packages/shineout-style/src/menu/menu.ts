import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type MenuClasses = {
  wrapper: string;
  wrapperInline: string;
  wrapperVertical: string;
  wrapperHorizontal: string;
  wrapperVerticalAuto: string;
  wrapperHasExpand: string;
  root: string;
  children: string;
  item: string;
  itemActive: string;
  itemDisabled: string;
  itemOpen: string;
  itemInPath: string;
  itemHasChildren: string;
  title: string;
  expand: string;
  expandHover: string;
  expandFront: string;
  expandBack: string;
  itemContent: string;
  itemContentFront: string;
  itemContentBack: string;
};
export type MenuClassType = keyof MenuClasses;

const menuStyle: JsStyles<MenuClassType> = {
  wrapper: {},
  root: {
    display: 'block',
    padding: '0',
    margin: '0',
    fontSize: token.menuFontSize,
    color: token.menuFontColor,
  },
  wrapperInline: {},
  wrapperVertical: {},
  wrapperHorizontal: {
    '& $root': {
      display: 'flex',
    },
    '& $item': {
      position: 'relative',
    },
    '& $children': {
      position: 'absolute',
      bottom: 0,
      left: 0,
      transform: 'translateY(100%)',
    },
  },
  wrapperVerticalAuto: {},
  wrapperHasExpand: {},
  children: {
    padding: '0',
    display: 'none',
    minWidth: '100%',
    '$wrapper:not($wrapperInline) &': {
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    },
  },
  item: {
    listStyle: 'none',
    flexShrink: 0,
  },
  itemActive: {},
  itemDisabled: {},
  itemOpen: {
    '& > $children': {
      display: 'block',
    },
  },
  itemInPath: {},
  itemHasChildren: {},
  itemContent: {
    lineHeight: token.lineHeightDynamic,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    backgroundColor: token.menuItemBackgroundColor,
    '&:hover': {
      color: token.menuItemHoverFontColor,
      backgroundColor: token.menuItemHoverBackgroundColor,
    },

    '$itemInPath > &': {
      color: token.menuItemActiveFontColor,
    },
    '$itemActive > &': {
      color: token.menuItemActiveFontColor,
      backgroundColor: token.menuItemActiveBackgroundColor,
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        display: 'block',
        top: 0,
        right: 0,
        width: '2px',
        height: '100%',
        backgroundColor: token.menuItemActiveFontColor,
      },
    },
    '$itemDisabled > &': {
      cursor: 'not-allowed',
      color: token.menuItemDisabledFontColor,
      backgroundColor: token.menuItemDisabledBackgroundColor,
    },
  },
  itemContentFront: {},
  itemContentBack: {},
  title: {
    flex: 1,
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    minWidth: 0,
    padding: `${token.menuTitlePaddingY} ${token.menuTitlePaddingX}`,
    '$wrapperHasExpand $itemContentBack > &': {
      paddingRight: token.menuExpandWidth,
    },
    '$wrapperHasExpand $itemHasChildren > $itemContentBack > &': {
      paddingRight: 0,
    },
    '$wrapperHasExpand $itemContentFront > &': {
      paddingLeft: 0,
    },
  },
  expand: {
    alignSelf: 'stretch',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > div': {
      lineHeight: 1,
      width: token.menuExpandSize,
      height: token.menuExpandSize,
      '$itemOpen > $itemContent &': {
        transform: 'rotate(180deg)',
      },
    },
  },
  expandHover: {
    '&:hover': {
      backgroundColor: token.menuExpandHoverBackgroundColor,
    },
  },
  expandFront: {
    width: 'auto',
    visibility: 'hidden',
    paddingLeft: token.menuTitlePaddingX,
    paddingRight: '8px',
    '$itemHasChildren > $itemContent &': {
      visibility: 'visible',
    },
  },
  expandBack: {
    width: token.menuExpandWidth,
  },
};

export default menuStyle;
