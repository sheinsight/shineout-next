import Token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type TreeClass =
  | 'tree'
  | 'line'
  | 'small'
  | 'large'
  | 'root'
  | 'contentWrapper'
  | 'content'
  | 'text'
  | 'list'
  | 'node'
  | 'iconWrapper'
  | 'icon'
  | 'children';

const treeStyle: JsStyles<TreeClass> = {
  tree: {},
  line: {
    '& $node': {
      '&::before': {
        content: '""',
        position: 'absolute',
        // top: -18,
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

    '& $node:first-child': {
      '&::before': {},
    },

    '& $node:last-child': {
      '&::before': {
        top: 0,
        height: 'calc(100% - 18px)',
      },
    },
  },
  root: {},
  small: {},
  large: {},
  contentWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '5px 0',
  },
  content: {
    flex: 1,
    cursor: 'pointer',
    lineHeight: '26px',
    padding: `0 ${Token.treePaddingX}`,
    borderRadius: Token.treeContentBorderRadius,
    '&:hover': {
      background: Token.treeContentHoverBackgroundColor,
    },
  },
  text: {
    fontSize: Token.treeFontSize,
    color: Token.treeFontColor,
  },
  list: {},
  node: {
    position: 'relative',
    paddingLeft: 24,
  },
  iconWrapper: {
    // opacity: 0,
    position: 'absolute',
    left: 0,
    display: 'inline-flex',
    alignItems: 'center',
    '&[data-expanded^="true"]': {
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
    transform: 'rotate(-90deg)',
    transition: 'all 0.2s ease',
    color: Token.treeItemFontColor,
    cursor: 'pointer',
    // hover
    '&:hover': {
      background: Token.treeItemHoverBackgroundColor,
    },
    // active
    '&:active': {
      background: Token.treeItemActiveBackgroundColor,
    },

    '& svg': {
      width: 14,
    },
  },
  children: {},
};

export default treeStyle;
