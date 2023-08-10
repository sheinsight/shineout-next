import { JsStyles } from '../jss-style';
import Token from '@sheinx/theme';

type TagType =
  | 'Info'
  | 'Default'
  | 'Success'
  | 'Warning'
  | 'Danger'
  | 'Orange'
  | 'Magenta'
  | 'Purple'
  | 'Indigo'
  | 'Cyan'
  | 'Neon'
  | 'Lemon'
  | 'Tangerine';

type TagClass =
  | 'tag'
  | 'disabled'
  | 'closeIcon'
  | 'info'
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'
  | 'orange'
  | 'magenta'
  | 'purple'
  | 'indigo'
  | 'cyan'
  | 'neon'
  | 'lemon'
  | 'tangerine'
  | 'large'
  | 'small'
  | 'outline'
  | 'fill'
  | 'bright'
  | 'brightOutline'
  | 'rounded';

const tag = (type: TagType) => ({
  '&$bright': {
    color: Token[`tag${type}FontColor`],
    backgroundColor: Token[`tag${type}BackgroundColor`],
    border: `1px solid ${Token[`tag${type}BorderColor`]}`,

    '&$disabled': {
      color: Token[`tag${type}DisabledFontColor`],
      backgroundColor: Token[`tag${type}DisabledBackgroundColor`],
      border: `1px solid ${Token[`tag${type}DisabledBorderColor`]}`,
    },
  },

  '&$fill': {
    color: Token[`tag${type}FillFontColor`],
    backgroundColor: Token[`tag${type}FillBackgroundColor`],
    border: `1px solid ${Token[`tag${type}FillBorderColor`]}`,
  },

  '&$outline': {
    background: '#fff',
    color: Token[`tag${type}FontColor`],
    border: `1px solid ${Token[`tag${type}OutlineBorderColor`]}`,
  },
  '&$brightOutline': {
    color: Token[`tag${type}FontColor`],
    backgroundColor: Token[`tag${type}BackgroundColor`],
    border: `1px solid ${Token[`tag${type}OutlineBorderColor`]}`,
  },
});

const TagStyle: JsStyles<TagClass> = {
  tag: {
    display: 'inline-block',
    height: Token.tagHeight,
    padding: `${Token.tagPaddingY} ${Token.tagPaddingX}`,
    fontSize: Token.tagFontSize,
    borderRadius: Token.tagBorderRadius,
    cursor: 'pointer',
    boxSizing: 'border-box',
    lineHeight: 1.5,
    '& + &': {
      marginLeft: 8,
    },
  },

  large: {
    height: Token.tagLargeHeight,
  },
  small: {
    height: Token.tagSmallHeight,
  },

  disabled: {
    cursor: 'not-allowed',
  },

  closeIcon: {},

  info: {
    ...tag('Info'),
  },
  default: {
    ...tag('Default'),
  },
  success: {
    ...tag('Success'),
  },
  warning: {
    ...tag('Warning'),
  },
  danger: {
    ...tag('Danger'),
  },
  orange: {
    ...tag('Orange'),
  },
  magenta: {
    ...tag('Magenta'),
  },
  purple: {
    ...tag('Purple'),
  },
  indigo: {
    ...tag('Indigo'),
  },
  cyan: {
    ...tag('Cyan'),
  },
  neon: {
    ...tag('Neon'),
  },
  lemon: {
    ...tag('Lemon'),
  },
  tangerine: {
    ...tag('Tangerine'),
  },

  fill: {},
  bright: {},
  outline: {},
  brightOutline: {},
  rounded: {},
};

export default TagStyle;
