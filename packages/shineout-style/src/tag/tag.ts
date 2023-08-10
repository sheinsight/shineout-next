import { JsStyles } from '../jss-style';
import Token from '@sheinx/theme';

type TagType = 'Info' | 'Default' | 'Success' | 'Warning' | 'Danger';

type TagClass =
  | 'tag'
  | 'disabled'
  | 'closeIcon'
  | 'info'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'large'
  | 'small'
  | 'outline'
  | 'rounded';

const tag = (type: TagType) => ({
  color: Token[`tag${type}FontColor`],
  backgroundColor: Token[`tag${type}BackgroundColor`],
  border: `1px solid ${Token[`tag${type}BorderColor`]}`,

  '&$disabled': {
    color: Token[`tag${type}DisabledFontColor`],
    backgroundColor: Token[`tag${type}DisabledBackgroundColor`],
    border: `1px solid ${Token[`tag${type}DisabledBorderColor`]}`,
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

  outline: {},
  rounded: {},

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
};

export default TagStyle;
