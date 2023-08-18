import Token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type TabsClass =
  | 'tabs'
  | 'panel'
  | 'tab'
  | 'header'
  | 'vertical'
  | 'verticalLeft'
  | 'verticalRight'
  | 'button'
  | 'line'
  | 'bordered'
  | 'card'
  | 'dash'
  | 'active'
  | 'show'
  | 'disabled';

const tabsStyle: JsStyles<TabsClass> = {
  tabs: {},
  panel: {
    display: 'none',
  },
  tab: {
    display: 'inline-block',
    boxSizing: 'border-box',
    cursor: 'pointer',
    lineHeight: Token.lineHeightDynamic,
    fontSize: Token.tabsTabFontSize,
  },
  header: {
    position: 'relative',

    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 1,
      background: Token.tabsBorderColor,
    },
  },
  vertical: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',

    '& $card': {
      '& $tab': {
        display: 'block',
        borderBottom: `1px solid ${Token.tabsBorderColor}`,
      },
      '& $tab + $tab': {
        marginLeft: 0,
        marginTop: Token.tabsNearlyMargin,
      },
    },
  },
  verticalLeft: {
    '& $card': {
      '&$header': {
        '&:after': {
          top: 0,
          bottom: 0,
          right: 0,
          width: 1,
          left: 'auto',
          height: 'auto',
        },
      },
      '& $tab': {
        borderRadius: `${Token.tabsTabBorderRadius} 0 0 ${Token.tabsTabBorderRadius}`,
        '&$active': {
          '&:after': {
            left: 'auto',
            top: 0,
            bottom: 0,
            right: -1,
            width: 1,
            height: 'auto',
          },
        },
      },
    },
  },
  verticalRight: {
    '& $card': {
      '&$header': {
        '&:after': {
          top: 0,
          bottom: 0,
          right: 'auto',
          width: 1,
          left: 0,
          height: 'auto',
        },
      },
      '& $tab': {
        borderRadius: `0 ${Token.tabsTabBorderRadius} ${Token.tabsTabBorderRadius} 0`,
        '&$active': {
          '&:after': {
            left: -1,
            top: 0,
            bottom: 0,
            right: 'auto',
            width: 1,
            height: 'auto',
          },
        },
      },
    },
  },
  button: {},
  line: {},
  bordered: {},
  card: {
    '& $tab': {
      position: 'relative',
      border: `1px solid ${Token.tabsBorderColor}`,
      borderBottom: '1px solid transparent',
      borderRadius: `${Token.tabsTabBorderRadius} ${Token.tabsTabBorderRadius} 0 0`,
      padding: `${Token.tabsTabPaddingY} ${Token.tabsTabPaddingX}`,
      background: Token.tabsBackgroundColor,
      '&$active': {
        color: Token.tabsActiveFontColor,
        background: Token.tabsActiveBackgroundColor,
        '&:after': {
          content: '""',
          position: 'absolute',
          bottom: -1,
          left: 0,
          right: 0,
          height: 1,
          zIndex: 1,
          background: '#FFF',
        },
      },
      '&$disabled': {
        color: Token.tabsDisabledFontColor,
      },
      '&:not($active):hover': {
        background: Token.tabsHoverBackgroundColor,
      },
      '&:not($active):active': {
        background: Token.tabsClickBackgroundColor,
      },
    },
    '& $tab + $tab': {
      marginLeft: Token.tabsNearlyMargin,
    },
  },
  dash: {},
  active: {},
  disabled: {},
  show: {
    display: 'block',
  },
};

export default tabsStyle;
