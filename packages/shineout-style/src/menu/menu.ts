import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type MenuClasses = {
  wrapper: string;
  wrapperInline: string;
  wrapperVertical: string;
  wrapperHorizontal: string;
  wrapperHasExpand: string;
  wrapperHasOpen: string;
  root: string;
  children: string;
  childrenUp: string;
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

  scrollbar: string;
  scrollbarX: string;
  scrollbarY: string;
  scrollbarDragging: string;
  scrolbarHandler: string;
  scrollbox: string;
};
export type MenuClassType = keyof MenuClasses;

const menuStyle: JsStyles<MenuClassType> = {
  wrapper: {},
  scrollbox: {
    '$wrapperVertical &': {
      overflow: 'hidden',
      height: '100%',
    },
    '$wrapperHorizontal &': {
      overflow: 'hidden',
    },
    '$wrapperHasOpen$wrapperVertical &': {
      width: '100vw',
    },
    '$wrapperHasOpen$wrapperHorizontal &': {
      height: '100vh',
    },
  },
  root: {
    display: 'block',
    padding: '0',
    margin: '0',
    fontSize: token.menuFontSize,
    color: token.menuFontColor,
    '$wrapperHorizontal &': {
      display: 'flex',
      alignItems: 'flex-start',
    },
  },
  wrapperInline: {},
  wrapperVertical: {
    position: 'relative',
    zIndex: 0,
  },
  wrapperHorizontal: {
    height: '42px',
    position: 'relative',
    zIndex: 0,
  },
  wrapperHasExpand: {},
  wrapperHasOpen: {},
  children: {
    padding: '0',
    display: 'none',
    minWidth: '100%',
    '$itemOpen > &': {
      display: 'block',
    },
    '$wrapper:not($wrapperInline) &': {
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    },

    '$wrapperHorizontal &': {
      position: 'absolute',
      bottom: '-2px',
      left: 0,
      transform: 'translateY(100%)',
    },
    '$wrapperHorizontal & &': {
      position: 'absolute',
      left: 'auto',
      bottom: 'auto',
      top: 0,
      right: '-2px',
      transform: 'translateX(100%)',
    },
    '$wrapperVertical &': {
      position: 'absolute',
      top: 0,
      right: '-2px',
      transform: 'translateX(100%)',
      minWidth: 'auto',
      '&$childrenUp': {
        top: 'auto',
        bottom: 0,
      },
    },
  },
  childrenUp: {},
  item: {
    listStyle: 'none',
    flexShrink: 0,
    '$wrapperVertical &, $wrapperHorizontal &': {
      position: 'relative',
    },
  },
  itemActive: {},
  itemDisabled: {},
  itemOpen: {},
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
      '$wrapperVertical &': {
        '&::before': {
          display: 'block',
          content: '""',
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '4px',
          borderTopLeftRadius: '4px',
          borderBottomLeftRadius: '4px',
          backgroundColor: token.menuItemActiveFontColor,
        },
      },
    },
    '$itemActive > &': {
      color: token.menuItemActiveFontColor,
      backgroundColor: token.menuItemActiveBackgroundColor,
      position: 'relative',
      '$wrapperInline &,  $wrapperHorizontal &': {
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
      '$wrapperHorizontal $root > &::before': {
        display: 'none',
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
      '$wrapper:not($wrapperVertical) $itemOpen > $itemContent &': {
        transform: 'rotate(180deg)',
      },
    },
    '$wrapperVertical &': {
      transform: 'rotate(-90deg)',
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
  scrollbar: {
    position: 'absolute',
    zIndex: 99,
    border: '1px solid transparent',
    background: '#fafafa',
    display: 'none',
    '$wrapper:hover &': {
      display: 'block',
    },
  },
  scrollbarX: {
    right: 0,
    bottom: 0,
    left: 0,
    height: '16px',
    boxSizing: 'border-box',
    borderWidth: '1px 0',
  },
  scrollbarY: {
    right: 0,
    top: 0,
    bottom: 0,
    width: '16px',
    boxSizing: 'border-box',
    borderWidth: '0 1px',
  },
  scrolbarHandler: {
    position: 'absolute',
    background: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '6px',
    height: '10px',
    cursor: 'default',
    zIndex: 2,
    '$scrollbarX &': {
      top: '2px',
      height: '10px',
    },
    '$scrollbarY &': {
      left: '2px',
      width: '10px',
    },
  },
  scrollbarDragging: {},
};

export default menuStyle;
