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
  | 'inline'
  | 'disabled'
  | 'closeIcon'
  | 'closeIconWrapper'
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
  | 'rounded'
  | 'input';

const tag = (type: TagType) => ({
  // bright 亮色风格
  '&$bright': {
    color: Token[`tag${type}FontColor`],
    backgroundColor: Token[`tag${type}BackgroundColor`],
    border: `1px solid ${Token[`tag${type}BorderColor`]}`,

    '& $closeIconWrapper': {
      '&:hover': {
        backgroundColor: Token[`tag${type}IconHoverBackgroundColor`],
      },
    },

    '&$disabled': {
      color: Token[`tag${type}DisabledFontColor`],
      backgroundColor: Token[`tag${type}DisabledBackgroundColor`],
      border: `1px solid ${Token[`tag${type}DisabledBorderColor`]}`,

      '& $closeIconWrapper': {
        fill: Token[`tag${type}IconDisabledFontColor`],
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
    },
  },

  // fill 填充风格
  '&$fill': {
    color: Token[`tag${type}FillFontColor`],
    backgroundColor: Token[`tag${type}FillBackgroundColor`],
    border: `1px solid ${Token[`tag${type}FillBorderColor`]}`,
  },

  // outline 边框风格
  '&$outline': {
    background: '#fff',
    color: Token[`tag${type}FontColor`],
    border: `1px solid ${Token[`tag${type}OutlineBorderColor`]}`,

    '& $closeIconWrapper': {
      // hover
      '&:hover': {
        backgroundColor: Token[`tag${type}BackgroundColor`],
      },
    },

    '&$disabled': {
      color: Token[`tag${type}OutlineDisabledFontColor`],
      backgroundColor: Token[`tag${type}OutlineDisabledBackgroundColor`],
      border: `1px solid ${Token[`tag${type}OutlineDisabledBorderColor`]}`,

      '& $closeIconWrapper': {
        fill: Token[`tag${type}DisabledFontColor`],
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
    },
  },

  // brightOutline 亮色边框风格
  '&$brightOutline': {
    color: Token[`tag${type}FontColor`],
    backgroundColor: Token[`tag${type}BackgroundColor`],
    border: `1px solid ${Token[`tag${type}OutlineBorderColor`]}`,

    '& $closeIconWrapper': {
      '&:hover': {
        backgroundColor: Token[`tag${type}IconHoverBackgroundColor`],
      },
    },

    '&$disabled': {
      color: Token[`tag${type}DisabledFontColor`],
      backgroundColor: Token[`tag${type}DisabledBackgroundColor`],
      border: `1px solid ${Token[`tag${type}OutlineDisabledBorderColor`]}`,

      '& $closeIconWrapper': {
        fill: Token[`tag${type}IconDisabledFontColor`],
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
    },
  },

  '& $closeIcon': {
    fill: Token[`tag${type}FontColor`],
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
    lineHeight: `calc(${Token.tagFontSize} + 6px)`,
    '& + &': {
      marginLeft: 8,
    },
  },
  input: {
    '&[data-type="so-input"]': {
      width: 100,
      '& input': {
        padding: `0 ${Token.tagInputPaddingX}`,
      },
    },
  },
  inline: {
    display: 'inline-block',
    verticalAlign: 'top',
  },

  large: {
    height: Token.tagLargeHeight,
    fontSize: Token.tagLargeFontSize,
    lineHeight: `calc(${Token.tagLargeFontSize} + 8px)`,
    '& $closeIconWrapper': {
      width: 16,
      height: 16,
    },
  },
  small: {
    height: Token.tagSmallHeight,
    lineHeight: `calc(${Token.tagSmallFontSize} + 2px)`,
    '& $closeIconWrapper': {
      width: 14,
      height: 14,
    },
  },

  disabled: {
    cursor: 'not-allowed',
  },

  closeIcon: {
    marginLeft: 4,
    alignItems: 'center',
    height: '100%',
    display: 'inline-flex',
    '& span': {
      width: 14,
      height: 14,
    },
  },

  closeIconWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: '50%',
    justifyContent: 'center',
  },

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
