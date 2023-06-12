import border from '../input/input-border';
// import TextareaVar from './textarea.var';
import InputBorderVar from '../input/input-border-var';
import { colorVar } from '../themes/default';
import { JsStyles } from '../jss-style';

const inputBorder = border('wrapper');
const { wrapper, ...resetWrapper } = inputBorder;

type InputClass =
  | 'wrapper'
  | 'wrapperSmall'
  | 'wrapperLarge'
  | 'wrapperFocus'
  | 'wrapperError'
  | 'wrapperDisabled'
  | 'wrapperUnderline'
  | 'wrapperNoBorder'
  | 'paddingBox'
  | 'textarea'
  | 'shadow'
  | 'info'
  | 'infoError';

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
  textarea: {
    width: '100%',
    background: 'transparent',
    border: '0',
    margin: '0',
    lineHeight: 'inherit',
    color: 'inherit',
    fontSize: 'inherit',
    outline: 'none',
    backgroundColor: 'transparent',
    resize: 'none',
    boxSizing: 'border-box',
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
    borderRadius: InputBorderVar.size.radius.default,
    boxShadow: `0 0 0 1px ${InputBorderVar.color.border.default}`,
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
      border: `1px solid ${InputBorderVar.color.border.default}`,
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
  shadow: {
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: 0,
    visibility: 'hidden',
  },
};

export default input;
