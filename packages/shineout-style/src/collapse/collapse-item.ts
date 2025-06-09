import { JsStyles } from '../jss-style';
import Token from '@sheinx/theme';
import { CollapseItemClasses } from '@sheinx/base';

export type CollapseItemClassType = keyof CollapseItemClasses;

const collapseItemStyle: JsStyles<CollapseItemClassType> = {
  rootClass: {},
  wrapper: {
    boxSizing: 'border-box',
    borderBottom: `${Token.collapseWrapperBorderSize} solid ${Token.collapseHeaderBorderColor}`,
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
    fontSize: Token.collapseHeaderFontSize,
    fontWeight: Token.collapseHeaderFontWeight,
    color: Token.collapseHeaderColor,
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
  activeTransform: {
    '&[dir=rtl] svg': {
      transform: 'rotate(180deg)',
    }
  },
  activeTransformRight: {

  },
  noIcon: {
    '& > $icon': {
      display: 'none',
    },
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'relative',
    color: Token.collapseIconColor,
    lineHeight: Token.lineHeightDynamic,
    zIndex: 0,
    marginRight: Token.collapseHeaderGap,
    '& svg': {
      zIndex: 1,
      width: Token.collapseHeaderIconWidth,
    },
    '&:hover': {
      '&:after': {
        content: '""',
        position: 'absolute',
        top: -4,
        right: 0,
        bottom: 0,
        left: -4,
        width: 22,
        height: 22,
        borderRadius: '50%',
        background: Token.collapseIconHoverBackgroundColor,
      },
    },
    '&:active:hover': {
      '&:after': {
        background: Token.collapseIconActiveBackgroundColor,
      },
    }
  },
  title: {
    flex: 1,
    lineHeight: Token.lineHeightDynamic,
  },
  extra: {
    cursor: 'pointer',
    gap: Token.collapseHeaderExtraGap,
    lineHeight: Token.lineHeightDynamic,
    display: 'flex',
    marginLeft: Token.collapseExtraMargin,
    alignItems: 'center',
  },
  content: {
    overflow: 'hidden',
    fontSize: Token.collapseContentFontSize,
  },
  contentMain: {
    color: Token.collapseContentColor,
    fontWeight: Token.collapseContentFontWeight,
    lineHeight: Token.lineHeightDynamic,
    padding: `${Token.collapseContentPaddingY} ${Token.collapseContentPaddingRight} ${Token.collapseContentPaddingY} ${Token.collapseContentPaddingLeft}`,
    backgroundColor: Token.collapseContentBackgroundColor,
    gap: Token.collapseContentGap,
  },
  disabled: {
    '& $header, $content, $contentMain, $extra, $icon': {
      cursor: 'not-allowed',
      color: Token.collapseDisabledColor,
    },
    '& $icon': {
      '& svg > path': {
        fill: Token.collapseDisabledColor,
      },
      '&:after': {
        display: 'none',
      },
    },
  },
  expanded: {},
  region: {
    cursor: 'pointer',
    '& $icon': {
      '&:after': {
        display: 'none',
      },
    },
  },
};

export default collapseItemStyle;
