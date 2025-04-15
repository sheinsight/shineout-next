import Token from '@sheinx/theme';
import { JsStyles } from '../jss-style';
import { TreeClasses } from '@sheinx/base';

export type TreeClassType = keyof TreeClasses;

const treeStyle: JsStyles<TreeClassType> = {
  rootClass: {},
  tree: {},
  virtual: {},
  notTree: {
    '&$root > $node$leaf': {
      paddingLeft: 0,
    },
    '& $content': {
      marginLeft: 0,
    },
  },
  line: {
    '& $node': {
      '&[dir=ltr]::before': { left: 0 },
      '&[dir=rtl]::before': { right: 0 },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: -6,
        height: 'calc(100% + 6px)',
        width: 1,
        background: Token.treeLineBackgroundColor,
      },
      '&[dir=ltr]::after': { left: 0 },
      '&[dir=rtl]::after': { right: 0 },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 18,
        height: 1,
        width: 16,
        background: Token.treeLineBackgroundColor,
      },
    },

    '& $node:first-child': {},
    '& $node:first-child:last-child': {
      '&::before,&::after': {
        display: 'none',
      },
    },

    '& $node:last-child': {
      '&::before': {
        top: 0,
        height: 18,
      },
    },

    '& $contentWrapper': {},

    '& $iconWrapper': {
      '&[dir=ltr]': { left: 16 },
      '&[dir=rtl]': { right: 16 },
      width: 24,
      '& $icon': {
        // width: 16,
      },
    },
    '& $childnode': {
      marginLeft: 12,
    },
  },
  noline: {
    '& $iconWrapper': {
      '& $icon': {
        transition: 'transform .2s cubic-bezier(.34,.69,.1,1)',
      },
    },

    '& $iconWrapper[data-expanded="false"][data-icon="false"]': {
      '& $icon': {
        '&[dir=ltr]': { transform: 'rotate(-90deg)' },
        '&[dir=rtl]': { transform: 'rotate(90deg)' },
      },
    },
    '& $iconWrapper[data-expanded="true"][data-icon="false"]': {
      '& $icon': {
        transform: 'rotate(0deg)',
      },
    },
    '& $node': {
      paddingLeft: 24,
      '&$leaf': {
        paddingLeft: 24,
      },
    },
    '& > $root': {
      '& > $node': {
        paddingLeft: 24,
      },
    },
  },
  root: {
    // '& > :first-child$node': {
    //   '&::before': {
    //     top: 18,
    //   },
    // },
    // '& > :last-child$node': {
    //   '&::before': {},
    // },
    '& > $node': {
      paddingLeft: 12,
      '&$leaf': {
        paddingLeft: 24,
      },
      '& > $contentWrapper > $iconWrapper': {
        '&[dir=ltr]': { left: 0 },
        '&[dir=rtl]': { right: 0 },
      },
      '&::before': {
        display: 'none',
      },
      '&::after': {
        display: 'none',
      },
    },
  },
  small: {},
  large: {},
  contentWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '5px 0',
  },
  inlineContent: {
    display: 'inline-flex',
  },
  contentDisabled: {
    '& $content[data-active="true"]': {
      background: Token.treeContentDisabledBackgroundColor,
    },
    '& $content:hover:not([data-active="true"])': {
      background: 'none',
      '& $text': {
        color: Token.treeContentDisabledFontColor,
      },
    },
  },
  content: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    marginLeft: 4,

    // 'label&': {
    //   cursor: 'pointer',
    //   userSelect: 'none',
    // },

    // '$iconWrapper + &': {
    //   marginLeft: 4,
    // },

    '$contentDisabled &': {
      '& $text': {
        color: Token.treeContentDisabledFontColor,
      },
    },

    '&[data-active="true"]': {
      '& $text': {
        background: Token.treeContentActiveBackgroundColor,
        borderRadius: Token.treeContentActiveBorderRadius,
        color: Token.treeContentActiveFontColor,
      },
    },
  },
  checkbox: {
    '&[class*="checkbox-wrapper"]': {
      height: 26,
      marginRight: Token.treeCheckboxMarginX,
    },
  },
  text: {
    cursor: 'pointer',
    flex: 1,
    minWidth: 0,
    fontSize: Token.treeFontSize,
    lineHeight: Token.lineHeightDynamic,
    color: Token.treeFontColor,
    fontWeight: Token.treeFontWeight,
    padding: `${Token.treeTextPaddingY} ${Token.treeTextPaddingX}`,
    whiteSpace: 'nowrap',
    borderRadius: Token.treeContentBorderRadius,
    '$content:not([data-active="true"]) &:hover': {
      color: Token.treeContentHoverFontColor,
      background: Token.treeContentHoverBackgroundColor,
    },
  },
  // textDisabled: {
  //   color: Token.treeItemDisabledFontColor,
  // },
  list: {},
  node: {
    position: 'relative',
    paddingLeft: 28,
    '&$leaf': {
      paddingLeft: 40,
      '&::after': {
        width: 12,
      },
    },

    '&[draggable="true"]': {
      cursor: 'pointer',
    }
  },
  leaf: {},
  childnode: {},
  iconWrapper: {
    '&[dir=ltr]': { left: 0 },
    '&[dir=rtl]': { right: 0 },
    position: 'absolute',
    width: 24,
    height: 26,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&[data-expanded="true"][data-icon="false"]': {
      '& $icon': {
        transform: 'rotate(0deg)',
      },
    },
  },
  icon: {
    width: 24,
    height: 24,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    color: Token.treeItemFontColor,
    cursor: 'pointer',
    transition: 'background .2s ease',
    // transform: 'rotate(-90deg)',
    '&:hover': {
      background: Token.treeItemHoverBackgroundColor,
    },
    '&:active': {
      background: Token.treeItemActiveBackgroundColor,
    },

    '& svg': {
      width: 14,
    },
  },
  children: {},
  placement: {
    position: 'relative',
    zIndex: 0,
    width: '100%',
    height: 0,
    '& div': {
      borderBottom: `2px solid ${Token.treeDragBorderColor}`,
      background: Token.treeDragBackgroundColor,
    },
  },
};

export default treeStyle;
