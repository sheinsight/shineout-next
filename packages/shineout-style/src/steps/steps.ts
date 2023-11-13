import Token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type StepsClasses = {
  steps: string;
  step: string;
  small: string;
  large: string;
  disabled: string;
  content: string;
  title: string;
  horizontalLabel: string;
  verticalLabel: string;
  tail: string;
  description: string;
  vertical: string;
  horizontal: string;
  wait: string;
  process: string;
  finish: string;
  error: string;
  icon: string;
  iconWrapper: string;
  dot: string;
  arrow: string;
  default: string;
};

export type StepsClassType = keyof StepsClasses;

const stepsStyle: JsStyles<StepsClassType> = {
  steps: {
    display: 'flex',
    '& $step:last-child ': {
      '& $tail,$title::after': {
        display: 'none',
      },
    },
  },
  small: {
    fontSize: Token.stepsIconFontSize,
    '&$arrow': {
      '& $step:not(:last-child)': {
        '&:after': {
          top: `calc((100% - ${Token.stepsSmallArrowHeight})/2)`,
          width: Token.stepsSmallArrowHeight,
          height: Token.stepsSmallArrowHeight,
        },
        '&:before': {
          top: `calc((100% - ${Token.stepsSmallArrowHeight})/2)`,
          width: Token.stepsSmallArrowHeight,
          height: Token.stepsSmallArrowHeight,
        },
      },
      '& $content': {
        padding: `${Token.stepsSmallArrowPaddingY} ${Token.stepsSmallArrowPaddingX}`,
        boxSizing: 'border-box',
      },
    },
    '&$dot': {
      '&$vertical': {
        '& $tail': {},
      },
    },
    '& $title': {
      fontSize: Token.stepsSmallTitleFontSize,
    },
    '&$default $iconWrapper': {
      fontSize: Token.stepsSmallTitleFontSize,
      lineHeight: Token.stepsSmallIconHeight,
      width: Token.stepsSmallIconWidth,
      height: Token.stepsSmallIconHeight,
      padding: 0,
    },
    '&$default': {
      '&$horizontal': {
        '& $tail': {
          left: 94,
          top: `calc(${Token.stepsSmallIconWidth}/2)`,
          width: `calc(100% - 20px)`,
          '&:after': {
            width: '100%',
          },
        },
      },
      '&$vertical': {
        '& $description': {
          marginTop: 4,
        },
        '& $tail': {
          paddingTop: 28,
          left: 12,
        },
      },
      '& $verticalLabel': {
        '& $title': {
          lineHeight: Token.lineHeightDynamic,
        },
      },
      '& $title': {
        lineHeight: Token.stepsSmallIconHeight,
      },
    },
    '& $horizontal': {
      '& $horizontalLabel': {
        '& $title': {
          marginTop: 2,
        },
      },
      '& $horizontalLabel:not(:last-child)': {
        minWidth: 150,
        '& $description': {
          marginTop: 0,
        },
      },
    },
    '& $vertical ': {
      '& $horizontalLabel': {
        '& $title': {
          marginTop: 2,
        },
      },
      '& $horizontalLabel:not(:last-child)': {
        minWidth: 150,
        '& $description': {},
      },
    },
  },
  large: {
    '&$arrow': {
      '& $step:not(:last-child)': {
        '&:after': {
          top: `calc((100% - ${Token.stepsLargeArrowHeight})/2)`,
          width: Token.stepsLargeArrowHeight,
          height: Token.stepsLargeArrowHeight,
        },
        '&:before': {
          top: `calc((100% - ${Token.stepsLargeArrowHeight})/2)`,
          width: Token.stepsLargeArrowHeight,
          height: Token.stepsLargeArrowHeight,
        },
      },
      '& $content': {
        padding: `${Token.stepsLargeArrowPaddingY} ${Token.stepsLargeArrowPaddingX}`,
        boxSizing: 'border-box',
      },
    },
    '& $title': {
      fontSize: Token.stepsLargeTitleFontSize,
    },
    '&$default $iconWrapper': {
      fontSize: Token.stepsLargeTitleFontSize,
      width: `calc(${Token.stepsLargeIconFontSize} + 14px)`,
      height: `calc(${Token.stepsLargeIconFontSize} + 14px)`,
      lineHeight: `calc(${Token.stepsLargeIconFontSize} + 14px)`,
      padding: 0,
    },
    '&$default': {
      '& $title': {
        lineHeight: Token.stepsLargeIconHeight,
      },
      '&$horizontal': {
        '& $tail': {
          left: 102,
          top: `calc(${Token.stepsLargeIconWidth}/2)`,
          '&:after': {
            width: `calc(100% - ${Token.stepsLargeIconWidth} + 4px)`,
          },
        },
      },
      '&$vertical': {
        '& $tail': {
          left: 16,
          paddingTop: 36,
        },
      },
      '& $verticalLabel': {
        '& $title': {
          lineHeight: Token.lineHeightDynamic,
        },
      },
    },
    '& $horizontalLabel': {},
    '& $horizontalLabel:not(:last-child)': {
      minWidth: 170,
    },
  },
  vertical: {
    flexDirection: 'column',
    '& $content': {
      minHeight: 64,
    },
    '& $description': {
      marginTop: 4,
      paddingBottom: 12,
    },
    '& $tail': {
      width: 1,
      height: '100%',
      left: 13.5,
      '&:after': {
        position: 'relative',
        width: 1,
        height: '100%',
      },
    },
    '&dot': {
      '& $description': {
        marginTop: 4,
      },
    },
  },
  horizontal: {
    '&dot': {
      '& $description': {
        marginTop: 4,
      },
    },
    '& $tail': {
      width: '100%',
      height: 1,
      '&:after': {
        height: '100%',
      },
    },
    '& $horizontalLabel': {
      '& $description': {},
      '& $title': {
        '&:after': {
          content: '""',
          display: 'block',
          background: Token.stepsTailBackgroundColor,
          height: 1,
          left: '100%',
          marginLeft: 12,
          top: '50%',
          width: 999,
          position: 'absolute',
        },
      },
    },
  },
  step: {
    position: 'relative',
    flex: 1,
    marginRight: 12,
    whiteSpace: 'nowrap',
    '&:last-child': {
      marginRight: 0,
    },
  },
  disabled: {},
  horizontalLabel: {
    '&$step': {
      overflow: 'hidden',
    },
    '& $icon': {
      marginRight: 12,
    },
    '& $title, $description': {
      textAlign: 'left',
    },
    '& $content': {
      textAlign: 'left',
      display: 'inline-block',
    },
    '& $title': {},
    '& $description': {
      // paddingRight: 40,
    },
  },
  verticalLabel: {
    '& $icon': {
      marginLeft: 66,
    },
    '& $content': {
      width: 160,
      display: 'block',
      marginTop: Token.stepsNearlyContentMargin,
    },
  },
  content: {
    textAlign: 'center',
    verticalAlign: 'top',
  },
  title: {
    position: 'relative',
    display: 'inline-block',
    textAlign: 'center',
    lineHeight: Token.lineHeightDynamic,
    fontSize: Token.stepsTitleFontSize,
  },
  tail: {
    position: 'absolute',
    boxSizing: 'border-box',
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      background: Token.stepsTailBackgroundColor,
    },
  },
  description: {
    textAlign: 'center',
    fontSize: Token.stepsDescriptionFontSize,
    color: Token.stepsDescriptionFontColor,
    lineHeight: Token.lineHeightDynamic,
    // marginTop: Token.stepsNearlyDescribeMargin,
    whiteSpace: 'normal',
  },
  wait: {
    '& $iconWrapper': {
      color: Token.stepsWaitFontColor,
      backgroundColor: Token.stepsWaitBackgroundColor,
    },
    '& $title': {
      color: Token.stepsWaitFontColor,
    },
  },
  process: {
    '& $iconWrapper': {
      color: Token.stepsProcessFontColor,
      backgroundColor: Token.stepsProcessBackgroundColor,
      fontWeight: 500,
    },
    '& $title': {
      fontWeight: 500,
    },
  },
  finish: {
    '& $iconWrapper': {
      color: Token.stepsFinishFontColor,
      backgroundColor: Token.stepsFinishBackgroundColor,
    },
    '& $tail': {
      '&:after': {
        background: Token.stepsTailFinishBackgroundColor,
      },
    },
  },
  error: {
    '& $iconWrapper': {
      color: Token.stepsErrorFontColor,
      backgroundColor: Token.stepsErrorBackgroundColor,
    },
  },
  icon: {
    display: 'inline-block',
    position: 'relative',
    fontSize: Token.stepsIconFontSize,
    textAlign: 'center',
  },
  iconWrapper: {
    display: 'inline-block',
    textAlign: 'center',
    borderRadius: '50%',
  },
  dot: {
    '&$vertical': {
      '& $title': {
        marginTop: 0,
      },
      '& $icon': {
        lineHeight: 0,
        padding: 10,
      },
      '& $process': {
        '& $icon': {
          padding: 9,
        },
      },
      '& $tail': {
        top: 7,
        paddingTop: 27,
        '&:after': {
          width: 1,
        },
      },
    },
    '&$horizontal': {
      '& $description': {
        marginTop: 4,
      },
      '& $icon': {
        lineHeight: 0,
        marginLeft: 76,
      },
      '& $tail': {
        left: 88,
        overflow: 'hidden',
        width: 'calc(100% - 8px)',
        '&:after': {
          width: '100%',
        },
      },
      '& $title': {
        whiteSpace: 'normal',
      },
      '& $process': {
        '& $icon': {
          marginLeft: 73,
        },
      },
    },
    '& $process': {
      '& $iconWrapper': {
        width: 10,
        height: 10,
      },
    },
    '& $iconWrapper': {
      width: 8,
      height: 8,
    },

    '& $description': {
      fontSize: Token.stepsSmallDescriptionFontSize,
    },
    '& $tail': {
      top: 10.5,
      boxSizing: 'border-box',
    },
    '& $finish': {
      '& $iconWrapper': {
        backgroundColor: Token.stepsProcessBackgroundColor,
      },
      '& $title': {},
    },
  },
  arrow: {
    '&$steps': {
      overflow: 'hidden',
    },
    '& $step': {},
    '&$horizontal': {
      '& $horizontalLabel $title:after': {
        display: 'none',
      },
    },
    '& $step:last-child': {
      marginRight: 0,
    },
    '& $step:not(:last-child)': {
      marginRight: 4,
      overflow: 'visible',
      position: 'relative',
      '&:after': {
        zIndex: 1,
        content: '""',
        width: Token.stepsArrowHeight,
        height: Token.stepsArrowHeight,
        borderRadius: 4,
        display: 'block',
        position: 'absolute',
        top: `calc((100% - ${Token.stepsArrowHeight})/2)`,
        right: -30,
        transform: 'rotate(45deg)',
      },
      '&:before': {
        zIndex: 2,
        content: '""',
        height: Token.stepsArrowHeight,
        width: Token.stepsArrowHeight,
        borderRadius: 4,
        display: 'block',
        position: 'absolute',
        top: `calc((100% - ${Token.stepsArrowHeight})/2)`,
        right: -26,
        transform: 'rotate(45deg)',
      },
    },
    '& $step:not(:first-child)': {
      paddingLeft: 30,
    },
    '& $description': {
      paddingRight: 0,
      height: 20,
      whiteSpace: 'nowrap',
      fontSize: Token.stepsSmallDescriptionFontSize,
    },
    '& $content': {
      padding: `${Token.stepsArrowPaddingY} ${Token.stepsArrowPaddingX}`,
      boxSizing: 'border-box',
      marginTop: 0,
    },
    '& $finish': {
      backgroundColor: Token.stepsFinishBackgroundColor,
      '&:after': {
        background: `linear-gradient(45deg,rgba(0,0,0,0) 50%,rgba(0,0,0,0) 25% 50%,#fff 50% 75%,#fff 75%)`,
      },
      '&:before': {
        background: `linear-gradient(45deg,rgba(0,0,0,0) 50%,rgba(0,0,0,0) 25% 50%,${Token.stepsFinishBackgroundColor} 50% 75%,${Token.stepsFinishBackgroundColor} 75%)`,
      },
    },
    '& $process': {
      color: Token.stepsProcessFontColor,
      backgroundColor: Token.stepsProcessBackgroundColor,
      '& $description': {
        color: Token.stepsProcessFontColor,
      },
      '&:after': {
        background: `linear-gradient(45deg,rgba(0,0,0,0) 50%,rgba(0,0,0,0) 25% 50%,#fff 50% 75%,#fff 75%)`,
      },
      '&:before': {
        background: `linear-gradient(45deg,rgba(0,0,0,0) 50%,rgba(0,0,0,0) 25% 50%,${Token.stepsProcessBackgroundColor} 50% 75%,${Token.stepsProcessBackgroundColor} 75%)`,
      },
    },
    '& $wait': {
      color: Token.stepsWaitFontColor,
      backgroundColor: Token.stepsWaitBackgroundColor,
      '&:after': {
        background: `linear-gradient(45deg,rgba(0,0,0,0) 50%,rgba(0,0,0,0) 25% 50%,#fff 50% 75%,#fff 75%)`,
      },
      '&:before': {
        background: `linear-gradient(45deg,rgba(0,0,0,0) 50%,rgba(0,0,0,0) 25% 50%,${Token.stepsWaitBackgroundColor} 50% 75%,${Token.stepsWaitBackgroundColor} 75%)`,
      },
    },
  },
  default: {
    lineHeight: 0,
    '&$vertical': {
      '& $tail': {
        paddingTop: 32,
        paddingBottom: 4,
        '&:after': {
          width: 1,
        },
      },
    },
    '&$horizontal': {
      '& $tail': {
        // left: `calc(50% + ${Token.stepsIconWidth}/2 + 4px)`,
        left: 98,
        top: 13.5,
        '&:after': {
          width: `calc(100% - ${Token.stepsIconWidth} + 4px)`,
        },
      },
    },
    '& $verticalLabel': {
      '& $title': {
        lineHeight: Token.lineHeightDynamic,
      },
      '& $description': {
        marginTop: 4,
      },
    },
    '& $iconWrapper': {
      lineHeight: Token.stepsIconHeight,
      width: Token.stepsIconWidth,
      height: Token.stepsIconHeight,
    },
    '& $icon': {
      lineHeight: 0,
    },
    '& $title': {
      lineHeight: Token.stepsIconHeight,
    },
    '& $description': {
      fontSize: Token.stepsSmallDescriptionFontSize,
    },
    '& $icon svg': {
      padding: 6,
    },
    '& $horizontalLabel:not(:last-child)': {
      minWidth: 160,
    },
  },
};

export default stepsStyle;
