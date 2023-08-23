import Token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type TabsClass =
  | 'tabs'
  | 'panelWrapper'
  | 'panel'
  | 'tab'
  | 'header'
  | 'hideHeaderLine'
  | 'headerWrapper'
  | 'headerScroll'
  | 'button'
  | 'line'
  | 'lineInner'
  | 'fillInner'
  | 'iconInner'
  | 'bordered'
  | 'card'
  | 'dash'
  | 'active'
  | 'show'
  | 'disabled'
  | 'prev'
  | 'next'
  | 'collapsible'
  | 'autoFill';

interface AfterOptions {
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
  width?: number | string;
  height?: number | string;
  background?: string;
}

const active = (options: AfterOptions) => {
  return {
    '& [data-soui-state="active"]$tab': {
      '&:after': {
        position: 'absolute',
        content: '""',
        zIndex: 1,
        left: 'auto',
        right: 'auto',
        top: 'auto',
        bottom: 'auto',
        height: 'auto',
        width: 'auto',
        ...options,
      },
    },
  };
};

const getHeaderPositionStyle = (
  position: 'top' | 'bottom' | 'left' | 'right',
  options: AfterOptions,
) => {
  return {
    [`&[data-soui-position^="${position}-"]`]: {
      '& $headerWrapper': {
        '&:after': options,
      },
    },
  };
};

const getCardStyle = () => {
  return {
    '&[data-soui-position^="left-"][data-soui-shape="card"]': {
      '& $tab,& $next,& $prev': {
        borderRadius: `${Token.tabsTabBorderRadius} 0 0 ${Token.tabsTabBorderRadius}`,
      },
      '& $next,& $prev': {
        '&:after': {
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
        },
      },
      ...active({ top: 0, bottom: 0, right: -1, width: 1, background: '#FFFFFF' }),
    },
    '&[data-soui-position^="right-"][data-soui-shape="card"]': {
      '& $tab,& $next,& $prev': {
        borderRadius: `0 ${Token.tabsTabBorderRadius} ${Token.tabsTabBorderRadius} 0`,
      },
      ...active({ top: 0, bottom: 0, left: -1, width: 1, background: '#FFFFFF' }),
    },
    '&[data-soui-position^="top-"][data-soui-shape="card"]': {
      '& $tab,& $next,& $prev': {
        borderRadius: `${Token.tabsTabBorderRadius} ${Token.tabsTabBorderRadius} 0 0`,
      },
      '& $next,& $prev': {
        borderBottom: 'none',
        '&:after': {
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
        },
      },
      ...active({ bottom: -1, left: 0, right: 0, height: 1, background: '#FFFFFF' }),
    },
    '&[data-soui-position^="bottom-"][data-soui-shape="card"]': {
      '& $tab,& $next,& $prev': {
        borderRadius: `0 0 ${Token.tabsTabBorderRadius} ${Token.tabsTabBorderRadius}`,
      },
      '& $next,& $prev': {
        borderTop: 'none',
        '&:after': {
          top: 0,
          left: 0,
          right: 0,
          height: 1,
        },
      },
      ...active({ top: -1, left: 0, right: 0, height: 1, background: '#FFFFFF' }),
    },
  };
};

const getLineStyle = () => {
  return {
    '&[data-soui-position^="left-"][data-soui-shape="line"]': {
      ...active({ top: 0, bottom: 0, right: 0, width: 3 }),
    },
    '&[data-soui-position^="right-"][data-soui-shape="line"]': {
      ...active({ top: 0, bottom: 0, left: 0, width: 3 }),
    },
    '&[data-soui-position^="top-"][data-soui-shape="line"]': {
      ...active({ bottom: 0, left: 0, right: 0, height: 3 }),
    },
    '&[data-soui-position^="bottom-"][data-soui-shape="line"]': {
      ...active({ top: 0, left: 0, right: 0, height: 3 }),
    },
  };
};

const getDashStyle = () => {
  return {
    '&[data-soui-position^="left-"][data-soui-shape="dash"]': {
      ...active({ top: `calc(50% - 12px)`, width: 3, height: 24, right: 0 }),
    },
    '&[data-soui-position^="right-"][data-soui-shape="dash"]': {
      ...active({ top: `calc(50% - 12px)`, width: 3, height: 24, left: 0 }),
    },
    '&[data-soui-position^="top-"][data-soui-shape="dash"]': {
      ...active({ bottom: 0, left: `calc(50% - 12px)`, width: 24, height: 3 }),
    },
    '&[data-soui-position^="bottom-"][data-soui-shape="dash"]': {
      ...active({ top: 0, left: `calc(50% - 12px)`, width: 24, height: 3 }),
    },
  };
};

const getFillStyle = () => {
  return {
    '&[data-soui-shape="fill"]': {
      '& $tab': {
        '&[data-soui-state="active"]': {
          '& $fillInner': {
            background: '#FFFFFF',
            color: Token.tabsActiveFontColor,
          },
        },

        '&:not([data-soui-state="active"]):hover $fillInner': {
          background: Token.tabsHoverBackgroundColor,
        },
        '&:not([data-soui-state="active"]):active $fillInner': {
          background: Token.tabsClickBackgroundColor,
        },
      },
      '& $tab:not([data-soui-state="active"]):not(:hover) + $tab:not([data-soui-state="active"]):not(:hover)':
        {
          '&:before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 'calc(50% - 7px)',
            width: 1,
            height: 14,
            background: Token.tabsSplitBorderColor,
          },
        },
    },
  };
};

const getHeaderStyle = () => {
  return {
    ...getHeaderPositionStyle('top', { top: 'auto', bottom: 0, right: 0, left: 0, height: 1 }),
    ...getHeaderPositionStyle('bottom', { top: 0, bottom: 'auto', right: 0, left: 0, height: 1 }),
    ...getHeaderPositionStyle('left', { top: 0, bottom: 0, right: 0, left: 'auto', width: 1 }),
    ...getHeaderPositionStyle('right', { top: 0, bottom: 0, right: 'auto', left: 0, width: 1 }),

    '&[data-soui-shape="fill"] $header': {
      '& $tab': {
        background: Token.tabsBackgroundColor,
        padding: `${Token.tabsFillPaddingY} ${Token.tabsFillPaddingX}`,
      },
      '& $tab:first-child': {
        borderRadius: `${Token.tabsTabBorderRadius} 0 0 ${Token.tabsTabBorderRadius}`,
      },
      '& $tab:last-child': {
        borderRadius: `0 ${Token.tabsTabBorderRadius} ${Token.tabsTabBorderRadius} 0`,
      },
    },

    '&[data-soui-shape="dash"],&[data-soui-shape="fill"]': {
      '& $headerWrapper': {
        '&:after': {
          display: 'none',
        },
      },
    },
  };
};

const tabsStyle: JsStyles<TabsClass> = {
  tabs: {
    // 水平模式
    '&[data-soui-position^="top-"],&[data-soui-position^="bottom-"]': {
      display: 'flex',
      flexDirection: 'column',
      '& $tab + $tab': {
        marginLeft: Token.tabsNearlyMargin,
      },
      '&[data-soui-shape="fill"]': {
        '& $tab + $tab': {
          margin: 0,
        },
      },
      '& $header': {
        width: '100%',
        alignItems: 'center',
      },
      '& $next,& $prev': {
        padding: `${Token.tabsActionHorizontalPaddingY} ${Token.tabsActionHorizontalPaddingX}`,
      },

      '& $panel': {
        width: '100%',
      },
    },

    // 垂直模式
    '&[data-soui-position^="left-"],&[data-soui-position^="right-"]': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      '& $tab': {
        display: 'block',
      },
      '& $tab + $tab': {
        marginTop: Token.tabsNearlyMargin,
      },
      '& $headerWrapper': {
        flexDirection: 'column',
      },
      '& $next,& $prev': {
        padding: `${Token.tabsActionVerticalPaddingY} ${Token.tabsActionVerticalPaddingX}`,
        '&:after': {
          display: 'none',
        },
      },
      '& $next': {
        marginLeft: 0,
        marginTop: Token.tabsNearlyMargin,

        '& svg': {
          transform: 'rotate(90deg)',
        },
      },
      '& $prev': {
        marginRight: 0,
        marginBottom: Token.tabsNearlyMargin,
        '& svg': {
          transform: 'rotate(90deg)',
        },
      },
      '& $header': {
        height: '100%',
        alignItems: 'flex-start',
      },
      '& $panel': {
        width: 'auto',
        height: '100%',
      },
    },
    ...getCardStyle(),
    ...getLineStyle(),
    ...getDashStyle(),
    ...getFillStyle(),
    ...getHeaderStyle(),
  },
  panelWrapper: {
    width: 'auto',
    height: 'auto',
    overflow: 'hidden',
    transition: 'all .2s ease-out',
  },
  panel: {
    display: 'none',
  },
  autoFill: {
    '& $panelWrapper': {
      flex: 1,
    },
    '& $panel': {
      height: '100%',
    },
  },
  tab: {
    position: 'relative',
    display: 'inline-block',
    boxSizing: 'border-box',
    cursor: 'pointer',
    lineHeight: Token.lineHeightDynamic,
    fontSize: Token.tabsTabFontSize,
    transition: 'all .2s',

    '&[data-soui-state="active"]': {
      '&:after': {
        background: Token.tabsActiveFontColor,
      },
    },
  },
  headerWrapper: {
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',

    '& $prev[data-soui-shape="card"],$next[data-soui-shape="card"]': {
      background: '#FFFFFF',
      border: `1px solid ${Token.tabsBorderColor}`,

      '&[data-soui-state="disabled"]': {
        background: Token.tabsBackgroundColor,
      },
      '&:not([data-soui-state="disabled"]):hover': {
        background: Token.tabsHoverBackgroundColor,
      },
      '&:not([data-soui-state="disabled"]):hover:active': {
        background: Token.tabsClickBackgroundColor,
      },
      '&:after': {
        content: '""',
        position: 'absolute',
        background: Token.tabsBorderColor,
      },
    },
    '& $prev[data-soui-shape="line"],$next[data-soui-shape="line"]': {
      '&:not([data-soui-state="disabled"]):hover': {
        '& $iconInner': {
          background: Token.tabsHoverBackgroundColor,
        },
      },
      '&:not([data-soui-state="disabled"]):hover:active': {
        '& $iconInner': {
          background: Token.tabsClickBackgroundColor,
        },
      },
    },
    '& $prev[data-soui-shape="dash"],$next[data-soui-shape="dash"]': {
      '&:not([data-soui-state="disabled"]):hover': {
        '& $iconInner': {
          background: Token.tabsHoverBackgroundColor,
        },
      },
      '&:not([data-soui-state="disabled"]):hover:active': {
        '& $iconInner': {
          background: Token.tabsClickBackgroundColor,
        },
      },
    },

    '& $prev,& $next': {
      cursor: 'pointer',
      position: 'relative',
      boxSizing: 'border-box',

      '&[data-soui-state="disabled"]': {
        cursor: 'not-allowed',
        '& svg': {
          fill: Token.tabsDisabledFontColor,
        },
      },
      '& svg': {
        width: 14,
      },
    },

    '&:after': {
      content: '""',
      position: 'absolute',
      background: Token.tabsBorderColor,
      zIndex: -1,
    },
  },
  headerScroll: {
    transition: 'all .15s ease-out',
  },
  header: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    whiteSpace: 'nowrap',
    overflow: 'hidden',

    '&[data-soui-shape="card"]': {
      '& $tab': {
        position: 'relative',
        border: `1px solid ${Token.tabsBorderColor}`,
        padding: `${Token.tabsTabPaddingY} ${Token.tabsTabPaddingX}`,
        background: Token.tabsBackgroundColor,

        '&[data-soui-state="active"]': {
          color: Token.tabsActiveFontColor,
          background: Token.tabsActiveBackgroundColor,
        },
        '&$disabled': {
          color: Token.tabsDisabledFontColor,
        },
        '&:not([data-soui-state="active"]):hover': {
          background: Token.tabsHoverBackgroundColor,
        },
        '&:not([data-soui-state="active"]):active': {
          background: Token.tabsClickBackgroundColor,
        },
      },
    },
    '&[data-soui-shape="line"]': {
      '& $tab': {
        position: 'relative',
        padding: `${Token.tabsLinePaddingY} ${Token.tabsLinePaddingX}`,
        // background: '#FFF',

        '&[data-soui-state="active"]': {
          color: Token.tabsActiveFontColor,
          background: Token.tabsActiveBackgroundColor,
        },

        '&:not([data-soui-state="active"]):hover $lineInner': {
          background: Token.tabsHoverBackgroundColor,
        },
        '&:not([data-soui-state="active"]):active $lineInner': {
          background: Token.tabsClickBackgroundColor,
        },
      },
    },
    ['&[data-soui-shape="dash"]']: {
      '& $tab': {
        padding: `${Token.tabsLinePaddingY} ${Token.tabsLinePaddingX}`,
        '&[data-soui-state="active"]': {
          color: Token.tabsActiveFontColor,
          background: Token.tabsActiveBackgroundColor,
        },

        '&:not([data-soui-state="active"]):hover $lineInner': {
          background: Token.tabsHoverBackgroundColor,
        },
        '&:not([data-soui-state="active"]):active  $lineInner': {
          background: Token.tabsClickBackgroundColor,
        },
      },
    },
  },
  hideHeaderLine: {
    '&:after': {
      display: 'none',
    },
  },
  button: {},
  line: {},
  lineInner: {
    transition: 'all .2s',
    borderRadius: Token.tabsTabBorderRadius,
    padding: `${Token.tabsLinePaddingY} ${Token.tabsLinePaddingX}`,
  },
  fillInner: {
    transition: 'all .2s',
    borderRadius: Token.tabsTabBorderRadius,
    padding: `${Token.tabsFillInnerPaddingY} ${Token.tabsFillInnerPaddingX}`,
  },
  iconInner: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    width: 22,
    height: 22,
  },
  bordered: {},
  card: {},
  dash: {},
  active: {},
  disabled: {},
  show: {
    display: 'block',
  },

  prev: {
    textAlign: 'center',
    '&[data-soui-shape="card"]': {
      marginRight: Token.tabsNearlyMargin,
    },
  },
  next: {
    textAlign: 'center',
    '&[data-soui-shape="card"]': {
      marginLeft: Token.tabsNearlyMargin,
    },
  },
  collapsible: {
    padding: `${Token.tabsActionHorizontalPaddingY} ${Token.tabsActionHorizontalPaddingX}`,
    marginRight: Token.tabsNearlyMargin,
    cursor: 'pointer',
    borderLeft: `1px solid transparent`,
    borderRight: `1px solid transparent`,
    '&:hover': {
      color: Token.tabsActiveFontColor,
    },
    '& svg': {
      width: 14,
      textAlign: 'center',
      transform: 'rotate(-90deg)',
    },
  },
};

export default tabsStyle;
