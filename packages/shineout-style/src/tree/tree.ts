import Token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type TreeClasses = {
  tree: string;
  root: string;
  line: string;
  noline: string;
  content: string;
  small: string;
  large: string;
  childnode: string;
  checkbox: string;
  contentWrapper: string;
  inlineContent: string;
  text: string;
  list: string;
  iconWrapper: string;
  icon: string;
  node: string;
  children: string;
  leaf: string;
  placement: string;
  textDisabled: string;
};

export type TreeClassType = keyof TreeClasses;

const treeStyle: JsStyles<TreeClassType> = {
  tree: {},
  line: {
    '& $node': {
      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: -6,
        height: 'calc(100% + 6px)',
        width: 1,
        background: '#ebebeb',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 18,
        left: 0,
        height: 1,
        width: 16,
        background: '#ebebeb',
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
      left: 16,
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
      // left: 12,
    },

    '& $iconWrapper[data-expanded="false"][data-icon="false"]': {
      '& $icon': {
        transform: 'rotate(-90deg)',
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
  },
  root: {
    '& > :first-child$node': {
      '&::before': {
        top: 18,
      },
    },
    '& > :last-child$node': {
      '&::before': {},
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
  content: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: `0 ${Token.treePaddingX}`,
    borderRadius: Token.treeContentBorderRadius,

    '&[data-active="true"]': {
      background: Token.treeContentActiveBackgroundColor,

      '& $text': {
        color: Token.treeContentActiveFontColor,
      },
    },
    '&[data-disabled="true"]': {
      cursor: 'not-allowed',
    },
    '&:hover:not([data-active="true"]):not([data-disabled="true"])': {
      background: Token.treeContentHoverBackgroundColor,
    },
  },
  checkbox: {
    '&[class*="checkbox-wrapper"]': {
      height: 26,
      marginRight: Token.treeCheckboxMarginX,
    },
  },
  text: {
    fontSize: Token.treeFontSize,
    lineHeight: Token.lineHeightDynamic,
    color: Token.treeFontColor,
    paddingTop: Token.treeTextPaddingY,
    paddingBottom: Token.treeTextPaddingY,
  },
  textDisabled: {
    color: Token.treeItemDisabledFontColor,
  },
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
  },
  leaf: {},
  childnode: {},
  iconWrapper: {
    position: 'absolute',
    left: 0,
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
