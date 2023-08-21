import Token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type TabsClass =
  | 'tabs'
  | 'panel'
  | 'tab'
  | 'header'
  | 'button'
  | 'line'
  | 'lineInner'
  | 'fillInner'
  | 'bordered'
  | 'card'
  | 'dash'
  | 'active'
  | 'show'
  | 'disabled';

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
      '& $header': {
        '&:after': options,
      },
    },
  };
};

const getCardStyle = () => {
  return {
    '&[data-soui-position^="left-"][data-soui-shape="card"]': {
      '& $tab': {
        borderRadius: `${Token.tabsTabBorderRadius} 0 0 ${Token.tabsTabBorderRadius}`,
      },
      ...active({ top: 0, bottom: 0, right: -1, width: 1, background: '#FFFFFF' }),
    },
    '&[data-soui-position^="right-"][data-soui-shape="card"]': {
      '& $tab': {
        borderRadius: `0 ${Token.tabsTabBorderRadius} ${Token.tabsTabBorderRadius} 0`,
      },
      ...active({ top: 0, bottom: 0, left: -1, width: 1, background: '#FFFFFF' }),
    },
    '&[data-soui-position^="top-"][data-soui-shape="card"]': {
      '& $tab': {
        borderRadius: `${Token.tabsTabBorderRadius} ${Token.tabsTabBorderRadius} 0 0`,
      },
      ...active({ bottom: -1, left: 0, right: 0, height: 1, background: '#FFFFFF' }),
    },
    '&[data-soui-position^="bottom-"][data-soui-shape="card"]': {
      '& $tab': {
        borderRadius: `0 0 ${Token.tabsTabBorderRadius} ${Token.tabsTabBorderRadius}`,
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
        '& [data-soui-state="active"]': {
          '& $fillInner': {
            background: '#FFFFFF',
          },
        },

        '&:not([data-soui-state="active"]):hover $fillInner': {
          background: Token.tabsHoverBackgroundColor,
        },
        '&:not([data-soui-state="active"]):active $fillInner': {
          background: Token.tabsClickBackgroundColor,
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
      '& $header': {
        '&:after': {
          display: 'none',
        },
      },
    },
  };
};

const tabsStyle: JsStyles<TabsClass> = {
  tabs: {
    '&[data-soui-position^="top-"],&[data-soui-position^="bottom-"]': {
      '& $tab + $tab': {
        marginLeft: Token.tabsNearlyMargin,
      },
      '&[data-soui-shape="fill"]': {
        '& $tab + $tab': {
          margin: 0,
        },
      },
    },

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
    },
    ...getCardStyle(),
    ...getLineStyle(),
    ...getDashStyle(),
    ...getFillStyle(),
    ...getHeaderStyle(),
  },
  panel: {
    display: 'none',
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
  header: {
    position: 'relative',

    '&:after': {
      content: '""',
      position: 'absolute',
      background: Token.tabsBorderColor,
    },

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
        background: '#FFF',

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
  bordered: {},
  card: {},
  dash: {},
  active: {},
  disabled: {},
  show: {
    display: 'block',
  },
};

export default tabsStyle;
