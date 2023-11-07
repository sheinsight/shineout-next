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
    // '& $step:last-child $title::after': {
    //   display: 'none',
    // },
  },
  small: {
    fontSize: Token.stepsIconFontSize,
  },
  large: {},
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
      paddingTop: 32,
      paddingBottom: 4,
      left: 14,
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
      left: 'calc(50% + 18px)',
      top: '14px',
      '&:after': {
        width: 'calc(100% - 26px)',
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
      paddingRight: 40,
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
      background: Token.stepsTailBackgroundColor,
      position: 'absolute',
    },
  },
  description: {
    textAlign: 'center',
    fontSize: Token.stepsDescriptionFontSize,
    color: Token.stepsDescriptionFontColor,
    lineHeight: Token.lineHeightDynamic,
    marginTop: Token.stepsNearlyDescribeMargin,
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
    '& $title': {},
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
    '& $iconWrapper': {
      width: 8,
      height: 8,
    },
  },
  arrow: {},
  default: {
    '& $iconWrapper': {
      lineHeight: Token.stepsIconFontSize,
      width: Token.stepsIconFontSize,
      height: Token.stepsIconFontSize,
      padding: 6,
    },
  },
};

export default stepsStyle;
