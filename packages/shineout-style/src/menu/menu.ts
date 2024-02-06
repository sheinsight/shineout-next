import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type MenuClasses = {
  wrapper: string;
  wrapperInline: string;
  wrapperVertical: string;
  wrapperHorizontal: string;
  wrapperHasExpand: string;
  wrapperHasOpen: string;
  wrapperLight: string;
  wrapperDark: string;
  root: string;
  children: string;
  childrenUp: string;
  item: string;
  itemActive: string;
  itemDisabled: string;
  itemOpen: string;
  itemInPath: string;
  itemHasChildren: string;
  itemContent: string;
  itemContentFront: string;
  itemContentBack: string;
  title: string;
  expand: string;
  expandFront: string;
  expandBack: string;
  expandHover: string;
  icon: string;
  scrollbar: string;
  scrollbarX: string;
  scrollbarY: string;
  scrollbarDragging: string;
  scrolbarHandler: string;
  scrollbox: string;
};
export type MenuClassType = keyof MenuClasses;

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
  wrapper: {},
  wrapperLight: {},
  wrapperDark: {},
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
      right: '-6px',
      transform: 'translateX(100%)',
      minWidth: 'auto',
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
    position: 'relative',
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
        display: 'none',
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
    '$wrapperLight &': {
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
    '$wrapperVertical &': {
      transform: 'rotate(-90deg)',
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
