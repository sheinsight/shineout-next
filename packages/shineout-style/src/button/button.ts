import { JsStyles } from '../jss-style';
import Token from '@sheinx/theme';
import { ButtonClasses } from '@sheinx/base';

type ButtonTypeWithoutLink = 'Primary' | 'Secondary' | 'Danger' | 'Warning' | 'Success';

type ButtonStyleType = 'Text' | 'Outline' | ''; // Dashed 用 Outline 的样式

const button = (type: ButtonTypeWithoutLink, styles: ButtonStyleType) => ({
  color: Token[`button${type}${styles}FontColor`],
  backgroundColor: Token[`button${type}${styles}BackgroundColor`],
  borderColor: Token[`button${type}${styles}BorderColor`],

  '&:hover': {
    color: Token[`button${type}${styles}HoverFontColor`],
    backgroundColor: Token[`button${type}${styles}HoverBackgroundColor`],
    borderColor: Token[`button${type}${styles}HoverBorderColor`],
  },

  '&:active': {
    color: Token[`button${type}${styles}ActiveFontColor`],
    backgroundColor: Token[`button${type}${styles}ActiveBackgroundColor`],
    borderColor: Token[`button${type}${styles}ActiveBorderColor`],
  },

  '&:disabled': {
    color: Token[`button${type}${styles}DisabledFontColor`],
    backgroundColor: Token[`button${type}${styles}DisabledBackgroundColor`],
    borderColor: Token[`button${type}${styles}DisabledBorderColor`],
  },

  // a 标签无 disabled 状态
  '&$disabled': {
    color: Token[`button${type}${styles}DisabledFontColor`],
    backgroundColor: Token[`button${type}${styles}DisabledBackgroundColor`],
    borderColor: Token[`button${type}${styles}DisabledBorderColor`],
  },
});
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
  '&:not($disabled):hover': {
    '&::before': {
      background: 'transparent',
    },
    '& + $button,& + * $button': {
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
    '& + $button,& + * $button': {
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
      '& + $button,& + * $button': {
        '&::before': {
          background: Token[`button${type}${styles}ActiveBorderColor`],
        },
      },
    },
  },

  '&$primary,&$success,&$warning,&$danger,$secondary': {
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

  '&:not($disabled):hover': {
    '&::before': {
      background: 'transparent',
    },
    '& + $button,& + * $button': {
      '&::before': {
        background: 'transparent',
      },
    },
  },
});

// const loading = (type: ButtonTypeWithoutLink, styles: ButtonStyleType) => {
//   const buttonStyle = button(type, styles);

//   return {
//     '&$loading': {
//       ...buttonStyle['&$disabled'],
//     },
//   };
// };

const ButtonStyle: JsStyles<keyof ButtonClasses> = {
  rootClass: {},
  button: {
    outline: 'none',
    fontWeight: Token.buttonFontWeight,
    cursor: 'pointer',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'none',
    verticalAlign: 'middle',
    border: '1px solid transparent',
    fontSize: Token.buttonFontSize,
    borderRadius: Token.buttonBorderRadius,
    lineHeight: Token.lineHeightDynamic,
    padding: `${Token.buttonPaddingY} ${Token.buttonPaddingX}`,
    transition: 'all .1s linear',
    fontFamily: 'inherit',
    // height: Token.buttonHeight,

    '& + &': {
      marginLeft: Token.buttonNearlyMargin,
    },

    '[class*="button-group"] > & + &': {
      margin: 0,
    },

    '&:active': {
      transition: 'none',
    },

    '[data-soui-role="input-group"] > &': {
      borderWidth: 0,
      borderRadius: 0,

      '&:first-child': {
        borderTopLeftRadius: `calc(${Token.buttonBorderRadius} - 1px)`,
        borderBottomLeftRadius: `calc(${Token.buttonBorderRadius} - 1px)`,
      },
      '&:last-child': {
        borderTopRightRadius: `calc(${Token.buttonBorderRadius} - 1px)`,
        borderBottomRightRadius: `calc(${Token.buttonBorderRadius} - 1px)`,
      },
    },
    '[data-soui-role="input-group-seperate"] > &': {
      borderRadius: 0,
      marginLeft: -1,

      '&:first-child': {
        marginLeft: 0,
        borderTopLeftRadius: Token.buttonBorderRadius,
        borderBottomLeftRadius: Token.buttonBorderRadius,
      },
      '&:last-child': {
        borderTopRightRadius: Token.buttonBorderRadius,
        borderBottomRightRadius: Token.buttonBorderRadius,
      },

      '&:hover': {
        zIndex: 1,
      }
    }
  },
  small: {
    // height: Token.buttonSmallHeight,
    fontWeight: Token.buttonSmallFontWeight,
    fontSize: Token.buttonSmallFontSize,
    padding: `${Token.buttonSmallPaddingY} ${Token.buttonSmallPaddingX}`,

    '&$circle,&$square': {
      width: Token.buttonSmallCircleSize,
      height: Token.buttonSmallCircleSize,
    },
  },

  large: {
    // height: Token.buttonLargeHeight,
    fontWeight: Token.buttonLargeFontWeight,
    fontSize: Token.buttonLargeFontSize,
    padding: `${Token.buttonLargePaddingY} ${Token.buttonLargePaddingX}`,

    '&$circle,&$square': {
      width: Token.buttonLargeCircleSize,
      height: Token.buttonLargeCircleSize,
    },
  },

  default: {
    ...button('Secondary', ''),
  },
  primary: {
    ...button('Primary', ''),
  },
  secondary: {
    ...button('Secondary', ''),
  },
  danger: {
    ...button('Danger', ''),
  },
  warning: {
    ...button('Warning', ''),
  },
  success: {
    ...button('Success', ''),
  },
  link: {
    ...button('Link' as any, ''),
  },
  outline: {
    '&$default': {
      ...button('Secondary', 'Outline'),
    },
    '&$primary': {
      ...button('Primary', 'Outline'),
    },
    '&$success': {
      ...button('Success', 'Outline'),
    },
    '&$danger': {
      ...button('Danger', 'Outline'),
    },
    '&$warning': {
      ...button('Warning', 'Outline'),
    },
    '&$secondary': {
      ...button('Secondary', 'Outline'),
    },
  },
  dashed: {
    '&$default': {
      ...button('Secondary', 'Outline'),
    },
    '&$primary': {
      ...button('Primary', 'Outline'),
    },
    '&$success': {
      ...button('Success', 'Outline'),
    },
    '&$danger': {
      ...button('Danger', 'Outline'),
    },
    '&$warning': {
      ...button('Warning', 'Outline'),
    },
    '&$secondary': {
      ...button('Secondary', 'Outline'),
    },
    borderStyle: 'dashed',
  },
  text: {
    '&$default': {
      ...button('Secondary', 'Text'),
      backgroundColor: 'transparent',
    },
    '&$primary': {
      ...button('Primary', 'Text'),
    },
    '&$success': {
      ...button('Success', 'Text'),
    },
    '&$danger': {
      ...button('Danger', 'Text'),
    },
    '&$warning': {
      ...button('Warning', 'Text'),
    },
    '&$secondary': {
      ...button('Secondary', 'Text'),
    },
  },
  // href: {
  //   textDecoration: 'none',
  //   boxSizing: 'border-box',
  //   color: 'red',
  //   '$primary&': {
  //     color: 'blue',
  //   },
  //   '$disabled&': {
  //     color: 'blue',
  //   },
  //   '&$danger': {
  //     ...button('Danger', ''),
  //   },
  // },
  round: {
    borderRadius: Token.buttonRoundBorderRadius,
  },
  circle: {
    width: Token.buttonCircleSize,
    height: Token.buttonCircleSize,
    padding: 0,
    borderRadius: Token.buttonCircleBorderRadius,
  },
  square: {
    width: Token.buttonCircleSize,
    height: Token.buttonCircleSize,
    padding: 0,
    borderRadius: Token.buttonSquareBorderRadius,
    '& $spin': {
      margin: 0,
    },
  },
  disabled: {
    cursor: 'not-allowed',
  },
  loading: {
    cursor: 'not-allowed',

    // '&$default': {
    //   ...loading('Secondary', ''),
    // },
    // '&$primary': {
    //   ...loading('Primary', ''),
    // },
    // '&$success': {
    //   ...loading('Success', ''),
    // },
    // '&$danger': {
    //   ...loading('Danger', ''),
    // },
    // '&$warning': {
    //   ...loading('Warning', ''),
    // },
    // '&$secondary': {
    //   ...loading('Secondary', ''),
    // },
  },

  groupItem: {},

  group: {
    // 2.x 之前非 inline-block
    display: 'inline-flex',
    // 处理 dropdown 下的 button
    '& [data-role="dropdown"]': {
      '& $button': {
        height: '100%',
      },
      '& [data-role="caret"]': {
        margin: 0,
      },
    },

    '& > :first-child$button,& > :first-child $button': {
      '&::before': {
        display: 'none',
      },
    },

    // 第一个元素下的所有 button 标签的元素
    '& > :first-child:not(:last-child)$button,& > :first-child:not(:last-child) $button': {
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
    '& > :last-child:not(:first-child)$button,& > :last-child:not(:first-child) $button': {
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

    '& > :not(:first-child):not(:last-child)$button,& > :not(:first-child):not(:last-child) $button':
      {
        borderRadius: 0,
        borderLeft: 'none',
        borderRight: 'none',
      },

    // 填充型 button
    '& $button:not($outline):not($dashed):not($text)': {
      position: 'relative',

      '&::before': {
        transition: 'all 0.3s',
      },
      // secondary 比较特殊，单独拎出来写覆盖掉 &::before
      '&$secondary': {
        ...beforeLine(),
        '&::before': {
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
        '& + :not(&),& + * $button:not(&)': {
          '&::before': {
            background: 'transparent',
          },
        },
        '& + $groupItem $button:not(&)': {
          '&::before': {
            background: 'transparent',
          },
        },
      },
      // primary, success, warning, danger 分割线样式
      '&$primary,&$success,&$warning,&$danger': {
        ...beforeLine(),
      },
      // priamry success warning danger secondary 两两之间如果不是紧挨着，则去除中间的分割线
      '&$primary,&$success,&$warning,&$danger,$secondary': {
        '& + :not(&),& + * $button:not(&)': {
          '&::before': {
            background: 'transparent',
          },
        },
        '& + $button:not(&)': {
          '&::before': {
            background: 'transparent',
          },
        },
      },
    },

    // outline 型 button
    '& $outline': {
      position: 'relative',
      '&::before': {
        transition: 'all 0.3s',
      },

      // secondary 比较特殊，单独拎出来写覆盖掉 &::before
      '&$secondary': {
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
      '&$primary': {
        ...outlineBeforeLine('Primary', 'Outline'),
      },
      '&$success': {
        ...outlineBeforeLine('Success', 'Outline'),
      },
      '&$warning': {
        ...outlineBeforeLine('Warning', 'Outline'),
      },
      '&$danger': {
        ...outlineBeforeLine('Danger', 'Outline'),
      },
    },

    // text 型 button
    '& $text': {
      position: 'relative',
      ...textBeforeLine(),
    },

    // dashed 型 button
    '&$dashed': {
      position: 'relative',
      borderStyle: 'none',
    },
  },

  spin: {
    display: 'inline-block',
    marginRight: Token.buttonSpinMargin,
    '& div': {
      borderColor: 'inherit',
      borderTopColor: 'transparent',
    },
  },
};

export default ButtonStyle;
