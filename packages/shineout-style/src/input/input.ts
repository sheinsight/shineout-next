import border from './input-border';
import inputVar from './input-var';
import InputBorderVar from './input-border-var';

import { JsStyles } from '../jss-style';
import inputBorderVar from './input-border-var';
import { colorVar } from '../themes/default';

const inputBorder = border('wrapper', true);
const groupBorder = border('group', true);
const { wrapperFocus, wrapperError, wrapperDisabled, wrapper, wrapperSmall, wrapperLarge } =
  inputBorder;

const { group, groupError, groupDisabled, groupFocus, groupSmall, groupLarge } = groupBorder;

type InputClass =
  | 'wrapper'
  | 'wrapperSmall'
  | 'wrapperLarge'
  | 'wrapperFocus'
  | 'wrapperError'
  | 'wrapperDisabled'
  | 'clearWrapper'
  | 'input'
  | 'clear'
  | 'group'
  | 'groupSmall'
  | 'groupLarge'
  | 'groupFocus'
  | 'groupError'
  | 'groupDisabled';

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
  wrapperFocus,
  wrapperError,
  wrapperDisabled,
  wrapperSmall,
  wrapperLarge,
  input: {
    width: '100%',
    background: 'transparent',
    border: '0',
    lineHeight: 'inherit',
    color: 'inherit',
    fontSize: '100%',
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
    '& $wrapper': {
      borderWidth: 0,
      borderRadius: 0,
      boxShadow: 'none',
      backgroundColor: 'transparent',
      borderColor: inputBorderVar.color.border.default,
    },
    '& $wrapper + $wrapper': {
      borderLeftWidth: '1px',
    },
    ...groupSpace(inputBorderVar.size.paddingX.default),
  },
  groupError,
  groupDisabled,
  groupFocus,
  groupSmall: {
    ...groupSmall,
    ...groupSpace(inputBorderVar.size.paddingX.small),
  },
  groupLarge: {
    ...groupLarge,
    ...groupSpace(inputBorderVar.size.paddingX.large),
  },
};

export default input;
