import token from '@sheinx/theme';
import { MenuClasses } from '@sheinx/base';
import { JsStyles } from '../jss-style';
export type MenuClassType = keyof MenuClasses;

const animationDuration = '.25s';
const collpaseWidth = token.menuCollpaseWidth;
const transitionFunc = 'ease-out';

const menuStyle: JsStyles<MenuClassType> = {
  wrapper: {
    height: '100%',
    width: '100%',
    backgroundColor: token.menuItemBackgroundColor,
    transition: `width ${animationDuration} ${transitionFunc}`,
    color: token.menuFontColor,
  },
  wrapperLight: {},
  wrapperDark: {
    backgroundColor: token.menuDarkItemBackgroundColor,
  },
  wrapperCollpase: {
    width: `${collpaseWidth}!important`,
    '& $title': {
      paddingLeft: '0',
    },
    '& $expand': {
      opacity: 0,
    },
    '& $titleIcon': {
      width: `${collpaseWidth}!important`,
      flexShrink: 0,
      justifyContent: 'center',
    },
    '& $titleContent': {
      opacity: 0,
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
    '$wrapperVertical &': {
      overflow: 'hidden',
      height: '100%',
    },
    '$wrapperHorizontal &': {
      overflow: 'hidden',
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
  },
  wrapperHorizontal: {
    position: 'relative',
  },
  wrapperHasOpen: {},
  children: {
    padding: '0',
    margin: '0',
    display: 'none',
    minWidth: '100%',
    whiteSpace: 'nowrap',
    '$itemOpen > &, $childrenShow&': {
      display: 'block',
    },
  },
  childrenShow: {},
  childrenUp: {},
  item: {
    listStyle: 'none',
    flexShrink: 0,
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
    '[data-soui-theme=light] &': {
      color: token.menuItemFontColor,
      backgroundColor: token.menuItemBackgroundColor,
      '&:hover': {
        color: token.menuItemHoverFontColor,
        backgroundColor: token.menuItemHoverBackgroundColor,
      },
    },

    '[data-soui-theme=dark] &': {
      color: token.menuDarkFontColor,
      backgroundColor: token.menuDarkItemBackgroundColor,
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
        color: token.menuItemActiveFontColor,
        '& $icon': {
          color: token.menuItemActiveFontColor,
        },
      },

      '[data-soui-theme=dark][data-soui-mode=inline] &::before, [data-soui-theme=dark][data-soui-mode=vertical] &::before':
        {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '3px',
          backgroundColor: token.menuDarkItemActiveBackgroundColor,
        },
      // '[data-soui-theme=light][data-soui-mode=vertical]:not($wrapperCollpase) &': {
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
      '$wrapperCollpase[data-soui-theme=light] $root > &': {
        color: token.menuItemActiveFontColor,
        backgroundColor: token.menuItemBackgroundColor,
        '& $icon': {
          color: token.menuItemActiveFontColor,
        },
      },
      '[data-soui-theme=dark]:not($wrapperCollpase) &': {
        color: token.menuDarkItemActiveFontColor,
        backgroundColor: token.menuDarkItemActiveBackgroundColor,
        '& $icon': {
          color: token.menuDarkItemActiveFontColor,
        },
      },
      '[data-soui-theme=dark]$wrapperCollpase &': {
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
    padding: `${token.menuTitlePaddingY} ${token.menuTitlePaddingX}`,
    width: '100%',
    transition: `width ${animationDuration} ${transitionFunc}`,
    color: token.menuFontColor,
    '$wrapperDark &': {
      color: token.menuDarkFontColor,
    },
    '$wrapperCollpase &': {
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
    lineHeight: 1,
    display: 'inline-flex',
  },
  titleContent: {
    whiteSpace: 'pre-wrap',
    transition: `opacity ${animationDuration} ${transitionFunc}`,
    opacity: 1,
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
      '$wrapper:not($wrapperVertical) $itemOpen > $itemContent &': {
        transform: 'rotate(180deg)',
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
