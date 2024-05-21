import token from '@sheinx/theme';
import { MenuClasses } from '@sheinx/base';
import { JsStyles } from '../jss-style';
const menuIndex = 1000;

export type MenuClassType = keyof MenuClasses;

const animationTime = '300ms';
const arrow = {
  content: '""',
  position: 'absolute',
  left: 0,
  transform: 'translateY(-50%)',
  border: '6px solid transparent',
  borderRightColor: token.menuItemBackgroundColor,
  marginLeft: '-10px',
};

const menuStyle: JsStyles<MenuClassType> = {
  wrapperAnimation: {},
  wrapper: {
    height: '100%',
    transition: `width ${animationTime}`,
    backgroundColor: token.menuItemBackgroundColor,
  },
  wrapperLight: {},
  wrapperDark: {
    backgroundColor: token.menuDarkItemBackgroundColor,
  },
  collapse: {
    width: token.menuCollapseWidth,
    boxSizing: 'content-box',
    '&:not($isTransition) $root': {
      width: `${token.menuCollapseWidth}`,
    },
  },
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
    zIndex: menuIndex,
  },
  wrapperHorizontal: {
    height: '42px',
    position: 'relative',
    zIndex: menuIndex,
  },
  wrapperHasOpen: {},
  children: {
    padding: '0',
    display: 'none',
    minWidth: '100%',
    whiteSpace: 'nowrap',
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
      '&[dir=ltr]': {
        right: '-6px',
        transform: 'translateX(100%)',
      },
      '&[dir=rtl]': {
        left: '-6px',
        transform: 'translateX(-100%)',
      },

      minWidth: 'auto',
      borderRadius: '4px',
      '& > :first-child > $itemContent': {
        borderTopRightRadius: '4px',
        borderTopLeftRadius: '4px',
      },
      '& > :last-child > $itemContent': {
        borderBottomRightRadius: '4px',
        borderBottomLeftRadius: '4px',
      },
      '&$childrenUp': {
        top: 'auto',
        bottom: 0,
      },
      '&$childrenUp::before': {
        top: 'auto',
        bottom: '20%',
        ...arrow,
        '$wrapperDark&': {
          borderRightColor: token.menuDarkItemBackgroundColor,
        },
      },
      '&::before': {
        top: '20%',
        ...arrow,
        '$wrapperDark&': {
          borderRightColor: token.menuDarkItemBackgroundColor,
        },
      },
    },
  },
  childrenUp: {},
  item: {
    listStyle: 'none',
    flexShrink: 0,
    position: 'relative',
    '$wrapperVertical &, $wrapperHorizontal &': {
      position: 'relative',
    },
  },
  isTransition: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  collapseItem: {
    width: token.menuCollapseWidth,
    cursor: 'pointer',
    opacity: 1,
    height: token.menuCollapseWidth,
    color: 'inherit',
    position: 'relative',

    '$wrapperLight &': {
      background: token.menuItemBackgroundColor,
      '&:hover': {
        background: token.menuItemHoverBackgroundColor,
        color: token.menuItemHoverFontColor,
      },
    },
    '$wrapperLight $itemDisabled > &&': {
      cursor: 'not-allowed',
      color: token.menuCollapseItemDisabledFontColor,
      background: token.menuCollapseItemDisabledBackgroundColor,
    },

    '$wrapperDark $itemDisabled > &&': {
      cursor: 'not-allowed',
      color: token.menuDarkCollapseItemDisabledFontColor,
      background: token.menuDarkCollapseItemDisabledBackgroundColor,
    },

    '$wrapperDark &': {
      color: token.menuDarkCollapseItemFontColor,
      background: token.menuDarkCollapseItemBackgroundColor,
      '&:hover': {
        background: token.menuDarkCollapseItemHoverBackgroundColor,
        color: token.menuDarkCollapseItemHoverFontColor,
      },
    },

    '$itemActive > &&': {
      '$wrapperLight &': {
        color: token.menuCollapseItemActiveFontColor,
        background: token.menuCollapseItemActiveBackgroundColor,
        '$isTransition&': {
          background: token.menuItemActiveBackgroundColor,
        },
      },
      '$wrapperDark &': {
        color: token.menuDarkCollapseItemActiveFontColor,
        background: token.menuDarkCollapseItemActiveBackgroundColor,
      },
    },
    '&$collapseItemInPath': {
      // background: token.menuItemBackgroundColor,
      '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 3,
        transition: `all ease ${animationTime}`,
        backgroundColor: token.menuCollapseItemActiveFontColor,
      },
    },
  },
  collapseItemInPath: {},
  collapseItemHide: {
    width: 0,
    transition: `all ${animationTime} ease , width  0s ease ${animationTime}`,
    // height: 0,
    // zIndex: -1,
    position: 'absolute',
    top: 0,
    opacity: 0,
    // color: 'transparent',
    // background: 'transparent',
    '&$collapseItemInPath': {
      // background: token.menuItemBackgroundColor,
      '&::after': {
        top: 20,
        bottom: 20,
        backgroundColor: 'transparent',
      },
    },
  },
  itemActive: {},
  itemDisabled: {},
  itemOpen: {},
  itemInPath: {},
  itemHasChildren: {},
  childrenHasExpand: {},
  itemContent: {
    lineHeight: token.lineHeightDynamic,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'relative',
    transition: `visibility ease ${animationTime}`,
    '$wrapperLight &': {
      color: token.menuItemFontColor,
      backgroundColor: token.menuItemBackgroundColor,
      '&:hover': {
        color: token.menuItemHoverFontColor,
        backgroundColor: token.menuItemHoverBackgroundColor,
      },
    },

    '$wrapperDark &': {
      color: token.menuDarkFontColor,
      backgroundColor: token.menuDarkItemBackgroundColor,
      '&:hover': {
        color: token.menuDarkItemHoverFontColor,
        backgroundColor: token.menuDarkItemHoverBackgroundColor,
      },
    },
    '$wrapperDark $itemOpen > &': {
      color: token.menuDarkItemOpenFontColor,
      backgroundColor: token.menuDarkItemOpenBackgroundColor,
      '& $icon': {
        color: token.menuDarkItemOpenFontColor,
      },
    },

    '$itemInPath > &&': {
      '$wrapperLight &': {
        color: token.menuItemActiveFontColor,
        '& $icon': {
          color: token.menuItemActiveFontColor,
        },
      },

      '$wrapperDark$wrapperInline &::before, $wrapperDark$wrapperVertical &::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '3px',
        backgroundColor: token.menuDarkItemActiveBackgroundColor,
      },
      '$wrapperLight$wrapperVertical &': {
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
    '$itemActive > &&': {
      '$wrapperLight &': {
        color: token.menuItemActiveFontColor,
        backgroundColor: token.menuItemActiveBackgroundColor,
        '& $icon': {
          color: token.menuItemActiveFontColor,
        },
      },
      '$wrapperDark &': {
        color: token.menuDarkItemActiveFontColor,
        backgroundColor: token.menuDarkItemActiveBackgroundColor,
        '& $icon': {
          color: token.menuDarkItemActiveFontColor,
        },
      },
      '$wrapperLight$wrapperInline &,  $wrapperLight$wrapperHorizontal &': {
        '&::before': {
          content: '""',
          position: 'absolute',
          display: 'block',
          top: 0,
          right: 0,
          width: '3px',
          height: '100%',
          backgroundColor: token.menuItemActiveFontColor,
        },
      },
      '$wrapperLight$wrapperHorizontal $root > &::before': {
        width: '100%',
        height: '2px',
        top: 'auto',
        bottom: 0,
        left: 0,
        right: 'auto',
      },
    },
    '$wrapperLight $itemDisabled > &&': {
      cursor: 'not-allowed',
      color: token.menuItemDisabledFontColor,
      backgroundColor: token.menuItemDisabledBackgroundColor,
      '& $icon': {
        color: token.menuItemDisabledFontColor,
      },
    },
    '$wrapperDark $itemDisabled > &&': {
      cursor: 'not-allowed',
      color: token.menuDarkItemDisabledFontColor,
      backgroundColor: token.menuDarkItemDisabledBackgroundColor,
      '& $icon': {
        color: token.menuDarkItemDisabledFontColor,
      },
    },
  },
  itemContentHide: {
    position: 'absolute',
    width: '100%',
    overflow: 'hidden',
    pointerEvents: 'none',
    // opacity: 0,
    visibility: 'hidden',
    '& $title': {
      pointerEvents: 'none',
      whiteSpace: 'nowrap',
    },
    '& $menuIcon': {
      opacity: 0,
    },
  },
  itemContentFront: {},
  itemContentBack: {},
  title: {
    '&:hover': {
      color: 'inherit',
    },
    '$isTransition &': {
      overflow: 'hidden',
    },
    flex: 1,
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    minWidth: 0,
    padding: `${token.menuTitlePaddingY} ${token.menuTitlePaddingX}`,
    '$wrapperInline $childrenHasExpand  $item:not($itemHasChildren)  $itemContentBack > &': {
      paddingRight: token.menuExpandWidth,
    },
    '$wrapperInline $itemHasChildren > $itemContentBack > &': {
      paddingRight: 0,
    },

    '$childrenHasExpand > $item:not($itemHasChildren) > $itemContentBack > &': {
      paddingRight: token.menuExpandWidth,
    },
    '$childrenHasExpand $itemHasChildren > $itemContentBack > &': {
      paddingRight: 0,
    },

    '$childrenHasExpand $itemContentFront > &': {
      paddingLeft: 0,
    },
  },
  expand: {
    alignSelf: 'stretch',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '$isTransition$collapse &': {
      width: 0,
    },
    '$wrapperLight &': {
      color: token.menuIconColor,
    },
    '& > $icon': {
      lineHeight: 1,
      opacity: 1,
      width: token.menuExpandSize,
      height: token.menuExpandSize,
      '$wrapper:not($wrapperVertical) $itemOpen > $itemContent &': {
        transform: 'rotate(180deg)',
      },
    },
    '$wrapperVertical &': {
      '&[dir=ltr]': { transform: 'rotate(-90deg)' },
      '&[dir=rtl]': { transform: 'rotate(90deg)' },
    },
  },
  icon: {},
  expandHover: {
    '&:hover': {
      backgroundColor: token.menuExpandHoverBackgroundColor,
    },
    '$itemActive &:hover': {
      backgroundColor: token.menuItemActiveHoverBackgroundColor,
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
    '&[dir=rtl]': {
      left: 0,
      right: 'auto',
    },
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
