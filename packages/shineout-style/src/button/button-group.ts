import { JsStyles } from '../jss-style';
import Token from '@sheinx/theme';

type ButtonGroupClass =
  | 'group'
  | 'default'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'warning'
  | 'success'
  | 'outline'
  | 'text'
  | 'dash'
  | 'link'
  | 'round'
  | 'small'
  | 'large';

const types = ['Default', 'Primary', 'Secondary', 'Danger', 'Warning', 'Success'];

const getSelector = (type: string) => {
  let splitSelector: string[] = [];
  types
    .filter((i) => i !== type)
    .forEach((i) => {
      splitSelector.push(`& + button[class*="-${i.toLocaleLowerCase()}"]`);
    });
  return splitSelector;
};

const splitLine = (type: 'Primary' | 'Secondary' | 'Danger' | 'Warning' | 'Success') => {
  const splitSelector = getSelector(type);
  return {
    [`& > button[class*="-${type.toLocaleLowerCase()}"]`]: {
      '&::before': {
        backgroundColor: Token[`button${type}FontColor`],
      },
      '&:hover': {
        // dropdown 按钮
        [`& + div[class*="-dropdown"]`]: {
          '& > button': {
            '&::before': {
              backgroundColor: 'transparent',
            },
          },
        },
        // 后一个按钮的伪类元素
        [`& + button[class*="-${type.toLocaleLowerCase()}"]`]: {
          '&::before': {
            backgroundColor: 'transparent',
          },
        },
        '&::before': {
          backgroundColor: 'transparent',
        },
      },
      // 非相邻的隐藏分割线
      [splitSelector.toString()]: {
        '&::before': {
          backgroundColor: 'transparent',
        },
      },
    },
    // dropdown 按钮
    [`& div[class*="-dropdown"] > button[class*="-${type.toLocaleLowerCase()}"]`]: {
      position: 'relative',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderLeft: 'calc(1px - 0.5em) solid transparent',

      // 禁用
      [`&[class*="-disabled"]`]: {
        '&::before': {
          backgroundColor: 'transparent',
        },
      },

      '&::before': {
        content: '" "',
        top: '25%',
        left: -1,
        width: 1,
        height: '50%',
        position: 'absolute',
        transition: 'all 0.3s',
        backgroundColor: Token[`button${type}FontColor`],
      },
      '&:hover': {
        '&::before': {
          backgroundColor: 'transparent',
        },
      },
    },
  };
};

const splitLineOutlint = (type: 'Primary' | 'Secondary' | 'Danger' | 'Warning' | 'Success') => {
  const _type = type.toLocaleLowerCase();
  return {
    [`& > button[class*="-${_type}"]`]: {
      // 禁用状态
      [`&[class*="-disabled"]`]: {
        '&:hover': {
          [`& + button[class*="-${_type}"]`]: {
            // 后一个按钮的伪类元素
            '&::before': {
              backgroundColor: Token[`button${type}OutlineDisabledBackgroundColor`],
            },
          },
          // 当前按钮的伪类元素
          '&::before': {
            backgroundColor: Token[`button${type}OutlineDisabledBackgroundColor`],
          },
        },
      },
      '&::before': {
        height: '1em',
        top: 'calc(1em / 2 + 2px)',
        left: -1,
        width: 1,
        backgroundColor: Token[`button${type}OutlineBorderColor`],
      },
      '&:hover': {
        // dropdown 按钮
        [`& + div[class*="-dropdown"]`]: {
          '& > button': {
            // 禁用
            [`&[class*="-disabled"]`]: {
              '&::before': {
                backgroundColor: Token[`button${type}SplitlineDisabledBackgroundColor`],
              },
            },
            '&::before': {
              top: -1,
              height: 'calc(100% + 2px)',
              backgroundColor: Token[`button${type}OutlineBorderColor`],
            },
          },
        },
        // 后一个按钮的伪类元素
        [`& + button[class*="-${_type}"]`]: {
          '&::before': {
            top: -1,
            height: 'calc(100% + 2px)',
            backgroundColor: Token[`button${type}OutlineHoverBorderColor`],
          },
        },
        // 当前按钮的伪类元素
        '&::before': {
          top: -1,
          height: 'calc(100% + 2px)',
          backgroundColor: Token[`button${type}OutlineHoverBorderColor`],
        },

        // active 状态
        '&:active': {
          // dropdown 按钮
          [`& + div[class*="-dropdown"]`]: {
            '& > button': {
              // 禁用
              [`&[class*="-disabled"]`]: {
                '&::before': {
                  backgroundColor: Token[`button${type}OutlineDisabledBackgroundColor`],
                },
              },
              '&::before': {
                top: -1,
                height: 'calc(100% + 2px)',
                backgroundColor: Token[`button${type}OutlineActiveBorderColor`],
              },
            },
          },
          // 后一个按钮的伪类元素
          [`& + button[class*="-${_type}"]`]: {
            '&::before': {
              backgroundColor: Token[`button${type}OutlineActiveBorderColor`],
            },
          },
          // 当前按钮的伪类元素
          '&::before': {
            backgroundColor: Token[`button${type}OutlineActiveBorderColor`],
          },
        },
      },
    },
    // dropdown 按钮
    [`& > div[class*="-dropdown"] > button[class*="-${_type}"]`]: {
      position: 'relative',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderLeft: 'calc(1px - 0.5em) solid transparent',
      // 禁用状态
      [`&[class*="-disabled"]`]: {
        '&::before': {
          backgroundColor: Token[`button${type}SplitlineDisabledBackgroundColor`],
        },
      },
      '&::before': {
        height: '1em',
        top: 'calc(1em / 2 + 1px)',
        backgroundColor: Token[`button${type}OutlineBorderColor`],
      },
      '&:hover': {
        '&::before': {
          top: -1,
          height: 'calc(100% + 2px)',
          backgroundColor: Token[`button${type}OutlineBorderColor`],
        },
      },
    },
  };
};

const splitLineText = (type: 'Primary' | 'Secondary' | 'Danger' | 'Warning' | 'Success') => {
  const _type = type.toLocaleLowerCase();
  return {
    [`& > button[class*="-${type.toLocaleLowerCase()}"]`]: {
      '&::before': {
        backgroundColor: Token[`button${type}TextFontColor`],
      },
    },
    // dropdown 按钮
    [`& > div[class*="-dropdown"] > button[class*="-${_type}"]`]: {
      position: 'relative',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderLeft: 'calc(1px - 0.5em) solid transparent',
      // 禁用状态
      [`&[class*="-disabled"]`]: {
        '&::before': {
          backgroundColor: Token[`button${type}TextDisabledFontColor`],
        },
      },
      '&::before': {
        height: '1em',
        top: 'calc(1em / 2 + 1px)',
        backgroundColor: Token[`button${type}TextFontColor`],
      },
      '&:hover': {
        '&::before': {
          top: -1,
          height: 'calc(100% + 2px)',
          backgroundColor: Token[`button${type}TextFontColor`],
        },
      },
    },
  };
};

const ButtonGroupStyle: JsStyles<ButtonGroupClass> = {
  group: {
    // 第一个和最后一个按钮的圆角
    '& > button:first-child': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    '& > button:last-child': {
      position: 'relative',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      '&::before': {
        content: '" "',
        top: '25%',
        left: -1,
        width: 1,
        height: '50%',
        position: 'absolute',
        transition: 'all 0.3s',
      },
    },
    '& > button:not(:first-child):not(:last-child)': {
      borderRadius: 0,
      borderRight: 'none',
      position: 'relative',
      '&::before': {
        content: '" "',
        top: '25%',
        left: -1,
        width: 1,
        height: '50%',
        position: 'absolute',
        transition: 'all 0.3s',
      },
    },
    // primary
    ...splitLine('Primary'),
    ...splitLine('Success'),
    ...splitLine('Danger'),
    ...splitLine('Warning'),
    ...splitLine('Secondary'),
  },
  round: {},
  link: {},

  small: {
    '& > button:not(:last-child)': {
      // 按钮之间用伪类画一条线分割
      '&::before': {
        top: `calc(50% - ${Token.buttonSmallFontSize} / 2)`,
        height: Token.buttonSmallFontSize,
      },
    },
  },
  large: {
    '& > button:not(:last-child)': {
      // 按钮之间用伪类画一条线分割
      '&::before': {
        top: `calc(50% - ${Token.buttonLargeFontSize} / 2)`,
        height: Token.buttonLargeFontSize,
      },
    },
  },

  default: {},
  primary: {},
  secondary: {},
  danger: {},
  warning: {},
  success: {},

  outline: {
    '& > button:first-child': {
      borderRight: 'calc(1px - 0.5em) solid transparent',
    },
    '& > button:last-child': {
      borderLeft: 'calc(1px - 0.5em) solid transparent',
      '&::before': {
        height: '1em',
        top: 'calc(1em / 2 + 1px)',
        left: -1,
        width: 1,
      },
    },
    '& > button:not(:first-child):not(:last-child)': {
      borderLeftWidth: 1,
      borderRightWidth: 1,
    },
    ...splitLineOutlint('Primary'),
    ...splitLineOutlint('Success'),
    ...splitLineOutlint('Danger'),
    ...splitLineOutlint('Warning'),
    ...splitLineOutlint('Secondary'),
  },

  text: {
    '& > button:first-child': {
      borderRight: 'calc(1px - 0.5em) solid transparent',
    },
    '& > button:last-child': {
      borderLeft: 'calc(1px - 0.5em) solid transparent',
      '&::before': {
        height: '1em',
        top: 'calc(1em / 2 + 1px)',
        left: -1,
        width: 1,
      },
    },
    '& > button:not(:first-child):not(:last-child)': {
      borderLeftWidth: 1,
      borderRightWidth: 1,
    },
    ...splitLineText('Primary'),
    ...splitLineText('Success'),
    ...splitLineText('Danger'),
    ...splitLineText('Warning'),
    ...splitLineText('Secondary'),
  },
  dash: {},
};

export default ButtonGroupStyle;
