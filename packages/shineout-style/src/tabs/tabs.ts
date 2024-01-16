import Token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type TabsClass =
  | 'tabs'
  | 'panelWrapper'
  | 'panel'
  | 'tab'
  | 'header'
  | 'hr'
  | 'cardHr'
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
  | 'extra'
  | 'collapsible'
  | 'collapsed'
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
      '& $hr': { right: 0, width: 1, height: '100%' },
      ...active({ top: 0, bottom: 0, right: -1, width: 1, background: '#FFFFFF' }),
    },
    '&[data-soui-position^="right-"][data-soui-shape="card"]': {
      '& $tab,& $next,& $prev': {
        borderRadius: `0 ${Token.tabsTabBorderRadius} ${Token.tabsTabBorderRadius} 0`,
      },
      '& $hr': { left: 0, width: 1, height: '100%' },
      ...active({ top: 0, bottom: 0, left: -1, width: 1, background: '#FFFFFF' }),
    },
    '&[data-soui-position^="top-"][data-soui-shape="card"]': {
      '& $tab,& $next,& $prev': {
        borderRadius: `${Token.tabsTabBorderRadius} ${Token.tabsTabBorderRadius} 0 0`,
      },
      '& $hr': { bottom: 0, height: 1, width: '100%' },
      ...active({ bottom: -1, left: 0, right: 0, height: 1, background: '#FFFFFF' }),
    },
    '&[data-soui-position^="bottom-"][data-soui-shape="card"]': {
      '& $tab,& $next,& $prev': {
        borderRadius: `0 0 ${Token.tabsTabBorderRadius} ${Token.tabsTabBorderRadius}`,
      },
      '& $hr': { top: 0, height: 1, width: '100%' },
      ...active({ top: -1, left: 0, right: 0, height: 1, background: '#FFFFFF' }),
    },
  };
};

const getLineStyle = () => {
  return {
    '&[data-soui-position^="left-"][data-soui-shape="line"]': {
      '& $hr': { right: 0, width: 1, height: '100%' },
      ...active({ top: 0, bottom: 0, right: 0, width: 2 }),
    },
    '&[data-soui-position^="right-"][data-soui-shape="line"]': {
      '& $hr': { left: 0, width: 1, height: '100%' },
      ...active({ top: 0, bottom: 0, left: 0, width: 2 }),
    },
    '&[data-soui-position^="top-"][data-soui-shape="line"]': {
      '& $hr': { bottom: 0, height: 1, width: '100%' },
      ...active({ bottom: 0, left: 0, right: 0, height: 2 }),
    },
    '&[data-soui-position^="bottom-"][data-soui-shape="line"]': {
      '& $hr': { top: 0, height: 1, width: '100%' },
      ...active({ top: 0, left: 0, right: 0, height: 2 }),
    },
  };
};

const getDashStyle = () => {
  return {
    '&[data-soui-position^="left-"][data-soui-shape="dash"]': {
      ...active({ top: `calc(50% - 12px)`, width: 2, height: 24, right: 0 }),
    },
    '&[data-soui-position^="right-"][data-soui-shape="dash"]': {
      ...active({ top: `calc(50% - 12px)`, width: 2, height: 24, left: 0 }),
    },
    '&[data-soui-position^="top-"][data-soui-shape="dash"]': {
      ...active({ bottom: 0, left: `calc(50% - 12px)`, width: 24, height: 2 }),
    },
    '&[data-soui-position^="bottom-"][data-soui-shape="dash"]': {
      ...active({ top: 0, left: `calc(50% - 12px)`, width: 24, height: 2 }),
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

        '&:not([data-soui-state="active"]):not([data-soui-state="disabled"]):hover $fillInner': {
          // background: Token.tabsHoverBackgroundColor,
          background: Token.tabsExtraFillHoverBackgroundColor,
        },
        '&:not([data-soui-state="active"]):not([data-soui-state="disabled"]):active $fillInner': {
          background: Token.tabsClickBackgroundColor,
        },

        '&:before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 'calc(50% - 7px)',
          width: 1,
          height: 14,
          background: 'transparent',
          transition: 'background .15s ease-out',
        },
      },
      '& $tab:not([data-soui-state="active"]):not(:hover) + $tab:not([data-soui-state="active"]):not(:hover)':
        {
          '&:before': {
            background: Token.tabsSplitBorderColor,
          },
        },
    },
  };
};

const getButtonStyle = () => {
  return {
    '&[data-soui-shape="button"]': {},
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
        // padding: `${Token.tabsFillPaddingY} ${Token.tabsFillPaddingX}`,
        padding: `${Token.tabsFillPaddingY} 0`,
      },
      '& $tab:first-child': {
        borderRadius: `${Token.tabsTabBorderRadius} 0 0 ${Token.tabsTabBorderRadius}`,
        paddingLeft: Token.tabsFillPaddingX,
      },
      '& $tab:last-child': {
        borderRadius: `0 ${Token.tabsTabBorderRadius} ${Token.tabsTabBorderRadius} 0`,
        paddingRight: Token.tabsFillPaddingX,
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
      '&[data-soui-shape="fill"],&[data-soui-shape="button"]': {
        '& $tab + $tab': {
          margin: 0,
        },
      },
      '& $headerWrapper': {
        alignItems: 'center',
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
      },
      '& $panel': {
        width: 'auto',
        height: '100%',
      },
    },

    '&[data-soui-position^="bottom-right"],&[data-soui-position^="top-right"]': {
      '& $header': { display: 'block', textAlign: 'right' },
      '& $headerScroll': { display: 'inline-block' },
    },
    '&[data-soui-position="left-top"],&[data-soui-position="right-top"]': {
      '& $header': { alignItems: 'flex-start' },
    },
    '&[data-soui-position="left-bottom"],&[data-soui-position="right-bottom"]': {
      '& $header': { alignItems: 'flex-start' },
    },
    ...getCardStyle(),
    ...getLineStyle(),
    ...getDashStyle(),
    ...getFillStyle(),
    ...getButtonStyle(),
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
    height: '100%',
    '& $panelWrapper': {
      flex: 1,
    },
    '& $panel': {
      overflow: 'auto',
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

    '&[data-soui-state="active"]': {
      '&:after': {
        background: Token.tabsActiveFontColor,
      },
    },
  },
  hr: {
    position: 'absolute',
    background: Token.tabsBorderColor,
  },
  cardHr: {
    // aflter
    '&:after': {
      position: 'absolute',
      content: '""',
      bottom: 0,
      left: 0,
      width: '100%',
      height: 1,
      zIndex: -1,
      background: Token.tabsBorderColor,
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
    // fill 同 line
    '& $prev[data-soui-shape="fill"],$next[data-soui-shape="fill"]': {
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
    // button 同 line
    '& $prev[data-soui-shape="button"],$next[data-soui-shape="button"]': {
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
          fontWeight: 'bold',
        },

        '&[data-soui-state="disabled"]': {
          color: Token.tabsDisabledFontColor,
          cursor: 'not-allowed',
        },

        '&:not([data-soui-state="active"]):not([data-soui-state="disabled"]):hover': {
          background: Token.tabsHoverBackgroundColor,
        },
        '&:not([data-soui-state="active"]):not([data-soui-state="disabled"]):active': {
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
          fontWeight: 'bold',
        },

        '&[data-soui-state="disabled"]': {
          color: Token.tabsDisabledFontColor,
          cursor: 'not-allowed',
        },

        '&:not([data-soui-state="active"]):not([data-soui-state="disabled"]):hover $lineInner': {
          background: Token.tabsHoverBackgroundColor,
        },
        '&:not([data-soui-state="active"]):not([data-soui-state="disabled"]):active $lineInner': {
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
          fontWeight: 'bold',
        },

        '&:not([data-soui-state="active"]):not([data-soui-state="disabled"]):hover $lineInner': {
          background: Token.tabsHoverBackgroundColor,
        },
        '&:not([data-soui-state="active"]):not([data-soui-state="disabled"]):active  $lineInner': {
          background: Token.tabsClickBackgroundColor,
        },
      },
    },
    ['&[data-soui-shape="fill"]']: {
      '& $tab': {
        '&[data-soui-state="active"]': {
          fontWeight: 'bold',
        },

        '&[data-soui-state="disabled"]': {
          color: Token.tabsDisabledFontColor,
          cursor: 'not-allowed',
        },
      },
    },
  },
  button: {},
  line: {},
  lineInner: {
    // transition: 'all .2s',
    borderRadius: Token.tabsTabBorderRadius,
    padding: `${Token.tabsLinePaddingY} ${Token.tabsLinePaddingX}`,
  },
  fillInner: {
    // transition: 'all .2s',
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
    lineHeight: Token.lineHeightDynamic,
    '&[data-soui-shape="card"]': {
      marginRight: Token.tabsNearlyMargin,
    },
  },
  next: {
    textAlign: 'center',
    lineHeight: Token.lineHeightDynamic,
    '&[data-soui-shape="card"]': {
      marginLeft: Token.tabsNearlyMargin,
    },
  },
  extra: {},
  collapsible: {
    padding: `${Token.tabsActionHorizontalPaddingY} ${Token.tabsActionHorizontalPaddingX}`,
    marginRight: Token.tabsNearlyMargin,
    cursor: 'pointer',
    borderLeft: `1px solid transparent`,
    borderRight: `1px solid transparent`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      color: Token.tabsActiveFontColor,
    },
    '& svg': {
      width: 14,
      textAlign: 'center',
      transform: 'rotate(-90deg)',
      transition: 'transform .2s',
    },
  },
  collapsed: {
    '& $collapsible': {
      '& svg': {
        transform: 'rotate(-180deg)',
      },
    },
  },
};

export default tabsStyle;
