import border from './input-border';
import inputVar from './input-var';
import InputBorderVar from './input-border-var';

import { JsStyles } from '../jss-style';
import inputBorderVar from './input-border-var';
import { colorVar } from '../themes/default';

const inputBorder = border('wrapper', true);
const groupBorder = border('group', true);
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
    border: `1px solid ${InputBorderVar.color.border.default}`,
    borderWidth: '0 1px',
    background: colorVar.grey200,
    fontWeight: 'normal',
    '&:first-child': {
      borderTopLeftRadius: InputBorderVar.size.radius.default,
      borderBottomLeftRadius: InputBorderVar.size.radius.default,
      borderLeftColor: 'inherit',
      marginLeft: '-1px',
    },
    '&:last-child': {
      borderTopRightRadius: InputBorderVar.size.radius.default,
      borderBottomRightRadius: InputBorderVar.size.radius.default,
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
    lineHeight: 'inherit',
    color: 'inherit',
    fontSize: 'inherit',
    outline: 'none',
    backgroundColor: 'transparent',
    padding: `${InputBorderVar.size.paddingY.default} 0`,
    '$wrapperSmall &': {
      padding: `${InputBorderVar.size.paddingY.small} 0`,
    },
    '$wrapperLarge &': {
      padding: `${InputBorderVar.size.paddingY.large} 0`,
    },
  },
  clearWrapper: {
    position: 'relative',
    flexBasis: `calc(${inputVar.clearSize} + 2px)`,
    flexShrink: 0,
    display: 'none',
    '$wrapper:hover &, $wrapperFocus &': {
      display: 'flex',
    },
  },

  clear: {
    position: 'absolute',
    right: '0',
    top: '0',
    bottom: '0',
    margin: 'auto',
    width: inputVar.clearSize,
    height: inputVar.clearSize,
    boxSizing: 'border-box',
    display: 'flex',
    cursor: 'pointer',
    color: inputVar.clearColor,
    '&:hover svg': {
      color: inputVar.clearColorHover,
    },
  },
  // todo button select cascader datepicker 等组件的样式覆盖问题
  group: {
    ...group,
    display: 'flex',
    boxSizing: 'border-box',
    alignItems: 'stretch',
    padding: '0',
    ...groupSpace(inputBorderVar.size.paddingX.default),
  },
  groupSmall: {
    ...groupSmall,
    ...groupSpace(inputBorderVar.size.paddingX.small),
  },
  groupLarge: {
    ...groupLarge,
    ...groupSpace(inputBorderVar.size.paddingX.large),
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
      borderLeft: `1px solid ${colorVar.grey200}`,
      lineHeight: '1',
      color: colorVar.grey500,
      '&:hover': {
        color: colorVar.primary,
      },
      '&:first-child': {
        borderBottom: `1px solid ${colorVar.grey200}`,
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
    background: colorVar.grey100,
    borderRadius: inputBorderVar.size.radius.default,
    boxShadow: `0 0 0 1px ${inputBorderVar.color.border.default}`,
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
      border: `1px solid ${inputBorderVar.color.border.default}`,
      borderWidth: '1px 0 0 1px',
      background: 'inherit',
      content: "'  '",
    },
  },
  infoError: {
    boxShadow: '0 0 0 1px rgba(255,77,80,.1), 0 2px 8px rgba(0,0,0,.15)',
    color: colorVar.danger,
    '&::before': {
      borderColor: 'rgba(255,77,80,.1);',
    },
  },
};

export default input;
