import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type CardClasses = {
  wrapper: string;
  wrapperShadow: string;
  wrapperHover: string;
  wrapperSplit: string;
  wrapperCollapsible: string;
  wrapperCollapsed: string;
  wrapperResizable: string;
  wrapperMoveable: string;
  wrapperInAccordion: string;
  header: string;
  headerContent: string;
  headerExtra: string;
  indicator: string;
  indicatorIcon: string;
  body: string;
  footer: string;
  accordion: string;
  resizeX: string;
  resizeY: string;
  resizeXY: string;
  bodyCollapse: string;
  center: string;
  right: string;
};
export type CardClassType = keyof CardClasses;

const cardStyle: JsStyles<CardClassType> = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${token.cardBorderColor}`,
    borderRadius: token.cardBorderRadius,
    fontSize: token.cardFontSize,
    lineHeight: token.lineHeightDynamic,
    color: token.cardFontColor,
    backgroundColor: token.cardBackgroundColor,
    boxSizing: 'border-box',
  },
  wrapperSplit: {},
  wrapperCollapsible: {},
  wrapperCollapsed: {},
  wrapperInAccordion: {
    border: 'none',
    '& + &': {
      borderTop: `1px solid ${token.cardBorderColor}`,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
  },
  wrapperShadow: {
    boxShadow: token.cardShadow,
  },
  wrapperHover: {
    transition: 'box-shadow .2s linear',
    '&:hover': {
      boxShadow: token.cardShadow,
    },
  },
  wrapperResizable: {
    position: 'relative',
  },
  wrapperMoveable: {},
  accordion: {
    border: `1px solid ${token.cardBorderColor}`,
    borderRadius: token.cardBorderRadius,
  },
  header: {
    padding: `${token.cardPaddingY} ${token.cardPaddingX}`,
    '$wrapperMoveable &': {
      cursor: 'move',
    },
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    '$wrapperCollapsible &': {
      cursor: 'pointer',
    },
  },
  headerContent: {
    fontSize: token.cardTitleFontSize,
    lineHeight: token.lineHeightDynamic,
    fontWeight: 'bold',
    flex: 1,
    minWidth: 0,
  },
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
  headerExtra: {},
  indicator: {
    display: 'flex',
    alignItems: 'center',
    lineHeight: 1,
  },
  indicatorIcon: {
    width: token.cardIndicatorSize,
    height: token.cardIndicatorSize,
    marginRight: token.cardHeaderGap,
    transition: 'transform 240ms linear',
    transform: 'rotate(90deg)',
    '$wrapperCollapsed &': {
      transform: 'rotate(0deg)',
    },
  },
  body: {
    '$wrapperSplit $header+&, $wrapperSplit $header+$bodyCollapse>&': {
      borderTop: `1px solid ${token.cardBorderColor}`,
    },
    padding: `${token.cardPaddingY} ${token.cardPaddingX}`,
    flex: 1,
    minHeight: 0,
    minWidth: 0,
    boxSizing: 'border-box',
  },
  bodyCollapse: {},
  footer: {
    '$wrapperSplit $body+&, $wrapperSplit $bodyCollapse+&': {
      borderTop: `1px solid ${token.cardBorderColor}`,
    },
    padding: `${token.cardPaddingY} ${token.cardPaddingX}`,
    boxSizing: 'border-box',
  },
  resizeX: {
    cursor: 'e-resize',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '6px',
    right: '-4px',
    zIndex: 11,
    background: 'transparent',
    touchAction: 'none',
  },
  resizeY: {
    cursor: 's-resize',
    position: 'absolute',
    left: 0,
    right: 0,
    height: '6px',
    bottom: '-4px',
    zIndex: 11,
    background: 'transparent',
    touchAction: 'none',
  },
  resizeXY: {
    cursor: 'se-resize',
    position: 'absolute',
    right: '0',
    bottom: '0',
    width: '10px',
    height: '10px',
    zIndex: 12,
    background: 'transparent',
    touchAction: 'none',
  },
};

export default cardStyle;
