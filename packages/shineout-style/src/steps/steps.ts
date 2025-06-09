import Token from '@sheinx/theme';
import { StepsClasses } from '@sheinx/base';
import { JsStyles } from '../jss-style';

export type StepsClassType = keyof StepsClasses;

const stepsStyle: JsStyles<StepsClassType> = {
  rootClass: {},
  steps: {
    display: 'flex',
    '& $step:last-child ': {
      '& $tail,$title::after': {
        display: 'none',
      },
    },
  },
  click: {
    '& $icon:not($process)': {
      cursor: 'pointer',
    },
    '& $title': {
      transition: 'color ease 0.3s',
    },
    '&$arrow': {
      '& $step:not($disabled)': {
        cursor: 'pointer',
      },
    },
    '&$default': {
      '& $step:not($process):not($disabled)': {
        cursor: 'pointer',
      },
      '& $step$wait:not($disabled):hover': {
        '& $title,$description': {
          color: Token.stepsWaitHoverFontColor,
        },
      },
      '& $step$finish:not($disabled):hover': {
        '& $title,$description': {
          color: Token.stepsFinishHoverFontColor,
        },
      },
    },
  },
  small: {
    fontSize: Token.stepsIconFontSize,
    '&$arrow': {
      '& $step[dir=rtl]:after': {
        left: -12,
      },
      '& $step:not(:last-child)': {
        '&$widthDescription': {
          '&:after': {
            borderLeftWidth: 22,
            borderTopWidth: 28,
            borderBottomWidth: 28,
          },
          '&:before': {
            borderLeftWidth: 22,
            borderTopWidth: 28,
            borderBottomWidth: 28,
          },
          '&[dir=ltr]:after': { right: -22 },
          '&[dir=rtl]:after': { left: -22 },
        },
        '&[dir=rtl]:after': {
          left: -12,
          right: 'auto',
        },
        '&:after': {
          top: 0,
          right: -12,
          width: 12,
          height: 32,
          borderLeftWidth: 12,
          borderTopWidth: 16,
          borderBottomWidth: 16,
        },
        '&:before': {
          top: 0,
          width: 12,
          height: 32,
          borderLeftWidth: 12,
          borderTopWidth: 16,
          borderBottomWidth: 16,
          right: -12,
        },
        '&[dir=rtl]:before': {
          right: 0,
        },
      },
      '& $step:last-child': {
        '&$widthDescription': {
          '&:before': {
            borderLeftWidth: 22,
            borderTopWidth: 28,
            borderBottomWidth: 28,
          },
        },
        '&:before': {
          borderLeftWidth: 12,
          borderTopWidth: 16,
          borderBottomWidth: 16,
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
          '&[dir=ltr]': { left: 94 },
          '&[dir=rtl]': { right: 94 },
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
          '&[dir=ltr]': { left: 12 },
          '&[dir=rtl]': { right: 12 },
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
        '&$widthDescription': {
          '&:after': {
            top: 0,
            width: 30,
            height: 72,
            borderLeftWidth: 30,
            borderTopWidth: 36,
            borderBottomWidth: 36,
          },
          '&:before': {
            borderLeftWidth: 30,
            borderTopWidth: 36,
            borderBottomWidth: 36,
          },
          '&[dir=ltr]:after': { right: -30 },
          '&[dir=rtl]:after': { left: -30 },
        },
        '&[dir=rtl]:after': {
          left: -20,
          right: 'auto',
        },
        '&[dir=rtl]:before': {
          right: 0,
        },
        '&:after': {
          top: 0,
          width: 20,
          height: 48,
          borderLeftWidth: 20,
          borderTopWidth: 24,
          borderBottomWidth: 24,
          right: -20,
        },
        '&:before': {
          top: 0,
          width: 20,
          height: 48,
          borderLeftWidth: 20,
          borderTopWidth: 24,
          borderBottomWidth: 24,
          right: -20,
        },
      },
      '& $step:last-child': {
        '&$widthDescription': {
          '&:before': {
            borderLeftWidth: 30,
            borderTopWidth: 36,
            borderBottomWidth: 36,
          },
        },
        '&:before': {
          borderLeftWidth: 20,
          borderTopWidth: 24,
          borderBottomWidth: 24,
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
          '&[dir=ltr]': { left: 102 },
          '&[dir=rtl]': { right: 102 },
          top: `calc(${Token.stepsLargeIconWidth}/2)`,
          '&:after': {
            width: `calc(100% - ${Token.stepsLargeIconWidth} + 4px)`,
          },
        },
      },
      '&$vertical': {
        '& $tail': {
          '&[dir=ltr]': { left: 16 },
          '&[dir=rtl]': { right: 16 },
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
      // minHeight: 64,
      paddingBottom: 24,
    },
    '& $description': {
      marginTop: 4,
      // paddingBottom: 12,
    },
    '& $tail': {
      width: 1,
      height: '100%',
      '&[dir=ltr]': { left: 13 },
      '&[dir=rtl]': { right: 13 },
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
        '&::after': {
          content: '""',
          display: 'block',
          background: Token.stepsTailBackgroundColor,
          height: 1,
          marginLeft: 12,
          top: '50%',
          width: 999,
          position: 'absolute',
        },
        '&[dir=ltr]::after': {
          left: '100%',
        },
        '&[dir=rtl]::after': {
          right: '100%',
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
  disabled: {
    '&$step': {
      cursor: 'not-allowed',
    },
    '& $icon:not($process)': {
      cursor: 'not-allowed',
    },
  },
  horizontalLabel: {
    '&$step': {
      overflow: 'hidden',
    },
    '& $icon': {
      marginRight: 16,
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
    // fontSize: Token.stepsDescriptionFontSize,
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
    '& $title': {
      fontWeight: 500,
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
    '& svg': {
      width: `calc(100% - 12px)`,
    },
  },
  dot: {
    '&$vertical': {
      '& $step': {
        overflow: 'visible',
        '& $dot': {
          display: 'flex',
          '& $content': {
            flex: 1,
            lineHeight: 1,
            overflow: 'hidden',
            '& $title': {
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
          },
        },
      },

      '& $title': {
        marginTop: 0,
      },
      '& $icon': {
        lineHeight: 0,
        marginRight: 6,
        padding: '8px 10px',
      },
      '& $process': {
        '& $icon': {
          marginTop: 0,
          marginRight: 8,
          padding: '7px 8px',
        },
        '& $tail': {
          top: 22,
        },
      },
      '& $tail': {
        top: 20,
        paddingTop: 0,
        paddingBottom: 17,
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
        '&[dir=ltr]': { left: 88 },
        '&[dir=rtl]': { right: 88 },
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
        '& $tail': {
          width: 'calc(100% - 4px)',
        },
        '& $icon': {
          marginLeft: 73,
        },
      },
    },
    '& $process': {
      '& $icon': {
        marginTop: 6,
      },
      // 抵消 1px
      '& $title': {
        marginTop: -1,
      },
      '& $iconWrapper': {
        width: 11,
        height: 11,
      },
    },
    '& $icon:not($process)': {
      '& $iconWrapper': {},
    },
    '& $iconWrapper': {
      width: 7,
      height: 7,
    },

    '& $description': {
      fontSize: Token.stepsSmallDescriptionFontSize,
    },
    '& $tail': {
      top: 12,
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
    position: 'relative',
    zIndex: 0,
    '&$steps': {
      overflow: 'hidden',
    },
    '& $step': {
      marginRight: 4,
      paddingLeft: Token.stepsArrowPaddingX,
      // before
      '&:before': {
        content: '""',
        position: 'absolute',
        width: 0,
        height: 0,
        top: 0,
        borderLeftWidth: 16,
        borderTopWidth: 20,
        borderBottomWidth: 20,
        borderLeftColor: '#ffffff',
      },
      '&[dir=ltr]:before': {
        left: 0,
      },
      '&[dir=rtl]:before': {
        right: 0,
      },
      // after
      '&:after': {
        content: '""',
        position: 'absolute',
        width: 0,
        height: 0,

        top: 0,
        zIndex: 1,
        borderLeftWidth: 16,
        borderTopWidth: 20,
        borderBottomWidth: 20,
      },
      '&[dir=ltr]:after': {
        right: -16,
      },
      '&[dir=rtl]:after': {
        left: -16,
      },
    },
    '&$horizontal': {
      '& $horizontalLabel $title:after': {
        display: 'none',
      },
    },
    '& $step:first-child': {
      padding: 0,
      '&:before': {
        display: 'none',
      },
      '&$widthDescription': {
        '&:after': {
          borderLeftWidth: 26,
          borderTopWidth: 32,
          borderBottomWidth: 32,
        },
        '&[dir=ltr]:after': { right: -26 },
        '&[dir=rtl]:after': { left: -26 },
      },
    },
    '& $step:last-child': {
      paddingRight: 0,
      '&:after': {
        display: 'none',
      },
      '&$widthDescription': {
        '&:before': {
          borderLeftWidth: 26,
          borderTopWidth: 32,
          borderBottomWidth: 32,
        },
      },
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
      width: '100%',
    },
    '& $finish': {
      backgroundColor: Token.stepsFinishBackgroundColor,
      '&:after': {
        borderLeft: `16px solid ${Token.stepsFinishBackgroundColor}`,
        borderTop: `20px solid transparent`,
        borderBottom: `20px solid transparent`,
      },
      '&:before': {
        // borderLeft: `16px solid #ffffff`,
        // borderTop: `20px solid transparent`,
        // borderBottom: `20px solid transparent`,
      },
    },
    '& $process': {
      color: Token.stepsProcessFontColor,
      backgroundColor: Token.stepsProcessBackgroundColor,
      '& $description': {
        color: Token.stepsProcessFontColor,
      },
      '&:after': {
        borderLeft: `16px solid ${Token.stepsProcessBackgroundColor}`,
        borderTop: `20px solid transparent`,
        borderBottom: `20px solid transparent`,
      },
      '&[dir=ltr]:after': {
        right: -16,
      },
      '&[dir=rtl]:after': {
        left: -16,
      },
      '&:before': {
        borderLeft: `16px solid #ffffff`,
        borderTop: `20px solid transparent`,
        borderBottom: `20px solid transparent`,
      },
    },
    '& $wait': {
      color: Token.stepsWaitFontColor,
      // backgroundColor: Token.stepsWaitBackgroundColor,
      backgroundColor: Token.stepsWaitBackgroundColor,
      '&:after': {
        borderLeft: `16px solid ${Token.stepsWaitBackgroundColor}`,
        borderTop: `20px solid transparent`,
        borderBottom: `20px solid transparent`,
      },
      '&:before': {
        borderLeft: `16px solid #ffffff`,
        borderTop: `20px solid transparent`,
        borderBottom: `20px solid transparent`,
      },
    },
    '& $widthDescription': {
      '& $content,$description': {
        textAlign: 'left',
      },

      '& $title': {
        marginBottom: Token.stepsDescriptionTitleMarginX,
      },
      '&$process,$finish,$wait': {
        '&:after': {
          borderLeftWidth: 26,
          borderTopWidth: 32,
          borderBottomWidth: 32,
        },
        '&[dir=ltr]:after': { right: -26 },
        '&[dir=rtl]:after': { left: -26 },
        '&:before': {
          borderLeftWidth: 26,
          borderTopWidth: 32,
          borderBottomWidth: 32,
        },
      },
    },
  },
  widthDescription: {},
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
        '&[dir=ltr]': { left: 98 },
        '&[dir=rtl]': { right: 98 },
        top: 13,
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
      boxSizing: 'content-box',
    },
    '& $horizontalLabel:not(:last-child)': {
      minWidth: 160,
    },
  },
};

export default stepsStyle;
