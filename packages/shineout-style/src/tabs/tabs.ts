import Token from '@sheinx/theme';
import { TabsClasses } from '@sheinx/base';
import { JsStyles } from '../jss-style';

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
        '&[dir=ltr]': {
          borderRadius: `${Token.tabsTabBorderRadius} 0 0 ${Token.tabsTabBorderRadius}`,
        },
        '&[dir=rtl]': {
          borderRadius: `0 ${Token.tabsTabBorderRadius} ${Token.tabsTabBorderRadius} 0`,
        },
      },

      '&[dir=ltr]': {
        '& $hr': { right: 0, height: '100%', width: 1 },
        ...active({ top: 0, bottom: 0, right: -1, width: 1, background: Token.tabsCardCheckedBackgroundColor }),
      },
      '&[dir=rtl]': {
        ...active({ top: 0, bottom: 0, left: -1, width: 1, background: Token.tabsCardCheckedBackgroundColor }),

        '& $hr': { left: 0, height: '100%', width: 1 },
      },
    },
    '&[data-soui-position^="right-"][data-soui-shape="card"]': {
      '& $tab,& $next,& $prev': {
        '&[dir=ltr]': {
          borderRadius: `0 ${Token.tabsTabBorderRadius} ${Token.tabsTabBorderRadius} 0`,
        },
        '&[dir=rtl]': {
          borderRadius: `${Token.tabsTabBorderRadius} 0 0 ${Token.tabsTabBorderRadius}`,
        },
      },
      '&[dir=ltr]': {
        '& $hr': { left: 0, height: '100%', width: 1 },
        ...active({ top: 0, bottom: 0, left: -1, width: 1, background: Token.tabsCardCheckedBackgroundColor }),
      },

      '&[dir=rtl]': {
        '& $hr': { right: 0, height: '100%', width: 1 },
        ...active({ top: 0, bottom: 0, right: -1, width: 1, background: Token.tabsCardCheckedBackgroundColor }),
      },
    },
    '&[data-soui-position^="top-"][data-soui-shape="card"]': {
      '& $tab,& $next,& $prev': {
        borderRadius: `${Token.tabsTabBorderRadius} ${Token.tabsTabBorderRadius} 0 0`,
      },
      '& $hr': { bottom: 0, height: 1, width: '100%' },
      ...active({ bottom: -1, left: 0, right: 0, height: 1, background: Token.tabsCardCheckedBackgroundColor }),
    },
    '&[data-soui-position^="bottom-"][data-soui-shape="card"]': {
      '& $tab,& $next,& $prev': {
        borderRadius: `0 0 ${Token.tabsTabBorderRadius} ${Token.tabsTabBorderRadius}`,
      },
      '& $hr': { top: 0, height: 1, width: '100%' },
      ...active({ top: -1, left: 0, right: 0, height: 1, background: Token.tabsCardCheckedBackgroundColor }),
    },
  };
};

const getLineStyle = () => {
  return {
    '&[data-soui-shape="line"] $tab':  {
      '&:after': {
        display: 'none',
      },
    },
    '&[data-soui-position^="left-"][data-soui-shape="line"]': {
      '&[dir=ltr]': {
        '& $hr': { right: 0, width: 1, height: '100%' },
      },
      '&[dir=rtl]': {
        '& $hr': { left: 0, width: 1, height: '100%' },
      },
    },
    '&[data-soui-position^="right-"][data-soui-shape="line"]': {
      '&[dir=ltr]': {
        '& $hr': { left: 0, width: 1, height: '100%' },
      },
      '&[dir=rtl]': {
        '& $hr': { right: 0, width: 1, height: '100%' },
      },
    },
    '&[data-soui-position^="top-"][data-soui-shape="line"]': {
      '& $hr': { bottom: 0, height: 1, width: '100%' },
    },
    '&[data-soui-position^="bottom-"][data-soui-shape="line"]': {
      '& $hr': { top: 0, height: 1, width: '100%' },
      '& $tab': {
        '&:after': {
          position: 'absolute',
          content: '""',
          top: 0,
          left: 0,
          width: '100%',
          height: 1,
          background: Token.tabsBorderColor,
        },
      },
    },
  };
};

const getDashStyle = () => {
  return {
    '$tab':  {
      '&:after': {
        display: 'none',
      },
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
        '&:before': {
          content: '""',
          position: 'absolute',

          top: 'calc(50% - 7px)',
          width: 1,
          height: 14,
          background: 'transparent',
          transition: 'background .15s ease-out',
        },
        '&[dir=ltr]::before': { left: 0 },
        '&[dir=rtl]::before': { right: 0 },
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
        padding: `${Token.tabsFillPaddingY} 0`,
      },
      '& $tab:first-child': {
        '&[dir=ltr]': {
          borderRadius: `${Token.tabsTabBorderRadius} 0 0 ${Token.tabsTabBorderRadius}`,
        },
        '&[dir=rtl]': {
          borderRadius: `0 ${Token.tabsTabBorderRadius} ${Token.tabsTabBorderRadius} 0`,
        },
        paddingLeft: Token.tabsFillPaddingX,
      },
      '& $tab:last-child': {
        '&[dir=rtl]': {
          borderRadius: `${Token.tabsTabBorderRadius} 0 0 ${Token.tabsTabBorderRadius}`,
        },
        '&[dir=ltr]': {
          borderRadius: `0 ${Token.tabsTabBorderRadius} ${Token.tabsTabBorderRadius} 0`,
        },
        paddingRight: Token.tabsFillPaddingX,
      },
    },

    '&[data-soui-shape="dash"],&[data-soui-shape="fill"]': {
      '&:after': {
        display: 'none',
      },
    },
  };
};

const tabsStyle: JsStyles<keyof TabsClasses> = {
  rootClass: {},
  tabs: {
    // 水平模式
    '&[data-soui-position^="top-"],&[data-soui-position^="bottom-"]': {
      display: 'flex',
      flexDirection: 'column',
      '& $panel': {
        width: '100%',
      },
    },

    // 垂直模式
    '&[data-soui-position^="left-"],&[data-soui-position^="right-"]': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',

      '& $panel': {
        width: 'auto',
        height: '100%',
      },
    },
  },
  panelWrapper: {
    width: 'auto',
    height: 'auto',
    // overflow: 'hidden',
    transition: 'all .2s ease-out',
  },
  panel: {
    display: 'none',
  },
  autoFill: {
    height: '100%',
    '& $panelWrapper': {
      flex: 1,
      minHeight: '0',
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

    '$headerWrapper[data-soui-shape="line"] &': {
      background: Token.tabsLineHrBackgroundColor,
    },
  },
  headerWrapper: {
    display: 'flex',
    position: 'relative',
    '&[data-soui-position^="top-"],&[data-soui-position^="bottom-"]': {
      alignItems: 'center',
      '& $tab + $tab': {
        marginLeft: Token.tabsNearlyMargin,
      },
      '&[data-soui-shape="fill"],&[data-soui-shape="button"]': {
        '& $tab + $tab': {
          margin: 0,
        },
      },
      '& $header': {
        width: '100%',
        alignItems: 'center',
      },
      '& $next': {
        marginLeft: Token.tabsNearlyMargin,
      },
      '& $prev': {
        marginRight: Token.tabsNearlyMargin,
      },
      '& $next,& $prev': {
        lineHeight: 0,
        padding: `${Token.tabsActionHorizontalPaddingY} ${Token.tabsActionHorizontalPaddingX}`,
      },
      '& $headerScroll': { display: 'inline-flex' },
      '&[data-soui-position^="top-left"]': {
        '& $headerScroll': { justifyContent: 'flex-start' },
      },
      '&[data-soui-position^="bottom-left"]': {
        '& $headerScroll': { justifyContent: 'flex-start' },
      },
      '&[data-soui-position^="top-right"]': {
        '& $headerScroll': { justifyContent: 'flex-end' },
      },
      '&[data-soui-position^="bottom-right"]': {
        '& $headerScroll': { justifyContent: 'flex-end' },
      },
    },

    '&[data-soui-position^="left-"],&[data-soui-position^="right-"]': {
      flexDirection: 'column',
      '& $tab': {
        display: 'block',
      },
      '&& $tab + $tab': {
        marginTop: Token.tabsNearlyMargin,
      },
      '& $next,& $prev': {
        // 考虑垂直方向可滚动功能时一并修复zIndex
        // zIndex: 1,
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

    '&[data-soui-shape="card"] $prev, &[data-soui-shape="card"] $next': {
      background: '#FFFFFF',
      alignSelf: 'stretch',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
    '&[data-soui-shape="line"] $prev, &[data-soui-shape="line"] $next': {
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
    '&[data-soui-shape="fill"] $prev,&[data-soui-shape="fill"] $next': {
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
    '&[data-soui-shape="button"] $prev,&[data-soui-shape="button"] $next': {
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
    '&[data-soui-shape="dash"] $prev,&[data-soui-shape="dash"] $next': {
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
    ...getCardStyle(),
    ...getLineStyle(),
    ...getDashStyle(),
    ...getFillStyle(),
    ...getButtonStyle(),
    ...getHeaderStyle(),
  },
  headerScroll: {
    transition: 'all .2s cubic-bezier(.34,.69,.1,1)',
  },
  headerScrollBar: {
    position: 'absolute',
    background: Token.tabsActiveFontColor,
    transition: `left .2s ease-in-out, top .2s ease-in-out, width .2s ease-in-out, height .2s ease-in-out`,
  },
  header: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    '$headerWrapper[data-soui-shape="card"] &': {
      marginTop: `calc(-1 * ${Token.tabsBadgeMargin})`,
      '& $tab': {
        marginTop: Token.tabsBadgeMargin,
        position: 'relative',
        border: `1px solid ${Token.tabsCardBorderColor}`,
        padding: `${Token.tabsCardPaddingY} ${Token.tabsCardPaddingX}`,
        color: Token.tabsCardFontColor,
        fontSize: Token.tabsCardFontSize,
        fontWeight: Token.tabsCardFontWeight,
        background: Token.tabsCardBackgroundColor,

        '&[data-soui-state="active"]': {
          color: Token.tabsCardCheckedFontColor,
          fontSize: Token.tabsCardCheckedFontSize,
          fontWeight: Token.tabsCardCheckedFontWeight,
          background: Token.tabsCardCheckedBackgroundColor,
        },

        '&[data-soui-state="disabled"]': {
          color: Token.tabsCardDisabledFontColor,
          cursor: 'not-allowed',
        },

        '&:not([data-soui-state="active"]):not([data-soui-state="disabled"]):hover': {
          background: Token.tabsCardHoverBackgroundColor,
        },
        '&:not([data-soui-state="active"]):not([data-soui-state="disabled"]):active': {
          background: Token.tabsCardActiveBackgroundColor,
        },
      },
    },
    '$headerWrapper[data-soui-shape="line"] &': {
      '& $tab': {
        position: 'relative',
        padding: `${Token.tabsLinePaddingY} ${Token.tabsLinePaddingX}`,
        color: Token.tabsLineFontColor,
        fontSize: Token.tabsLineFontSize,
        fontWeight: Token.tabsLineFontWeight,
        background: Token.tabsLineBackgroundColor,
        '&[data-soui-state="active"]': {
          color: Token.tabsLineCheckedFontColor,
          fontSize: Token.tabsLineCheckedFontSize,
          background: Token.tabsLineCheckedBackgroundColor,
          fontWeight: Token.tabsLineCheckedFontWeight,
        },

        '&[data-soui-state="disabled"]': {
          color: Token.tabsLineDisabledFontColor,
          cursor: 'not-allowed',
        },

        '&:after': {
          position: 'absolute',
          content: '""',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 1,
          background: Token.tabsLineHrBackgroundColor,
        },

        '[data-soui-position^="left-"] &': {
          '&:after': {
            width: 1,
            right: 0,
            left: 'auto',
            height: '100%',
            background: Token.tabsLineHrBackgroundColor,
          },
        },
        '[data-soui-position^="right-"] &': {
          '&:after': {
            width: 1,
            height: '100%',
            background: Token.tabsLineHrBackgroundColor,
          },
        },

        '&:not([data-soui-state="active"]):not([data-soui-state="disabled"]):hover $lineInner': {
          background: Token.tabsLineHoverBackgroundColor,
        },
        '&:not([data-soui-state="active"]):not([data-soui-state="disabled"]):active $lineInner': {
          background: Token.tabsLineActiveBackgroundColor,
        },
      },
    },
    '$headerWrapper[data-soui-shape="dash"] &': {
      '& $tab': {
        padding: `${Token.tabsLinePaddingY} ${Token.tabsLinePaddingX}`,
        color: Token.tabsLineFontColor,
        fontSize: Token.tabsLineFontSize,
        fontWeight: Token.tabsLineFontWeight,
        background: Token.tabsLineBackgroundColor,
        '&[data-soui-state="active"]': {
          color: Token.tabsLineCheckedFontColor,
          fontSize: Token.tabsLineCheckedFontSize,
          background: Token.tabsLineCheckedBackgroundColor,
          fontWeight: Token.tabsLineCheckedFontWeight,
          '&:after': {
            background: Token.tabsLineAfterBackgroundColor,
          },
        },

        '&:not([data-soui-state="active"]):not([data-soui-state="disabled"]):hover $lineInner': {
          background: Token.tabsLineHoverBackgroundColor,
        },
        '&:not([data-soui-state="active"]):not([data-soui-state="disabled"]):active  $lineInner': {
          background: Token.tabsLineActiveBackgroundColor,
        },

        '&[data-soui-state="disabled"]': {
          color: Token.tabsLineDisabledFontColor,
          cursor: 'not-allowed',
        },
      },
    },
    '$headerWrapper[data-soui-shape="fill"] &': {
      '& $tab': {
        color: Token.tabsFillFontColor,
        fontSize: Token.tabsFillFontSize,
        fontWeight: Token.tabsFillFontWeight,
        background: Token.tabsFillBackgroundColor,
        '&[data-soui-state="active"]': {
          // fontSize: Token.tabsFillCheckedFontSize,
          '& $fillInner': {
            color: Token.tabsFillCheckedFontColor,
            fontWeight: Token.tabsFillCheckedFontWeight,
            background: Token.tabsFillCheckedBackgroundColor,
          },
        },

        '&[data-soui-state="disabled"]': {
          color: Token.tabsFillDisabledFontColor,
          cursor: 'not-allowed',
        },

        '&:not([data-soui-state="active"]):not([data-soui-state="disabled"]):hover $fillInner': {
          background: Token.tabsFillHoverBackgroundColor,
        },
        '&:not([data-soui-state="active"]):not([data-soui-state="disabled"]):active $fillInner': {
          background: Token.tabsFillActiveBackgroundColor,
        },
      },
    },
    '$headerWrapper[data-soui-shape="button"] &': {
      '& $tab': {
        '&[data-soui-state="disabled"]': {
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
    padding: `${Token.tabsLineInnerPaddingY} ${Token.tabsLineInnerPaddingX}`,
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
    color: Token.tabsArrowFontColor,
    lineHeight: Token.lineHeightDynamic,
    '&[dir=rtl] svg': {
      transform: 'rotate(180deg)',
    },
  },
  next: {
    textAlign: 'center',
    color: Token.tabsArrowFontColor,
    lineHeight: Token.lineHeightDynamic,
    '&[dir=rtl] svg': {
      transform: 'rotate(180deg)',
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
    position: 'relative',
    color: Token.tabsArrowFontColor,
    '& svg': {
      width: 14,
      textAlign: 'center',
      transform: 'rotate(-90deg)',
      transition: 'transform .2s',
    },
    // after
    '&:after': {
      position: 'absolute',
      content: '""',
      left: 3,
      top: 3,
      width: 22,
      height: 22,
      background: 'transparent',
      borderRadius: '50%',
      zIndex: -1,
    },
    '&:hover': {
      '&:after': {
        background: Token.tabsHoverBackgroundColor,
      },
    },
  },
  collapsed: {
    '& $collapsible': {
      '& svg': {
        transform: 'rotate(-180deg)',
      },
    },
  },
  sticky: {},
};

export default tabsStyle;
