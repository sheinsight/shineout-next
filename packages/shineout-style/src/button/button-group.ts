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
  | 'dashed'
  | 'link'
  | 'round'
  | 'small'
  | 'large';

const types = ['Default', 'Primary', 'Secondary', 'Danger', 'Warning', 'Success'];
type ButtonType = 'Primary' | 'Secondary' | 'Danger' | 'Warning' | 'Success';

const getSelector = (type: string) => {
  let splitSelector: string[] = [];
  types
    .filter((i) => i !== type)
    .forEach((i) => {
      splitSelector.push(`& + button[class*="-${i.toLocaleLowerCase()}"]`);
    });
  return splitSelector;
};

const splitLine = (type: ButtonType) => {
  const splitSelector = getSelector(type);
  const _type = type.toLocaleLowerCase();
  return {
    [`& > button[class*="-${_type}"]`]: {
      // 禁用状态
      [`&[class*="-disabled"]`]: {
        [`& + button[class*="-${_type}"]:not(:hover)`]: {
          // 后一个按钮的伪类元素
          '&::before': {
            // backgroundColor: 'transparent',
            backgroundColor: Token[`button${type}SplitDisabledBackgroundColor`],
          },
        },
      },

      '&::before': {
        backgroundColor: Token[`button${type}SplitBackgroundColor`],
      },
      '&:hover': {
        // 后一个是 dropdown 按钮
        [`& + div[class*="-dropdown"]`]: {
          '& > button': {
            '&::before': {
              backgroundColor: 'transparent',
            },
            // 禁用状态
            [`&[class*="-disabled"]`]: {
              '&::before': {
                //
              },
            },
          },
        },
        // 后一个按钮的伪类元素
        [`& + button[class*="-${_type}"]`]: {
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
    [`& div[class*="-dropdown"] > button[class*="-${_type}"]`]: {
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
        backgroundColor: Token[`button${type}SplitBackgroundColor`],
      },
      '&:hover': {
        '&::before': {
          backgroundColor: 'transparent',
        },
      },
    },
  };
};

const splitLineOutlint = (type: ButtonType) => {
  const _type = type.toLocaleLowerCase();
  return {
    [`& > button[class*="-${_type}"]`]: {
      // 禁用状态
      [`&[class*="-disabled"]`]: {
        borderColor: Token[`button${type}OutlineBorderColor`],
        '&:hover': {
          [`& + button[class*="-${_type}"]`]: {
            // 后一个按钮的伪类元素
            '&::before': {
              height: '1em',
              top: 'calc(1em / 2 + 1px)',
              left: -1,
              width: 1,
              backgroundColor: Token[`button${type}OutlineDisabledBorderColor`],
            },
          },
          // 当前按钮的伪类元素
          '&::before': {
            height: '1em',
            top: 'calc(1em / 2 + 1px)',
            left: -1,
            width: 1,
            backgroundColor: Token[`button${type}OutlineBorderColor`],
          },
          // active 状态
          '&:active': {
            // dropdown 按钮
            [`& + div[class*="-dropdown"]`]: {
              '& > button': {
                '&::before': {
                  backgroundColor: Token[`button${type}OutlineBorderColor`],
                },
              },
            },
          },
          [`& + div[class*="-dropdown"]`]: {
            '& > button': {
              '&::before': {
                backgroundColor: Token[`button${type}OutlineDisabledBorderColor`],
              },
            },
          },
        },
        // 禁用状态下后一个是 dropdown
        [`& + div[class*="-dropdown"]`]: {
          '& > button': {
            '&::before': {
              height: '1em',
              top: 'calc(1em / 2 + 1px)',
              left: -1,
              width: 1,
              backgroundColor: Token[`button${type}OutlineDisabledBorderColor`],
            },
            // active 状态
            '&:active': {
              '&::before': {
                backgroundColor: Token[`button${type}OutlineDisabledBorderColor`],
              },
            },
          },
        },
      },
      '&::before': {
        left: -1,
        width: 1,
        backgroundColor: Token[`button${type}OutlineSplitBackgroundColor`],
      },
      '&:hover': {
        // dropdown 按钮
        [`& + div[class*="-dropdown"]`]: {
          '& > button': {
            // 禁用
            [`&[class*="-disabled"]`]: {
              // 前一个正常按钮，后一个是 dropdown disabled
              '&::before': {
                backgroundColor: Token[`button${type}OutlineBorderColor`],
              },
            },
            '&::before': {
              top: 0,
              height: '100%',
              backgroundColor: Token[`button${type}OutlineSplitHoverBackgroundColor`],
            },
          },
        },
        // 后一个按钮的伪类元素
        [`& + button[class*="-${_type}"]`]: {
          '&::before': {
            top: 0,
            height: '100%',
            backgroundColor: Token[`button${type}OutlineSplitHoverBackgroundColor`],
          },
        },
        // 当前按钮的伪类元素
        '&::before': {
          top: 0,
          height: '100%',
          backgroundColor: Token[`button${type}OutlineSplitHoverBackgroundColor`],
        },

        // active 状态
        '&:active': {
          // dropdown 按钮
          [`& + div[class*="-dropdown"]`]: {
            '& > button': {
              // 禁用
              [`&[class*="-disabled"]`]: {
                '&::before': {
                  backgroundColor: Token[`button${type}OutlineActiveBorderColor`],
                },
              },
              '&::before': {
                backgroundColor: Token[`button${type}OutlineDisabledBorderColor`],
              },
            },
          },
          // 后一个按钮的伪类元素
          [`& + button[class*="-${_type}"]`]: {
            '&::before': {
              backgroundColor: Token[`button${type}OutlineSplitActiveBackgroundColor`],
            },
          },
          // 当前按钮的伪类元素
          '&::before': {
            backgroundColor: Token[`button${type}OutlineSplitActiveBackgroundColor`],
          },
        },
      },
    },
    // dropdown 按钮
    [`& > div[class*="-dropdown"] > button[class*="-${_type}"]`]: {
      position: 'relative',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      // 禁用状态
      [`&[class*="-disabled"]`]: {
        borderColor: Token[`button${type}OutlineBorderColor`],
        '&::before': {
          backgroundColor: Token[`button${type}OutlineSplitDisabledBackgroundColor`],
        },
        // active 状态
        '&:active': {
          borderColor: Token[`button${type}OutlineBorderColor`],
        },
      },
      '&::before': {
        height: '1em',
        backgroundColor: Token[`button${type}OutlineSplitBackgroundColor`],
      },
      '&:hover': {
        borderColor: Token[`button${type}OutlineBorderColor`],
        '&::before': {
          top: 0,
          height: '100%',
          backgroundColor: Token[`button${type}OutlineSplitHoverBackgroundColor`],
        },
        // active 状态
        '&:active': {
          borderColor: Token[`button${type}OutlineActiveBorderColor`],
          '&::before': {
            backgroundColor: Token[`button${type}OutlineSplitActiveBackgroundColor`],
          },
        },
      },
    },
  };
};

const splitLineText = (type: ButtonType) => {
  const _type = type.toLocaleLowerCase();
  return {
    [`& > button[class*="-${type.toLocaleLowerCase()}"]`]: {
      '&::before': {
        backgroundColor: Token[`button${type}TextSplitBackgroundColor`],
      },
    },
    // dropdown 按钮
    [`& > div[class*="-dropdown"] > button[class*="-${_type}"]`]: {
      position: 'relative',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      // 禁用状态
      [`&[class*="-disabled"]`]: {
        '&::before': {
          backgroundColor: Token[`button${type}TextSplitDisabledBackgroundColor`],
        },
      },
      '&::before': {
        height: '1em',
        top: 'calc(1em / 2 + 1px)',
        backgroundColor: Token[`button${type}TextSplitBackgroundColor`],
      },
      '&:hover': {
        '&::before': {
          backgroundColor: 'transparent',
        },
        // active 状态
        '&:active': {
          '&::before': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
  };
};

const ButtonGroupStyle: JsStyles<ButtonGroupClass> = {
  group: {
    // 第一个和最后一个按钮的圆角
    '& > :first-child': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    '& > :last-child': {
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
    '& > :not(:first-child):not(:last-child)': {
      borderRadius: 0,
      borderRight: 'none',
      borderLeft: 'none',
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
      borderLeft: 'none',
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
  dashed: {},
};

export default ButtonGroupStyle;
