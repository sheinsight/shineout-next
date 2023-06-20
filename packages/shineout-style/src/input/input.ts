import border from './input-border';
import cssVars from '../cssvar';

import { JsStyles } from '../jss-style';

const inputBorder = border('wrapper');
const groupBorder = border('group');
const { wrapper, ...resetWrapper } = inputBorder;

const { group, groupSmall, groupLarge, ...resetGroup } = groupBorder;

type InputClass =
  | 'wrapper'
  | 'wrapperSmall'
  | 'wrapperLarge'
  | 'wrapperFocus'
  | 'wrapperError'
  | 'wrapperDisabled'
  | 'wrapperUnderline'
  | 'wrapperInGroup'
  | 'wrapperNoBorder'
  | 'paddingBox'
  | 'clearWrapper'
  | 'input'
  | 'clear'
  | 'group'
  | 'groupSmall'
  | 'groupLarge'
  | 'groupFocus'
  | 'groupError'
  | 'groupDisabled'
  | 'groupUnderline'
  | 'wrapperNumber'
  | 'numberStep'
  | 'info'
  | 'infoError';

const groupSpace = (gap: string) => ({
  '& > i:first-child, & > span:first-child': {
    paddingLeft: gap,
  },
  '& > i:last-child, & > span:last-child': {
    paddingRight: gap,
  },
  '& > b': {
    padding: `0 ${gap}`,
    display: 'flex',
    alignItems: 'center',
    border: `1px solid ${cssVars.inputBorderColor}`,
    borderWidth: '0 1px',
    background: cssVars.grey200,
    fontWeight: 'normal',
    '&:first-child': {
      borderTopLeftRadius: cssVars.inputBorderRadius,
      borderBottomLeftRadius: cssVars.inputBorderRadius,
      borderLeftColor: 'inherit',
      marginLeft: '-1px',
    },
    '&:last-child': {
      borderTopRightRadius: cssVars.inputBorderRadius,
      borderBottomRightRadius: cssVars.inputBorderRadius,
      borderRightColor: 'inherit',
      marginRight: '-1px',
    },
  },
});

const input: JsStyles<InputClass> = {
  ...inputBorder,
  wrapper: {
    display: 'inline-flex',
    width: '100%',
    boxSizing: 'border-box',
    alignItems: 'center',
    position: 'relative',
    ...wrapper,
  },
  ...resetWrapper,
  wrapperNumber: {
    paddingRight: 0,
  },
  input: {
    width: '100%',
    background: 'transparent',
    border: '0',
    margin: '0',
    lineHeight: 'inherit',
    color: 'inherit',
    fontSize: 'inherit',
    outline: 'none',
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
  },
  clearWrapper: {
    position: 'relative',
    flexBasis: `calc(${cssVars.inputClearSize} + 2px)`,
    flexShrink: 0,
    display: 'none',
    '$wrapper:hover &, $wrapperFocus &': {
      display: 'flex',
    },
  },

  clear: {
    position: 'absolute',
    right: cssVars.inputPaddingX,
    top: '0',
    bottom: '0',
    margin: 'auto',
    width: cssVars.inputClearSize,
    height: cssVars.inputClearSize,
    boxSizing: 'border-box',
    display: 'flex',
    cursor: 'pointer',
    color: cssVars.inputClearBgColor,
    '&:hover svg': {
      color: cssVars.inputClearBgHoverColor,
    },
    '$wrapperSmall &': {
      right: cssVars.inputPaddingXSmall,
    },
    '$wrapperLarge &': {
      right: cssVars.inputPaddingXLarge,
    },
  },
  // todo button select cascader datepicker 等组件的样式覆盖问题
  group: {
    ...group,
    display: 'flex',
    boxSizing: 'border-box',
    alignItems: 'stretch',
    padding: '0',
    '& > i, & > span': {
      display: 'block',
      margin: 'auto 0',
      background: 'transparent',
    },
    ...groupSpace(cssVars.inputPaddingX),
  },
  groupSmall: {
    ...groupSmall,
    ...groupSpace(cssVars.inputPaddingXSmall),
  },
  groupLarge: {
    ...groupLarge,
    ...groupSpace(cssVars.inputPaddingXLarge),
  },
  ...resetGroup,
  numberStep: {
    display: 'flex',
    height: '100%',
    boxSizing: 'border-box',
    flexFlow: 'column noWrap',
    '& > span': {
      display: 'block',
      minHeight: '0',
      flexGrow: '1',
      boxSizing: 'border-box',
      width: '18px',
      padding: '0 4px',
      borderLeft: `1px solid ${cssVars.grey200}`,
      lineHeight: '1',
      color: cssVars.grey500,
      '&:hover': {
        color: cssVars.primaryColor,
      },
      '&:first-child': {
        borderBottom: `1px solid ${cssVars.grey200}`,
      },
      '& svg': {
        transform: 'rotate(-90deg)',
      },
    },
  },
  info: {
    position: 'absolute',
    right: '0',
    top: '100%',
    transformOrigin: '100% 0',
    marginTop: '10px',
    animation: 'so-input-fade .16s ease-in',
    maxWidth: '400px',
    padding: '5px 8px',
    background: cssVars.grey100,
    borderRadius: cssVars.inputBorderRadius,
    boxShadow: `0 0 0 1px ${cssVars.inputBorderColor}`,
    fontSize: '12px',
    color: '#1261d4',
    '&::before': {
      display: 'block',
      position: 'absolute',
      right: '4px',
      bottom: '100%',
      transform: 'rotate(45deg) translateY(3px)',
      width: '6px',
      height: '6px',
      border: `1px solid ${cssVars.inputBorderColor}`,
      borderWidth: '1px 0 0 1px',
      background: 'inherit',
      content: "'  '",
    },
  },
  infoError: {
    boxShadow: '0 0 0 1px rgba(255,77,80,.1), 0 2px 8px rgba(0,0,0,.15)',
    color: cssVars.dangerColor,
    '&::before': {
      borderColor: 'rgba(255,77,80,.1);',
    },
  },
};

export default input;
