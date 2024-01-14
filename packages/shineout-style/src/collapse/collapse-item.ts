import { JsStyles } from '../jss-style';
import Token from '@sheinx/theme';

export type CollapseItemClass =
  | 'wrapper'
  | 'header'
  | 'active'
  | 'icon'
  | 'noIcon'
  | 'title'
  | 'extra'
  | 'content'
  | 'contentMain'
  | 'disabled'
  | 'activeTransform'
  | 'activeTransformRight'
  | 'expanded'
  | 'borderLess'
  | 'region';

const collapseItemStyle: JsStyles<CollapseItemClass> = {
  wrapper: {
    boxSizing: 'border-box',
    borderBottom: `${Token.collapseWrapperBorderSize} solid ${Token.collapseWrapperBorderColor}`,
    '&:last-child': {
      borderBottom: 0,
    },

    gap: Token.collapseWrapperGap,
    backgroundColor: Token.collapseWrapperBackgroundColor,
    color: Token.collapseWrapperColor,
    height: 'auto',
    width: 'auto',
  },
  borderLess: {
    borderBottom: 'none',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    overflow: 'hidden',
    gap: Token.collapseHeaderGap,
    fontSize: Token.collapseHeaderFontSize,
    fontWeight: Token.collapseHeaderWeight,
    color: Token.collapseHeaderColor,
    lineHeight: Token.collapseHeaderLineHeight,
    padding: `${Token.collapseWrapperPaddingY} ${Token.collapseWrapperPaddingX}`,
  },
  active: {
    '& > header > $title': {
      fontWeight: 500,
    },
    '& > $header $activeTransform': {
      '& svg': {
        transform: 'rotate(90deg)',
      },
    },
    '& > $header $activeTransformRight': {
      '& svg': {
        transform: 'rotate(-90deg)',
      },
    },
  },
  activeTransform: {},
  activeTransformRight: {},
  noIcon: {
    '& > $icon': {
      display: 'none',
    },
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '& svg': {
      width: Token.collapseHeaderIconWidth,
    },
  },
  title: {
    flex: 1,
  },
  extra: {
    cursor: 'pointer',
    gap: Token.collapseHeaderExtraGap,
  },
  content: {
    overflow: 'hidden',
  },
  contentMain: {
    fontSize: Token.collapseContentFontSize,
    color: Token.collapseContentColor,
    fontWeight: Token.collapseContentWeight,
    lineHeight: Token.collapseContentLineHeight,
    padding: `${Token.collapseContentPaddingY} ${Token.collapseContentPaddingRight} ${Token.collapseContentPaddingY} ${Token.collapseContentPaddingLeft}`,
    backgroundColor: Token.collapseContentBackgroundColor,
    gap: Token.collapseContentGap,
  },
  disabled: {
    '& $header, $content, $extra, $icon': {
      cursor: 'not-allowed',
      color: Token.collapseDisabledColor,
    },
  },
  expanded: {},
  region: {
    cursor: 'pointer',
  },
};

export default collapseItemStyle;
