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
    fontFamily: 'inherit',
    // height: Token.buttonHeight,

    '& + &': {
      marginLeft: Token.buttonNearlyMargin,
    },

    '[class*="button-group"] > & + &': {
      margin: 0,
    },

    '&:hover': {
      transition: 'all .1s linear',
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
    '[data-soui-role="input-group-separate"] > &': {
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
