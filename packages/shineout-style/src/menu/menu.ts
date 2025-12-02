import token from '@sheinx/theme';
import { MenuClasses } from '@sheinx/base';
import { JsStyles } from '../jss-style';
export type MenuClassType = keyof MenuClasses;

const animationDuration = '.25s';
const collapseWidth = token.menuCollapseWidth;
const transitionFunc = 'ease-out';

const menuStyle: JsStyles<MenuClassType> = {
  rootClass: {},
  wrapper: {
    width: '100%',
    backgroundColor: token.menuItemBackgroundColor,
    transition: `width ${animationDuration} ${transitionFunc}`,
    color: token.menuFontColor,
    display: 'flex',
    flexDirection: 'column',

    '&:not([data-soui-mode=horizontal])': {
      height: '100%',
    }
  },
  wrapperLight: {},
  wrapperDark: {
    backgroundColor: token.menuDarkItemBackgroundColor,
  },
  wrapperCollapse: {
    width: `${collapseWidth}!important`,
    '& $title': {
      paddingLeft: '0',
    },
    '& $expand': {
      opacity: 0,
    },
    '& $titleIcon': {
      width: `${collapseWidth}!important`,
      flexShrink: 0,
      justifyContent: 'center',
    },
    '& $titleContent': {
      alignItems: 'center',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    '&$wrapperLight': {
      '$menuRoot > $itemActive > $itemContent': {
        backgroundColor: token.menuItemBackgroundColor,
      },
    },
  },
  wrapperInTransition: {
    '& $titleContent, & $header': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    '& $expand': {
      opacity: 0,
    },
  },

  popover: {
    '&&': {
      border: 'none',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      borderRadius: '4px',
      backgroundColor: token.menuItemBackgroundColor,
    },
    '&[data-soui-theme=dark]': {
      backgroundColor: token.menuDarkItemBackgroundColor,
    },
    '& $children': {
      borderRadius: '4px',
      padding: `${token.menuPopoverPaddingY} 0`,
      // '& > :first-child > $itemContent': {
      //   borderTopRightRadius: '4px',
      //   borderTopLeftRadius: '4px',
      // },
      // '& > :last-child > $itemContent': {
      //   borderBottomRightRadius: '4px',
      //   borderBottomLeftRadius: '4px',
      // },
    },
  },
  popArrow: {
    '&&&': {
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      width: '6px',
      height: '6px',
    },
  },
  popArrowDark: {
    '&&&': {
      backgroundColor: token.menuDarkItemBackgroundColor,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    },
  },
  scrollbox: {
    flex: 1,
    minWidth: 0,
    minHeight: 0,
    overflow: 'auto',
    // scrollbarWidth: 'thin',
    // '$wrapperLight &': {
    //   scrollbarColor: 'rgba(0, 0, 0, 0.1) transparent',
    //   '&::-moz-scrollbar-thumb:hover': {
    //     backgroundColor: 'rgba(0, 0, 0, 0.2)',
    //   },
    // },
    // '$wrapperDark &': {
    //   scrollbarColor: 'rgba(255, 255, 255, 0.4) transparent',
    // },
    '$wrapperVertical &': {
      overflowX: 'hidden',
    },
    '$wrapperHorizontal &': {
      overflowY: 'hidden',
    },
    '&::-webkit-scrollbar': {
      width: '6px',
      height: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      border: '0px solid transparent',
      backgroundClip: 'content-box',
      borderRadius: '11px',
      '$wrapperLight &': {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
      },
      '$wrapperDark &': {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
        },
      },
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
  wrapperVertical: {},
  wrapperHorizontal: {
    flexDirection: 'row',
  },
  wrapperHasOpen: {},
  wrapperInlineAnimate: {},
  children: {
    padding: '0',
    margin: '0',
    minWidth: '100%',
    whiteSpace: 'nowrap',
    '$childrenShow&': {
      display: 'block',
    },
    '$childrenHidden&': {
      display: 'none',
    },
  },
  childrenShow: {},
  childrenHidden: {},
  childrenUp: {},
  item: {
    listStyle: 'none',
    flexShrink: 0,
  },
  itemActive: {},
  itemDisabled: {},
  itemOpen: {},
  itemClosing: {},
  itemInPath: {},
  itemHasChildren: {},
  childrenHasExpand: {},
  itemContent: {
    lineHeight: token.lineHeightDynamic,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'relative',
    '&  a': {
      transition: 'none',
    },
    '[data-soui-theme=light] &': {
      color: token.menuItemFontColor,
      backgroundColor: token.menuItemBackgroundColor,
      '&:hover': {
        color: token.menuItemHoverFontColor,
        backgroundColor: token.menuItemHoverBackgroundColor,
      },
    },

    // 一级菜单展不展开都是fill-9，一级展开后的子级都是fill-10
    '[data-soui-theme=dark] $root > $item > &': {
      backgroundColor: token.menuDarkItemBackgroundColor,
    },

    '[data-soui-theme=dark] &': {
      color: token.menuDarkFontColor,
      backgroundColor: token.menuDarkItemOpenBackgroundColor,
      '&:hover': {
        color: token.menuDarkItemHoverFontColor,
        backgroundColor: token.menuDarkItemHoverBackgroundColor,
      },
    },
    '[data-soui-theme=dark] $itemOpen > &': {
      color: token.menuDarkItemOpenFontColor,
      backgroundColor: token.menuDarkItemOpenBackgroundColor,
      '& $icon': {
        color: token.menuDarkItemOpenFontColor,
      },
    },

    '$itemInPath > &&': {
      '[data-soui-theme=light] &': {
        color: token.menuItemInpathActiveFontColor,
        '& $icon': {
          color: token.menuItemInpathActiveFontColor,
        },
      },

      '[data-soui-theme=light] $itemDisabled&': {
        color: token.menuItemActiveDisabledFontColor,
        '& $icon': {
          color: token.menuItemActiveDisabledFontColor,
        },
      },

      '[data-soui-theme=dark] &::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '3px',
        backgroundColor: token.menuDarkItemActiveBackgroundColor,
      },
      '[data-soui-theme=dark][data-soui-mode=horizontal] $root &::before':
        {
          left: 0,
          right: 0,
          bottom: 0,
          top: 'auto',
          width: 'auto',
          height: '3px',
        },

      '$wrapperCollapse[data-soui-theme=light] $root > &': {
        color: token.menuItemCollapseActiveFontColor,
        backgroundColor: token.menuItemCollapseActiveBackgroundColor,
        '& $icon': {
          color: token.menuItemCollapseActiveFontColor,
        },
      },
      '$wrapperCollapse[data-soui-theme=dark] $root > &': {
        color: token.menuDarkItemCollapseActiveFontColor,
        backgroundColor: token.menuDarkItemCollapseActiveBackgroundColor,
        '& $icon': {
          color: token.menuDarkItemCollapseActiveFontColor,
        },
      },
      '$wrapperCollapse $root > &::before': {
        display: 'none',
      },

      // '[data-soui-theme=light][data-soui-mode=vertical]:not($wrapperCollapse) &': {
      //   '&::before': {
      //     display: 'block',
      //     content: '""',
      //     position: 'absolute',
      //     right: 0,
      //     top: 0,
      //     bottom: 0,
      //     width: '4px',
      //     borderTopLeftRadius: '4px',
      //     borderBottomLeftRadius: '4px',
      //     backgroundColor: token.menuItemActiveFontColor,
      //   },
      // },
    },
    '$itemActive > &&': {
      '[data-soui-theme=light] &': {
        color: token.menuItemActiveFontColor,
        backgroundColor: token.menuItemActiveBackgroundColor,
        '& $icon': {
          color: token.menuItemActiveFontColor,
        },
      },
      '[data-soui-theme=light] $itemDisabled&': {
        color: token.menuItemActiveDisabledFontColor,
        '& $icon': {
          color: token.menuItemActiveDisabledFontColor,
        },
      },
      '$wrapperCollapse[data-soui-theme=light] $root > &': {
        color: token.menuItemCollapseActiveFontColor,
        backgroundColor: token.menuItemCollapseActiveBackgroundColor,
        '& $icon': {
          color: token.menuItemCollapseActiveFontColor,
        },
      },
      '$wrapperCollapse[data-soui-theme=dark] $root > &': {
        color: token.menuDarkItemCollapseActiveFontColor,
        backgroundColor: token.menuDarkItemCollapseActiveBackgroundColor,
        '& $icon': {
          color: token.menuDarkItemCollapseActiveFontColor,
        },
      },
      '$wrapperCollapse $root > &::before': {
        display: 'none',
      },
      '[data-soui-theme=dark]:not($wrapperCollapse) &': {
        color: token.menuDarkItemActiveFontColor,
        backgroundColor: token.menuDarkItemActiveBackgroundColor,
        '& $icon': {
          color: token.menuDarkItemActiveFontColor,
        },
      },
      '[data-soui-theme=dark]$wrapperCollapse &': {
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '3px',
          backgroundColor: token.menuDarkItemActiveBackgroundColor,
        },
      },

      // '[data-soui-theme=light][data-soui-mode=inline] &,  [data-soui-theme=light][data-soui-mode=horizontal] &':
      //   {
      //     '&::before': {
      //       content: '""',
      //       position: 'absolute',
      //       display: 'block!important',
      //       top: 0,
      //       right: 0,
      //       width: '3px',
      //       height: '100%',
      //       backgroundColor: token.menuItemActiveFontColor,
      //     },
      //   },
      '[data-soui-theme=light][data-soui-mode=horizontal] $root > &::before': {
        content: '""',
        position: 'absolute',
        display: 'block!important',
        backgroundColor: token.menuItemActiveFontColor,
        width: '100%',
        height: '2px',
        top: 'auto',
        bottom: 0,
        left: 0,
        right: 'auto',
      },
    },
    '[data-soui-theme=light] $itemDisabled > &&': {
      cursor: 'not-allowed',
      color: token.menuItemDisabledFontColor,
      backgroundColor: token.menuItemDisabledBackgroundColor,
      '& $icon': {
        color: token.menuItemDisabledFontColor,
      },
    },
    '[data-soui-theme=dark] $itemDisabled > &&': {
      cursor: 'not-allowed',
      color: token.menuDarkItemDisabledFontColor,
      backgroundColor: token.menuDarkItemDisabledBackgroundColor,
      '& $icon': {
        color: token.menuDarkItemDisabledFontColor,
      },
    },
  },
  itemContentFront: {},
  itemContentBack: {},
  header: {
    padding: `${token.menuHeaderPaddingX} ${token.menuHeaderPaddingY}`,
    width: '100%',
    transition: `width ${animationDuration} ${transitionFunc}`,
    color: token.menuFontColor,
    '$wrapperDark &': {
      color: token.menuDarkFontColor,
    },
    '$wrapperCollapse &': {
      paddingLeft: '0',
      paddingRight: '0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    '& + div': {
      borderTop: `1px solid ${token.menuHeaderBorderColor}`,
      '$wrapperDark &': {
        borderTop: `1px solid ${token.menuDarkHeaderBorderColor}`,
      },
    },
  },
  title: {
    cursor: 'inherit',
    '&:hover': {
      color: 'inherit',
    },
    flex: 1,
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    minWidth: 0,
    padding: `${token.menuTitlePaddingY} ${token.menuTitlePaddingX}`,
    '$wrapperInline $childrenHasExpand  $item:not($itemHasChildren)  $itemContentBack > &': {
      paddingRight: `calc(${token.menuIconMarginX} + ${token.menuTitlePaddingX} + ${token.menuExpandSize})`,
    },
    '$wrapperInline $itemHasChildren > $itemContentBack > &': {
      paddingRight: 0,
    },

    '$childrenHasExpand > $item:not($itemHasChildren) > $itemContentBack > &': {
      paddingRight: `calc(${token.menuIconMarginX} + ${token.menuTitlePaddingX} + ${token.menuExpandSize})`,
    },
    '$wrapperHorizontal $childrenHasExpand > $item:not($itemHasChildren) > $itemContentBack > &': {
      paddingRight: token.menuTitlePaddingX,
    },
    '$childrenHasExpand $itemHasChildren > $itemContentBack > &': {
      paddingRight: 0,
    },

    '$childrenHasExpand $itemContentFront > &': {
      paddingLeft: 0,
    },
  },
  titleIcon: {
    '& + $titleContent': {
      paddingLeft: token.menuIconMarginX,
    },
    display: 'inline-flex',
    alignSelf: 'flex-start',
    height: token.lineHeightDynamic,
    alignItems: 'center',
  },
  titleContent: {
    whiteSpace: 'pre-wrap',
    display: 'flex',
    minWidth: 0,
    alignItems: 'center',
    fontWeight: token.menuItemFontWeight,
    // '$wrapperCollapse &': {
    //   transition: `opacity ${animationDuration} ${transitionFunc}`,
    // },
    // opacity: 1,
  },
  expand: {
    alignSelf: 'stretch',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '[data-soui-theme=light] &': {
      color: token.menuIconColor,
    },
    '& > $icon': {
      lineHeight: 1,
      width: token.menuExpandSize,
      height: token.menuExpandSize,
      alignSelf: 'flex-start',
      alignItems: 'center',
      display: 'flex',
      minHeight: `calc(${token.lineHeightDynamic} + ${token.menuTitlePaddingY}*2)`,
      '$wrapperInlineAnimate$wrapper:not($wrapperVertical) &': {
        transition: 'transform 240ms cubic-bezier(.2,0,0,1)',
      },
      '$wrapper:not($wrapperVertical) $itemOpen > $itemContent &': {
        transform: 'rotate(180deg)',
      },
      '$wrapper:not($wrapperVertical) $itemClosing > $itemContent &': {
        transform: 'rotate(0deg)',
      },
    },
  },
  expandVertical: {
    '&[dir=ltr] svg': { transform: 'rotate(-90deg)' },
    '&[dir=rtl] svg': { transform: 'rotate(90deg)' },
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
    paddingRight: token.menuIconMarginX,
    '$itemHasChildren > $itemContent &': {
      visibility: 'visible',
    },
  },
  expandBack: {
    paddingRight: token.menuTitlePaddingX,
    paddingLeft: token.menuIconMarginX,
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
