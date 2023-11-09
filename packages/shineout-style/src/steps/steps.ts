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
      '& $tail': {
        top: 11,
      },
    },
    '& $title': {
      fontSize: Token.stepsSmallTitleFontSize,
    },
    '& $description': {
      fontSize: Token.stepsSmallDescriptionFontSize,
    },
    '&$default $iconWrapper': {
      fontSize: Token.stepsSmallTitleFontSize,
      lineHeight: Token.stepsSmallIconFontSize,
      width: Token.stepsSmallIconFontSize,
      height: Token.stepsSmallIconFontSize,
      padding: 5,
    },
    '&$default': {
      '&$horizontal': {
        '& $tail': {
          left: `calc(50% + ${Token.stepsSmallIconWidth}/2 + 2px)`,
          top: `calc(${Token.stepsSmallIconWidth}/2)`,
          '&:after': {
            width: `calc(100% - ${Token.stepsSmallIconWidth} + 4px)`,
          },
        },
      },
    },
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
    '& $description': {
      fontSize: Token.stepsLargeDescriptionFontSize,
    },
    '&$default $iconWrapper': {
      fontSize: Token.stepsLargeTitleFontSize,
      lineHeight: Token.stepsLargeIconFontSize,
      width: Token.stepsLargeIconFontSize,
      height: Token.stepsLargeIconFontSize,
      padding: 7,
    },
    '&$default': {
      '&$horizontal': {
        '& $tail': {
          left: `calc(50% + ${Token.stepsLargeIconWidth}/2 + 6px)`,
          top: `calc(${Token.stepsLargeIconWidth}/2)`,
          '&:after': {
            width: `calc(100% - ${Token.stepsLargeIconWidth} + 4px)`,
          },
        },
      },
    },
    '& $horizontalLabel': {
      '& $title': {
        marginTop: 3,
      },
    },
    '& $horizontalLabel:not(:last-child)': {
      minWidth: 170,
      '& $description': {
        marginTop: 0,
      },
    },
  },
  vertical: {
    flexDirection: 'column',
    '& $content': {
      minHeight: 64,
    },
    '& $description': {
      marginTop: 6,
      paddingBottom: 12,
    },
    '& $title': {
      lineHeight: Token.stepsIconHeight,
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
  },
  horizontal: {
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
      '& $icon': {
        lineHeight: 0,
        padding: 10,
      },
      '& $tail': {
        paddingTop: 28,
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
        top: 7,
        left: '50%',
        marginLeft: 4,
        paddingLeft: 4,
        overflow: 'hidden',
        '&:after': {
          width: '100%',
        },
      },
      '& $process': {
        '& $icon': {
          marginLeft: 75,
        },
        '& $iconWrapper': {
          width: 10,
          height: 10,
        },
      },
    },
    '& $iconWrapper': {
      width: 8,
      height: 8,
    },

    '& $tail': {
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
    },
    '& $content': {
      padding: `${Token.stepsArrowPaddingY} ${Token.stepsArrowPaddingX}`,
      boxSizing: 'border-box',
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
    '&$vertical': {
      '& $tail': {
        left: 13.5,
        paddingTop: 32,
        paddingBottom: 4,
        '&:after': {
          width: 1,
        },
      },
    },
    '&$horizontal': {
      '& $tail': {
        left: `calc(50% + ${Token.stepsIconWidth}/2 + 4px)`,
        top: 13.5,
        '&:after': {
          width: `calc(100% - ${Token.stepsIconWidth} + 4px)`,
        },
      },
    },

    '& $iconWrapper': {
      lineHeight: Token.stepsIconFontSize,
      width: Token.stepsIconFontSize,
      height: Token.stepsIconFontSize,
      padding: 6,
    },
  },
};

export default stepsStyle;
