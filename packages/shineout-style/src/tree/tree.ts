import Token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type TreeClass =
  | 'tree'
  | 'line'
  | 'noline'
  | 'small'
  | 'large'
  | 'root'
  | 'contentWrapper'
  | 'inlineContent'
  | 'content'
  | 'checkbox'
  | 'text'
  | 'list'
  | 'node'
  | 'leaf'
  | 'childnode'
  | 'iconWrapper'
  | 'icon'
  | 'children'
  | 'placement';

const treeStyle: JsStyles<TreeClass> = {
  tree: {},
  line: {
    '& $node': {
      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        height: '100%',
        width: 1,
        background: '#ebebeb',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 18,
        left: 0,
        height: 1,
        width: 12,
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
    lineHeight: '26px',
    padding: `0 ${Token.treePaddingX}`,
    borderRadius: Token.treeContentBorderRadius,
    '&:hover': {
      background: Token.treeContentHoverBackgroundColor,
    },
  },
  checkbox: {
    '&[class*="checkbox-wrapper"]': {
      height: 26,
      marginRight: 0,
    },
  },
  text: {
    fontSize: Token.treeFontSize,
    color: Token.treeFontColor,
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
    transition: 'all 0.2s ease',
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
