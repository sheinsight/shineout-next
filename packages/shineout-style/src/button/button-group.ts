import { JsStyles, prefix } from '../jss-style';
import Token from '@sheinx/theme';
import { ButtonGroupClasses } from '@sheinx/base';

type ButtonTypeWithoutLink = 'Primary' | 'Secondary' | 'Danger' | 'Warning' | 'Success';

type ButtonStyleType = 'Text' | 'Outline' | '';

// 引用 button stylesheet 的常量类名（元素同时拥有 hash class 和常量 class）
const bc = (key: string) => `.${prefix}-button-${key}`;

const beforeLine = () => ({
  '&::before': {
    position: 'absolute',
    content: '" "',
    height: 'calc(50% - 2px)',
    top: 'calc(25% + 1px)',
    width: 1,
    background: Token.buttonSplitlineFullBackgroundColor,
  },
  '&[dir=ltr]::before': {
    left: -1,
  },
  '&[dir=rtl]::before': {
    right: -1,
  },
  [`&${bc('dashed')}:hover`]: {
    '&::before': {
      height: '100%',
      top: 0,
      bottom: 0,
      borderLeft: '1px dashed currentColor',
      background: 'none',
    },
    // 使用 ::after 在右侧创建分割线，颜色使用当前按钮的 currentColor
    '&:not(:last-child)::after': {
      content: '" "',
      position: 'absolute',
      height: '100%',
      top: 0,
      width: 1,
      borderLeft: '1px dashed currentColor',
      background: 'none',
      zIndex: 1,
    },
    '&:not(:last-child)[dir=ltr]::after': {
      right: -1,
    },
    '&:not(:last-child)[dir=rtl]::after': {
      left: -1,
    },
    // 隐藏相邻按钮的左侧分割线，因为已经被 ::after 覆盖了
    [`& + ${bc('button')}::before`]: {
      opacity: 0,
    },
  },
  [`&:not(${bc('disabled')}):not(${bc('dashed')}):hover`]: {
    '&::before': {
      background: 'transparent',
    },
    [`& + ${bc('button')},& + * ${bc('button')}`]: {
      '&::before': {
        background: 'transparent',
      },
    },
  },
});

const outlineBeforeLine = (type: ButtonTypeWithoutLink, styles: ButtonStyleType) => ({
  '&::before': {
    position: 'absolute',
    content: '" "',
    height: 'calc(50% - 2px)',
    top: 'calc(25% + 1px)',
    width: 1,
    background: Token[`button${type}${styles}BorderColor`],
  },
  '&[dir=ltr]::before': {
    left: -1,
  },
  '&[dir=rtl]::before': {
    right: -1,
  },
  '&:not(:disabled):hover': {
    // before
    '&::before': {
      height: 'calc(100% + 1.8px)',
      top: -0.8,
      left: -1,
      width: 1,
      background: Token[`button${type}${styles}HoverBorderColor`],
    },
    [`& + ${bc('button')},& + * ${bc('button')}`]: {
      '&::before': {
        height: 'calc(100% + 1.8px)',
        top: -0.8,
        left: -1,
        width: 1,
        background: Token[`button${type}${styles}HoverBorderColor`],
      },
    },
    // active
    '&:active': {
      '&::before': {
        background: Token[`button${type}${styles}ActiveBorderColor`],
      },
      [`& + ${bc('button')},& + * ${bc('button')}`]: {
        '&::before': {
          background: Token[`button${type}${styles}ActiveBorderColor`],
        },
      },
    },
  },

  [`&${bc('primary')},&${bc('success')},&${bc('warning')},&${bc('danger')},${bc('secondary')}`]: {
    '&::before': {
      height: 'calc(100% + 2px)',
      top: -1,
      left: -1,
      width: 1,
      bottom: -1,
      background: `${Token[`button${type}${styles}BorderColor`]}`,
    },
    '& + :not(&)': {
      '&::before': {
        height: 'calc(100% + 2px)',
        top: -1,
        left: -1,
        width: 1,
        bottom: -1,
        background: Token[`button${type}${styles}BorderColor`],
      },
    },
    '&:disabled': {
      '&::before': {
        background: Token[`button${type}${styles}DisabledBorderColor`],
      },
      '& + :not(&)': {
        '&::before': {
          background: Token[`button${type}${styles}DisabledBorderColor`],
        },
      },
    },
  },
});

const textBeforeLine = () => ({
  '&::before': {
    transition: 'all 0.3s',
    position: 'absolute',
    content: '" "',
    height: 'calc(50% - 2px)',
    top: 'calc(25% + 1px)',
    width: 1,
    background: Token.buttonSplitlineOutlineBackgroundColor,
  },
  '&[dir=ltr]::before': {
    left: -1,
  },
  '&[dir=rtl]::before': {
    right: -1,
  },

  [`&:not(${bc('disabled')}):hover`]: {
    '&::before': {
      background: 'transparent',
    },
    [`& + ${bc('button')},& + * ${bc('button')}`]: {
      '&::before': {
        background: 'transparent',
      },
    },
  },
});

const ButtonGroupStyle: JsStyles<keyof ButtonGroupClasses> = {
  rootClass: {},
  group: {
    // 2.x 之前非 inline-block
    display: 'inline-flex',
    // 处理 dropdown 下的 button
    '& [data-role="dropdown"]': {
      [`& ${bc('button')}`]: {
        height: '100%',
      },
      '& [data-role="caret"]': {
        margin: 0,
      },
    },

    [`& > :first-child${bc('button')},& > :first-child ${bc('button')}`]: {
      '&::before': {
        display: 'none',
      },
    },

    // 第一个元素下的所有 button 标签的元素
    [`& > :first-child:not(:last-child)${bc('button')},& > :first-child:not(:last-child) ${bc('button')}`]:
      {
        '&[dir=ltr]': {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderRight: 'none',
        },
        '&[dir=rtl]': {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderRight: 'none',
        },
      },

    // 最后一个元素下的所有 button 标签的元素
    [`& > :last-child:not(:first-child)${bc('button')},& > :last-child:not(:first-child) ${bc('button')}`]:
      {
        '&[dir=ltr]': {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderLeft: 'none',
        },
        '&[dir=rtl]': {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderLeft: 'none',
        },
      },

    [`& > :not(:first-child):not(:last-child)${bc('button')},& > :not(:first-child):not(:last-child) ${bc('button')}`]:
      {
        borderRadius: 0,
        borderLeft: 'none',
        borderRight: 'none',
      },

    // 填充型 button
    [`& ${bc('button')}:not(${bc('outline')}):not(${bc('text')})`]: {
      position: 'relative',

      '&::before': {
        transition: 'all 0.3s',
      },
      // secondary 比较特殊，单独拎出来写覆盖掉 &::before
      [`&${bc('secondary')}`]: {
        ...beforeLine(),
        '&::before': {
          position: 'absolute',
          content: '" "',
          height: 'calc(50% - 2px)',
          top: 'calc(25% + 1px)',
          width: 1,
          background: Token.buttonSplitlineOutlineBackgroundColor,
          transition: 'none',
        },
        '&[dir=ltr]::before': {
          left: -1,
        },
        '&[dir=rtl]::before': {
          right: -1,
        },
        [`& + :not(&),& + * ${bc('button')}:not(&)`]: {
          '&::before': {
            background: 'transparent',
          },
        },
      },
      // primary, success, warning, danger 分割线样式
      [`&${bc('primary')},&${bc('success')},&${bc('warning')},&${bc('danger')}`]: {
        ...beforeLine(),
      },
      // priamry success warning danger secondary 两两之间如果不是紧挨着，则去除中间的分割线
      [`&${bc('primary')},&${bc('success')},&${bc('warning')},&${bc('danger')},${bc('secondary')}`]:
        {
          [`& + :not(&),& + * ${bc('button')}:not(&)`]: {
            '&::before': {
              background: 'transparent',
            },
          },
          [`& + ${bc('button')}:not(&)`]: {
            '&::before': {
              background: 'transparent',
            },
          },
        },
    },

    // outline 型 button
    [`& ${bc('outline')}`]: {
      position: 'relative',
      '&::before': {
        transition: 'all 0.3s',
      },

      // secondary 比较特殊，单独拎出来写覆盖掉 &::before
      [`&${bc('secondary')}`]: {
        ...outlineBeforeLine('Secondary', 'Outline'),
        '&::before': {
          position: 'absolute',
          content: '" "',
          height: 'calc(50% - 2px)',
          top: 'calc(25% + 1px)',
          width: 1,
          background: Token.buttonSplitlineOutlineBackgroundColor, // Neutral-border-1
        },
        '&[dir=ltr]::before': {
          left: -1,
        },
        '&[dir=rtl]::before': {
          right: -1,
        },
      },
      [`&${bc('primary')}`]: {
        ...outlineBeforeLine('Primary', 'Outline'),
      },
      [`&${bc('success')}`]: {
        ...outlineBeforeLine('Success', 'Outline'),
      },
      [`&${bc('warning')}`]: {
        ...outlineBeforeLine('Warning', 'Outline'),
      },
      [`&${bc('danger')}`]: {
        ...outlineBeforeLine('Danger', 'Outline'),
      },
    },

    // text 型 button
    [`& ${bc('text')}`]: {
      position: 'relative',
      ...textBeforeLine(),
    },

    // dashed 型 button
    [`&${bc('dashed')}`]: {
      position: 'relative',
      borderStyle: 'none',
    },
  },
};

export default ButtonGroupStyle;
